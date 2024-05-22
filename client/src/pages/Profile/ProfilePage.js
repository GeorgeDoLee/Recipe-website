import React, { useEffect } from 'react';
import { TbUserSquare } from "react-icons/tb";
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';

import MainLayout from '../../components/MainLayout';
import {getUserProfile} from '../../services/userServices';
import Recipes from '../../components/Recipes';
import { getRecipes } from '../../services/recipesServices';

const ProfilePage = () => {
    const { username, id } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const user = useSelector(state => state.user.userInfo);
    const { data: userInfo, isLoading: profileIsLoading, error: profileError } = useQuery({
        queryFn: () => {
            return getUserProfile(id);
        },
        queryKey: [`profile/${id}`]
    })

    const { data: usersRecipes, isLoading: usersRecipesAreLoading, error: usersRecipesError } = useQuery({
        queryFn: () => {
            return getRecipes(userInfo._id);
        },
        queryKey: [`recipes/${userInfo ? userInfo._id : ''}`]
    })

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
                                {username === user?.name && 
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
                    username === user?.name ?
                        <>
                            <Recipes title='My Recipes' length={3} recipes={usersRecipes} />
                            <Recipes title='Saved Recipes' length={3} />
                        </>
                        :
                        <>
                            {userInfo && <Recipes title={`${userInfo.name}\'s Recipes`} length={6} recipes={usersRecipes} />}
                        </>
                    : null
                }
                <Outlet />
            </section>
        </MainLayout>
    );
}

export default ProfilePage;
