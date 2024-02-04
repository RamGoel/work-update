import { Octokit } from "octokit";
import { GithubResponse } from "../types/github-api-types";

const octokit = new Octokit({
    auth: import.meta.env.VITE_GITHUB_PAT,
});

const accceptedRepos = ['animall-web', 'coolpool']
export const getUserRepos = async (userName?: string) => {
    const res=await octokit.request("GET /users/{owner}/events", {
        owner: userName||"github",
        // repo: "docs",
        per_page:200
    });

    return res.data.filter((item: GithubResponse) => {
        if (item.type === 'PullRequestEvent' && accceptedRepos.includes(item?.payload?.pull_request?.base?.repo?.name)) {
            return item;
        }
    })
}

