import React, { useState } from 'react'
import styles from '../../assets/styles/Auth/Auth.module.css'

const AuthLogin = () => {
    const [values, setValues] = useState({ emailOuTelefone: '', senha: '' });
    const [errors, setErrors] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedValues = { ...values, [name]: value };

        setValues(updatedValues);

        const newErrors = { ...errors };
        if (!value.trim()) {
            newErrors[name] = "Este campo é obrigatório";
        } else {
            newErrors[name] = "";
        }
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((error) => error !== '');
        const hasEmptyFields = Object.values(updatedValues).some((val) => val.trim() === '');
        setIsButtonDisabled(hasErrors || hasEmptyFields);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isButtonDisabled) {
            console.log(values);
        }
    };

    return (
        <div className={`${styles.formularioContainer} ${styles.entrar}`}>
            <form onSubmit={handleSubmit}>
                <h1>Entrar</h1>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        id="emailOuTelefone"
                        name="emailOuTelefone"
                        placeholder=" "
                        value={values.emailOuTelefone}
                        onChange={handleChange}
                        autoComplete="on"
                    />
                    <label htmlFor="emailOuTelefone">E-mail ou número de telefone</label>
                    {errors.emailOuTelefone && (
                        <p className={styles.errorMessage}>{errors.emailOuTelefone}</p>
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
                <button
                    type="submit"
                    className={`${styles.auth} ${isButtonDisabled ? styles.buttonDisabled : ''}`}
                    disabled={isButtonDisabled}
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default AuthLogin
