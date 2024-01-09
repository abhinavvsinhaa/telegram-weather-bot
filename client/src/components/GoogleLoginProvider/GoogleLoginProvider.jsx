import { GoogleLogin } from '@react-oauth/google';

export const GoogleLoginProvider = () => {
    const onSuccessHandler = (credentialResponse) => {
        console.log(credentialResponse)
    }

    const onErrorHandler = () => {
        console.log('login failed');
    }

    return (
        <GoogleLogin 
            onSuccess={onSuccessHandler}
            onError={onErrorHandler}
        />
    );
}