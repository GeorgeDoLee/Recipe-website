import React, { useEffect, useState } from 'react';
import { TbUserSquare } from "react-icons/tb";
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import MainLayout from '../../components/MainLayout';
import {getUserProfile} from '../../services/userServices';
import Recipes from '../../components/Recipes';
import { getRecipes } from '../../services/recipesServices';

const ProfilePage = () => {
    const { username, id } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const loggedUser = useSelector(state => state.user.userInfo);
    const { data: userInfo, isLoading: profileIsLoading, error: profileError } = useQuery({
        queryFn: () => {
            return getUserProfile(id);
        },
        queryKey: ['profile']
    })

    const {
        data: userRecipes,
        isFetching: userRecipesIsFetching,
        isFetchingNextPage: myRecipesIsFetchingNextPage,
        error: userRecipesError,
        fetchNextPage: fetchUserRecipesNextPage,
        hasNextPage: userRecipesHasNextPage
      } = useInfiniteQuery({
        queryKey: [`${username}Recipes`],
        queryFn: ({ pageParam = 1 }) => getRecipes(
            { 
                page: pageParam, 
                limit: 3
            },
            { 
                authorId: id
            } 
        ),
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.length < 3 ? undefined : allPages.length + 1;
        }
    });

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
            _id: userInfo.savedRecipes || []
          }
        ),
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.length < 3 ? undefined : allPages.length + 1;
        }
      });

    return (
        <MainLayout>
            <section className='container p-5 pb-12'>
                <div className='flex flex-col items-center max-w-sm gap-5 mx-auto'>
                    <div className='flex gap-5'>
                        {userInfo?.avatar ? (
                            <img src={userInfo?.avatar} alt="user image" className='w-20 h-auto sm:w-28' />
                        ) : (
                            <TbUserSquare className='w-20 h-auto sm:w-28 text-blue-rich' />
                        )}

                        <div className='flex flex-col justify-center gap-1 text-blue-rich'>
                            <p className='flex items-center justify-between gap-3 text-xl font-semibold sm:text-3xl'>
                                {userInfo?.name.toUpperCase()}
                                {id === loggedUser?._id && 
                                    <FaRegEdit 
                                        onClick={() => navigate(`/profile/${userInfo?.name}/${id}/edit`)} 
                                        className='w-6 h-auto' 
                                    />
                                }
                                {profileError && 
                                    <p>User Not Found</p>
                                }
                            </p>
                            <p className='text-base sm:text-lg'>{userInfo?.email}</p>
                        </div>
                    </div>
                </div> 
                {pathname.split('/')[4] !== 'edit' ? 
                    <>
                        <Recipes
                            title="My Recipes"
                            recipes={userRecipes?.pages.flatMap(page => page) || []}
                            fetchNextPage={fetchUserRecipesNextPage}
                            isFetching={userRecipesIsFetching}
                            isFetchingNextPage={myRecipesIsFetchingNextPage}
                            hasNextPage={userRecipesHasNextPage}
                        />
                        {id === loggedUser?._id && 
                            <Recipes  
                                title="Saved Recipes" 
                                recipes={savedRecipes?.pages.flatMap(page => page) || []}
                                fetchNextPage={fetchSavedRecipesNextPage}
                                isFetching={savedRecipesIsFetching}
                                isFetchingNextPage={savedRecipesIsFetchingNextPage}
                                hasNextPage={savedRecipesHasNextPage}
                            />
                        }
                    </>
                    : null
                }
                <Outlet />
            </section>
        </MainLayout>
    );
}

export default ProfilePage;
