import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function HyperbolicSpace() {
    const sphereRef = useRef()
    const gridRef = useRef()

    useFrame((state, delta) => {
        if (gridRef.current) {
            gridRef.current.rotation.y += delta * 0.05
        }
    })

    return (
        <group>
            {/* The Boundary Sphere (The "Infinity" horizon) */}
            <mesh ref={sphereRef}>
                <sphereGeometry args={[10, 64, 64]} />
                <meshBasicMaterial
                    color="#00ffff"
                    wireframe
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Inner Fog/Glow */}
            <mesh>
                <sphereGeometry args={[9.5, 32, 32]} />
                <meshBasicMaterial
                    color="#000000"
                    side={THREE.BackSide}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Hyperbolic Grid (Visual representation) */}
            <group ref={gridRef}>
                <gridHelper args={[20, 20, 0x004444, 0x002222]} position={[0, -5, 0]} />
                <gridHelper args={[20, 20, 0x004444, 0x002222]} position={[0, 5, 0]} />
            </group>
        </group>
    )
}
