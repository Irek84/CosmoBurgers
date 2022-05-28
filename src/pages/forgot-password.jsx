import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPasswordEnhancer, RESET_PASSWORD_SET_EMAIL } from '../services/actions/user';

import styles from './page.module.css';

const ForgotPasswordPage = () => {
    const dispatch = useDispatch();
    const {
        resetPasswordRequest,
        resetPasswordFailed,
        resetPasswordEmail,
        resetPasswordMessage
    } = useSelector(store => store.user);

    const resetPassword = (e) => {
        e.preventDefault()
        if (resetPasswordEmail.length)
            dispatch(resetPasswordEnhancer(resetPasswordEmail));
    }
    const setEmail = (e) => {   
        dispatch({
            type: RESET_PASSWORD_SET_EMAIL,
            email: e.target.value
        });
    }
    const isAccessTokenExist = document.cookie.indexOf('accessToken=') !== -1;

    return (
        isAccessTokenExist ?
        <Redirect to={'/'} />
        :
        (!resetPasswordFailed && resetPasswordMessage) ?
        <Redirect to={'/reset-password'} /> 
        :
        <form className={styles.main} onSubmit={resetPassword}>
            <section className={styles.container}>
                <h1 className='text_type_main-medium mb-6'>Восстановление пароля</h1>
                <div className='mb-6'>
                    <Input
                        type={'email'}
                        placeholder={'Укажите e-mail'}
                        name={'E-mail'}
                        size={'default'}
                        value={resetPasswordEmail || ""}
                        onChange={(e) => setEmail(e)}
                    />
                </div>

                <Button
                    type="primary"
                    size="medium">
                    Восстановить
                </Button>

                <p className='text text_type_main-default text_color_inactive mt-20'>
                    <span>Вспомнили пароль? </span>
                    <Link to='/login'>Войти</Link>
                </p>

            </section>
        </form>

    );
}

export default ForgotPasswordPage;