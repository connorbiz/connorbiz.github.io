import * as THREE from 'three';

/**
 * Cylinder - Right circular prism
 * Topology: 2 circular bases, 1 curved lateral surface
 * Parameterizable: radiusTop, radiusBottom, height, radialSegments
 */
export function createCylinder(
    radiusTop = 1,
    radiusBottom = 1,
    height = 2,
    radialSegments = 8,
    position = { x: 0, y: 0, z: 0 }
) {
    const geometry = new THREE.CylinderGeometry(
        radiusTop,
        radiusBottom,
        height,
        radialSegments
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

export const cylinderInfo = {
    name: 'Cylinder',
    category: 'Prism',
    topology: '2 circular bases, 1 lateral surface',
    parameters: ['radiusTop', 'radiusBottom', 'height', 'radialSegments']
};
