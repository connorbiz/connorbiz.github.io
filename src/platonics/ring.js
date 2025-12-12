import * as THREE from 'three';

/**
 * Ring - Planar annulus (2D disk with circular hole)
 * Topology: 2D surface embedded in 3D space
 * Parameterizable: inner/outer radius, angular segments
 */
export function createRing(
    innerRadius = 0.5,
    outerRadius = 1,
    thetaSegments = 16,
    position = { x: 0, y: 0, z: 0 }
) {
    const geometry = new THREE.RingGeometry(
        innerRadius,
        outerRadius,
        thetaSegments
    );
    const material = new THREE.MeshLambertMaterial({
        color: 0x00ffff,
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: true,
        opacity: 0.5,
        emissive: 0x003333,
        emissiveIntensity: 0.3
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position.x, position.y, position.z);

    return mesh;
}

export const ringInfo = {
    name: 'Ring',
    category: 'Planar Annulus',
    topology: '2D surface, double-sided rendering',
    parameters: ['innerRadius', 'outerRadius', 'thetaSegments']
};
