'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '@/app/hooks/ui/useInView'

const softSkills = [
    'Communication',
    'Teamwork',
    'Problem-solving',
    'Adaptability',
    'Creativity',
    'Time management',
    'Leadership',
    'Critical thinking'
]

const hardSkills = [
    { name: 'React.js', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'JavaScript', icon: '🟨' },
    { name: 'Node.js', icon: '🟩' },
    { name: 'Nest.js', icon: '🐈' },
    { name: 'Java', icon: '☕' },
    { name: 'Quarkus', icon: '🔥' }
]

const SkillCard = ({ skill, isHardSkill = false }) => {
    return (
        <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {isHardSkill && <span className="text-4xl mb-2">{skill.icon}</span>}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {isHardSkill ? skill.name : skill}
            </h3>
        </motion.div>
    )
}

export function SkillsSection() {
    const [ref, isInView] = useInView({ threshold: 0.1 })

    return (
        <motion.section
            ref={ref}
            className="py-16 bg-gray-100 dark:bg-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
                    My Skills
                </h2>

                <div className="mb-16">
                    <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
                        Hard Skills
                    </h3>
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-6"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        {hardSkills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                variants={{
                                    hidden: { y: 20, opacity: 0 },
                                    show: { y: 0, opacity: 1 }
                                }}
                            >
                                <SkillCard skill={skill} isHardSkill={true} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
                        Soft Skills
                    </h3>
                    <motion.div
                        className="flex flex-wrap justify-center gap-4"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.05
                                }
                            }
                        }}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                    >
                        {softSkills.map((skill, index) => (
                            <motion.div
                                key={skill}
                                variants={{
                                    hidden: { scale: 0.8, opacity: 0 },
                                    show: { scale: 1, opacity: 1 }
                                }}
                            >
                                <SkillCard skill={skill} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.section>
    )
}

