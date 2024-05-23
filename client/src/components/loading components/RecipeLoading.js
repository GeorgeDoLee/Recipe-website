import React from 'react'
import { useNavigate } from 'react-router'

const RecipeLoading = () => {

  return (
    <div className='flex flex-col items-center gap-3 opacity-80 md:items-stretch md:flex-row animate-pulse'>
      <div className='w-20 h-20 rounded-md md:w-36 md:h-36 bg-blue-rich' />
      
      <div className='flex flex-col gap-3 items-center md:items-stretch md:justify-between  md:w-[180px] text-blue-rich'>
        <div className='flex flex-col items-center gap-1 md:items-stretch'>
          <h1 className='text-base font-semibold break-words whitespace-normal rounded-md w-fit md:text-lg bg-blue-rich'>
            recipe_title
          </h1>
          <h3 className='text-xs rounded-md w-fit bg-blue-rich'>author_name</h3>
        </div>
        <div className='flex flex-col items-center md:items-stretch'>
          <h2 className='text-xs rounded-md md:text-sm bg-blue-rich w-fit'>Ingredients:</h2>
          <ul className='flex flex-wrap justify-center gap-2 mt-1 text-sm italic break-words md:justify-stretch md:items-start'>
            {Array.from({ length: 4}).map((_, index) => (
              <li 
                key={index}
                className='p-1 text-xs break-words whitespace-normal max-w-[150px] border rounded-md border-blue-rich bg-blue-rich text-blue-rich'
              >
                item
              </li>
            ))}
          </ul>
        </div>
        
        <div className='flex justify-between'>
          <button className='hidden rounded-md md:block bg-blue-rich'>
            share
          </button>
          <button className='rounded-md cursor-pointer bg-blue-rich'>
            see more
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecipeLoading;
