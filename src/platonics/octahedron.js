import * as THREE from 'three';

/**
 * Octahedron - Regular polyhedron, dual of the cube
 * Topology: 8 triangular faces, 6 vertices, 12 edges
 * Face type: Equilateral triangles
 * Symmetry group: Octahedral (Oh)
 */
export function createOctahedron(radius = 1, position = { x: 0, y: 0, z: 0 }) {
    const geometry = new THREE.OctahedronGeometry(radius);
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

export const octahedronInfo = {
    name: 'Octahedron',
    faces: 8,
    vertices: 6,
    edges: 12,
    faceType: 'Equilateral triangle',
    symmetryGroup: 'Oh',
    dualOf: 'Cube',
    schlafliSymbol: '{3,4}'
};
