import { IEducation } from '@/app/interfaces/IEducation';
import { useState, useEffect } from 'react';

export function useEducacao() {
  const [educacao, setEducacao] = useState<IEducation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEducacao() {
      try {
        const response = await fetch('/api/education');
        if (!response.ok) {
          throw new Error('Falha ao buscar educação');
        }
        const data = await response.json();
        setEducacao(data);
      } catch (error) {
        console.error('Erro ao buscar educação:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEducacao();
  }, []);

  return { educacao, loading };
}