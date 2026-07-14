import { useEffect, useState } from 'react'

export type GitHubUser = {
  public_repos: number
  followers: number
  following: number
  avatar_url: string
  html_url: string
  name: string | null
  bio: string | null
}

export type GitHubRepo = {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  topics?: string[]
}

type State = {
  user: GitHubUser | null
  repos: GitHubRepo[]
  totalStars: number
  loading: boolean
  error: boolean
}

/** Fetches public profile + top repositories from the GitHub REST API. */
export function useGitHub(username: string) {
  const [state, setState] = useState<State>({
    user: null,
    repos: [],
    totalStars: 0,
    loading: true,
    error: false,
  })

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, {
            signal: controller.signal,
          }),
          fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
            { signal: controller.signal },
          ),
        ])

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error')

        const user: GitHubUser = await userRes.json()
        const allRepos: GitHubRepo[] = await reposRes.json()

        const totalStars = allRepos.reduce(
          (sum, r) => sum + (r.stargazers_count || 0),
          0,
        )

        // Rank by stars, then recency (already sorted by updated).
        const repos = [...allRepos]
          .filter((r) => !('fork' in r) || !(r as { fork?: boolean }).fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6)

        setState({ user, repos, totalStars, loading: false, error: false })
      } catch (err) {
        if ((err as Error).name === 'AbortError') return
        setState((s) => ({ ...s, loading: false, error: true }))
      }
    }

    load()
    return () => controller.abort()
  }, [username])

  return state
}
