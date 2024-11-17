import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/atoms';
import {Input} from "@/components/ui/atoms/input";
import {Button} from "@/components/ui/atoms/button";
import {ChevronLeft, ChevronRight, ExternalLink} from "lucide-react";
import {IArticle} from "@/app/interfaces/IArticles";

interface ArticlesSectionProps {
    articles: IArticle[];
    articlesLoading: boolean;
    currentArticleIndex: number;
    prevArticle: () => void;
    nextArticle: () => void;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
                                                                    articles,
                                                                    articlesLoading,
                                                                    currentArticleIndex,
                                                                    prevArticle,
                                                                    nextArticle,
                                                                }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredArticles = articles.filter((article) =>
        article.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-[#ccd6f6]">Artigos</h2>
            <div className="mb-8">
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
                <div className="relative">
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(-${currentArticleIndex * 100}%)` }}
                        >
                            {filteredArticles.length > 0 ? (
                                filteredArticles.map((article) => (
                                    <div key={article._id.toString()} className="w-full flex-shrink-0 px-4">
                                        <Card className="backdrop-blur-lg bg-black bg-opacity-40 border-2 shadow-lg hover:shadow-xl transition-all duration-300">
                                            <CardHeader>
                                                <CardTitle className="text-gray-900 dark:text-[#ccd6f6]">
                                                    {article.nome}
                                                </CardTitle>
                                                <CardDescription className="text-gray-600 dark:text-[#8892b0]">
                                                    {article.areaEstudo}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="mb-4 text-gray-700 dark:text-[#a8b2d1]">{article.descricao}</p>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                    className="text-gray-700 dark:text-[#64ffda] backdrop-blur-lg bg-black bg-opacity-40 border-2"
                                                >
                                                    <a href={article.linkAcesso} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="mr-2 h-4 w-4" />
                                                        Ler Artigo
                                                    </a>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>
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
    );
};
