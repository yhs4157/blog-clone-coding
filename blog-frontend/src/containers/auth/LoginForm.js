import React, {useEffect} from 'react'; 
import {useDispatch, useSelector} from 'react-redux'; 
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initializeForm } from '../../modules/auth';


const LoginForm = () => {
    const dispatch = useDispatch(); 
    const {form} = useSelector(({auth}) => ({
        form: auth.login
    }));

    console.log(`loginForm: ${form}`); 

    const onChange = e => {
        const {value, name} = e.target; 
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })    
        );
    };

    const onSubmit = e => {
        e.preventDefault(); 
    }

    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    return (
        <div>
            <AuthForm
                type="login"
                form={form}
                onChange={onChange}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default LoginForm; 