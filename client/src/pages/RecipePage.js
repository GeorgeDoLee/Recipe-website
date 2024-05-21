import React from 'react'
import { useNavigate, useParams } from 'react-router'
import MainLayout from '../components/MainLayout';
import Recipes from '../components/Recipes';

const ingredients = ['eggs', 'bread', 'cheese', 'oil', 'water', 'salt', 'pepper']

const RecipePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
  return (
    <MainLayout>
        <section className='container px-10 py-10 lg:px-16'>
            <div className='flex flex-col items-center gap-8 mb-12 md:items-start md:justify-start lg:gap-10 md:flex-row'>
                <div className='w-48 h-48 rounded-md lg:w-64 lg:h-64 bg-blue-rich' />

                <div className='flex flex-col gap-5 lg:gap-5 text-blue-rich'>
                    <div className='flex flex-col self-start gap-1'>
                        <div className='flex flex-col gap-2 md:items-center md:flex-row'>
                            <h1 className='text-xl font-bold md:text-2xl'>Scrambled egg</h1>
                            <span>star rating</span>
                        </div>
                        <h2 onClick={() => navigate('/profile/alonso')} className='text-base md:text-lg'>George Dolidze</h2>
                    </div>

                    <div className='flex flex-wrap gap-2'>
                        <h2 className='text-base italic font-semibold'>ingredients:</h2>
                        <ul className='flex flex-wrap max-w-sm gap-3'>
                            {ingredients.map((ingredient, index) => (
                                <li key={index} className='max-w-sm px-5 py-1 text-sm italic break-words whitespace-normal border rounded-md md:text-base border-blue-rich bg-blue-rich text-cornstick'>{ingredient}</li>
                            ))}
                        </ul>
                    </div>

                    <div className='flex flex-wrap items-center gap-2'>
                        <h2 className='text-base italic font-semibold'>time:</h2>
                        <p className='text-sm md:text-base'>30 minutes</p>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <h2 className='text-base italic font-semibold'>Description:</h2>
                        <p className='max-w-sm text-sm break-words whitespace-normal lg:max-w-3xl md:text-base'>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum quas libero quae, voluptatibus provident velit eum. Quis sequi reprehenderit, totam, molestiae excepturi consectetur placeat tenetur non blanditiis, optio nobis inventore.
                        </p>
                    </div>
                </div>
            </div>
            <Recipes title='Similar Recepies' length={6} />
        </section>
    </MainLayout>
  )
}

export default RecipePage
