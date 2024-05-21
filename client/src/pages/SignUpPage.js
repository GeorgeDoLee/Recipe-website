import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import MainLayout from '../components/MainLayout'
import { useMutation } from '@tanstack/react-query';
import { signup } from '../services/authServices';
import { setUserInfo } from '../store/reducers/userReducers'

const formItems = [
    {
        id: 'name',
        text: 'Name',
        type: 'text',
        minLength: '1',
        pattern: {
            value: /^[a-z0-9_.-]+$/,
            message: 'You can only use lowercase letters, digits and symbols: _ - .',
        }
    },
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
    {
        id: 'confirmPassword',
        text: 'Confirm Password',
        type: 'password',
        minLength: 8,
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_-]+$/,
            message: 'Password should contain at least one: [a-z] [A-Z] [0-9]'
        }
    }
]

const FormItemsRenderer = ({item, register, errors, password}) => {
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
                    validate: item.id === 'confirmPassword' ? (value) => {
                        if(value !== password){
                            return 'Passwords do not match'
                        }
                    } : null,
                })}
                placeholder={item.id === 'confirmPassword' ? item.text : `Enter ${item.text.toLowerCase()}`} 
                className='p-2 mt-2 bg-transparent border rounded-md outline-none border-blue-rich'
            />
            {errors[item.id]?.message && (
                <p className='text-red-500 text-md'>{errors[item.id].message}</p>
            )}
        </div>
    );
}
 
const SignUpPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.userInfo);
    const { register, handleSubmit, formState: {errors, isValid}, watch} = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        mode: 'onChange'
    })

    const {mutate, isLoading} = useMutation({
        mutationFn: ({name, email, password}) => {
            return signup({name, email, password});
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

    const password = watch('password');

    const submitHandler = (data) => {
        const {name, email, password} = data;
        mutate({name, email, password});
    }

  return (
    <MainLayout>
        <section className='container py-20'>
            <div className='flex flex-col w-[80%] sm:w-full max-w-sm mx-auto'>
                <h1 className='self-center text-xl font-semibold text-blue-rich'>Sign Up</h1>
                <form onSubmit={handleSubmit(submitHandler)}>
                    {formItems.map((item, index) => (
                        <FormItemsRenderer key={index} item={item} register={register} errors={errors} password={password} />
                    ))}
                    <button disabled={!isValid || isLoading} className='w-full py-2 mt-5 text-lg font-semibold text-center border-2 rounded-md disabled:opacity-70 disabled:cursor-not-allowed border-blue-rich'>REGISTER</button>
                </form>
                <div className='flex gap-2 mt-2 text-md text-blue-rich'>
                    <span>Already have an account?</span><Link to='/sign-in' className='text-blue-900'>Sign In</Link>
                </div>
            </div>
        </section>
    </MainLayout>
  )
}

export default SignUpPage
