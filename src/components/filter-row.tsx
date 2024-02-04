import { Dispatch, SetStateAction } from 'react'
import { filterByTime } from '../utils/filters'
import { GithubResponse } from '../types/github-api-types'
import useLoaderStore from '../zustand/main-store'

const FilterRow = ({
    filter,
    username,
    setPR,
    setFilter
}: {
    filter: {
        date: string,
        status: string
    },
    setPR: Dispatch<SetStateAction<GithubResponse[] | null>>,
    username: string,
    setFilter: Dispatch<SetStateAction<{
        date: string,
        status: string
    }>>
}) => {
    const {enableLoader, disableLoader} = useLoaderStore();
    const handleDateChange = async (val: string) => {
        enableLoader();
        setFilter({
            ...filter,
            date: val
        })
        setPR(await filterByTime(val, username))
        disableLoader();
    }
    const filterOptions = ['All', 'Merged', 'Closed', 'Draft']
    return (
        <div className='flex items-center justify-start mt-5'>

            {filterOptions.map(item => {
                return <div onClick={() => setFilter({
                    ...filter,
                    status: item
                })} className={`w-fit mx-4 px-3 py-1 transition-all cursor-pointer ${filter.status === item ? 'border-b-2' : ''}`}>
                    <p className='text-white'>{item}</p>
                </div>
            })}

            <select onChange={(e) => handleDateChange(e.target.value)} id="countries" className="ml-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[150px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="day" selected={filter.date === 'day'}>Last 24 hours</option>
                <option value="week" selected={filter.date === 'week'}>Last Week</option>
                <option value="month" selected={filter.date === 'month'}>Last Month</option>
                <option value="all" selected={filter.date === 'all'}>All time</option>
            </select>
        </div>
    )
}

export default FilterRow