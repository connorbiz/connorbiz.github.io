import * as THREE from 'three';

/**
 * Sphere - Approximation of perfect 3D ball surface
 * Topology: Genus-0 surface (no holes)
 * Parameterizable: radius, width/height segmentation
 */
export function createSphere(
    radius = 1,
    widthSegments = 8,
    heightSegments = 6,
    position = { x: 0, y: 0, z: 0 }
) {
    const geometry = new THREE.SphereGeometry(
        radius,
        widthSegments,
        heightSegments
    );
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

export const sphereInfo = {
    name: 'Sphere',
    category: 'Surface of Revolution',
    topology: 'Genus-0 (Euler characteristic χ = 2)',
    parameters: ['radius', 'widthSegments', 'heightSegments']
};
