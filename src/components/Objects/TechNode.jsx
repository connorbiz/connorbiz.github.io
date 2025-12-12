import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

export function TechNode({ position, label, level, onClick }) {
    const meshRef = useRef()
    const [hovered, setHover] = useState(false)

    // Poincaré Scaling
    // Visual size should scale by (1 - r^2) to maintain hyperbolic proportions
    // We calculate r based on the *unit sphere* position (before VISUAL_SCALE)
    const VISUAL_SCALE = 10
    const unitPos = position.clone().divideScalar(VISUAL_SCALE)
    const r = unitPos.length()

    // Clamp r to avoid singularity at boundary
    const rClamped = Math.min(r, 0.99)
    const scaleFactor = (1 - rClamped * rClamped) * 1.5 // Base size multiplier

    // Don't render if too small (culling)
    if (scaleFactor < 0.05) return null

    const color = level === 0 ? '#ffffff' :
        level === 1 ? '#00ffff' :
            level === 2 ? '#00ff00' :
                '#ff00ff'

    return (
        <group position={position} scale={scaleFactor}>
            <mesh
                ref={meshRef}
                onClick={(e) => { e.stopPropagation(); onClick && onClick() }}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <sphereGeometry args={[0.4, 16, 16]} />
                <meshBasicMaterial
                    color={hovered ? '#ffffff' : color}
                    wireframe={false}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Halo/Glow */}
            <mesh>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshBasicMaterial
                    color={color}
                    wireframe={true}
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Label - Only show if reasonably close/large */}
            {scaleFactor > 0.2 && (
                <Text
                    position={[0, 0.8, 0]}
                    fontSize={0.4}
                    color={color}
                    anchorX="center"
                    anchorY="middle"
                >
                    {label}
                </Text>
            )}
        </group>
    )
}
