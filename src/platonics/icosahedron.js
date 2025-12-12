import * as THREE from 'three';

/**
 * Icosahedron - Regular polyhedron with maximal face count
 * Topology: 20 triangular faces, 12 vertices, 30 edges
 * Face type: Equilateral triangles
 * Symmetry group: Icosahedral (Ih)
 */
export function createIcosahedron(radius = 1, position = { x: 0, y: 0, z: 0 }) {
    const geometry = new THREE.IcosahedronGeometry(radius);
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

export const icosahedronInfo = {
    name: 'Icosahedron',
    faces: 20,
    vertices: 12,
    edges: 30,
    faceType: 'Equilateral triangle',
    symmetryGroup: 'Ih',
    dualOf: 'Dodecahedron',
    schlafliSymbol: '{3,5}'
};
