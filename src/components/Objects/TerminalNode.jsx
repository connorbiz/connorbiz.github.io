import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { TerminalRenderer } from '../../systems/TerminalRenderer'
import { useStore } from '../../store/useStore'
import * as THREE from 'three'

export function TerminalNode({ position, label, level, nodeId, onNavigate }) {
    const meshRef = useRef()
    const groupRef = useRef()
    const [hovered, setHover] = useState(false)

    // Terminal state
    const terminalRef = useRef(null)
    const [texture, setTexture] = useState(null)

    const activeTerminalId = useStore(state => state.activeTerminalId)
    const setActiveTerminal = useStore(state => state.setActiveTerminal)
    const setTerminalFocus = useStore(state => state.setTerminalFocus)
    const isActive = activeTerminalId === nodeId

    // Initialize terminal for this node
    useEffect(() => {
        if (!terminalRef.current) {
            const term = new TerminalRenderer(512, 320)
            term.addLine(`[${label}]`, '#00ffff')
            term.addLine('Terminal ready.', '#00ff00')
            term.addLine('', '#ffffff')
            terminalRef.current = term
            setTexture(term.getTexture())
        }
    }, [label])

    // Cursor blink animation
    useFrame((state, delta) => {
        if (terminalRef.current) {
            terminalRef.current.updateCursor(delta)
        }

        // Make terminal face camera when active
        if (groupRef.current && isActive) {
            groupRef.current.lookAt(state.camera.position)
        }
    })

    // Keyboard handling when this terminal is active
    useEffect(() => {
        if (!isActive || !terminalRef.current) return

        setTerminalFocus(true)

        const handleKeyDown = (e) => {
            const terminal = terminalRef.current

            if (e.key === 'Escape') {
                e.preventDefault()
                setActiveTerminal(null)
                setTerminalFocus(false)
                return
            }

            if (e.key === 'Enter') {
                const input = terminal.getInput()
                if (input) {
                    terminal.addLine(`> ${input}`, '#00ff00')
                    terminal.addLine(`Executed: ${input}`, '#00aaaa')
                }
                return
            }

            if (e.key === 'Backspace') {
                terminal.backspace()
                return
            }

            if (e.key.length === 1) {
                terminal.addChar(e.key)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            setTerminalFocus(false)
        }
    }, [isActive, setActiveTerminal, setTerminalFocus])

    // Poincaré Scaling (from TechNode)
    const VISUAL_SCALE = 10
    const unitPos = position.clone().divideScalar(VISUAL_SCALE)
    const r = unitPos.length()
    const rClamped = Math.min(r, 0.99)
    const scaleFactor = (1 - rClamped * rClamped) * 1.5

    // Don't render if too small
    if (scaleFactor < 0.05) return null

    const color = level === 0 ? '#ffffff' :
        level === 1 ? '#00ffff' :
        level === 2 ? '#00ff00' : '#ff00ff'

    const handleClick = (e) => {
        e.stopPropagation()

        // Navigate to this node (hyperbolic movement)
        if (onNavigate) {
            onNavigate()
        }

        // Activate this terminal
        setActiveTerminal(nodeId)
    }

    return (
        <group position={position} scale={scaleFactor} ref={groupRef}>
            {/* Core sphere */}
            <mesh
                ref={meshRef}
                onClick={handleClick}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshBasicMaterial
                    color={hovered ? '#ffffff' : color}
                    transparent
                    opacity={isActive ? 1 : 0.6}
                />
            </mesh>

            {/* Wireframe halo */}
            <mesh>
                <sphereGeometry args={[0.4, 16, 16]} />
                <meshBasicMaterial
                    color={isActive ? '#ffffff' : color}
                    wireframe={true}
                    transparent
                    opacity={isActive ? 0.8 : 0.3}
                />
            </mesh>

            {/* Terminal screen - shows when reasonably visible */}
            {scaleFactor > 0.15 && texture && (
                <mesh position={[0, 0.9, 0]}>
                    <planeGeometry args={[1.6, 1.0]} />
                    <meshBasicMaterial
                        map={texture}
                        transparent
                        opacity={isActive ? 0.95 : 0.7}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}

            {/* Terminal border */}
            {scaleFactor > 0.15 && (
                <lineSegments position={[0, 0.9, 0]}>
                    <edgesGeometry args={[new THREE.BoxGeometry(1.65, 1.05, 0.02)]} />
                    <lineBasicMaterial color={isActive ? "#ffffff" : color} />
                </lineSegments>
            )}

            {/* Label */}
            {scaleFactor > 0.2 && (
                <Text
                    position={[0, 1.6, 0]}
                    fontSize={0.3}
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
