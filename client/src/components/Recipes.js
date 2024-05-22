import React from 'react'
import Recipe from './Recipe';
import { useNavigate } from 'react-router';

const Recipes = ({title, length, seeMore, recipes}) => {
  const navigate = useNavigate();
  
  return (
    <section className='container px-5 py-5'>
        <div className='flex flex-col'>
            <h1 className='self-center text-xl font-semibold text-blue-rich'>{title}</h1>
            <div className='grid grid-cols-2 mt-5 gap-y-8 gap-x-8 md:gap-x-16 lg:grid-cols-3 justify-items-center'>
                {recipes && recipes.slice(0, length).map((recipe, index) => (
                    <Recipe key={index} recipe={recipe} />
                ))}
            </div>
            <button 
              onClick={() => seeMore ? navigate(seeMore) : null}
              className='self-center px-5 py-1 mt-5 text-lg border-2 rounded-md border-blue-rich text-blue-rich'
            >See More</button>
        </div>
    </section>
  )
}

export default Recipes
