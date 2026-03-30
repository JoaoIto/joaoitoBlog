import { NextResponse } from 'next/server';

export async function GET() {
  const query = `
    {
      user(login: "JoaoIto") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              id
              name
              description
              url
              homepageUrl
              openGraphImageUrl
              stargazerCount
              forkCount
              primaryLanguage {
                name
              }
              defaultBranchRef {
                name
              }
              repositoryTopics(first: 5) {
                nodes {
                  topic {
                    name
                  }
                }
              }
              object(expression: "HEAD:README.md") {
                ... on Blob {
                  text
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 1296000 } // Cache de 15 dias
    });

    const data = await response.json();
    const pinnedNodes = data.data?.user?.pinnedItems?.nodes || [];

    const featuredNames = ['FinancePro', 'node-balancer', 'SoftwareHUB', 'CadastroProgramas-Unitins', 'Help-City', 'links-valid'];

    const extractFirstImage = (markdown: string) => {
      if (!markdown) return null;
      const mdImgRegex = /!\[.*?\]\((.*?)\)/;
      const htmlImgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
      
      let match = markdown.match(htmlImgRegex);
      if (match && match[1]) return match[1];
      
      match = markdown.match(mdImgRegex);
      if (match && match[1]) return match[1];
      
      return null;
    };

    const mappedRepos = pinnedNodes.map((repo: any) => {
      const readmeText = repo.object?.text || '';
      let readmeImage = extractFirstImage(readmeText);
      
      // Ajuste de URLs de imagem relativas no Markdown 
      if (readmeImage && !readmeImage.startsWith('http') && !readmeImage.startsWith('data:')) {
        // Remove barras iniciais (ex: /img/print.png vira img/print.png)
        readmeImage = readmeImage.replace(/^\/+/, '');
        const branch = repo.defaultBranchRef?.name || 'main';
        readmeImage = `https://raw.githubusercontent.com/JoaoIto/${repo.name}/${branch}/${readmeImage}`;
      }

      // Fica com a imagem do readme caso exista, senao usa a gerada via openGraph ou limpa pra null se for a thumb padrao do github profile
      const isDefaultThumb = repo.openGraphImageUrl?.includes('avatars.githubusercontent.com');
      const finalImage = readmeImage || (!isDefaultThumb ? repo.openGraphImageUrl : null);

      return {
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.url,
        homepage: repo.homepageUrl,
        imageUrl: finalImage,
        stargazers_count: repo.stargazerCount,
        forks_count: repo.forkCount,
        language: repo.primaryLanguage?.name || null,
        topics: repo.repositoryTopics?.nodes?.map((n: any) => n.topic.name) || [],
        featured: featuredNames.includes(repo.name)
      };
    });

    // Sort to put featured first
    mappedRepos.sort((a: any, b: any) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    return NextResponse.json(mappedRepos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}