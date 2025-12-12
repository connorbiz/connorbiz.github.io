import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { BlogSpace } from './components/World/BlogSpace'
import { useStore } from './store/useStore'

function App() {
    const isTerminalFocused = useStore(state => state.isTerminalFocused)

    return (
        <Canvas camera={{ position: [0, 15, 0], fov: 60, up: [0, 0, -1] }}>
            {/* Clean paper background */}
            <color attach="background" args={['#F8F6F1']} />

            {/* Soft, even lighting from above */}
            <ambientLight intensity={1.0} color="#ffffff" />
            <directionalLight position={[0, 10, 0]} intensity={0.4} color="#ffffff" />

            {/* Blog World */}
            <BlogSpace />

            {/* Controls - Orbit around, looking down at the sphere */}
            {!isTerminalFocused && (
                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    rotateSpeed={0.5}
                    minDistance={8}
                    maxDistance={25}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 2.5}
                    target={[0, 0, 0]}
                />
            )}
        </Canvas>
    )
}

export default App
