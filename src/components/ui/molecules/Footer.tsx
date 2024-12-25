import { Github, Linkedin, Mail } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">&copy; 2024 João Ito. Todos os direitos reservados.</p>
                <div className="flex space-x-6">
                    <a
                        href="https://github.com/JoaoIto"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-300"
                    >
                        <Github />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/jo%C3%A3o-victor-p%C3%B3voa-fran%C3%A7a-97502420b/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-300"
                    >
                        <Linkedin />
                    </a>
                    <a
                        href="mailto:joaovictorpfr@gmail.com"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-300"
                    >
                        <Mail />
                    </a>
                </div>
            </div>
        </footer>
    )
}

