import React from 'react'
import MainLayout from '../components/MainLayout'
import Recipes from '../components/Recipes'

const MyRecipesPage = () => {
  return (
    <MainLayout>
        <Recipes title='My Recipes' length={18} />
    </MainLayout>
  )
}

export default MyRecipesPage
