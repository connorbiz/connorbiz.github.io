import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { BlogSpace } from './components/World/BlogSpace'
import { useStore } from './store/useStore'

function App() {
    const isTerminalFocused = useStore(state => state.isTerminalFocused)

    return (
        <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
            {/* Clean paper background */}
            <color attach="background" args={['#F8F6F1']} />

            {/* Soft, even lighting */}
            <ambientLight intensity={0.9} color="#ffffff" />
            <directionalLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
            <directionalLight position={[-5, -5, -5]} intensity={0.2} color="#E8E4DF" />

            {/* Blog World */}
            <BlogSpace />

            {/* Controls - Orbit only, no zoom/pan, just rotation */}
            {!isTerminalFocused && (
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    rotateSpeed={0.5}
                    target={[0, 0, 0]}
                />
            )}
        </Canvas>
    )
}

export default App
