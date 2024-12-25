'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/atoms'
import { Input } from "@/components/ui/atoms/input"
import { Button } from "@/components/ui/atoms/button"
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { IArticle } from "@/app/interfaces/IArticles"
import { useInView } from '@/app/hooks/ui/useInView'
import {FeatureCard} from "@/components/ui/molecules/FeatureCard";

interface ArticlesSectionProps {
    articles: IArticle[]
    articlesLoading: boolean
    currentArticleIndex: number
    prevArticle: () => void
    nextArticle: () => void
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
                                                                    articles,
                                                                    articlesLoading,
                                                                    currentArticleIndex,
                                                                    prevArticle,
                                                                    nextArticle,
                                                                }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [ref, isInView] = useInView({ threshold: 0.1 })

    const filteredArticles = articles.filter((article) =>
        article.nome.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <motion.section
            ref={ref}
            className="min-h-screen flex flex-col justify-center items-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-4xl font-semibold mb-12 text-gray-900 dark:text-[#ccd6f6]">Artigos</h2>
            <div className="w-full max-w-4xl mb-8">
                <Input
                    type="text"
                    placeholder="Pesquisar artigos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/80 dark:bg-[#112240]/80 backdrop-blur-sm border-none shadow-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#64ffda]"
                />
            </div>
            {articlesLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-[#64ffda]"></div>
                </div>
            ) : (
                <div className="relative w-full max-w-4xl">
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(-${currentArticleIndex * 100}%)` }}
                        >
                            {filteredArticles.length > 0 ? (
                                filteredArticles.map((article, index) => (
                                    <motion.div
                                        key={article._id.toString()}
                                        className="w-full flex-shrink-0 px-4"
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <FeatureCard
                                            title={article.nome}
                                            subtitle={article.areaEstudo}
                                            description={article.descricao}
                                            externalLink={article.linkAcesso}
                                            className="h-full"
                                        />
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-gray-700 dark:text-[#a8b2d1]">Nenhum artigo encontrado.</p>
                            )}
                        </motion.div>
                    </div>
                    {filteredArticles.length > 1 && (
                        <>
                            <Button
                                onClick={prevArticle}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/50 dark:bg-[#112240]/50 text-gray-700 dark:text-[#64ffda] hover:bg-white/70 dark:hover:bg-[#112240]/70"
                                variant="ghost"
                                size="icon"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </Button>
                            <Button
                                onClick={nextArticle}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/50 dark:bg-[#112240]/50 text-gray-700 dark:text-[#64ffda] hover:bg-white/70 dark:hover:bg-[#112240]/70"
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
