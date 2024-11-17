import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/atoms';
import {Code, Globe} from "lucide-react";

export const SkillsSection: React.FC = () => {
    return (
        <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-[#ccd6f6]">Habilidades</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="backdrop-blur-lg bg-black bg-opacity-40 border-2 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                        <CardTitle className="text-gray-900 dark:text-[#ccd6f6] flex items-center">
                            <Code className="mr-2 text-gray-700 dark:text-[#64ffda]" />
                            Desenvolvimento Frontend
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside text-gray-700 dark:text-[#a8b2d1]">
                            <li>React.js</li>
                            <li>Next.js</li>
                            <li>TypeScript</li>
                            <li>Tailwind CSS</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card className="backdrop-blur-lg bg-black bg-opacity-40 border-2 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                        <CardTitle className="text-gray-900 dark:text-[#ccd6f6] flex items-center">
                            <Globe className="mr-2 text-gray-700 dark:text-[#64ffda]" />
                            Desenvolvimento Backend
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside text-gray-700 dark:text-[#a8b2d1]">
                            <li>Node.js</li>
                            <li>Nest.js</li>
                            <li>Express.js</li>
                            <li>Quarkus Java</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </motion.section>
    );
};
