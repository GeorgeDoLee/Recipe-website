import React, { useEffect } from 'react';
import { TbUserSquare } from "react-icons/tb";
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';

import MainLayout from '../../components/MainLayout';
import {getUserProfile} from '../../services/userServices';

const ProfilePage = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.userInfo);
    const { data: userInfo, isLoading: profileIsLoading, error: profileError } = useQuery({
        queryFn: () => {
            return getUserProfile({ token: user.token });
        },
        queryKey: ['profile']
    })

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [navigate, user]);

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
                                <FaRegEdit onClick={() => navigate('/profile/edit')} className='w-6 h-auto' />
                            </p>
                            <p className='text-base sm:text-lg'>{userInfo?.email}</p>
                        </div>
                    </div>
                </div> 
                <Outlet />
            </section>
        </MainLayout>
    );
}

export default ProfilePage;
