'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Home, User, Briefcase, FileText, Mail } from 'lucide-react'

export function FloatingNav() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)

        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    return (
        <motion.nav
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full shadow-lg z-50"
        >
            <ul className="flex items-center justify-around p-2 space-x-4">
                <li>
                    <a href="#home" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                        <Home size={24} />
                    </a>
                </li>
                <li>
                    <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                        <User size={24} />
                    </a>
                </li>
                <li>
                    <a href="#portfolio" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                        <Briefcase size={24} />
                    </a>
                </li>
                <li>
                    <a href="#blog" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                        <FileText size={24} />
                    </a>
                </li>
                <li>
                    <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                        <Mail size={24} />
                    </a>
                </li>
            </ul>
        </motion.nav>
    )
}

