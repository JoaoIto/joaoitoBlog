// app/api/github/route.ts
// Fetches public repos from GitHub API for JoaoIto, sorted by stars
import { corsHeaders } from "@/app/functions/corsHeaders";

export const revalidate = 3600; // Cache for 1 hour (ISR)

export interface IGithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
  fork: boolean;
  visibility: string;
}

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    // If you have a GH token in env, use it to avoid rate limits
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      "https://api.github.com/users/JoaoIto/repos?per_page=100&sort=updated",
      { headers, next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const repos: IGithubRepo[] = await response.json();

    const featuredNames = ["FinancePro", "Node-Balancer", "SoftwareHUB"];

    // Filter out forks and sort by stars descending
    const filtered = repos
      .filter((repo) => !repo.fork && repo.visibility === "public")
      .map(repo => ({
        ...repo,
        featured: featuredNames.includes(repo.name)
      }))
      .sort((a, b) => {
        // Featured first, then stars
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.stargazers_count - a.stargazers_count;
      })
      .slice(0, 24); // More repos for the full list

    return new Response(JSON.stringify(filtered), {
      status: 200,
      headers: corsHeaders(),
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch GitHub repos" }), {
      status: 500,
      headers: corsHeaders(),
    });
  }
}
