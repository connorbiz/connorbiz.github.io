import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { TerminalRenderer } from '../systems/TerminalRenderer'

export function useTerminal(width = 1024, height = 640) {
    // Use a ref to hold the singleton instance of the renderer
    const terminalRef = useRef(null)
    const [texture, setTexture] = useState(null)

    useEffect(() => {
        // Create renderer only once
        if (!terminalRef.current) {
            const term = new TerminalRenderer(width, height)
            term.showSystemStatus()
            terminalRef.current = term
            setTexture(term.getTexture())
        }

        // Cleanup (optional, but good practice)
        return () => {
            if (terminalRef.current) {
                // terminalRef.current.dispose() // If we had a dispose method
            }
        }
    }, [width, height])

    // Animation loop for cursor blink
    useFrame((state, delta) => {
        if (terminalRef.current) {
            terminalRef.current.updateCursor(delta)

            // CRITICAL: Check if texture needs update
            // We do this here to ensure it happens in the render loop
            const termTexture = terminalRef.current.getTexture()
            if (termTexture) {
                // We don't need to force it true every frame if the renderer handles it,
                // but doing so ensures we never miss a frame.
                // termTexture.needsUpdate = true 
            }
        }
    })

    return {
        terminal: terminalRef.current,
        texture
    }
}
