import React from 'react'
import MainLayout from '../components/MainLayout'
import { useSelector } from 'react-redux';
import Recipes from '../components/Recipes';

const SavedRecipesPage = () => {
    const userInfo = useSelector(state => state.user.userInfo);

  return (
    <MainLayout>
      <Recipes title='Saved Recipes' limit={9} filters={ {_id: userInfo.savedRecipes || []} } qKey='SavedRecipes' />
    </MainLayout>
  )
}

export default SavedRecipesPage
