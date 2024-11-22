import React, { useState } from 'react'
import styles from '../../assets/styles/Auth/Auth.module.css'

const AuthLogin = () => {
    const [values, setValues] = useState({ email: '', senha: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));

        if (!value) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "Este campo é obrigatório",
            }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
    };

    return (
        <div className={`${styles.formularioContainer} ${styles.entrar}`}>
            <form onSubmit={handleSubmit}>
                <h1>Entrar</h1>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder=" "
                        value={values.email}
                        onChange={handleChange}
                        autoComplete="on"
                    />
                    <label htmlFor="email">E-mail ou número de telefone</label>
                    {errors.email && (
                        <p className={styles.errorMessage}>{errors.email}</p>
                    )}
                </div>
                <div className={styles.inputContainer}>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder=" "
                        value={values.senha}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <label htmlFor="senha">Senha</label>
                    {errors.senha && (
                        <p className={styles.errorMessage}>{errors.senha}</p>
                    )}
                </div>
                <a href="/user/reset-password">Esqueceu sua senha?</a>
                <button type="submit" className={styles.auth}>
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default AuthLogin
