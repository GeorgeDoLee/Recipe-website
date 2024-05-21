import React from 'react'
import Recipe from './Recipe';
import { useNavigate } from 'react-router';

const Recipes = ({title, length, seeMore}) => {
  const navigate = useNavigate();
  
  return (
    <section className='container px-5 py-5'>
        <div className='flex flex-col'>
            <h1 className='self-center text-xl font-semibold text-blue-rich'>{title}</h1>
            <div className='grid grid-cols-2 gap-8 mt-10 lg:grid-cols-3 justify-items-center'>
                {Array.from({ length: length}).map((recipe, index) => (
                    <Recipe key={index} recipe={recipe} />
                ))}
            </div>
            <button 
              onClick={() => seeMore ? navigate(seeMore) : null}
              className='self-center px-5 py-1 mt-8 text-lg border-2 rounded-md border-blue-rich text-blue-rich'
            >See More</button>
        </div>
    </section>
  )
}

export default Recipes
