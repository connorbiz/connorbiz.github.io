import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { generateH3Layout, mobiusAdd } from '../../math/hyperbolic'
import { TechNode } from '../Objects/TechNode'
import { useStore } from '../../store/useStore'
import * as THREE from 'three'

export function TechTree() {
    const { nodes, links } = useMemo(() => generateH3Layout(4, 3), [])
    const setTreeData = useStore(state => state.setTreeData)

    // Sync tree data to store once
    useMemo(() => {
        setTreeData({ nodes, links })
    }, [nodes, links, setTreeData])

    const currentOrigin = useStore(state => state.currentOrigin || new THREE.Vector3(0, 0, 0))
    const setCurrentOrigin = useStore(state => state.setCurrentOrigin)
    const setCurrentNode = useStore(state => state.setCurrentNode)

    // Animation state
    const targetOrigin = useRef(new THREE.Vector3(0, 0, 0))
    const isAnimating = useRef(false)

    // Handle click: Set new target and inspect node
    const handleNodeClick = (node) => {
        // We want to move TO this node.
        // So this node's global position becomes the new currentOrigin.
        targetOrigin.current.copy(node.pos)
        isAnimating.current = true

        // Update HUD
        setCurrentNode(node)
    }

    // Animation Loop
    useFrame((state, delta) => {
        if (isAnimating.current) {
            // Lerp currentOrigin towards targetOrigin
            // Note: Linear lerp is not strictly hyperbolic correct but works for smooth visual transition
            // A better way is to lerp the "distance" or use a hyperbolic interpolation

            const step = delta * 2.0 // Speed
            currentOrigin.lerp(targetOrigin.current, step)

            if (currentOrigin.distanceTo(targetOrigin.current) < 0.001) {
                currentOrigin.copy(targetOrigin.current)
                isAnimating.current = false
            }

            // Force update store to trigger re-render (or we could use a ref for performance if it lags)
            // But we need React to re-render the node positions.
            // Actually, updating the store every frame is bad for React performance.
            // Better to do the transformation in the Shader or manually update refs.
            // For now, let's try the "React way" and see if it holds up. 
            // If it lags, we'll switch to instanced mesh + useFrame ref updates.
            setCurrentOrigin(currentOrigin.clone())
        }
    })

    // Calculate Transformed Positions for Rendering
    // We need to move the world so 'currentOrigin' is at (0,0,0).
    // This means applying T_{-currentOrigin} to all nodes.
    const transformVector = currentOrigin.clone().negate()

    // Memoize transformed nodes to avoid recalculating if origin hasn't changed
    const transformedNodes = useMemo(() => {
        return nodes.map(node => {
            // Apply Mobius transformation
            const transformedPos = mobiusAdd(node.pos, transformVector)
            return { ...node, transformedPos }
        })
    }, [nodes, currentOrigin]) // Re-calc when origin changes (which is every frame during animation... hmm)

    // Scale factor for visualization
    const VISUAL_SCALE = 10

    return (
        <group>
            {/* Nodes */}
            {transformedNodes.map(node => (
                <TechNode
                    key={node.id}
                    position={node.transformedPos.clone().multiplyScalar(VISUAL_SCALE)}
                    label={node.label}
                    level={node.level}
                    onClick={() => handleNodeClick(node)} // Pass full node object
                />
            ))}

            {/* Links */}
            {links.map((link, i) => {
                const sourceNode = transformedNodes.find(n => n.id === link.source)
                const targetNode = transformedNodes.find(n => n.id === link.target)

                if (!sourceNode || !targetNode) return null

                const start = sourceNode.transformedPos.clone().multiplyScalar(VISUAL_SCALE)
                const end = targetNode.transformedPos.clone().multiplyScalar(VISUAL_SCALE)

                const points = [start, end]
                const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

                return (
                    <line key={i} geometry={lineGeometry}>
                        <lineBasicMaterial color="#004444" transparent opacity={0.3} />
                    </line>
                )
            })}
        </group>
    )
}
