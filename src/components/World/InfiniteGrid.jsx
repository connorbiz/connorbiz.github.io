import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'

const GridMaterial = shaderMaterial(
    {
        gridSize: 100.0,
        gridDivisions: 50.0,
        gridColor: new THREE.Color(0x00ff00),
        gridColorCenter: new THREE.Color(0x00ffff),
        opacity: 0.6,
        fadeDistance: 100.0,
        fadeStrength: 1.0,
        playerPosition: new THREE.Vector3(0, 0, 0)
    },
    // Vertex Shader
    `
    varying vec3 worldPosition;
    varying vec3 vPosition;

    void main() {
        vPosition = position;
        worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // Fragment Shader
    `
    varying vec3 worldPosition;
    varying vec3 vPosition;

    uniform float gridSize;
    uniform float gridDivisions;
    uniform vec3 gridColor;
    uniform vec3 gridColorCenter;
    uniform float opacity;
    uniform float fadeDistance;
    uniform float fadeStrength;
    uniform vec3 playerPosition;

    float getGrid(float coord, float division) {
        float cell = division / gridSize;
        float grid = abs(fract(coord * cell - 0.5) - 0.5) / fwidth(coord * cell);
        return min(grid, 1.0);
    }

    void main() {
        // Calculate grid lines
        float x1 = getGrid(worldPosition.x, gridDivisions);
        float z1 = getGrid(worldPosition.z, gridDivisions);

        // Major grid lines (every 10 units)
        float majorDivisions = gridDivisions / 10.0;
        float x2 = getGrid(worldPosition.x, majorDivisions);
        float z2 = getGrid(worldPosition.z, majorDivisions);

        // Line thickness threshold - lower values mean ON a line
        float lineThreshold = 0.15;

        // Check if we're on a minor grid line
        float minorLine = 0.0;
        if (x1 < lineThreshold || z1 < lineThreshold) {
            minorLine = 1.0;
        }

        // Check if we're on a major grid line (brighter/thicker)
        float majorLine = 0.0;
        if (x2 < lineThreshold || z2 < lineThreshold) {
            majorLine = 1.0;
        }

        // Combine: major lines override minor lines
        float isOnLine = max(minorLine * 0.5, majorLine);

        // Discard if not on a line
        if (isOnLine < 0.01) discard;

        // Distance-based fade from world origin
        float dist = length(worldPosition.xz);
        float fadeFactor = 1.0 - smoothstep(fadeDistance * 0.5, fadeDistance, dist);

        // Distance from player (use xz plane distance)
        vec2 playerPosXZ = playerPosition.xz;
        vec2 worldPosXZ = worldPosition.xz;
        float distFromPlayer = length(worldPosXZ - playerPosXZ);

        // Player light influence - strong near player, fades at distance
        float playerInfluence = exp(-distFromPlayer * 0.05) * 1.5;

        // Combine world fade with player influence (player can override fade)
        float combinedFade = max(fadeFactor, playerInfluence);

        // Center glow effect (only on lines) - from world origin
        float centerDist = length(worldPosition.xz);
        float centerGlow = exp(-centerDist * 0.01) * 0.5;

        // Mix colors based on distance from center and player
        vec3 finalColor = mix(gridColor, gridColorCenter, max(centerGlow, playerInfluence * 0.3));

        // Apply opacity and fade
        float finalOpacity = isOnLine * opacity * combinedFade * fadeStrength;

        // Final discard check
        if (finalOpacity < 0.01) discard;

        gl_FragColor = vec4(finalColor, finalOpacity);
    }
  `
)

extend({ GridMaterial })

export function InfiniteGrid() {
    const materialRef = useRef()

    useFrame(({ camera }) => {
        if (materialRef.current) {
            materialRef.current.playerPosition.copy(camera.position)
        }
    })

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[2000, 2000, 1, 1]} />
            <gridMaterial
                ref={materialRef}
                transparent
                side={THREE.DoubleSide}
                depthWrite={false}
            />
        </mesh>
    )
}
