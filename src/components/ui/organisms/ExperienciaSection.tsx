'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/atoms'
import { Briefcase } from 'lucide-react'
import { IExperience } from "@/app/interfaces/IExperiences"
import { useInView } from '@/app/hooks/ui/useInView'
import {FeatureCard} from "@/components/ui/molecules/FeatureCard";

interface ExperienciaProps {
    experiencias: Array<IExperience>
    experienciasLoading: boolean
}

export const ExperienciaSection: React.FC<ExperienciaProps> = ({ experiencias, experienciasLoading }) => {
    const [ref, isInView] = useInView({ threshold: 0.1 })

    return (
        <motion.section
            ref={ref}
            className="min-h-screen flex flex-col justify-center items-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-4xl font-semibold mb-12 text-gray-900 dark:text-[#ccd6f6]">Experiência</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
                {experienciasLoading ? (
                    <div className="col-span-2 flex justify-center items-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-[#64ffda]"></div>
                    </div>
                ) : (
                    experiencias.map((exp, index) => (
                        <motion.div
                            key={exp._id.toString()}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FeatureCard
                                title={exp.cargo}
                                subtitle={exp.periodo}
                                description={exp.descricao}
                                externalLink={exp.empresa}
                                className="h-full"
                            />
                        </motion.div>
                    ))
                )}
            </div>
        </motion.section>
    )
}

