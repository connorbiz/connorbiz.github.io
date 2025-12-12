import * as THREE from 'three'

/**
 * Hyperbolic Geometry Library (Poincaré Ball Model)
 * Implements algorithms for H3 Layout (Munzner) and Mobius Transformations.
 */

// ==========================================
// Core Math: Mobius Transformations
// ==========================================

/**
 * Mobius Addition in the Ball
 * Moves point p as if the origin was moved to -v.
 * Effectively: newP = T_v(p)
 * Formula: ( (1-2<p,v>+|v|^2)p + (1-|p|^2)v ) / (1-2<p,v>+|p|^2|v|^2)
 * Note: There are different conventions. We use the one that maps 0 -> v.
 * T_v(0) = v
 * T_v(-v) = 0
 */
export function mobiusAdd(p, v) {
    const pDotV = p.dot(v)
    const pLenSq = p.lengthSq()
    const vLenSq = v.lengthSq()
    const denominator = 1 + 2 * pDotV + pLenSq * vLenSq

    if (Math.abs(denominator) < 0.00001) return p; // Avoid singularity

    const term1 = p.clone().multiplyScalar(1 + 2 * pDotV + vLenSq) // Wait, let's use the standard vector form

    // Standard form for T_a(x) where T_a(0) = a:
    // T_a(x) = ( (1 + 2<x,a> + |x|^2)a + (1 - |a|^2)x ) / (1 + 2<x,a> + |x|^2|a|^2)
    // Here v is 'a'.

    const a = v;
    const x = p;
    const xDotA = x.dot(a);
    const xSq = x.lengthSq();
    const aSq = a.lengthSq();
    const D = 1 + 2 * xDotA + xSq * aSq;

    const coeffA = 1 + 2 * xDotA + xSq;
    const coeffX = 1 - aSq;

    const resA = a.clone().multiplyScalar(coeffA);
    const resX = x.clone().multiplyScalar(coeffX);

    return resA.add(resX).divideScalar(D);
}

/**
 * Inverse Mobius Addition (Subtraction)
 * Calculates the vector v such that mobiusAdd(p1, v) = p2
 * Useful for finding the transformation to move p1 to p2 (or p1 to origin).
 * To move p to origin: v = -p
 */
export function mobiusSub(p1, p2) {
    // To move p1 to origin, we add -p1.
    return p1.clone().negate();
}


// ==========================================
// H3 Layout Generation
// ==========================================

export function generateH3Layout(depth = 4, branching = 3) {
    const nodes = []
    const links = []

    // Root at origin
    const root = {
        id: 'root',
        pos: new THREE.Vector3(0, 0, 0),
        level: 0,
        label: 'LOCALHOST',
        children: []
    }
    nodes.push(root)

    // Recursive layout
    // parentPos: position of parent in GLOBAL space
    // incomingDir: direction from grandparent to parent (to orient hemisphere)
    // currentDepth: depth in tree
    function layoutChildren(parent, incomingDir, currentDepth) {
        if (currentDepth >= depth) return;

        // Calculate radius for this level
        // In H3, we want roughly equal hyperbolic distance steps
        // tanh(d) = r. Let's say step size d = 1.5
        // We need to place children at a certain distance relative to parent
        // But since we are working in global coordinates, it's easier to:
        // 1. Pretend parent is at origin
        // 2. Place children on a sphere around origin
        // 3. Mobius-transform them to the parent's actual position

        const stepDist = 0.5; // Euclidean distance in the ball (approx)
        // Actually, better to use hyperbolic distance.
        // Let's stick to a visual approximation for the layout first.

        // Number of children
        const count = branching;

        // Generate points on a sphere (or hemisphere)
        const points = [];

        if (currentDepth === 0) {
            // Root: Distribute on full sphere
            // Fibonacci sphere algorithm for even distribution
            const phi = Math.PI * (3 - Math.sqrt(5));
            for (let i = 0; i < count; i++) {
                const y = 1 - (i / (count - 1)) * 2;
                const radius = Math.sqrt(1 - y * y);
                const theta = phi * i;
                const x = Math.cos(theta) * radius;
                const z = Math.sin(theta) * radius;
                points.push(new THREE.Vector3(x, y, z));
            }
        } else {
            // Hemisphere distribution oriented along incomingDir
            // We want points P such that dot(P, incomingDir) > 0
            // Simple rejection sampling or coordinate rotation

            // Let's generate random points on sphere and flip them if they are in the "back" hemisphere
            // incomingDir points FROM parent TO child (roughly). 
            // Wait, incomingDir is Grandparent -> Parent.
            // We want to continue that direction.

            const forward = incomingDir.clone().normalize();

            for (let i = 0; i < count; i++) {
                // Random point on sphere
                let p = new THREE.Vector3(
                    Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5
                ).normalize();

                // If it points back towards grandparent, flip it
                if (p.dot(forward) < 0.2) { // 0.2 buffer to avoid 90 degree crowding
                    p.negate();
                }
                // If still bad (was close to equator), nudge it
                if (p.dot(forward) < 0.2) {
                    p.add(forward).normalize();
                }

                points.push(p);
            }
        }

        // Apply positions
        points.forEach((dir, i) => {
            // 1. Place at distance 'stepDist' from origin
            const localPos = dir.clone().multiplyScalar(stepDist);

            // 2. Transform to parent's frame
            // We want T_parent(localPos)
            const globalPos = mobiusAdd(localPos, parent.pos);

            const id = `${parent.id}-${i}`;
            const node = {
                id,
                pos: globalPos,
                level: currentDepth + 1,
                label: `NODE_${currentDepth + 1}_${i}`,
                children: []
            };

            nodes.push(node);
            links.push({ source: parent.id, target: id });

            // Recurse
            // New incoming dir is Parent -> Node
            // But we need it in the frame where Node is origin? 
            // No, just the vector difference in Euclidean space is a "good enough" approximation for orientation
            // for the visual layout.
            const newDir = globalPos.clone().sub(parent.pos).normalize();

            layoutChildren(node, newDir, currentDepth + 1);
        });
    }

    layoutChildren(root, new THREE.Vector3(0, 1, 0), 0);

    return { nodes, links };
}
