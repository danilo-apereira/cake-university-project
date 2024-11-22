import React from 'react'
import { Helmet } from 'react-helmet-async'
import styles from '../../assets/styles/Auth/Auth.module.css'
import SITE_NAME from '../../config'
import { useSearchParams } from 'react-router-dom'
import logo from '../../assets/images/logo/fusionCake.png'
import AuthLogin from '../../components/Auth/AuthLogin'
import AuthRegister from '../../components/Auth/AuthRegister'

const registerMessages = [
    "Transforme cada pedaço em felicidade!",
    "Os momentos mais doces começam aqui.",
    "Entre para o mundo dos sabores inesquecíveis!",
    "A felicidade está a um cadastro de distância: descubra o doce em viver!"
];

const loginMessages = [
    "Bem-vindo de volta! Sua fatia de felicidade espera por você.",
    "Hora de continuar sua jornada doce!",
    "Bem-vindo ao seu lugar favorito.",
    "Os melhores momentos estão a um login de distância."
];

const Auth = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const status = searchParams.get('status') || 'login';
    const isActive = status === 'register';

    const randomRegisterMessage = React.useMemo(() => {
        return registerMessages[Math.floor(Math.random() * registerMessages.length)];
    }, []);

    const randomLoginMessage = React.useMemo(() => {
        return loginMessages[Math.floor(Math.random() * loginMessages.length)];
    }, []);

    const toggleToRegister = () => {
        setSearchParams({ status: 'register' });
        setRegisterStep(1);
    };

    const toggleToLogin = () => {
        setSearchParams({ status: 'login' });
    };

    return (
        <>
            <Helmet>
                <title>{isActive ? `Registrar | ${SITE_NAME}` : `Entrar | ${SITE_NAME}`}</title>
            </Helmet>
            <div className={`${styles.container} ${isActive ? styles.active : ''}`} id="container">
                {isActive && (
                    <AuthRegister />
                )}

                {!isActive && (
                    <AuthLogin />
                )}

                <div className={styles.trocarContainer}>
                    <div className={styles.trocar}>
                        <div className={`${styles.painelTrocar} ${styles.trocarEsquerda}`}>
                            <a href="/" draggable="false">
                                <img src={logo} alt="Logo FusionCake" />
                            </a>
                            <a href="/" draggable="false">
                                <h1>FusionCake</h1>
                            </a>
                            <div className={styles['message-container']}>
                                {randomRegisterMessage}
                            </div>
                            <span>Já possui uma conta?</span>
                            <button
                                className={styles.hidden}
                                id="entrar"
                                onClick={toggleToLogin}
                            >
                                Entrar
                            </button>
                        </div>
                        <div className={`${styles.painelTrocar} ${styles.trocarDireita}`}>
                            <a href="/" draggable="false">
                                <img src={logo} alt="Logo FusionCake" />
                            </a>
                            <a href="/" draggable="false">
                                <h1>FusionCake</h1>
                            </a>
                            <div className={styles['message-container']}>
                                {randomLoginMessage}
                            </div>
                            <span>Não possui uma conta?</span>
                            <button
                                className={styles.hidden}
                                id="registrar"
                                onClick={toggleToRegister}
                            >
                                Registrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <footer className={styles.footer}>
                <p>&copy; {new Date().getFullYear()} FusionCake. Todos direitos reservados.</p>
            </footer>
        </>
    );
}

export default Auth
