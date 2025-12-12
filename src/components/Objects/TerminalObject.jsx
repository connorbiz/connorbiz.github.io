import { useEffect, useState } from 'react'
import { useTerminal } from '../../hooks/useTerminal'
import { useStore } from '../../store/useStore'
import * as THREE from 'three'

export function TerminalObject({ position, rotation, id, label }) {
    const { terminal, texture } = useTerminal()
    const activeTerminalId = useStore(state => state.activeTerminalId)
    const setActiveTerminal = useStore(state => state.setActiveTerminal)
    const isActive = activeTerminalId === id

    useEffect(() => {
        if (!isActive || !terminal) return

        const handleKeyDown = (e) => {
            if (e.key === 'Tab' || e.key === 'Escape') {
                e.preventDefault()
                setActiveTerminal(null)
                return
            }

            if (e.key === 'Enter') {
                const input = terminal.getInput()
                // Process command here or inside terminal class
                if (input) {
                    terminal.addLine(`> ${input}`, '#00ff00')
                    // Simple echo for now, can expand to full command system
                    terminal.addLine(`Command processed: ${input}`, '#00aaaa')
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
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isActive, terminal, setActiveTerminal])

    const handleClick = (e) => {
        e.stopPropagation()
        setActiveTerminal(id)
    }

    return (
        <group position={position} rotation={rotation}>
            {/* Screen */}
            <mesh onClick={handleClick}>
                <planeGeometry args={[1.6, 1.0]} />
                <meshBasicMaterial
                    map={texture}
                    transparent
                    opacity={0.95}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Border */}
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(1.65, 1.05, 0.05)]} />
                <lineBasicMaterial color={isActive ? "#ffffff" : "#00ffff"} linewidth={2} />
            </lineSegments>
        </group>
    )
}
