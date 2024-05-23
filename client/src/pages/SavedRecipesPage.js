import React from 'react'
import MainLayout from '../components/MainLayout'
// import { useSelector } from 'react-redux';
import Recipes from '../components/Recipes';

const SavedRecipesPage = () => {
    // const loggedUser = useSelector(state => state.user.userInfo);

  return (
    <MainLayout>
        <Recipes
            title="Saved Recipes"
            recipes={[]}
        />
    </MainLayout>
  )
}

export default SavedRecipesPage
