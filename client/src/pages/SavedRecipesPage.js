import React from 'react'
import MainLayout from '../components/MainLayout'
import { useSelector } from 'react-redux';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';

const SavedRecipesPage = () => {
    const userInfo = useSelector(state => state.user.userInfo);

  return (
    <MainLayout>
      <SearchBar defaultFilters={ {_id: userInfo.savedRecipes || []} } placeholder='Search in saved recipes...' />
      <Recipes title='Saved Recipes' limit={9} filters={ {_id: userInfo.savedRecipes || []} } qKey='SavedRecipes' />
    </MainLayout>
  )
}

export default SavedRecipesPage
