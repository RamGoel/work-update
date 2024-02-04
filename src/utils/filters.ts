import moment from "moment";
import { GithubResponse } from "../types/github-api-types";
import { getUserRepos } from "../apis/githubApis";

export const filterByTime = async (filterType: string, uname:string) :Promise<GithubResponse[] | null> => {
    const data:Array<GithubResponse> = await getUserRepos(uname);
    let result;
    if (!data) return null;
    console.log(filterType, uname)
    switch (filterType) {
        case 'day':
            result = data.filter(item => moment(item.payload.pull_request.created_at) > moment.utc().subtract(1, "day"));
            break;
        case 'week':
            result = data.filter(item => moment(item.payload.pull_request.created_at) > moment.utc().subtract(7, "days"));
            break;
        case 'month':
            result = data.filter(item => moment(item.payload.pull_request.created_at) > moment.utc().subtract(1, "months"));
            break;
        default:
            result = data;
            break;
    }

    return result;
}