'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/atoms/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { IProjeto } from "@/app/interfaces/IProjeto"
import { useInView } from '@/app/hooks/ui/useInView'
import { FeatureCard } from '@/components/ui/molecules/FeatureCard'

interface PortfolioProps {
    projects: IProjeto[]
    projectsLoading: boolean
    currentProjectIndex: number
    prevProject: () => void
    nextProject: () => void
}

export const PortfolioSection: React.FC<PortfolioProps> = ({
                                                               projects,
                                                               projectsLoading,
                                                               currentProjectIndex,
                                                               prevProject,
                                                               nextProject,
                                                           }) => {
    const [ref, isInView] = useInView({ threshold: 0.1 })

    return (
        <motion.section
            ref={ref}
            className="min-h-screen flex flex-col justify-center items-center p-8 bg-gray-100 dark:bg-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">Portfólio</h2>
            {projectsLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-[#64ffda]"></div>
                </div>
            ) : (
                <div className="relative w-full max-w-6xl">
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(-${currentProjectIndex * 100}%)` }}
                        >
                            {projects.length > 0 ? (
                                projects.map((project, index) => (
                                    <motion.div
                                        key={project._id.toString()}
                                        className="w-full flex-shrink-0 px-4"
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <FeatureCard
                                            title={project.nome}
                                            subtitle={project.tecnologias.join(", ")}
                                            description={project.descricao}
                                            tags={project.titulos}
                                           // image={project.imagem} // Assuming you have an image field in your project data
                                            githubLink={project.linkGit}
                                            externalLink={project.linkAcesso}
                                            className="h-full"
                                        />
                                    </motion.div>
                                ))
                            ) : (
                                <div className="flex justify-center items-center text-gray-700 dark:text-white">
                                    <p>Nenhum projeto disponível no momento.</p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                    {projects.length > 1 && (
                        <>
                            <Button
                                onClick={prevProject}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full shadow-lg"
                                variant="ghost"
                                size="icon"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </Button>
                            <Button
                                onClick={nextProject}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full shadow-lg"
                                variant="ghost"
                                size="icon"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </Button>
                        </>
                    )}
                </div>
            )}
        </motion.section>
    )
}

