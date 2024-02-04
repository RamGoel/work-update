import { GithubResponse } from '../types/github-api-types'
import moment from 'moment';
import { FaGithub } from "react-icons/fa";


const PRCard = ({ prInfo }: { prInfo: GithubResponse }) => {
    return (
        <div className='text-white border-2 p-3 my-2 rounded-lg'>
            <div className='flex items-center justify-between'>
                <div>
                    <h4 className='font-semibold text-lg'>{prInfo.payload.pull_request.title}</h4>
                    <p className='text-sm'>{moment(prInfo.payload.pull_request.created_at).fromNow()} @{prInfo?.payload?.pull_request?.base?.repo?.name}</p>
                </div>
                <a href={prInfo.payload.pull_request.html_url}><FaGithub size={25} /></a>
            </div>
        </div>
    )
}

export default PRCard