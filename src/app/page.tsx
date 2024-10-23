'use client'

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, useAnimation } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, ExternalLink, Briefcase, GraduationCap, ChevronDown, Code, Globe, Sun, Moon } from "lucide-react"
import { useArticles } from "./hooks/articles/useArticles"
import { useProjects } from "./hooks/projects/useProjects"
import { FaReact, FaJava } from "react-icons/fa"
import { RiNextjsFill } from "react-icons/ri"
import { SiTypescript, SiMongodb, SiQuarkus } from "react-icons/si"
import { IoLogoJavascript } from "react-icons/io5"
import { DiNodejs } from "react-icons/di"
import React from "react"
import { useExperiencias } from "./hooks/experiences/useExperiences"
import { useEducacao } from "./hooks/education/useEducation"
import { ReactTyped } from "react-typed"
import { useTheme } from "next-themes"

const contactFormSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Endereço de email inválido"),
  mensagem: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),
})

const stackIcons = [
  { name: "JavaScript", icon: <IoLogoJavascript /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Java", icon: <FaJava /> },
  { name: "Next.js", icon: <RiNextjsFill /> },
  { name: "React", icon: <FaReact /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "Node.js", icon: <DiNodejs /> },
  { name: "Quarkus", icon: <SiQuarkus /> },
]

export default function Portfolio() {
  const [searchTerm, setSearchTerm] = useState("")
  const { articles, loading: articlesLoading } = useArticles(searchTerm)
  const { projects, loading: projectsLoading } = useProjects()
  const { experiencias, loading: experienciasLoading } = useExperiencias()
  const { educacao, loading: educacaoLoading } = useEducacao()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 250])
  const controls = useAnimation()
  const { theme, setTheme } = useTheme()
  
  const { handleSubmit, register, formState: { errors } } = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema)
  })

  const onSubmit = async (data: z.infer<typeof contactFormSchema>) => {
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
  
      if (response.ok) {
        alert("Email enviado com sucesso!")
      } else {
        alert("Erro ao enviar o email.")
      }
    } catch (error) {
      console.error("Erro ao enviar email:", error)
      alert("Erro ao enviar o email.")
    }
  }

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }))
  }, [controls])

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a192f] text-gray-900 dark:text-[#8892b0] transition-colors duration-300">
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            y,
          }}
        />
        <div className="relative z-10 text-center px-4">
          <motion.div
            className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-[#64ffda]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ReactTyped 
              strings={['João Ito', 'João Victor', 'João Victor Póvoa França']}
              typeSpeed={100}
              backSpeed={50}
              loop
            />
          </motion.div>
          <motion.div
            className="text-xl md:text-2xl mb-6 text-gray-700 dark:text-[#ccd6f6]"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ReactTyped 
              strings={['Desenvolvedor Full Stack', 'Desenvolvedor Web', 'Software Engineer']}
              typeSpeed={50}
              backSpeed={30}
              loop
            />
          </motion.div>
          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-600 dark:text-[#8892b0]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Criando soluções web robustas com Next.js, Node.js e Java.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {stackIcons.map((icon, index) => (
              <motion.div
                key={icon.name}
                className="w-12 h-12 md:w-16 md:h-16 flex justify-center items-center bg-gray-200 dark:bg-[#112240] rounded-full"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 2,
                }}
              >
                {React.cloneElement(icon.icon, { size: 32, className: "text-gray-700 dark:text-[#64ffda]" })}
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="text-gray-700 dark:text-[#64ffda] w-8 h-8" />
        </motion.div>
        <Button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="absolute top-4 right-4 bg-gray-200 dark:bg-[#112240] text-gray-700 dark:text-[#64ffda]"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          custom={0}
        >
          <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-[#ccd6f6]">
            Experiência & Educação
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experienciasLoading ? (
              <div className="col-span-2 flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-[#64ffda]"></div>
              </div>
            ) : (
              experiencias.map((exp) => (
                <motion.div key={exp._id.toString()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card className="bg-white dark:bg-[#112240] border-gray-200 dark:border-[#233554] hover:shadow-lg hover:shadow-gray-300 dark:hover:shadow-[#64ffda]/20 transition-all duration-300">
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
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-[#ccd6f6]">Educação</h3>
            {educacaoLoading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-[#64ffda]"></div>
              </div>
            ) : (
              educacao.map((edu) => (
                <motion.div key={edu._id.toString()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card className="bg-white dark:bg-[#112240] border-gray-200 dark:border-[#233554] hover:shadow-lg hover:shadow-gray-300 dark:hover:shadow-[#64ffda]/20 transition-all duration-300 mt-4">
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
          </div>
        </motion.section>

        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          custom={1}
        >
          <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-[#ccd6f6]">
            Portfólio
          </h2>
          {projectsLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-[#64ffda]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects && projects.length > 0 ? (
                projects.map((project, index) => (
                  <motion.div
                    key={project._id.toString()}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card className="bg-white dark:bg-[#112240] border-gray-200 dark:border-[#233554] h-full flex flex-col hover:shadow-lg hover:shadow-gray-300 dark:hover:shadow-[#64ffda]/20 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="text-gray-900 dark:text-[#ccd6f6]">
                          {project.nome}
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-[#8892b0]">
                          {project.tecnologias.join(", ")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="mb-4 text-gray-700 dark:text-[#a8b2d1]">{project.descricao}</p>
                        <div className="flex space-x-4 mt-auto">
                          {project.linkGit && (
                            <Button variant="outline" size="sm" asChild className="text-gray-700 dark:text-[#64ffda] hover:bg-gray-100 dark:hover:bg-[#233554]">
                              <a
                                href={project.linkGit}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="mr-2 h-4 w-4" />
                                GitHub
                              </a>
                            </Button>
                          )}
                          {project.linkAcesso && (
                            <Button variant="outline" size="sm" asChild className="text-gray-700 dark:text-[#64ffda] hover:bg-gray-100 dark:hover:bg-[#233554]">
                              <a
                                href={project.linkAcesso}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Demo
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-700 dark:text-[#a8b2d1]">Nenhum projeto encontrado.</p>
              )}
            </div>
          )}
        </motion.section>

        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          custom={2}
        >
          <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-[#ccd6f6]">
            Artigos
          </h2>
          <div className="mb-8">
            <Input
              type="text"
              placeholder="Pesquisar artigos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white dark:bg-[#112240] border-gray-300 dark:border-[#233554] text-gray-900 dark:text-[#ccd6f6] focus:ring-gray-400 dark:focus:ring-[#64ffda] focus:border-gray-400 dark:focus:border-[#64ffda]"
            />
          </div>
          {articlesLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-[#64ffda]"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {articles && articles.length > 0 ? (
                articles.map((article, index) => (
                  <motion.div
                    key={article._id.toString()}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="bg-white dark:bg-[#112240] border-gray-200 dark:border-[#233554] hover:shadow-lg hover:shadow-gray-300 dark:hover:shadow-[#64ffda]/20 transition-all duration-300">
                      
                      <CardHeader>
                        <CardTitle className="text-gray-900 dark:text-[#ccd6f6]">
                          {article.nome}
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-[#8892b0]">{article.areaEstudo}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4 text-gray-700 dark:text-[#a8b2d1]">{article.descricao}</p>
                        <Button variant="outline" size="sm" asChild className="text-gray-700 dark:text-[#64ffda] hover:bg-gray-100 dark:hover:bg-[#233554]">
                          <a
                            href={article.linkAcesso}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Ler Artigo
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-700 dark:text-[#a8b2d1]">Nenhum artigo encontrado.</p>
              )}
            </div>
          )}
        </motion.section>

        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          custom={3}
        >
          <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-[#ccd6f6]">
            Habilidades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-[#112240] border-gray-200 dark:border-[#233554] hover:shadow-lg hover:shadow-gray-300 dark:hover:shadow-[#64ffda]/20 transition-all duration-300">
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
            <Card className="bg-white dark:bg-[#112240] border-gray-200 dark:border-[#233554] hover:shadow-lg hover:shadow-gray-300 dark:hover:shadow-[#64ffda]/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-[#ccd6f6] flex items-center">
                  <Globe className="mr-2 text-gray-700 dark:text-[#64ffda]" />
                  Desenvolvimento Backend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-700 dark:text-[#a8b2d1]">
                  <li>Node.js</li>
                  <li>Express.js</li>
                  <li>MongoDB</li>
                  <li>Java (Spring Boot)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          custom={4}
        >
          <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-[#ccd6f6]">
            Contato
          </h2>
          <Card className="bg-white dark:bg-[#112240] border-gray-200 dark:border-[#233554] hover:shadow-lg hover:shadow-gray-300 dark:hover:shadow-[#64ffda]/20 transition-all duration-300">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    placeholder="Nome"
                    {...register("nome")}
                    className="bg-white dark:bg-[#0a192f] border-gray-300 dark:border-[#233554] text-gray-900 dark:text-[#ccd6f6] focus:ring-gray-400 dark:focus:ring-[#64ffda] focus:border-gray-400 dark:focus:border-[#64ffda]"
                  />
                  {errors.nome && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.nome.message}</p>}
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="bg-white dark:bg-[#0a192f] border-gray-300 dark:border-[#233554] text-gray-900 dark:text-[#ccd6f6] focus:ring-gray-400 dark:focus:ring-[#64ffda] focus:border-gray-400 dark:focus:border-[#64ffda]"
                  />
                  {errors.email && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Textarea
                    placeholder="Mensagem"
                    {...register("mensagem")}
                    className="bg-white dark:bg-[#0a192f] border-gray-300 dark:border-[#233554] text-gray-900 dark:text-[#ccd6f6] focus:ring-gray-400 dark:focus:ring-[#64ffda] focus:border-gray-400 dark:focus:border-[#64ffda]"
                  />
                  {errors.mensagem && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.mensagem.message}</p>}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gray-900 dark:bg-[#64ffda] text-white dark:text-[#0a192f] hover:bg-gray-800 dark:hover:bg-[#64ffda]/80 transition-colors duration-300"
                >
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.section>
      </main>

      <footer className="bg-gray-100 dark:bg-[#0a192f] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-[#8892b0] mb-4 md:mb-0">&copy; 2024 João Ito. Todos os direitos reservados.</p>
          <div className="flex space-x-6">
            <a
              href="https://github.com/JoaoIto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-[#8892b0] hover:text-gray-900 dark:hover:text-[#64ffda] transition-colors duration-300"
            >
              <Github />
            </a>
            <a
              href="https://www.linkedin.com/in/jo%C3%A3o-victor-p%C3%B3voa-fran%C3%A7a-97502420b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-[#8892b0] hover:text-gray-900 dark:hover:text-[#64ffda] transition-colors duration-300"
            >
              <Linkedin />
            </a>
            <a
              href="mailto:joaovictorpfr@gmail.com"
              className="text-gray-600 dark:text-[#8892b0] hover:text-gray-900 dark:hover:text-[#64ffda] transition-colors duration-300"
            >
              <Mail />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}