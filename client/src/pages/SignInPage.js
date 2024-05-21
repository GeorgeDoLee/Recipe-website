import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import MainLayout from '../components/MainLayout'
import { useMutation } from '@tanstack/react-query';
import { signin } from '../services/authServices';
import { setUserInfo } from '../store/reducers/userReducers'

const formItems = [
    {
        id: 'email',
        text: 'Email',
        type: 'email',
        minLength: 0,
        pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
            message: 'Enter correct email address'
        }
    },
    {
        id: 'password',
        text: 'Password',
        type: 'password',
        minLength: 8,
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_-]+$/,
            message: 'Password should contain at least one: [a-z] [A-Z] [0-9]'
        }
    },
]

const FormItemsRenderer = ({item, register, errors}) => {
    return (  
        <div className='flex flex-col mt-2'>
            <label htmlFor={item.id} className='text-lg text-blue-rich'>{item.text}</label>
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
                        value: true,
                        message: `${item.text} is required`
                    },
                })}
                placeholder={`Enter ${item.text.toLowerCase()}`} 
                className='p-2 mt-2 bg-transparent border rounded-md outline-none text-blue-rich border-blue-rich'
            />
            {errors[item.id]?.message && (
                <p className='text-base text-red-500'>{errors[item.id].message}</p>
            )}
        </div>
    );
}
const SignInPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.userInfo);
    const { register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange'
    })

    const {mutate, isLoading} = useMutation({
        mutationFn: ({email, password}) => {
            return signin({email, password});
        },
        onSuccess: (data) => {
            dispatch(setUserInfo(data));
            localStorage.setItem('account', JSON.stringify(data));
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })
    
    useEffect(() => {
        if(userInfo){
            navigate('/');
        }
    })

    const submitHandler = (data) => {
        const {name, email, password} = data;
        mutate({name, email, password});
    }

  return (
    <MainLayout>
        <section className='container py-20'>
            <div className='flex flex-col w-[80%] sm:w-full max-w-sm mx-auto'>
                <h1 className='self-center text-xl font-semibold text-blue-rich'>Sign In</h1>
                <form onSubmit={handleSubmit(submitHandler)}>
                    {formItems.map((item, index) => (
                        <FormItemsRenderer key={index} item={item} register={register} errors={errors} />
                    ))}
                    <button disabled={!isValid || isLoading} className='w-full py-2 mt-5 text-lg font-semibold text-center border-2 rounded-md disabled:opacity-70 disabled:cursor-not-allowed border-blue-rich'>SIGN IN</button>
                </form>
                <div className='flex gap-2 mt-2 text-base text-blue-rich'>
                    <span>Don't have an account?</span><Link to='/sign-up' className='text-blue-900'>Sign Up</Link>
                </div>
            </div>
        </section>
    </MainLayout>
  )
}

export default SignInPage
