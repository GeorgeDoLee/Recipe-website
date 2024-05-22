import React from 'react';
import { useQuery } from '@tanstack/react-query';

import MainLayout from '../components/MainLayout';
import Recipes from '../components/Recipes';
import {getRecipes} from '../services/recipesServices'
import { useSelector } from 'react-redux';

const Home = () => {
  const userInfo = useSelector(state => state.user.userInfo);
  const { data: myRecipes, isLoading: myRecipesAreLoading, error: myRecipesError } = useQuery({
      queryFn: () => {
          return getRecipes(userInfo._id);
      },
      queryKey: [`recipes/${userInfo ? userInfo._id : ''}`]
  })

  const { data: recipes, isLoading: recipesAreLoading, error: recipesError } = useQuery({
    queryFn: () => {
        return getRecipes();
    },
    queryKey: ['recipes']
  })

  return (
    <MainLayout>
      <Recipes title='My Recipes' length={3} seeMore='/my-recipes' recipes={myRecipes} />
      <Recipes title='Saved Recipes' length={3} seeMore='/saved-recipes' recipes={recipes} />
      <Recipes title='Discover' length={18} recipes={recipes} />
    </MainLayout>
  )
}

export default Home
