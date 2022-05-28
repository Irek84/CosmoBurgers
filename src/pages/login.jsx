import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { loginUserEnhancer } from '../services/actions/user';

import styles from './page.module.css';

const LoginPage = () => {
    const dispatch = useDispatch();

    const { loginUserRequest, loginUserFailed } = useSelector(state => state.user);
    const [values, setValues] = useState({});

    const handleChange = (event) => {
        setValues(values => {
            return { ...values, [event.target.name]: event.target.value };
        });
    };
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginUserEnhancer(values.email, values.password));
    }

    const isAccessTokenExist = document.cookie.indexOf('accessToken=') !== -1;

    return (
        isAccessTokenExist ?
            <Redirect to={'/'} />
            :
            <form className={styles.main} onSubmit={handleOnSubmit}>
                <section className={styles.container}>
                    <h1 className='text_type_main-medium mb-6'>Вход</h1>
                    <div className='mb-6'>
                        <Input
                            type={'email'}
                            placeholder={'E-mail'}
                            name={'email'}
                            size={'default'}
                            onChange={(e) => handleChange(e)}
                            value={values.email || ''}
                        />
                    </div>
                    <div className='mb-6'>
                        <PasswordInput
                            placeholder={'Пароль'}
                            name={'password'}
                            onChange={(e) => handleChange(e)}
                            value={values.password || ''}
                        />
                    </div>

                    <Button type="primary" size="medium">
                        Войти
                    </Button>
                    <span className={`${styles.error} text text_type_main-default mb-6 mt-6`} style={{ visibility: loginUserFailed ? "visible" : "hidden" }}>Неправильный логин или пароль</span>
                    <p className='text text_type_main-default text_color_inactive mb-4 mt-20'>
                        <span>Вы — новый пользователь? </span>
                        <Link to='/register'>Зарегистрироваться</Link>
                    </p>
                    <p className='text text_type_main-default text_color_inactive'>
                        <span>Забыли пароль? </span>
                        <Link to='/forgot-password'>Восстановить пароль</Link>
                    </p>

                </section>
            </form>

    );
}

export default LoginPage;