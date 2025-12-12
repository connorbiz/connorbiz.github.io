import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Hud, OrthographicCamera } from '@react-three/drei'
import { useTerminal } from '../../hooks/useTerminal'
import { useStore } from '../../store/useStore'
import { useCommandSystem } from '../../hooks/useCommandSystem'
import * as THREE from 'three'

export function TabletHUD() {
    // 1. Init Terminal Hook
    const { terminal, texture } = useTerminal(1024, 640)

    // 2. Global State
    const currentNode = useStore(state => state.currentNode)
    const isFocused = useStore(state => state.isTerminalFocused)
    const setFocus = useStore(state => state.setTerminalFocus)

    // 3. Command System
    const { execute } = useCommandSystem()

    // 4. Refs
    const meshRef = useRef()

    // 5. Input Handling
    useEffect(() => {
        if (!terminal) return

        const handleKeyDown = (e) => {
            // ESC: Unlock
            if (e.key === 'Escape') {
                setFocus(false)
                terminal.addLine('> CONTROLS UNLOCKED.', '#aaaaaa')
                return
            }

            // ENTER: Lock / Execute
            if (e.key === 'Enter') {
                if (!isFocused) {
                    setFocus(true)
                    terminal.addLine('> TERMINAL LOCKED. INPUT ACTIVE.', '#00ff00')
                } else {
                    // Execute command
                    const input = terminal.getInput()
                    if (input) {
                        terminal.addLine(`> ${input}`, '#00ff00')
                        execute(input, terminal)
                    } else {
                        terminal.addLine('>', '#00ff00')
                    }
                }
                return
            }

            // Typing (only if focused)
            if (isFocused) {
                if (e.key === 'Backspace') {
                    terminal.backspace()
                } else if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
                    terminal.addChar(e.key)
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [terminal, execute, isFocused, setFocus])

    // 6. Context Awareness (Node Inspection vs Walkthrough)
    useEffect(() => {
        if (!terminal) return

        terminal.clearContent()

        if (currentNode) {
            // Node Inspection Mode
            terminal.addLine(`CONNECTED TO: ${currentNode.label}`, '#00ff00')
            terminal.addLine(`ID: ${currentNode.id}`, '#00aaaa')
            terminal.addLine(`DEPTH: ${currentNode.level}`, '#00aaaa')
            terminal.addLine('----------------------------------------', '#00ffff')
            terminal.addLine('FILESYSTEM MOUNTED.', '#00ff00')
            terminal.addLine('> ls -la', '#ffff00')

            // Mock listing
            terminal.addLine('drwxr-xr-x  .config', '#aaaaaa')
            terminal.addLine('drwxr-xr-x  data', '#aaaaaa')
            terminal.addLine(`-rw-r--r--  manifest_${currentNode.id}.dat`, '#00ffff')
            terminal.addLine(`-rwx------  protocol.exe`, '#ff00ff')
            terminal.addLine(' ', '#ffffff')
            terminal.addLine('> ', '#00ff00')
        } else {
            // Default Walkthrough Mode
            terminal.addLine('PROJECT WALKTHROUGH', '#ffff00')
            terminal.addLine('-------------------', '#00ffff')

            const walkthrough = [
                "1. H3 LAYOUT: Spanning tree on hyperbolic sphere.",
                "   Objects shrink towards infinity.",
                " ",
                "2. NAVIGATION: CLICK a node to travel there.",
                "   OR type 'ssh <node-id>'",
                " ",
                "3. CYBERDECK: Type 'ls' to see files.",
                "   Type 'help' for more commands.",
                " ",
                "CONTROLS: WASD to Fly | Click to Travel",
                "          ENTER to Lock Terminal | ESC to Unlock"
            ]

            walkthrough.forEach(line => terminal.addLine(line, '#ffffff'))
            terminal.addLine(' ', '#ffffff')
            terminal.addLine('> READY.', '#00ff00')
        }
    }, [currentNode, terminal])

    // 7. Manual Mesh Creation for Screen
    useEffect(() => {
        if (!meshRef.current || !texture) return

        // Create screen mesh manually
        const geometry = new THREE.PlaneGeometry(1.8, 1.1)
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide
        })
        const screenMesh = new THREE.Mesh(geometry, material)
        screenMesh.position.set(0, 0, 0)
        screenMesh.name = 'terminal_screen'

        // Add to group
        const group = meshRef.current
        group.add(screenMesh)

        return () => {
            // Cleanup
            group.remove(screenMesh)
            geometry.dispose()
            material.dispose()
        }
    }, [texture]) // Re-create if texture object changes (which happens once)

    // 8. Animation Loop
    useFrame((state) => {
        if (meshRef.current) {
            const t = state.clock.getElapsedTime()
            meshRef.current.position.y = -0.5 + Math.sin(t * 0.5) * 0.02
            meshRef.current.rotation.z = Math.sin(t * 0.25) * 0.01

            // Find our manual mesh and force update
            const screen = meshRef.current.getObjectByName('terminal_screen')
            if (screen && screen.material.map) {
                screen.material.map.needsUpdate = true
            }
        }
    })

    return (
        <Hud renderPriority={1}>
            <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={1} />

            <group position={[0, -0.5, 0]} ref={meshRef}>
                {/* Screen is added manually via useEffect */}

                {/* Frame */}
                <mesh position={[0, 0, -0.01]}>
                    <planeGeometry args={[1.9, 1.2]} />
                    <meshBasicMaterial color="#111111" />
                </mesh>

                {/* Border */}
                <lineSegments position={[0, 0, 0.01]}>
                    <edgesGeometry args={[new THREE.PlaneGeometry(1.9, 1.2)]} />
                    <lineBasicMaterial color="#004444" linewidth={2} />
                </lineSegments>
            </group>
        </Hud>
    )
}
