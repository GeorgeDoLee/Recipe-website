import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

import MainLayout from '../components/MainLayout'
import { getRecipe } from '../services/recipesServices';
import RecipeForm from '../components/RecipeForm';

 
const EditRecipePage = () => {
  const { id } = useParams();
  const { data: recipe, isLoading, error } = useQuery({
      queryFn: () => {
          return getRecipe(id);
      },
      queryKey: [`recipe/${id}`]
  })
 
  return (
    <MainLayout>
        {isLoading && <p>Loading...</p> }
        {error && <p>{error}</p> }
        {recipe && <RecipeForm action='Edit' defaultData={recipe} />}
    </MainLayout>
  )
}

export default EditRecipePage
