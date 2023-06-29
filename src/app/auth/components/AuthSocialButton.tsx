import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
    icon: IconType,
    onClick: () => void;
    color?: string;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({icon: Icon, onClick, color}) => {
    return ( 
        <button type='button' onClick={onClick}>
            <Icon color='#1977F3' size={32} className='rounded-full bg-white p-1'/>
        </button>
    );
}
 
export default AuthSocialButton;