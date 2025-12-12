import * as THREE from 'three';

/**
 * Tetrahedron - Regular polyhedron with minimal face count
 * Topology: 4 triangular faces, 4 vertices, 6 edges
 * Face type: Equilateral triangles
 * Symmetry group: Tetrahedral (Td)
 */
export function createTetrahedron(radius = 1, position = { x: 0, y: 0, z: 0 }) {
    const geometry = new THREE.TetrahedronGeometry(radius);
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

export const tetrahedronInfo = {
    name: 'Tetrahedron',
    faces: 4,
    vertices: 4,
    edges: 6,
    faceType: 'Equilateral triangle',
    symmetryGroup: 'Td',
    dualOf: 'Self-dual',
    schlafliSymbol: '{3,3}'
};
