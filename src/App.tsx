import { useState } from 'react'
import './App.css'
import toast, { Toaster } from 'react-hot-toast'
import { getUserRepos } from './apis/githubApis';
import { GithubResponse } from './types/github-api-types';
function App() {
  const [username, setUsername] = useState('');
  const [pr, setPR]=useState<null|Array<GithubResponse>>(null)
  return (
    <div className='p-4 bg-black h-screen'>
      <label className='block text-white mb-2 font-semibold'>Github Username:</label>
      <input className='border-2 p-2 rounded-lg w-1/4' value={username} onChange={(e) => {
        setUsername(e.target.value)
      }} />
      
      <button className='bg-gray-500 p-3 rounded-lg px-5 block w-1/4 mt-3' onClick={async() => {
        if (!username) {
          toast.error('Username is required')
        } else {
          const val = await getUserRepos(username)
          console.log(val)
          setPR(val)
        }
      }}>
        Get PR's
      </button>
      {/* <p className='text-white'>{JSON.stringify(pr?.[0])}</p> */}
      {
        pr?.map((item:GithubResponse) => {
          return <div>
            <a className='text-white' href={item.payload.pull_request.html_url}>{item?.repo?.url}</a>
          </div>
        })
      }
      <Toaster />
    </div>
  )
}

export default App
