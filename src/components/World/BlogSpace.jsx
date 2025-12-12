import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { mobiusAdd } from '../../math/hyperbolic'
import { BlogNode } from '../Objects/BlogNode'
import { blogPosts } from '../../data/blogPosts'
import { useStore } from '../../store/useStore'
import * as THREE from 'three'

// Generate H3 layout from blog posts based on their levels and connections
function generateBlogLayout(posts) {
    const nodes = []
    const links = []
    const positionMap = new Map()

    // Find root (level 0)
    const root = posts.find(p => p.level === 0) || posts[0]

    // Position root at origin
    positionMap.set(root.id, new THREE.Vector3(0, 0, 0))
    nodes.push({
        ...root,
        pos: new THREE.Vector3(0, 0, 0)
    })

    // Group posts by level
    const byLevel = {}
    posts.forEach(post => {
        if (!byLevel[post.level]) byLevel[post.level] = []
        byLevel[post.level].push(post)
    })

    // Layout each level
    const maxLevel = Math.max(...posts.map(p => p.level))

    for (let level = 1; level <= maxLevel; level++) {
        const levelPosts = byLevel[level] || []
        const count = levelPosts.length
        const stepDist = 0.35 + level * 0.08 // Increase distance per level

        // Fibonacci sphere distribution for even spacing
        const phi = Math.PI * (3 - Math.sqrt(5))

        levelPosts.forEach((post, i) => {
            // Find parent (connected node at lower level)
            let parentPos = new THREE.Vector3(0, 0, 0)

            // Look for a connection to a lower level
            const parentId = posts.find(p =>
                p.level < level && p.connections?.includes(post.id)
            )?.id

            if (parentId && positionMap.has(parentId)) {
                parentPos = positionMap.get(parentId)
            }

            // Generate position on sphere
            const t = i / Math.max(count - 1, 1)
            const y = 1 - t * 2
            const radius = Math.sqrt(1 - y * y)
            const theta = phi * i + level * 1.5 // Rotate each level

            const x = Math.cos(theta) * radius
            const z = Math.sin(theta) * radius

            // Local position
            const localPos = new THREE.Vector3(x, y, z).multiplyScalar(stepDist)

            // Transform to parent's frame via Mobius addition
            const globalPos = mobiusAdd(localPos, parentPos)

            positionMap.set(post.id, globalPos)
            nodes.push({
                ...post,
                pos: globalPos
            })
        })
    }

    // Generate links from connections
    posts.forEach(post => {
        post.connections?.forEach(targetId => {
            if (positionMap.has(targetId)) {
                links.push({ source: post.id, target: targetId })
            }
        })
    })

    return { nodes, links }
}

export function BlogSpace() {
    const { nodes, links } = useMemo(() => generateBlogLayout(blogPosts), [])

    const currentOrigin = useStore(state => state.currentOrigin || new THREE.Vector3(0, 0, 0))
    const setCurrentOrigin = useStore(state => state.setCurrentOrigin)
    const setCurrentNode = useStore(state => state.setCurrentNode)

    // Animation state
    const targetOrigin = useRef(new THREE.Vector3(0, 0, 0))
    const isAnimating = useRef(false)

    // Handle click: Navigate to node
    const handleNodeClick = (node) => {
        targetOrigin.current.copy(node.pos)
        isAnimating.current = true
        setCurrentNode(node)
    }

    // Animation Loop - smooth navigation
    useFrame((state, delta) => {
        if (isAnimating.current) {
            const step = delta * 3.0 // Smooth speed
            currentOrigin.lerp(targetOrigin.current, step)

            if (currentOrigin.distanceTo(targetOrigin.current) < 0.001) {
                currentOrigin.copy(targetOrigin.current)
                isAnimating.current = false
            }

            setCurrentOrigin(currentOrigin.clone())
        }
    })

    // Transform all positions relative to current origin
    const transformVector = currentOrigin.clone().negate()

    const transformedNodes = useMemo(() => {
        return nodes.map(node => {
            const transformedPos = mobiusAdd(node.pos, transformVector)
            return { ...node, transformedPos }
        })
    }, [nodes, currentOrigin])

    const VISUAL_SCALE = 10

    return (
        <group>
            {/* Subtle grid/reference sphere */}
            <mesh>
                <sphereGeometry args={[9.5, 32, 32]} />
                <meshBasicMaterial
                    color="#E8E4DF"
                    wireframe={true}
                    transparent
                    opacity={0.08}
                />
            </mesh>

            {/* Blog Nodes */}
            {transformedNodes.map(node => (
                <BlogNode
                    key={node.id}
                    nodeId={node.id}
                    position={node.transformedPos.clone().multiplyScalar(VISUAL_SCALE)}
                    title={node.title || node.label}
                    excerpt={node.excerpt || ''}
                    category={node.category}
                    onNavigate={() => handleNodeClick(node)}
                    isCenter={node.level === 0}
                />
            ))}

            {/* Connection lines - subtle */}
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
                        <lineBasicMaterial color="#D0CBC4" transparent opacity={0.25} />
                    </line>
                )
            })}
        </group>
    )
}
