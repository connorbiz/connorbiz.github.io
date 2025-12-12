import { useMemo, useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
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
        const stepDist = 0.35 + level * 0.08

        const phi = Math.PI * (3 - Math.sqrt(5))

        levelPosts.forEach((post, i) => {
            let parentPos = new THREE.Vector3(0, 0, 0)

            const parentId = posts.find(p =>
                p.level < level && p.connections?.includes(post.id)
            )?.id

            if (parentId && positionMap.has(parentId)) {
                parentPos = positionMap.get(parentId)
            }

            const t = i / Math.max(count - 1, 1)
            const y = 1 - t * 2
            const radius = Math.sqrt(1 - y * y)
            const theta = phi * i + level * 1.5

            const x = Math.cos(theta) * radius
            const z = Math.sin(theta) * radius

            const localPos = new THREE.Vector3(x, y, z).multiplyScalar(stepDist)
            const globalPos = mobiusAdd(localPos, parentPos)

            positionMap.set(post.id, globalPos)
            nodes.push({
                ...post,
                pos: globalPos
            })
        })
    }

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
    const { camera } = useThree()

    const currentOrigin = useStore(state => state.currentOrigin || new THREE.Vector3(0, 0, 0))
    const setCurrentOrigin = useStore(state => state.setCurrentOrigin)
    const setCurrentNode = useStore(state => state.setCurrentNode)
    const setCameraAnimating = useStore(state => state.setCameraAnimating)
    const setShowArticle = useStore(state => state.setShowArticle)
    const setActiveTerminal = useStore(state => state.setActiveTerminal)

    // Animation state
    const targetOrigin = useRef(new THREE.Vector3(0, 0, 0))
    const isAnimating = useRef(false)
    const targetCameraY = useRef(15)
    const animationProgress = useRef(0)

    // Handle click: Navigate to node with cinematic camera
    const handleNodeClick = (node) => {
        targetOrigin.current.copy(node.pos)
        isAnimating.current = true
        animationProgress.current = 0

        // Hide article during transition
        setShowArticle(false)
        setCameraAnimating(true)
        setCurrentNode(node)
        setActiveTerminal(node.id)

        // Zoom camera closer during animation
        targetCameraY.current = 8
    }

    // Animation Loop - cinematic camera movement
    useFrame((state, delta) => {
        if (isAnimating.current) {
            animationProgress.current += delta

            // Smooth hyperbolic space navigation
            const navSpeed = delta * 2.5
            currentOrigin.lerp(targetOrigin.current, navSpeed)

            // Cinematic camera swoop
            const camSpeed = delta * 3.0
            camera.position.y += (targetCameraY.current - camera.position.y) * camSpeed

            // Check if animation is complete
            const distanceToTarget = currentOrigin.distanceTo(targetOrigin.current)
            const cameraArrived = Math.abs(camera.position.y - targetCameraY.current) < 0.1

            if (distanceToTarget < 0.01 && cameraArrived) {
                currentOrigin.copy(targetOrigin.current)
                isAnimating.current = false

                // Camera arrived - show article with slight delay for drama
                setCameraAnimating(false)
                setTimeout(() => {
                    setShowArticle(true)
                }, 200)

                // Ease camera back out slightly
                targetCameraY.current = 12
            }

            setCurrentOrigin(currentOrigin.clone())
        } else {
            // Gentle camera drift back to default height when not animating
            const driftSpeed = delta * 1.5
            camera.position.y += (targetCameraY.current - camera.position.y) * driftSpeed
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
                    opacity={0.06}
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
                        <lineBasicMaterial color="#D0CBC4" transparent opacity={0.2} />
                    </line>
                )
            })}
        </group>
    )
}
