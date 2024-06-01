import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadRecipe, editRecipe } from '../services/recipesServices'; 
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';

const RecipeForm = ({ action, defaultData }) => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const userInfo = useSelector(state => state.user.userInfo);
    const navigate = useNavigate();
    const { control, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: defaultData?.title || '',
            category: defaultData?.category || '',
            ingredients: defaultData?.ingredients || [''],
            totalTime: defaultData?.totalTime || '',
            description: defaultData?.description || ''
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ingredients'
    });

    const {mutate: publish, isLoading: publishIsLoading} = useMutation({
        mutationFn: (data) => uploadRecipe(userInfo.token, data),
        onSuccess: (data) => {
            toast.success('Recipe published successfully');
            queryClient.invalidateQueries(['MyRecipes', 'Discover']);
            navigate(`/recipe/${data._id}`);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
    
    const {mutate: edit, isLoading: editIsLoading} = useMutation({
        mutationFn: (data) => editRecipe(userInfo.token, data),
        onSuccess: (data) => {
            toast.success('Recipe edited successfully');
            queryClient.invalidateQueries([`recipe/${id}`]);
            navigate(`/recipe/${data._id}`);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
    
    const onSubmit = data => {
        if(data){
            if(action === 'Publish') publish(data);
            if(action === 'Edit'){
                data._id = id;
                edit(data);
            } 
        }
    };

    return (
        <section className='container px-5 py-10'>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col items-center gap-8 mx-auto mb-12 w-fit md:items-start md:justify-start lg:gap-10 md:flex-row'
            >
                <div className='w-48 h-48 rounded-md lg:w-64 lg:h-64 bg-blue-rich' />

                <div className='flex flex-col gap-5 lg:gap-5 text-blue-rich'>
                    <div className='flex flex-col items-start gap-1'>
                        <div className='flex items-center justify-center gap-5'>
                            <label htmlFor="title" className='text-xl font-bold rounded-md md:text-2xl'>Recipe Title</label>
                            <input 
                                id='title' 
                                placeholder='recipe title...' 
                                {...register('title', { required: true })}
                                className={`px-2 py-1 bg-transparent border rounded-md outline-none border-blue-rich ${errors.title ? 'border-red-500' : ''}`} 
                            />
                            {errors.title && <span className="text-red-500">Title is required</span>}
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-2'>
                        <label htmlFor='category' className='text-base italic font-semibold'>Category:</label>
                        <select 
                            id="category" 
                            {...register('category', { required: true })}
                            className={`bg-transparent outline-none ${errors.category ? 'border-red-500' : ''}`} 
                            aria-label="Select category"
                        >
                            <option value="">Categories</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                            <option value="dessert">Dessert</option>
                            <option value="snack">Snack</option>
                        </select>
                        {errors.category && <span className="text-red-500">Category is required</span>}
                    </div>

                    <div className='flex flex-wrap max-w-xl gap-2'>
                        <label htmlFor='ingredients' className='text-base italic font-semibold'>Ingredients:</label>
                        <div className='flex flex-wrap gap-2'>
                            {fields.map((item, index) => (
                                <div key={item.id} className='flex items-center gap-1 border rounded-md border-blue-rich'>
                                    <input 
                                        placeholder={`ingredient ${index + 1}`} 
                                        {...register(`ingredients.${index}`, { required: true })}
                                        className={`px-2 py-1 bg-transparent rounded-md outline-none w-[150px] ${errors.ingredients && errors.ingredients[index] ? 'border-red-500' : ''}`} 
                                    />
                                    <div className='border-l-2 border-blue-rich' />
                                    <button 
                                        type="button" 
                                        onClick={() => remove(index)} 
                                        className='px-2 py-1 rounded-md'
                                    >x</button>
                                </div>
                            ))}
                            {errors.ingredients && errors.ingredients.map((error, index) => (
                                error && <span key={index} className="text-red-500">Ingredient {index + 1} is required</span>
                            ))}
                        </div>
                        <button 
                            type="button"
                            disabled={publishIsLoading || editIsLoading}
                            onClick={() => append('')}
                            className='px-2 py-1 border rounded-md disabled:cursor-not-allowed disabled:opacity-80 border-blue-rich'
                        >Add more</button>
                    </div>

                    <div className='flex flex-wrap items-center gap-2'>
                        <label htmlFor='totalTime' className='text-base italic font-semibold'>Time:</label>
                        <input 
                            id='totalTime' 
                            type="text" 
                            placeholder='time' 
                            {...register('totalTime', { 
                                pattern: {
                                    value: /^\d+$/,
                                    message: 'Time can only be integer',
                                },
                                required: {
                                    value: true,
                                    message: 'Total time is required'
                                } 
                            })}
                            className={`px-2 py-1 bg-transparent border rounded-md outline-none w-[150px] border-blue-rich ${errors.totalTime ? 'border-red-500' : ''}`} 
                        />
                        <p>minutes</p>
                        {errors.totalTime && <span className="text-red-500">{errors.totalTime.message}</span>}
                    </div>

                    <div className='flex flex-col gap-3'>
                        <label htmlFor='description' className='text-base italic font-semibold'>Description:</label>
                        <textarea 
                            id="description" 
                            placeholder='Try to write detailed step by step instruction...' 
                            {...register('description', { required: true })}
                            className={`w-full h-[100px] p-2 bg-transparent border rounded-md resize-none border-blue-rich ${errors.description ? 'border-red-500' : ''}`} 
                        />
                        {errors.description && <span className="text-red-500">Description is required</span>}
                    </div>
                    <button type="submit" disabled={publishIsLoading || editIsLoading} className='px-4 py-2 text-white rounded-md disabled:opacity-80 disabled:cursor-not-allowed bg-blue-rich'>{action} Recipe</button>
                </div>
            </form>
        </section>
    );
};

export default RecipeForm;
