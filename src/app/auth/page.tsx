import Image from 'next/image'
import Input from '../components/inputs/input';
import AuthForm from './components/AuthForm';

const Auth = () => {
    return (  
        <div className="relative w-full h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className='bg-black h-full lg:bg-opacity-50'>
                <nav className='px-12 py-5'>
                    <Image src="/images/logo.png" alt="logo" height={140} width={140}/>
                </nav>


                <div className='flex justify-center'>
                    <div className='bg-black bg-opacity-80 lg:w-2/5 lg:max-w-md rounded-md w-full mt-2 px-16 py-16'>        
                        <AuthForm/>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Auth;