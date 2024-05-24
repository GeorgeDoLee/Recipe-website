import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'

import { deleteProfile, updateProfile } from '../../services/userServices'
import { setUserInfo } from '../../store/reducers/userReducers'

const formItems = [
    {
        id: 'newName',
        text: 'New Name',
        type: 'text',
        minLength: '1',
        pattern: {
            value: /^[a-z0-9_.-]+$/,
            message: 'You can only use lowercase letters, digits and symbols: _ - .',
        }
    },
    {
        id: 'newEmail',
        text: 'New Email',
        type: 'email',
        minLength: 0,
        pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
            message: 'Enter correct email address'
        }
    },
    {
        id: 'newPassword',
        text: 'New Password',
        type: 'password',
        minLength: 8,
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_-]+$/,
            message: 'Password should contain at least one: [a-z] [A-Z] [0-9]'
        }
    },
    {
        id: 'confirmNewPassword',
        text: 'Confirm New Password',
        type: 'password',
        minLength: 8,
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_-]+$/,
            message: 'Password should contain at least one: [a-z] [A-Z] [0-9]'
        }
    }
]

const FormItemsRenderer = ({item, register, errors, newPassword}) => {
    return (
        <div className='flex flex-col text-blue-rich'>
            <label htmlFor={item.id} className='mb-2 font-semiboldasd'>{item.text}</label>
            <input 
                type={item.type} 
                {...register(item.id, {
                    pattern: {
                        value: item.pattern.value,
                        message: item.pattern.message,
                    },
                    minLength: {
                        value: item.minLength,
                        message: `${item.text} length must be at least ${item.minLength} characters`
                    },
                    required: {
                        value: item.id === 'confirmNewPassword' && newPassword ? true : false,
                        message: `${item.text} is required`
                    },
                    validate: item.id === 'confirmNewPassword' ? (value) => {
                        if(value !== newPassword){
                            return 'Passwords do not match'
                        }
                    } : null,
                })}
                placeholder={item.id === 'confirmNewPassword' ? item.text : `Enter ${item.text.toLowerCase()}`} 
                className='p-2 bg-transparent border-2 rounded-md border-blue-rich'
            />
            {errors[item.id]?.message && (
                <p className='text-red-500 text-md'>{errors[item.id].message}</p>
            )}
        </div>
    )
}

const EditProfile = () => {
    const userInfo = useSelector(state => state.user.userInfo);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors, isValid}, watch} = useForm({
        defaultValues: {
            newName: userInfo?.name ? userInfo.name : '',
            newEmail: userInfo?.email ? userInfo.email : '',
            newPassword: '',
            confirmNewPassword: ''
        },
        mode: 'onChange'
    })

    const {mutate: update , isLoading: updateIsLoading} = useMutation({
        mutationFn: ({newName, newEmail, newPassword}) => {
            return updateProfile({
                    token: userInfo.token,
                    userData: {newName, newEmail, newPassword}
                }
            );
        },
        onSuccess: (data) => {
            dispatch(setUserInfo(data));
            localStorage.setItem('account', JSON.stringify(data));
            queryClient.invalidateQueries(['profile']);
            toast.success('Profile updated successfully')
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const {mutate: deleteMyProfile, isLoading: deletionIsLoading} = useMutation({
        mutationFn: () => {
            return deleteProfile({
                token: userInfo.token,
            })
        },
        onSuccess: () => {
            dispatch(setUserInfo(null));
            localStorage.setItem('account', JSON.stringify(null));
            queryClient.invalidateQueries([`profile/${userInfo._id}`]);
            toast.success('Profile Deleted successfully')
            navigate('/');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const newPassword = watch('newPassword')

    const submitHandler = (data) => {
        const {newName, newEmail, newPassword} = data;
        update({newName, newEmail, newPassword});
    }

    const deleteHandler = (e) => {
        e.preventDefault();
        deleteMyProfile();
    }

    useEffect(() => {
        if(!userInfo){
            navigate('/');
        }
    }, [userInfo, navigate]);

  return (
    <div className='flex flex-col self-stretch max-w-sm mx-auto'>
        <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-2'>
            {formItems.map((item, index) => (
                <FormItemsRenderer key={index} item={item} register={register} errors={errors} newPassword={newPassword} />
            ))}
            <div className='flex justify-between mt-2 text-blue-rich'>
                <button disabled={updateIsLoading || deletionIsLoading} onClick={() => navigate(`/profile/${userInfo.name}/${userInfo._id}`)} className='px-1 py-1 text-sm border rounded-md sm:px-2 sm:text-base disabled:cursor-not-allowed disabled:opacity-70 border-blue-rich'>
                    Cancel
                </button>
                <div className='flex gap-2'>
                    <button 
                        disabled={deletionIsLoading}
                        onClick={(e) => deleteHandler(e)} 
                        className='px-1 py-1 text-sm text-red-500 border border-red-500 rounded-md sm:px-2 sm:text-base disabled:cursor-not-allowed disabled:opacity-70'
                    >
                        Delete Account
                    </button>
                    <button 
                        disabled={updateIsLoading || !isValid}
                        type='submit'
                        className='px-1 py-1 text-sm border rounded-md sm:px-2 sm:text-base disabled:cursor-not-allowed disabled:opacity-70 border-blue-rich'
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default EditProfile
