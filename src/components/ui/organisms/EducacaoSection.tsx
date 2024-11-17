import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/atoms';
import {IEducation} from "@/app/interfaces/IEducation";
import {GraduationCap} from "lucide-react";

interface EducacaoProps {
    educacao: Array<IEducation>;
    educacaoLoading: boolean;
}

export const EducacaoSection: React.FC<EducacaoProps> = ({ educacao, educacaoLoading }) => (
    <motion.section className="mb-20" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-[#ccd6f6]">Educação</h3>
        {educacaoLoading ? (
            <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-[#64ffda]"></div>
            </div>
        ) : (
            educacao.map(edu => (
                <motion.div key={edu._id.toString()} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Card className="backdrop-blur-lg bg-black bg-opacity-40 border-2 shadow-lg hover:shadow-xl transition-all duration-300 mt-4">
                        <CardHeader>
                            <CardTitle className="text-gray-900 dark:text-[#ccd6f6] flex items-center">
                                <GraduationCap className="mr-2 text-gray-700 dark:text-[#64ffda]" />
                                {edu.curso}
                            </CardTitle>
                            <CardDescription className="text-gray-600 dark:text-[#8892b0]">{edu.instituicao}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500 dark:text-[#8892b0] mb-2">{edu.periodo}</p>
                            <p className="text-gray-700 dark:text-[#a8b2d1]">{edu.descricao}</p>
                        </CardContent>
                    </Card>
                </motion.div>
            ))
        )}
    </motion.section>
);
