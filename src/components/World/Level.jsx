import { TerminalObject } from '../Objects/TerminalObject'
import { TechTree } from './TechTree'

export function Level() {
    return (
        <group>
            {/* The Hyperbolic Tech Tree */}
            <TechTree />

            {/* Floating Terminal near spawn (Localhost) */}
            <TerminalObject
                id="local_term"
                label="LOCALHOST_TERMINAL"
                position={[0, 0, -2]}
                rotation={[-Math.PI / 6, 0, 0]}
            />
        </group>
    )
}
