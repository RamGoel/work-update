import { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'
import { getUserRepos } from '../apis/githubApis'
import { GithubResponse } from '../types/github-api-types'
import useLoaderStore from '../zustand/main-store'

const GithubForm = ({
    username,
    setUsername,
    setPR,
    copyFn
}: {
    username: string,
    setUsername: Dispatch<SetStateAction<string>>,
    setPR: Dispatch<SetStateAction<GithubResponse[] | null>>,
    copyFn:()=>void
}) => {
    const { enableLoader, disableLoader } = useLoaderStore();
    return (
        <div className='flex items-center justify-between'>
            <div className='w-full'>
                <label className='block text-white mb-2 font-semibold'>Github Username:</label>
                <input className='border-2 p-2 rounded-lg w-1/4' value={username} onChange={(e) => {
                    setUsername(e.target.value)
                }} />

                <button className='bg-gray-500 p-3 rounded-lg px-5 block w-1/4 mt-3' onClick={async () => {
                    if (!username) {
                        toast.error('Username is required')
                    } else {
                        enableLoader();
                        const val = await getUserRepos(username)
                        setPR(val)
                        disableLoader();
                    }
                }}>
                    Get PR's
                </button>
            </div>
            <div className='w-1/5'>
                <button className='p-2 w-full text-white bg-transparent border-2 rounded-lg' onClick={copyFn}>Copy Markdown</button>
            </div>
        </div>
    )
}

export default GithubForm