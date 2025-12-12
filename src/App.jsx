import { Canvas } from '@react-three/fiber'
import { Stats, FlyControls } from '@react-three/drei'
import { HyperbolicSpace } from './components/World/HyperbolicSpace'
import { Level } from './components/World/Level'
import { TabletHUD } from './components/UI/TabletHUD'
import { useStore } from './store/useStore'

function App() {
    const isTerminalFocused = useStore(state => state.isTerminalFocused)

    return (
        <Canvas camera={{ position: [0, 0, 0.1], fov: 90 }}>
            <color attach="background" args={['#000000']} />

            {/* Lighting */}
            <ambientLight intensity={0.5} color="#00ff00" />
            <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" distance={20} />

            {/* World */}
            <HyperbolicSpace />
            <Level />

            {/* UI Overlay */}
            <TabletHUD />

            {/* Controls - FlyControls for free navigation inside the sphere */}
            {/* Disable controls when terminal is focused */}
            {!isTerminalFocused && (
                <FlyControls movementSpeed={2} rollSpeed={0.5} dragToLook={true} />
            )}

            <Stats />
        </Canvas>
    )
}

export default App
