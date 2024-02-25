export type GithubRepo = { id: number; full_name: string; html_url: string }
export type GithubRepoLinkProps = { repo: GithubRepo }
export type GithubRepoListItemProps = GithubRepoLinkProps
export type GithubRepoListProps = { repos: GithubRepo[] }

export function GithubRepoLink({ repo }: GithubRepoLinkProps) {
  return <a href={repo.html_url}>{repo.full_name}</a>
}

export function GithubRepoListItem({ repo }: GithubRepoListItemProps) {
  return <li id={repo.id.toString()}>
    <GithubRepoLink repo={repo} />
  </li>
}

export function GithubRepoList({ repos }: GithubRepoListProps) {
  return <ul>
    {repos.map(repo => <GithubRepoListItem repo={repo} />)}
  </ul>
}
