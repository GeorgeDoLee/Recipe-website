import React from 'react'
import MainLayout from '../components/MainLayout';
import RecipeForm from '../components/RecipeForm';

const AddRecipePage = () => {

  return (
    <MainLayout>
        <RecipeForm action='Publish' />
    </MainLayout>
  )
}

export default AddRecipePage
