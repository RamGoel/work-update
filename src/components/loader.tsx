import { BiLoader } from 'react-icons/bi'

const Loader = () => {
  return (
      <div className='h-screen w-screen bg-black flex items-center justify-center'>
          <BiLoader size={40} color='white' className='animate-spin' />
    </div>
  )
}

export default Loader