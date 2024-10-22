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
import { Github, Linkedin, Mail, ExternalLink, Briefcase, GraduationCap, ChevronDown } from "lucide-react"
import { useArticles } from "./hooks/articles/useArticles"
import { useProjects } from "./hooks/projects/useProjects"
import { FaReact, FaJava } from "react-icons/fa"
import { RiNextjsFill } from "react-icons/ri"
import { SiTypescript, SiMongodb, SiQuarkus } from "react-icons/si"
import { IoLogoJavascript } from "react-icons/io5"
import { DiNodejs } from "react-icons/di"

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
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
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 250])
  const controls = useAnimation()

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
        alert("Email sent successfully!")
      } else {
        alert("Error sending email.")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      alert("Error sending email.")
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
    <div className="min-h-screen bg-gradient-to-b from-[#0a192f] to-[#112240] text-[#8892b0]">
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
        <div className="relative z-10 text-center">
          <motion.h1
            className="text-6xl font-bold mb-4 text-[#64ffda]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            JoaoIto
          </motion.h1>
          <motion.p
            className="text-2xl mb-6 text-[#ccd6f6]"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Full Stack Software Developer
          </motion.p>
          <motion.p
            className="text-xl max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Crafting robust web solutions with Next.js, Node.js, and Java.
          </motion.p>
          <motion.div
            className="flex justify-center items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {stackIcons.map((icon, index) => (
              <motion.div
                key={icon.name}
                className="w-12 h-12 flex justify-center items-center"
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
                {icon.icon}
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="text-[#64ffda] w-8 h-8" />
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          custom={0}
        >
          <h2 className="text-3xl font-semibold mb-8 text-[#ccd6f6]">
            Experience & Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card className="bg-[#112240] border-[#233554] hover:shadow-lg hover:shadow-[#64ffda]/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-[#ccd6f6] flex items-center">
                    <Briefcase className="mr-2 text-[#64ffda]" />
                    Scientific Researcher
                  </CardTitle>
                  <CardDescription className="text-[#8892b0]">University of Tocantins</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Conducting cutting-edge research in AI and machine learning, contributing to groundbreaking projects in natural language processing and computer vision.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card className="bg-[#112240] border-[#233554] hover:shadow-lg hover:shadow-[#64ffda]/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-[#ccd6f6] flex items-center">
                    <GraduationCap className="mr-2 text-[#64ffda]" />
                    Web Fundamentals Teacher
                  </CardTitle>
                  <CardDescription className="text-[#8892b0]">Code Academy</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Empowering the next generation of developers with comprehensive knowledge in HTML, CSS, JavaScript, and modern web development practices.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          custom={1}
        >
          <h2 className="text-3xl font-semibold mb-8 text-[#ccd6f6]">
            Portfolio
          </h2>
          {projectsLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#64ffda]"></div>
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
                    <Card className="bg-[#112240] border-[#233554] h-full flex flex-col hover:shadow-lg hover:shadow-[#64ffda]/20 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="text-[#ccd6f6]">
                          {project.nome}
                        </CardTitle>
                        <CardDescription className="text-[#8892b0]">
                          {project.tecnologias.join(", ")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="mb-4">{project.descricao}</p>
                        <div className="flex space-x-4 mt-auto">
                          {project.linkGit && (
                            <Button variant="outline" size="sm" asChild className="hover:bg-[#64ffda] hover:text-[#112240]">
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
                            <Button variant="outline" size="sm" asChild className="hover:bg-[#64ffda] hover:text-[#112240]">
                              <a
                                href={project.linkAcesso}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Live Demo
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <p>No projects found.</p>
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
          <h2 className="text-3xl font-semibold mb-8 text-[#ccd6f6]">
            Articles
          </h2>
          <div className="mb-8">
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#112240] border-[#233554] text-[#ccd6f6] focus:ring-[#64ffda] focus:border-[#64ffda]"
            />
          </div>
          {articlesLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#64ffda]"></div>
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
                    <Card className="bg-[#112240] border-[#233554] hover:shadow-lg hover:shadow-[#64ffda]/20 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="text-[#ccd6f6]">
                          {article.nome}
                        </CardTitle>
                        <CardDescription className="text-[#8892b0]">{article.areaEstudo}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">{article.descricao}</p>
                        <Button variant="outline" size="sm" asChild className="hover:bg-[#64ffda] hover:text-[#112240]">
                          <a
                            href={article.linkAcesso}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Read Article
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <p>No articles found.</p>
              )}
            </div>
          )}
        
        </motion.section>

        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          custom={4}
        >
          <h2 className="text-3xl font-semibold mb-8 text-[#ccd6f6]">
            Contact
          </h2>
          <Card className="bg-[#112240] border-[#233554] hover:shadow-lg hover:shadow-[#64ffda]/20 transition-all duration-300">
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    placeholder="Name"
                    {...register("name")}
                    className="bg-[#0a192f] border-[#233554] text-[#ccd6f6] focus:ring-[#64ffda] focus:border-[#64ffda]"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="bg-[#0a192f] border-[#233554] text-[#ccd6f6] focus:ring-[#64ffda] focus:border-[#64ffda]"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Textarea
                    placeholder="Message"
                    {...register("message")}
                    className="bg-[#0a192f] border-[#233554] text-[#ccd6f6] focus:ring-[#64ffda] focus:border-[#64ffda]"
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>
                <Button
                  type="submit"
                  className="bg-[#64ffda] text-[#0a192f] hover:bg-[#64ffda]/80 transition-colors duration-300"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.section>
      </main>

      <footer className="bg-[#0a192f] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center space-x-6">
          <a
            href="https://github.com/JoaoIto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8892b0] hover:text-[#64ffda] transition-colors duration-300"
          >
            <Github />
          </a>
          <a
            href="https://www.linkedin.com/in/jo%C3%A3o-victor-p%C3%B3voa-fran%C3%A7a-97502420b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8892b0] hover:text-[#64ffda] transition-colors duration-300"
          >
            <Linkedin />
          </a>
          <a
            href="mailto:joaovictorpfr@gmail.com"
            className="text-[#8892b0] hover:text-[#64ffda] transition-colors duration-300"
          >
            <Mail />
          </a>
        </div>
      </footer>
    </div>
  )
}