import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/atoms';
import {Briefcase} from "lucide-react";
import {IExperience} from "@/app/interfaces/IExperiences";

interface ExperienciaProps {
    experiencias: Array<IExperience>;
    experienciasLoading: boolean;
}

export const ExperienciaSection: React.FC<ExperienciaProps> = ({ experiencias, experienciasLoading }) => (
    <motion.section className="mb-20" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-[#ccd6f6]">Experiência</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experienciasLoading ? (
                <div className="col-span-2 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-[#64ffda]"></div>
                </div>
            ) : (
                experiencias.map(exp => (
                    <motion.div key={exp._id.toString()} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                        <Card className="backdrop-blur-lg bg-black bg-opacity-40 border-2 shadow-lg hover:shadow-xl transition-all duration-300">
                            <CardHeader>
                                <CardTitle className="text-gray-900 dark:text-[#ccd6f6] flex items-center">
                                    <Briefcase className="mr-2 text-gray-700 dark:text-[#64ffda]" />
                                    {exp.cargo}
                                </CardTitle>
                                <CardDescription className="text-gray-600 dark:text-[#8892b0]">{exp.empresa}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500 dark:text-[#8892b0] mb-2">{exp.periodo}</p>
                                <p className="text-gray-700 dark:text-[#a8b2d1]">{exp.descricao}</p>
                                <div className="mt-4">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-[#64ffda]">Tecnologias:</p>
                                    <p className="text-gray-600 dark:text-[#a8b2d1]">{exp.tecnologias.join(", ")}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))
            )}
        </div>
    </motion.section>
);
