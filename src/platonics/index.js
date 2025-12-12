/**
 * Geometric Primitives Library
 *
 * Modular three.js wireframe geometry generators
 * Includes Platonic solids, surfaces of revolution, and other 3D forms
 */

// Platonic Solids (Regular Convex Polyhedra)
export { createTetrahedron, tetrahedronInfo } from './tetrahedron.js';
export { createCube, cubeInfo } from './cube.js';
export { createOctahedron, octahedronInfo } from './octahedron.js';
export { createDodecahedron, dodecahedronInfo } from './dodecahedron.js';
export { createIcosahedron, icosahedronInfo } from './icosahedron.js';

// Parametric Surfaces and Other Forms
export { createCylinder, cylinderInfo } from './cylinder.js';
export { createTorus, torusInfo } from './torus.js';
export { createSphere, sphereInfo } from './sphere.js';
export { createRing, ringInfo } from './ring.js';

/**
 * Platonic Solids Reference
 * The five regular convex polyhedra with identical faces and vertices
 */
export const platonicSolids = {
    tetrahedron: {
        faces: 4,
        vertices: 4,
        edges: 6,
        schlafli: '{3,3}',
        symmetry: 'Td'
    },
    cube: {
        faces: 6,
        vertices: 8,
        edges: 12,
        schlafli: '{4,3}',
        symmetry: 'Oh'
    },
    octahedron: {
        faces: 8,
        vertices: 6,
        edges: 12,
        schlafli: '{3,4}',
        symmetry: 'Oh'
    },
    icosahedron: {
        faces: 20,
        vertices: 12,
        edges: 30,
        schlafli: '{3,5}',
        symmetry: 'Ih'
    },
    dodecahedron: {
        faces: 12,
        vertices: 20,
        edges: 30,
        schlafli: '{5,3}',
        symmetry: 'Ih'
    }
};
