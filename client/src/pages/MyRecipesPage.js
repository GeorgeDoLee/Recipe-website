import React from 'react'
import MainLayout from '../components/MainLayout'
import { useSelector } from 'react-redux';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getRecipes } from '../services/recipesServices';
import Recipes from '../components/Recipes';

const MyRecipesPage = () => {
    const loggedUser = useSelector(state => state.user.userInfo);
    const {
        data: userRecipes,
        isFetching: userRecipesIsFetching,
        isFetchingNextPage: myRecipesIsFetchingNextPage,
        error: userRecipesError,
        fetchNextPage: fetchUserRecipesNextPage,
        hasNextPage: userRecipesHasNextPage
      } = useInfiniteQuery({
        queryKey: [`${loggedUser.name}Recipes`],
        queryFn: ({ pageParam = 1 }) => getRecipes(
            { 
                page: pageParam, 
                limit: 9 
            },
            {
                authorId: loggedUser._id
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
            recipes={userRecipes?.pages.flatMap(page => page) || []}
            fetchNextPage={fetchUserRecipesNextPage}
            isFetching={userRecipesIsFetching}
            isFetchingNextPage={myRecipesIsFetchingNextPage}
            hasNextPage={userRecipesHasNextPage}
        />
    </MainLayout>
  )
}

export default MyRecipesPage
