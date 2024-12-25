'use client'

import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Programmer() {
    // Reference for the computer screen to animate
    const screenRef = React.useRef()

    // Animation for the computer screen
    useFrame((state) => {
        if (screenRef.current) {
            screenRef.current.material.emissive.setRGB(
                0.1 + Math.sin(state.clock.elapsedTime) * 0.05,
                0.1 + Math.sin(state.clock.elapsedTime) * 0.05,
                0.2 + Math.sin(state.clock.elapsedTime) * 0.05
            )
        }
    })

    return (
        <group>
            {/* Desk */}
            <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <boxGeometry args={[2, 1, 0.1]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>

            {/* Computer base */}
            <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[0.5, 0.1, 0.3]} />
                <meshStandardMaterial color="#333333" />
            </mesh>

            {/* Computer screen */}
            <mesh position={[0, 0, 0]} ref={screenRef}>
                <boxGeometry args={[0.5, 0.3, 0.05]} />
                <meshStandardMaterial color="#222222" emissive="#4444ff" emissiveIntensity={0.5} />
            </mesh>

            {/* Programmer's body */}
            <mesh position={[0, -0.7, 0.4]}>
                <capsuleGeometry args={[0.2, 0.5, 8, 16]} />
                <meshStandardMaterial color="#4A90E2" />
            </mesh>

            {/* Programmer's head */}
            <mesh position={[0, 0.1, 0.4]}>
                <sphereGeometry args={[0.15, 32, 32]} />
                <meshStandardMaterial color="#FFD700" />
            </mesh>
        </group>
    )
}

export function HeroSection() {
    return (
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
            <Canvas className="absolute inset-0" camera={{ position: [0, 0, 5], fov: 50 }}>
                <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={0.8} />
                <Suspense fallback={null}>
                    <Programmer />
                </Suspense>
            </Canvas>
            <div className="relative z-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold mb-4"
                >
                    João Ito
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl"
                >
                    Desenvolvedor Full Stack & Entusiasta de Tecnologia
                </motion.p>
            </div>
        </div>
    )
}

