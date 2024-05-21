import React from 'react';
import MainLayout from '../components/MainLayout';
import Recipes from '../components/Recipes';

const Home = () => {
  return (
    <MainLayout>
      <Recipes title='My Recipes' length={3} seeMore='/my-recipes' />
      <Recipes title='Saved Recipes' length={3} seeMore='/saved-recipes' />
      <Recipes title='Discover' length={18} />
    </MainLayout>
  )
}

export default Home
