import React from 'react';
import MainLayout from '../components/MainLayout';
import Recipes from '../components/Recipes';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const userInfo = useSelector(state => state.user.userInfo);
  
  return (
    <MainLayout>
      <SearchBar placeholder='Search...' />
      <Recipes title='My Recipes' limit={3} filters={ {authorId: userInfo._id} } qKey='MyRecipes' />
      <Recipes title='Saved Recipes' limit={3} filters={ {_id: userInfo.savedRecipes || []} } qKey='SavedRecipes' />
      <Recipes title='Discover' limit={6} filters={null} qKey='Discover' />
    </MainLayout>
  );
};

export default Home;
