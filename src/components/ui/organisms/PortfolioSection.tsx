import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/atoms';
import {Button} from "@/components/ui/atoms/button";
import {ExternalLink, Github} from "lucide-react";
import {IProjeto} from "@/app/interfaces/IProjeto";

interface PortfolioProps {
    projects: IProjeto[];
    projectsLoading: boolean;
    currentProjectIndex: number;
    prevProject: () => void;
    nextProject: () => void;
}

export const PortfolioSection: React.FC<PortfolioProps> = ({
                                                               projects,
                                                               projectsLoading,
                                                               currentProjectIndex,
                                                               prevProject,
                                                               nextProject,
                                                           }) => (
    <motion.section className="mb-20" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-[#ccd6f6]">Portfólio</h2>
        {projectsLoading ? (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-[#64ffda]"></div>
            </div>
        ) : (
            <div className="relative">
                <div className="overflow-hidden">
                    <motion.div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${currentProjectIndex * 100}%)` }}
                    >
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <div key={project._id.toString()} className="w-full flex-shrink-0 px-4">
                                    <Card className="backdrop-blur-lg bg-black bg-opacity-40 border-2 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                        <CardHeader>
                                            <CardTitle className="text-gray-900 dark:text-[#ccd6f6] flex items-center justify-between">
                                                {project.nome}
                                                {project.titulos && project.titulos.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.titulos.map((titulo, index) => (
                                                            <span
                                                                key={index}
                                                                className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                                                            >
                                {titulo}
                              </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </CardTitle>
                                            <CardDescription className="text-gray-600 dark:text-[#8892b0]">
                                                {project.tecnologias.join(", ")}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <p className="mb-4 text-gray-700 dark:text-[#a8b2d1]">{project.descricao}</p>
                                            <div className="flex space-x-4 mt-auto">
                                                {project.linkGit && (
                                                    <Button variant="outline" size="sm" asChild className="text-gray-700 dark:text-[#64ffda] backdrop-blur-lg bg-black bg-opacity-40 border-2">
                                                        <a href={project.linkGit} target="_blank" rel="noopener noreferrer">
                                                            <Github className="mr-2 h-4 w-4" />
                                                            GitHub
                                                        </a>
                                                    </Button>
                                                )}
                                                {project.linkAcesso && (
                                                    <Button variant="outline" size="sm" asChild className="text-gray-700 dark:text-[#64ffda] backdrop-blur-lg bg-black bg-opacity-40 border-2">
                                                        <a href={project.linkAcesso} target="_blank" rel="noopener noreferrer">
                                                            <ExternalLink className="mr-2 h-4 w-4" />
                                                            Acesso
                                                        </a>
                                                    </Button>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center items-center text-gray-700 dark:text-[#64ffda]">
                                <p>Nenhum projeto disponível no momento.</p>
                            </div>
                        )}
                    </motion.div>
                </div>
                {/* Controles de navegação */}
                {projects.length > 1 && (
                    <div className="absolute inset-0 flex justify-between items-center">
                        <button
                            onClick={prevProject}
                            className="text-gray-700 dark:text-[#64ffda] p-2 bg-white dark:bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
                        >
                            &lt;
                        </button>
                        <button
                            onClick={nextProject}
                            className="text-gray-700 dark:text-[#64ffda] p-2 bg-white dark:bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
                        >
                            &gt;
                        </button>
                    </div>
                )}
            </div>
        )}
    </motion.section>
);
