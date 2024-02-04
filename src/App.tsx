import { useEffect, useState } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { GithubResponse } from './types/github-api-types';
import PRCard from './components/pr-card';
import FilterRow from './components/filter-row';
import GithubForm from './components/form';
import Loader from './components/loader';
import useLoaderStore from './zustand/main-store';
import { getUserRepos } from './apis/githubApis';
import { copyMarkDown } from './utils/create-md';
function App() {
  const { isLoading, enableLoader, disableLoader } = useLoaderStore();
  const [username, setUsername] = useState('');
  const [pr, setPR] = useState<null | Array<GithubResponse>>(null)
  const [filter, setFilter] = useState({
    status: 'All',
    date: 'all'
  })


  useEffect(() => {
    async function fetchPRByLocal() {
      enableLoader();
      const uname = localStorage.getItem('watcher-uname');
      if (uname) {
        const prs = await getUserRepos(JSON.parse(uname));
        setPR(prs)
        setUsername(JSON.parse(uname))
      }
      disableLoader();
    }
    fetchPRByLocal();
  }, [disableLoader, enableLoader])


  if (isLoading) {
    return <Loader />
  }
  return (
    <div className='p-4 bg-black h-screen'>
      <GithubForm copyFn={() => {
        copyMarkDown(pr)
      }} setPR={setPR} setUsername={setUsername} username={username} />
      <FilterRow setPR={setPR} username={username} filter={filter} setFilter={setFilter} />
      <div className='grid grid-cols-3 gap-6 mt-5'>
        {
          pr?.length ? pr.map((item: GithubResponse) => {
            return <PRCard prInfo={item} />
          }) : <p className='text-white'>No Pull Requests found</p>
        }
      </div>
      <Toaster />
    </div>
  )
}

export default App
