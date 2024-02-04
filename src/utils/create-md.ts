import toast from "react-hot-toast";
import { GithubResponse } from "../types/github-api-types";

export const createMarkDown = (data: Array<GithubResponse>) => {
    let str = 'Yesterday:\n';
    data.map((item:GithubResponse, index:number) => {
        str+=`${index+1}. [${item.payload.pull_request.title}](${item.payload.pull_request.html_url})`+ '\n'
    })

    return str;
}

export const copyMarkDown = (data:null|Array<GithubResponse>) => {
    if (data) {
        const md = createMarkDown(data.splice(4));
        navigator.clipboard.writeText(md);
        toast.success('Copied to Clipboard')
    }
}