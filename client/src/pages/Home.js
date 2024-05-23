import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import MainLayout from '../components/MainLayout';
import Recipes from '../components/Recipes';
import { getRecipes } from '../services/recipesServices';
import { useSelector } from 'react-redux';

const Home = () => {
  const userInfo = useSelector(state => state.user.userInfo);

  const {
    data: myRecipes,
    isFetching: myRecipesIsFetching,
    isFetchingNextPage: myRecipesIsFetchingNextPage,
    error: myRecipesError,
    fetchNextPage: fetchMyRecipesNextPage,
    hasNextPage: myRecipesHasNextPage
  } = useInfiniteQuery({
    queryKey: ['myRecipes'],
    queryFn: ({ pageParam = 1 }) => getRecipes(
      { 
        page: pageParam, 
        limit: 3 
      },
      { 
        authorId: userInfo._id 
      }
    ),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < 3 ? undefined : allPages.length + 1;
    }
  });

  const {
    data: discoverRecipes,
    isFetching: discoverRecipesIsFetching,
    isFetchingNextPage: discoverRecipesIsFetchingNextPage,
    error: discoverRecipesError,
    fetchNextPage: fetchDiscoverRecipesNextPage,
    hasNextPage: discoverHasRecipesNextPage
  } = useInfiniteQuery({
    queryKey: ['discoverRecipes'],
    queryFn: ({ pageParam = 1 }) => getRecipes(
      { 
        page: pageParam, 
        limit: 9
      }
    ),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < 9 ? undefined : allPages.length + 1;
    }
  });

  return (
    <MainLayout>
      <Recipes
        title="My Recipes"
        recipes={myRecipes?.pages.flatMap(page => page) || []}
        fetchNextPage={fetchMyRecipesNextPage}
        isFetching={myRecipesIsFetching}
        isFetchingNextPage={myRecipesIsFetchingNextPage}
        hasNextPage={myRecipesHasNextPage}
      />
      <Recipes  
        title="Saved Recipes" 
        recipes={[]} 
        isFetching={myRecipesIsFetching}
      />
      <Recipes
        title="Discover"
        recipes={discoverRecipes?.pages.flatMap(page => page) || []}
        fetchNextPage={fetchDiscoverRecipesNextPage}
        isFetching={discoverRecipesIsFetching}
        isFetchingNextPage={discoverRecipesIsFetchingNextPage}
        hasNextPage={discoverHasRecipesNextPage}
      />
    </MainLayout>
  );
};

export default Home;
