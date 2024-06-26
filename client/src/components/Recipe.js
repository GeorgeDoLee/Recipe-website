import React from 'react'
import { useNavigate } from 'react-router'

const Recipe = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center gap-3 md:items-stretch md:flex-row'>
      <div className='w-20 h-20 rounded-md md:w-36 md:h-36 bg-blue-rich' />
      
      <div className='flex flex-col gap-3 items-center md:items-stretch md:justify-between  md:w-[180px] text-blue-rich'>
        <div className='flex flex-col items-center md:items-stretch'>
          <h1 className='text-base font-semibold break-words whitespace-normal md:text-lg'>
            {recipe.title} 
          </h1>
          <h3 onClick={() => navigate(`/profile/${recipe.author}/${recipe.authorId}`)} className='text-xs'>{recipe.author}</h3>
        </div>
        <div className='flex flex-col items-center md:items-stretch'>
          <h2 className='text-xs md:text-sm'>Ingredients:</h2>
          <ul className='flex flex-wrap justify-center gap-2 mt-1 text-sm italic break-words md:justify-stretch md:items-start'>
            {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
              <li 
                key={index}
                className='p-1 text-xs break-words whitespace-normal max-w-[150px] border rounded-md border-blue-rich bg-blue-rich text-cornstick'
              >
                {ingredient}
              </li>
            ))}
            <li 
                className='p-1 text-xs break-words whitespace-normal max-w-[150px] border rounded-md border-blue-rich bg-blue-rich text-cornstick'
              >
                ...
              </li>
          </ul>
        </div>
        
        <div className='flex justify-between'>
          <button className='hidden cursor-pointer md:block'>
            share
          </button>
          <button onClick={() => navigate(`/recipe/${recipe?._id}`)} className='cursor-pointer'>
            see more
          </button>
        </div>
      </div>
    </div>
  )
}

export default Recipe
