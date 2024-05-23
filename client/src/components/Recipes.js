import React, { useEffect } from 'react'
import Recipe from './Recipe';
import { useNavigate } from 'react-router';
import RecipeLoading from './loading components/RecipeLoading';

const Recipes = ({title, recipes, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage}) => {
  return (
    <section className='container px-5 py-5'>
        <div className='flex flex-col'>
            <h1 className='self-center text-xl font-semibold text-blue-rich'>{title}</h1>
            <div className='grid grid-cols-2 mt-5 gap-y-8 gap-x-8 md:gap-x-16 lg:grid-cols-3 justify-items-center'>
              {recipes && recipes.map((recipe, index) => (
                    <Recipe key={index} recipe={recipe} />
                  ))
              }
              {((isFetching && recipes.length === 0) || isFetchingNextPage) && Array.from({length: 3}).map((_, index) => (
                  <RecipeLoading key={index} />
                ))
              }
              {!isFetching && recipes.length === 0 && 
                <p className='text-base italic md:col-start-2 text-blue-rich'>No items yet</p>
              }
            </div>
            {hasNextPage &&
              <button 
                disabled={!hasNextPage || isFetching}
                onClick={() => fetchNextPage()}
                className='self-center px-5 py-1 mt-5 text-lg border-2 rounded-md disabled:opacity-70 disabled:cursor-not-allowed border-blue-rich text-blue-rich'
              >See More</button>
            }
        </div>
    </section>
  )
}

export default Recipes
