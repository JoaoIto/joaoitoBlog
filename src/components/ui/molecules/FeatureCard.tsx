import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/atoms/button"
import { ExternalLink, Github } from 'lucide-react'

interface FeatureCardProps {
    title: string
    subtitle?: string
    description: string
    tags?: string[]
    image?: string
    githubLink?: string
    externalLink?: string
    className?: string
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
                                                            title,
                                                            subtitle,
                                                            description,
                                                            tags,
                                                            image,
                                                            githubLink,
                                                            externalLink,
                                                            className,
                                                        }) => {
    return (
        <motion.div
            className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${className}`}
            whileHover={{ y: -5 }}
        >
            {image && (
                <div className="relative h-48 overflow-hidden">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
            )}
            <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                {subtitle && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{subtitle}</p>
                )}
                <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded dark:bg-blue-900 dark:text-blue-300"
                            >
                {tag}
              </span>
                        ))}
                    </div>
                )}
                <div className="flex space-x-4">
                    {githubLink && (
                        <Button variant="outline" size="sm" asChild>
                            <a href={githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                <Github className="mr-2 h-4 w-4" />
                                GitHub
                            </a>
                        </Button>
                    )}
                    {externalLink && (
                        <Button variant="outline" size="sm" asChild>
                            <a href={externalLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Project
                            </a>
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
