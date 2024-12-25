'use client'

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useArticles } from "./hooks/articles/useArticles"
import { useProjects } from "./hooks/projects/useProjects"
import { useExperiencias } from "./hooks/experiences/useExperiences"
import { useEducacao } from "./hooks/education/useEducation"
import { ExperienciaSection } from "@/components/ui/organisms/ExperienciaSection"
import { EducacaoSection } from "@/components/ui/organisms/EducacaoSection"
import { PortfolioSection } from "@/components/ui/organisms/PortfolioSection"
import { ArticlesSection } from "@/components/ui/organisms/ArticlesSection"
import { SkillsSection } from "@/components/ui/molecules/SkillsSection"
import { ContactSection } from "@/components/ui/organisms/ContactSection"
import { Header } from "@/components/ui/molecules/Header"
import { HeroSection } from "@/components/ui/organisms/HeroSection"
import { FloatingNav } from "@/components/ui/molecules/FloatingNav"
import { Footer } from "@/components/ui/molecules/Footer"
import { ThemeProvider } from "@/components/theme/theme-provider"

export default function Portfolio() {
  const { articles, loading: articlesLoading } = useArticles()
  const { projects, loading: projectsLoading } = useProjects()
  const { experiencias, loading: experienciasLoading } = useExperiencias()
  const { educacao, loading: educacaoLoading } = useEducacao()
  const controls = useAnimation()
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0)

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }))
  }, [controls])

  const nextProject = () => {
    setCurrentProjectIndex((prevIndex) =>
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevProject = () => {
    setCurrentProjectIndex((prevIndex) =>
        prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    )
  }

  const nextArticle = () => {
    setCurrentArticleIndex((prevIndex) =>
        prevIndex === articles.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevArticle = () => {
    setCurrentArticleIndex((prevIndex) =>
        prevIndex === 0 ? articles.length - 1 : prevIndex - 1
    )
  }

  return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <Header />
          <FloatingNav />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <HeroSection />

            <motion.section
                className="mb-20"
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                custom={0}
            >
              <div className="grid grid-cols-1 gap-8">
                <ExperienciaSection experiencias={experiencias} experienciasLoading={experienciasLoading} />
              </div>
              <div className="mt-8">
                <EducacaoSection educacao={educacao} educacaoLoading={educacaoLoading} />
              </div>
            </motion.section>

            <motion.section
                className="mb-20"
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                custom={1}
            >
              <PortfolioSection
                  projects={projects}
                  projectsLoading={projectsLoading}
                  currentProjectIndex={currentProjectIndex}
                  prevProject={prevProject}
                  nextProject={nextProject}
              />
            </motion.section>

            <motion.section
                className="mb-20"
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                custom={2}
            >
              <ArticlesSection
                  articles={articles}
                  articlesLoading={articlesLoading}
                  currentArticleIndex={currentArticleIndex}
                  prevArticle={prevArticle}
                  nextArticle={nextArticle}
              />
            </motion.section>

            <motion.section
                className="mb-20"
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                custom={3}
            >
              <SkillsSection />
            </motion.section>

            <motion.section
                className="mb-20"
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                custom={4}
            >
              <ContactSection />
            </motion.section>
          </main>

          <Footer />
        </div>
      </ThemeProvider>
  )
}

