import type { PageProps } from '@ortense/ssr'
import { GithubRepoList, type GithubRepo } from '../components/GithubRepo'

export const route = '/github-repos/:username'

async function getUserRepos(username: string) {
  const url = `https://api.github.com/users/${username}/repos`
  const response = await fetch(url)
  const repos = await response.json()
  return repos as GithubRepo[]
}

export function Head({ params }: PageProps<typeof route>) {
  const content = `Repositries of ${params.username}`
  return <>
    <title>{content}</title>
    <meta name='description' content={content} />
  </>
}

export default async function GithubUserRepos({ params }: PageProps<typeof route>) {
  const { username } = params
  const repos = await getUserRepos(username)
  return <>
    <h1>Repositories of {username}</h1>
    <GithubRepoList repos={repos} />
  </>
}
