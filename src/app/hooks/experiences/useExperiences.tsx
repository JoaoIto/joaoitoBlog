import { IExperience } from "@/app/interfaces/IExperiences";
import { useEffect, useState } from "react";

export function useExperiencias() {
  const [experiencias, setExperiencias] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperiencias() {
      try {
        const response = await fetch('/api/experiences');
        if (!response.ok) {
          throw new Error('Falha ao buscar experiências');
        }
        const data = await response.json();
        setExperiencias(data);
      } catch (error) {
        console.error('Erro ao buscar experiências:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchExperiencias();
  }, []);

  return { experiencias, loading };
}

