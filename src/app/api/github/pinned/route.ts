import { NextResponse } from 'next/server';

export async function GET() {
  const query = `
    {
      user(login: "JoaoIto") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              homepageUrl
              stargazerCount
              languages(first: 3) {
                nodes {
                  name
                  color
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
    const pinned = data.data?.user?.pinnedItems?.nodes || [];
    return NextResponse.json(pinned);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}