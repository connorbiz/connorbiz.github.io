import { useRef, useState } from 'react'
import { Text } from '@react-three/drei'
import { useStore } from '../../store/useStore'
import * as THREE from 'three'

export function BlogNode({ position, title, excerpt, category, nodeId, onNavigate, isCenter }) {
    const groupRef = useRef()
    const [hovered, setHover] = useState(false)

    const activeNodeId = useStore(state => state.activeTerminalId)
    const setActiveNode = useStore(state => state.setActiveTerminal)
    const isActive = activeNodeId === nodeId

    // Poincaré Scaling - more dramatic falloff with distance
    const VISUAL_SCALE = 10
    const unitPos = position.clone().divideScalar(VISUAL_SCALE)
    const r = unitPos.length()
    const rClamped = Math.min(r, 0.99)

    // Cubic falloff for more dramatic size change
    const hyperbolicFactor = 1 - rClamped * rClamped
    const scaleFactor = Math.pow(hyperbolicFactor, 1.8) * 2.5

    // Don't render if too small
    if (scaleFactor < 0.05) return null

    // Category colors - soft pastels
    const categoryColors = {
        'fundamentals': '#FFFEF5',    // warm white
        'hardware': '#F5FAFF',         // cool white
        'software': '#F5FFF5',         // mint white
        'networking': '#FFF5FA',       // pink white
        'memory': '#FAF5FF',           // lavender white
        'culture': '#F0FFFF',          // cyan white
        'default': '#FFFFFF'           // pure white
    }

    const accentColors = {
        'fundamentals': '#D4A574',    // warm brown
        'hardware': '#5B8FB9',         // blue
        'software': '#7AB97A',         // green
        'networking': '#B97A9E',       // pink
        'memory': '#9E7AB9',           // purple
        'culture': '#00CED1',          // dark cyan
        'default': '#888888'
    }

    const bgColor = categoryColors[category] || categoryColors.default
    const accentColor = accentColors[category] || accentColors.default
    const textColor = '#1a1a1a'

    const handleClick = (e) => {
        e.stopPropagation()
        if (onNavigate) {
            onNavigate()
        }
        setActiveNode(nodeId)
    }

    // Page dimensions - larger, more like a webpage
    const pageWidth = 3.5
    const pageHeight = 4.5

    return (
        <group
            position={position}
            scale={scaleFactor}
            ref={groupRef}
            rotation={[-Math.PI / 2, 0, 0]}  // Lay flat, facing up
        >
            {/* Main page background */}
            <mesh
                onClick={handleClick}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <planeGeometry args={[pageWidth, pageHeight]} />
                <meshBasicMaterial
                    color={hovered ? '#FFFFFF' : bgColor}
                    transparent
                    opacity={isActive ? 1 : 0.95}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Shadow/depth */}
            <mesh position={[0.05, -0.05, -0.02]}>
                <planeGeometry args={[pageWidth, pageHeight]} />
                <meshBasicMaterial
                    color="#000000"
                    transparent
                    opacity={0.08}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Top accent bar */}
            <mesh position={[0, pageHeight/2 - 0.15, 0.01]}>
                <planeGeometry args={[pageWidth, 0.25]} />
                <meshBasicMaterial color={accentColor} />
            </mesh>

            {/* Category label in accent bar */}
            {scaleFactor > 0.15 && (
                <Text
                    position={[-pageWidth/2 + 0.3, pageHeight/2 - 0.15, 0.02]}
                    fontSize={0.12}
                    color="#FFFFFF"
                    anchorX="left"
                    anchorY="middle"
                    letterSpacing={0.05}
                >
                    {category?.toUpperCase() || 'ARTICLE'}
                </Text>
            )}

            {/* Title */}
            {scaleFactor > 0.12 && (
                <Text
                    position={[0, pageHeight/2 - 0.7, 0.02]}
                    fontSize={0.28}
                    color={textColor}
                    anchorX="center"
                    anchorY="top"
                    maxWidth={pageWidth - 0.5}
                    textAlign="center"
                    lineHeight={1.2}
                >
                    {title}
                </Text>
            )}

            {/* Divider line */}
            <mesh position={[0, pageHeight/2 - 1.4, 0.01]}>
                <planeGeometry args={[pageWidth - 1, 0.01]} />
                <meshBasicMaterial color={accentColor} transparent opacity={0.3} />
            </mesh>

            {/* Excerpt/content */}
            {scaleFactor > 0.2 && (
                <Text
                    position={[-pageWidth/2 + 0.4, pageHeight/2 - 1.7, 0.02]}
                    fontSize={0.14}
                    color="#444444"
                    anchorX="left"
                    anchorY="top"
                    maxWidth={pageWidth - 0.8}
                    lineHeight={1.6}
                    textAlign="left"
                >
                    {excerpt}
                </Text>
            )}

            {/* Click indicator / Read more */}
            {scaleFactor > 0.25 && (
                <Text
                    position={[0, -pageHeight/2 + 0.4, 0.02]}
                    fontSize={0.1}
                    color={accentColor}
                    anchorX="center"
                    anchorY="middle"
                >
                    {isActive ? '● READING' : '○ CLICK TO READ'}
                </Text>
            )}

            {/* Active border glow */}
            {isActive && (
                <mesh position={[0, 0, -0.01]}>
                    <planeGeometry args={[pageWidth + 0.15, pageHeight + 0.15]} />
                    <meshBasicMaterial
                        color={accentColor}
                        transparent
                        opacity={0.4}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}
        </group>
    )
}
