'use client'

import Input from "@/app/components/inputs/input";
import AuthSocialButton from "./AuthSocialButton";
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { compare } from "bcrypt";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {

    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN')

    //loga se ainda estiver com o token ativo
    useEffect(() => {
        if(session?.status === 'authenticated'){
            // signOut();
            router.push('/users');
        }
    }, [session?.status, router]);

    
    const toggleVariant = useCallback(() => {
        if(variant === 'LOGIN'){
            setVariant('REGISTER');
        }else {
            setVariant('LOGIN');
        }
    }, [variant]);


    const { register, handleSubmit, formState: { errors} } = useForm({});

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if ( variant === 'REGISTER') {
            axios.post('/api/register', data)
            .then(() => {
                signIn('credentials', data);
            })
            .catch(() => {
                toast.error('Alguma coisa está errada!')
            });
        }

        if ( variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then((callback) => {
                if(callback?.error) {
                    toast.error('Credenciais erradas!') 
                }else {
                    toast.success('Login efetuado com sucesso!');
                    router.push('/users');
                }
            });

        }
    };

    const socialAction = async (action: string) => {

        signIn(action, { redirect: false})
        .then((callback) => {
            if(callback?.error) {
                toast.error('Erro ao fazer o login!');
            }
            if(callback?.ok && !callback?.error) {
                toast.success('Logged in!');
                router.push('/users');
            }
        })
    }

    return (
        <>
            <h1 className='text-white text-4xl mb-8 font-sans font-semibold'>
                {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>

                { variant === 'REGISTER' && (
                    <Input 
                        id='name'
                        label='name'
                        type='text'
                        required={true}
                        register={register}
                    />
                )}
                <Input 
                    id='email'
                    label='Email address or phone number'
                    type='email'
                    required={true}
                    register={register}
                />
                <Input 
                    id='password'
                    label='Password'
                    type='password'
                    required={true}
                    register={register}
                />
            
                <button className='bg-red-600 rounded-md text-white text-sm w-full py-3 mt-5 font-semibold'>
                    {variant === 'LOGIN'? 'Login' : 'Register'}
                </button>
            </form>
            <div className='mt-6 flex gap-3 justify-center items-center mb-8'>
                <AuthSocialButton icon={FcGoogle} onClick={() => socialAction('google')}/>
                <AuthSocialButton icon={FaFacebook} onClick={() => socialAction('facebook')} />
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
                <div className="text-gray-500 text-xs font-medium">
                    { variant === 'LOGIN' ? 'First time using Netflix?' : 'Alredy have an account?'} 
                </div>
                <div onClick={toggleVariant} className="text-white text-[13px] font-semibold cursor-pointer" >
                    { variant === 'LOGIN' ? 'Create an Account' : 'Login'}
                </div>
            </div>

        </>
    );
}
 
export default AuthForm;