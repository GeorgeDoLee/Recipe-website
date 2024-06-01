import React from 'react'
import MainLayout from '../components/MainLayout'
import { useSelector } from 'react-redux';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';

const MyRecipesPage = () => {
    const userInfo = useSelector(state => state.user.userInfo);

  return (
    <MainLayout>
      <SearchBar defaultFilters={ {authorId: userInfo._id} } placeholder='Search in your recipes...' />
      <Recipes title='My Recipes' limit={9} filters={ {authorId: userInfo._id} } qKey='MyRecipes' />
    </MainLayout>
  )
}

export default MyRecipesPage
