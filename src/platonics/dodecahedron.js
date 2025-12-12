import * as THREE from 'three';

/**
 * Dodecahedron - Regular polyhedron with pentagonal faces
 * Topology: 12 pentagonal faces, 20 vertices, 30 edges
 * Face type: Regular pentagons
 * Symmetry group: Icosahedral (Ih)
 */
export function createDodecahedron(radius = 1, position = { x: 0, y: 0, z: 0 }) {
    const geometry = new THREE.DodecahedronGeometry(radius);
    const material = new THREE.MeshLambertMaterial({
        color: 0x00ff00,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
        emissive: 0x003300,
        emissiveIntensity: 0.2
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position.x, position.y, position.z);

    return mesh;
}

export const dodecahedronInfo = {
    name: 'Dodecahedron',
    faces: 12,
    vertices: 20,
    edges: 30,
    faceType: 'Regular pentagon',
    symmetryGroup: 'Ih',
    dualOf: 'Icosahedron',
    schlafliSymbol: '{5,3}'
};
