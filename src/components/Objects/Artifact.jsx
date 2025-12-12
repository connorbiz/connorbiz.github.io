import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { createOctahedron, createIcosahedron, createTetrahedron, createCube, createTorus } from '../../platonics'
import { useStore } from '../../store/useStore'
import * as THREE from 'three'

const TYPES = {
    log: createOctahedron,
    dat: createIcosahedron,
    sys: createTetrahedron,
    txt: createCube,
    msg: createTorus
}

export function Artifact({ type, position, name, content }) {
    const meshRef = useRef()
    const [hovered, setHover] = useState(false)
    const addFile = useStore(state => state.addFile)
    const collectedFiles = useStore(state => state.collectedFiles)

    const isCollected = collectedFiles.has(name)

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.5
            meshRef.current.rotation.y += delta * 0.3

            // Float effect
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2
        }
    })

    const handleCollect = () => {
        addFile({ name, type, content })
    }

    if (isCollected) return null

    // We need to create the geometry instance. 
    // Since the platonics functions return a Mesh, we can extract geometry/material or just use the function to create a new one and attach it.
    // However, in R3F it's better to use declarative geometry.
    // For now, let's just use a primitive since the platonics lib returns a full Mesh.

    // Actually, the platonics lib returns a THREE.Mesh. We can use <primitive object={mesh} />
    // But we want to control the material/color on hover.

    // Let's instantiate the mesh once
    const [mesh] = useState(() => {
        const creator = TYPES[type] || TYPES.txt
        const m = creator(1) // radius 1
        return m
    })

    return (
        <primitive
            object={mesh}
            ref={meshRef}
            position={position}
            onClick={handleCollect}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            scale={hovered ? 1.2 : 1}
        />
    )
}
