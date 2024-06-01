import React from 'react';
import { CiSearch } from "react-icons/ci";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const SearchBar = ({defaultFilters, placeholder}) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    const { category, title } = data;
    let queryString = '';

    if(defaultFilters){
        Object.keys(defaultFilters).forEach(key => {
            queryString += `${key}=${encodeURIComponent(defaultFilters[key])}&`;
        });
    }

    if (category) {
        queryString += `category=${encodeURIComponent(category)}&`;
    }

    if (title) {
        queryString += `title=${encodeURIComponent(title)}&`;
    }

    navigate(`/search-results?${queryString}`);
};


  return (
    <section className='container px-5 mt-8'>
      <form 
        className='flex items-center max-w-lg gap-4 mx-auto text-blue-rich' 
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex gap-2 p-2 text-base border rounded-md border-blue-rich'>
          <label htmlFor="category" className='sr-only'>Category</label>
          <select 
            {...register("category")}
            id="category" 
            className='bg-transparent outline-none' 
            aria-label="Select category"
          >
            <option value="">Categories</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="dessert">Dessert</option>
            <option value="snack">Snack</option>
          </select>
          <div className='border-r border-blue-rich' />
          <label htmlFor="title" className='sr-only'>Search</label>
          <input 
            {...register("title")}
            type="text" 
            id="title" 
            placeholder={placeholder}
            className='w-[300px] bg-transparent outline-none' 
            aria-label="Search input"
          />
        </div>
        <div>
          <button 
            type="submit" 
            className='flex items-center gap-1 p-2 text-base border rounded-md border-blue-rich'
            aria-label="Search button"
          >
            <CiSearch className='w-5 h-auto' /> Search
          </button>
        </div>
      </form>
    </section>
  )
}

export default SearchBar;
