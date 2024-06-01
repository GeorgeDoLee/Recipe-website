import React from 'react'

const RecipePageLoading = () => {
  return (
    <div className='flex flex-col items-center gap-8 mb-12 md:items-start md:justify-start lg:gap-10 md:flex-row'>
        <div className='w-48 h-48 rounded-md lg:w-64 lg:h-64 bg-blue-rich opacity-80 animate-pulse' />

        <div className='flex flex-col gap-5 lg:gap-5 text-blue-rich'>
            <div className='flex flex-col items-start gap-1 opacity-80 animate-pulse'>
                <div className='flex items-center justify-center gap-5'>
                    <h1 className='text-xl font-bold rounded-md md:text-2xl bg-blue-rich'>Recipe Title</h1>
                </div>
                <h2 className='text-base rounded-md md:text-lg bg-blue-rich'>Recipe Author</h2>
            </div>

            <div className='flex flex-wrap gap-2'>
                <h2 className='text-base italic font-semibold'>category:</h2>
                <p className='text-sm rounded-md md:text-base bg-blue-rich opacity-80 animate-pulse'>category</p>
            </div>

            <div className='flex flex-wrap gap-2'>
                <h2 className='text-base italic font-semibold'>ingredients:</h2>
                <ul className='flex flex-wrap max-w-sm gap-3'>
                    {Array.from({length: 3}).map((_, index) => (
                        <li 
                            key={index} 
                            className='px-5 py-1 text-sm border rounded-md md:text-base border-blue-rich bg-blue-rich opacity-80 animate-pulse'
                        >
                            tomatoes
                        </li>
                    ))}
                </ul>
            </div>

            <div className='flex flex-wrap items-center gap-2'>
                <h2 className='text-base italic font-semibold'>time:</h2>
                <p className='text-sm rounded-md md:text-base bg-blue-rich opacity-80 animate-pulse'>minutes</p>
            </div>

            <div className='flex flex-col gap-3'>
                <h2 className='text-base italic font-semibold'>Description:</h2>
                <p className='max-w-sm text-sm break-words whitespace-normal rounded-md lg:max-w-3xl md:text-base bg-blue-rich opacity-80 animate-pulse'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                    Veniam adipisci voluptate reiciendisa sapiente odio aliquam minus expedita architecto sed at laborum, nesciunt aut. 
                    Quae odio numquam molestias voluptatum dolorum!
                </p>
            </div>
        </div>
    </div>
  )
}

export default RecipePageLoading
