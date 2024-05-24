import React, { useEffect } from 'react'
import MainLayout from '../components/MainLayout'
import { useSelector } from 'react-redux';
import Recipes from '../components/Recipes';
import { getRecipes } from '../services/recipesServices';
import { useInfiniteQuery } from '@tanstack/react-query';

const SavedRecipesPage = () => {
    const userInfo = useSelector(state => state.user.userInfo);

    const {
      data: savedRecipes,
      isFetching: savedRecipesIsFetching,
      isFetchingNextPage: savedRecipesIsFetchingNextPage,
      error: savedRecipesError,
      fetchNextPage: fetchSavedRecipesNextPage,
      hasNextPage: savedRecipesHasNextPage
    } = useInfiniteQuery({
      queryKey: ['savedRecipes'],
      queryFn: ({ pageParam = 1 }) => getRecipes(
        { 
          page: pageParam, 
          limit: 3 
        },
        { 
          _id: userInfo.savedRecipes
        }
      ),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length < 3 ? undefined : allPages.length + 1;
      }
    });

  return (
    <MainLayout>
        <Recipes  
          title="Saved Recipes" 
          recipes={savedRecipes?.pages.flatMap(page => page) || []}
          fetchNextPage={fetchSavedRecipesNextPage}
          isFetching={savedRecipesIsFetching}
          isFetchingNextPage={savedRecipesIsFetchingNextPage}
          hasNextPage={savedRecipesHasNextPage}
        />
    </MainLayout>
  )
}

export default SavedRecipesPage
