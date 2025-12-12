import { useRef, useEffect, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../../store/useStore'

const SPEED = 5.0
const KEYS = {
    KeyW: 'forward',
    KeyS: 'backward',
    KeyA: 'left',
    KeyD: 'right',
    ArrowUp: 'forward',
    ArrowDown: 'backward',
    ArrowLeft: 'left',
    ArrowRight: 'right',
}

export function Player() {
    const { camera } = useThree()
    const [movement, setMovement] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
    })

    const terminalActive = useStore((state) => state.terminalActive)
    const controlsRef = useRef()

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (terminalActive) return
            if (KEYS[e.code]) {
                setMovement((m) => ({ ...m, [KEYS[e.code]]: true }))
            }
        }

        const handleKeyUp = (e) => {
            if (KEYS[e.code]) {
                setMovement((m) => ({ ...m, [KEYS[e.code]]: false }))
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [terminalActive])

    useFrame((state, delta) => {
        if (terminalActive) return

        const { forward, backward, left, right } = movement

        const velocity = new THREE.Vector3()
        const direction = new THREE.Vector3()

        direction.z = Number(forward) - Number(backward)
        direction.x = Number(left) - Number(right)
        direction.normalize() // this ensures consistent movements in all directions

        if (forward || backward) velocity.z -= direction.z * SPEED * delta
        if (left || right) velocity.x -= direction.x * SPEED * delta

        controlsRef.current.moveRight(-velocity.x)
        controlsRef.current.moveForward(-velocity.z)
    })

    return (
        <>
            <PointerLockControls ref={controlsRef} />
            <pointLight position={camera.position} intensity={3.0} distance={30} color="#00ffff" />
        </>
    )
}
