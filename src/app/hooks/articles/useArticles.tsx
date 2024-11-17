import { IArticle } from "@/app/interfaces/IArticles"
import { useEffect, useState } from "react"

export const useArticles = () => {
    const [articles, setArticles] = useState<IArticle[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchArticles = async () => {
            console.log("Ta chamando no hook aqui")
            setLoading(true)
            try {
                const response = await fetch(`/api/articles`)
                const data = await response.json()

                // Verifica se os dados são um array, caso contrário, define como um array vazio
                if (data) {
                    console.log("Artigos: " + JSON.stringify(data));
                    setArticles(data)
                } else {
                    console.error("Unexpected data format:", data)
                    setArticles([]) // Garante que 'articles' seja um array
                }
            } catch (error) {
                console.error("Failed to fetch articles:", error)
                setArticles([]) // Define como um array vazio em caso de erro
            }
            setLoading(false)
        }

        fetchArticles()
    }, [])

    return { articles, loading }
}
