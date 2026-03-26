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
              stargazerCount
              forkCount
              primaryLanguage {
                name
              }
              repositoryTopics(first: 5) {
                nodes {
                  topic {
                    name
                  }
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

    const mappedRepos = pinnedNodes.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.url,
      homepage: repo.homepageUrl,
      stargazers_count: repo.stargazerCount,
      forks_count: repo.forkCount,
      language: repo.primaryLanguage?.name || null,
      topics: repo.repositoryTopics?.nodes?.map((n: any) => n.topic.name) || [],
      featured: featuredNames.includes(repo.name)
    }));

    // Sort to put featured first
    mappedRepos.sort((a: any, b: any) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    return NextResponse.json(mappedRepos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}