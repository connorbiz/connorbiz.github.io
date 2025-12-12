import * as THREE from 'three';

/**
 * Cube (Hexahedron) - Regular polyhedron with square faces
 * Topology: 6 square faces, 8 vertices, 12 edges
 * Face type: Squares
 * Symmetry group: Octahedral (Oh)
 */
export function createCube(size = 1, position = { x: 0, y: 0, z: 0 }) {
    const geometry = new THREE.BoxGeometry(size, size, size);
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

export const cubeInfo = {
    name: 'Cube (Hexahedron)',
    faces: 6,
    vertices: 8,
    edges: 12,
    faceType: 'Square',
    symmetryGroup: 'Oh',
    dualOf: 'Octahedron',
    schlafliSymbol: '{4,3}'
};
