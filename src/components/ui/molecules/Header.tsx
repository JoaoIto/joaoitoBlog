import React, { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactTyped } from "react-typed"
import { IoLogoJavascript } from 'react-icons/io5'
import { SiMongodb, SiQuarkus, SiTypescript } from 'react-icons/si'
import { FaJava, FaReact } from 'react-icons/fa'
import { RiNextjsFill } from 'react-icons/ri'
import { DiNodejs } from 'react-icons/di'
import { ChevronDown, Github, Linkedin, Mail, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/atoms/button'

type StackIcon = {
    name: string;
    icon: React.ComponentType<{ size: number; className: string }>;
};
export const Header: React.FC = () => {
    const [theme, setTheme] = useState('dark')
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 500], [0, 250])

    const stackIcons: StackIcon[] = [
        { name: 'JavaScript', icon: IoLogoJavascript },
        { name: 'TypeScript', icon: SiTypescript },
        { name: 'Java', icon: FaJava },
        { name: 'Next.js', icon: RiNextjsFill },
        { name: 'React', icon: FaReact },
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'Node.js', icon: DiNodejs },
        { name: 'Quarkus', icon: SiQuarkus },
    ];

    return (
        <header className="relative h-screen flex items-center justify-center overflow-hidden">
            <motion.div
                className="absolute inset-0 z-0"
                style={{y}}
            />
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    className="text-4xl md:text-6xl font-bold mb-4 text-white dark:text-[#64ffda]"
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    <ReactTyped
                        strings={['JoaoIto', 'JoaoDevWorks']}
                        typeSpeed={100}
                        backSpeed={50}
                        loop
                    />
                </motion.div>
                <motion.div
                    className="text-xl md:text-2xl mb-6 text-gray-100 dark:text-[#ccd6f6]"
                    initial={{opacity: 0, y: -30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.2}}
                >
                    <ReactTyped
                        strings={['Sua solução completa em tecnologia!', 'Desenvolvendo o próximo nível da web!', 'Conectando criatividade e código!']}
                        typeSpeed={50}
                        backSpeed={30}
                        loop
                    />
                </motion.div>
                <motion.p
                    className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-200"
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.4}}
                >
                    Estou aqui para criar soluções inovadoras, utilizando as melhores tecnologias e práticas de desenvolvimento para transformar seu projeto em realidade!.
                </motion.p>
                <motion.div
                    className="flex justify-center space-x-6 mb-8"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.5, delay: 0.6}}
                >
                    <a
                        href="https://github.com/JoaoIto"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#64ffda] transition-colors duration-300"
                    >
                        <Github size={24}/>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/jo%C3%A3o-victor-p%C3%B3voa-fran%C3%A7a-97502420b/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#64ffda] transition-colors duration-300"
                    >
                        <Linkedin size={24}/>
                    </a>
                    <a
                        href="mailto:joaovictorpfr@gmail.com"
                        className="text-white hover:text-[#64ffda] transition-colors duration-300"
                    >
                        <Mail size={24}/>
                    </a>
                </motion.div>
                <motion.div
                    className="flex flex-wrap justify-center items-center gap-4"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.5, delay: 0.8}}
                >
                    {stackIcons.map((icon, index) => (
                        <motion.div
                            key={icon.name}
                            className="w-12 h-12 md:w-16 md:h-16 flex justify-center items-center border-2 rounded-full shadow-lg"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                        >
                            {/* Passando o ícone com as propriedades corretas */}
                            <icon.icon size={32} className="text-gray-700 dark:text-[#64ffda]" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                animate={{y: [0, 10, 0]}}
                transition={{repeat: Infinity, duration: 1.5}}
            >
                <ChevronDown className="text-white dark:text-[#64ffda] w-8 h-8"/>
            </motion.div>
            <Button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white"
                variant="ghost"
            >
                {theme === 'dark' ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
            </Button>
        </header>
    )
}
