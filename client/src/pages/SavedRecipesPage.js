import React from 'react'
import MainLayout from '../components/MainLayout'
import Recipes from '../components/Recipes'

const SavedRecipesPage = () => {
  return (
    <MainLayout>
        <Recipes title='Saved Recipes' length={18} />
    </MainLayout>
  )
}

export default SavedRecipesPage;
