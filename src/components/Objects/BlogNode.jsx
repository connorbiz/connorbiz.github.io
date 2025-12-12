import { useRef, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import { useStore } from '../../store/useStore'
import * as THREE from 'three'

export function BlogNode({ position, title, excerpt, category, nodeId, onNavigate, isCenter }) {
    const groupRef = useRef()
    const [hovered, setHover] = useState(false)
    const { camera } = useThree()

    const activeNodeId = useStore(state => state.activeTerminalId)
    const setActiveNode = useStore(state => state.setActiveTerminal)
    const isActive = activeNodeId === nodeId

    // Poincaré Scaling
    const VISUAL_SCALE = 10
    const unitPos = position.clone().divideScalar(VISUAL_SCALE)
    const r = unitPos.length()
    const rClamped = Math.min(r, 0.99)
    const scaleFactor = (1 - rClamped * rClamped) * 1.5

    // Don't render if too small
    if (scaleFactor < 0.05) return null

    // Category colors - soft pastels
    const categoryColors = {
        'fundamentals': '#E8D5B7',    // warm beige
        'hardware': '#B7D5E8',         // soft blue
        'software': '#D5E8B7',         // soft green
        'networking': '#E8B7D5',       // soft pink
        'memory': '#D5B7E8',           // soft purple
        'default': '#F5F5F0'           // cream
    }

    const color = categoryColors[category] || categoryColors.default
    const textColor = '#2C2C2C'

    // Billboard effect - face camera
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.lookAt(camera.position)
        }
    })

    const handleClick = (e) => {
        e.stopPropagation()
        if (onNavigate) {
            onNavigate()
        }
        setActiveNode(nodeId)
    }

    return (
        <group position={position} scale={scaleFactor} ref={groupRef}>
            {/* Paper card background */}
            <mesh
                onClick={handleClick}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <planeGeometry args={[2.4, 1.6]} />
                <meshBasicMaterial
                    color={hovered ? '#FFFFFF' : color}
                    transparent
                    opacity={isActive ? 1 : 0.92}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Card border/shadow */}
            <mesh position={[0.03, -0.03, -0.01]}>
                <planeGeometry args={[2.4, 1.6]} />
                <meshBasicMaterial
                    color="#00000022"
                    transparent
                    opacity={0.15}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Category indicator line */}
            <mesh position={[-1.1, 0, 0.01]}>
                <planeGeometry args={[0.08, 1.4]} />
                <meshBasicMaterial color={categoryColors[category] || '#888'} />
            </mesh>

            {/* Title */}
            {scaleFactor > 0.15 && (
                <Text
                    position={[0, 0.45, 0.02]}
                    fontSize={0.18}
                    color={textColor}
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={2}
                    font="/fonts/inter-medium.woff"
                    fontWeight="bold"
                >
                    {title}
                </Text>
            )}

            {/* Excerpt - only show when close enough */}
            {scaleFactor > 0.3 && (
                <Text
                    position={[0, -0.1, 0.02]}
                    fontSize={0.11}
                    color="#666666"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={2}
                    lineHeight={1.4}
                >
                    {excerpt}
                </Text>
            )}

            {/* Category tag */}
            {scaleFactor > 0.2 && (
                <Text
                    position={[0, -0.6, 0.02]}
                    fontSize={0.08}
                    color="#999999"
                    anchorX="center"
                    anchorY="middle"
                >
                    {category?.toUpperCase() || 'ARTICLE'}
                </Text>
            )}

            {/* Active indicator ring */}
            {isActive && (
                <mesh position={[0, 0, -0.02]}>
                    <ringGeometry args={[1.35, 1.4, 32]} />
                    <meshBasicMaterial color="#2C2C2C" transparent opacity={0.3} />
                </mesh>
            )}
        </group>
    )
}
