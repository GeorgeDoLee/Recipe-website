import React from 'react'
import { useNavigate, useParams } from 'react-router'
import MainLayout from '../components/MainLayout';
import Recipes from '../components/Recipes';
import { getRecipe, getRecipes } from '../services/recipesServices';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '../services/userServices';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../store/reducers/userReducers';
import toast from 'react-hot-toast';

const RecipePage = () => {
    const { id } = useParams();
    const userInfo = useSelector(state => state.user.userInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { data: recipe, isLoading: recipeIsLoading, error: recipeError } = useQuery({
        queryFn: () => {
            return getRecipe(id);
        },
        queryKey: [`recipe/${id}`]
    })

    const {
        data: similarRecipes,
        isFetching: similarRecipesIsFetching,
        isFetchingNextPage: similarRecipesIsFetchingNextPage,
        error: similarRecipesError,
        fetchNextPage: fetchSimilarRecipesNextPage,
        hasNextPage: similarRecipesHasNextPage
      } = useInfiniteQuery({
        queryKey: [`similarRecipesTo${recipe?._id}`],
        queryFn: ({ pageParam = 1 }) => getRecipes(
            { 
                page: pageParam, 
                limit: 3
            },
            { 
                ingredients: recipe?.ingredients,
                _id: recipe?._id
            } 
        ),
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.length < 3 ? undefined : allPages.length + 1;
        }
    });

    const {mutate: updateSavedRecipes , isLoading: updateIsLoading} = useMutation({
        mutationFn: ({ _id, save }) => {
            return updateProfile({
                    token: userInfo.token,
                    userData: {
                        recipe: { _id, save }
                    }
                }
            );
        },
        onSuccess: (data) => {
            dispatch(setUserInfo(data));
            queryClient.invalidateQueries([`recipe/${id}`, 'profile']);
            toast.success('Saved recipes updated')
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const saveHandler = () => {
        const { _id } = recipe;
        updateSavedRecipes({
            _id,
            save: true
        })
    }
    
    const unsaveHandler = () => {
        const { _id } = recipe;
        updateSavedRecipes({
            _id,
            save: false
        })
    }
  return (
    <MainLayout>
        <section className='container px-10 py-10 lg:px-16'>
            <div className='flex flex-col items-center gap-8 mb-12 md:items-start md:justify-start lg:gap-10 md:flex-row'>
                <div className='w-48 h-48 rounded-md lg:w-64 lg:h-64 bg-blue-rich' />

                <div className='flex flex-col gap-5 lg:gap-5 text-blue-rich'>
                    <div className='flex flex-col self-start gap-1'>
                        <div className='flex flex-col gap-2 md:items-center md:flex-row'>
                            <h1 className='text-xl font-bold md:text-2xl'>{recipe?.title}</h1>
                            <span>star rating</span>
                            <button
                                onClick={() => saveHandler()} 
                                className={`px-5 py-2 ${userInfo?.savedRecipes?.includes(id) ? 'bg-blue-rich text-cornstick' : 'text-blue-rich bg-transparent'} border rounded-md cursor-pointer border-blue-rich`}
                            >
                                {userInfo?.savedRecipes?.includes(id) ? 'Saved' : 'Save Recipe' }
                            </button>
                            {userInfo?.savedRecipes?.includes(id) &&
                                <button 
                                    onClick={() => unsaveHandler()}
                                    className='px-5 py-2 border rounded-md cursor-pointer border-blue-rich'
                                >
                                    Unsave
                                </button>
                            }
                        </div>
                        <h2 onClick={() => navigate(`/profile/${recipe.author}/${recipe.authorId}`)} className='text-base md:text-lg'>{recipe?.author}</h2>
                    </div>

                    <div className='flex flex-wrap gap-2'>
                        <h2 className='text-base italic font-semibold'>ingredients:</h2>
                        <ul className='flex flex-wrap max-w-sm gap-3'>
                            {recipe?.ingredients.map((ingredient, index) => (
                                <li 
                                    key={index} 
                                    className='max-w-sm px-5 py-1 text-sm italic break-words whitespace-normal border rounded-md md:text-base border-blue-rich bg-blue-rich text-cornstick'
                                >
                                    {ingredient}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='flex flex-wrap items-center gap-2'>
                        <h2 className='text-base italic font-semibold'>time:</h2>
                        <p className='text-sm md:text-base'>{recipe?.totalTime} minutes</p>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <h2 className='text-base italic font-semibold'>Description:</h2>
                        <p className='max-w-sm text-sm break-words whitespace-normal lg:max-w-3xl md:text-base'>
                            {recipe?.description}
                        </p>
                    </div>
                </div>
            </div>
            <Recipes
                title="Similar Recipes"
                recipes={similarRecipes?.pages.flatMap(page => page) || []}
                fetchNextPage={fetchSimilarRecipesNextPage}
                isFetching={similarRecipesIsFetching}
                isFetchingNextPage={similarRecipesIsFetchingNextPage}
                hasNextPage={similarRecipesHasNextPage}
            />
        </section>
    </MainLayout>
  )
}

export default RecipePage
