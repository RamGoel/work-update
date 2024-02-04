export type GithubResponse = {
    type: string,
    repo: {
        url:string,
    },
    payload: {
        pull_request: {
            base: {
                repo: {
                    name:string
                }
            },
            html_url: string,
            title: string,
            state: string,
            created_at:string
        }
    }
}