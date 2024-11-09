import { Helmet } from 'react-helmet-async'
import styles from './Auth.module.css'
import SITE_NAME from '../../config'
import { useSearchParams } from 'react-router-dom'
import logo from '../../assets/images/logo/fusionCake.png'

const registerMessages = [
    "Comece sua jornada doce conosco e transforme cada pedaço em felicidade!",
    "Registre-se agora e torne cada momento mais saboroso com nossos bolos!",
    "Entre para um mundo de sabores inesquecíveis e momentos doces!",
    "Cadastre-se e descubra como cada pedaço pode ser um pedaço de felicidade!",
    "Os melhores momentos doces estão a um registro de distância!",
    "Dê o primeiro passo para uma experiência única e cheia de sabor!",
    "Transforme o simples em especial: cadastre-se para viver momentos doces!",
    "Venha experimentar o sabor da felicidade em cada pedaço!",
    "Registre-se hoje e celebre a vida com bolos que contam histórias!",
    "A felicidade está a um cadastro de distância: descubra o doce em viver!"
];

const loginMessages = [
    "Bem-vindo de volta! Vamos adoçar mais um dia juntos?",
    "Sua próxima fatia de felicidade está esperando por você.",
    "Hora de continuar sua jornada doce! Entre e aproveite.",
    "Os melhores momentos doces estão a um login de distância!",
    "Entre agora e saboreie a felicidade em cada pedaço.",
    "Sua experiência doce começa aqui.",
    "A mesa está pronta, só falta você!",
    "Continue vivendo momentos inesquecíveis com nossos bolos."
];

const Auth = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const status = searchParams.get('status') || 'login';
    const isActive = status === 'register';

    const toggleToRegister = () => {
        setSearchParams({ status: 'register' });
    };

    const toggleToLogin = () => {
        setSearchParams({ status: 'login' });
    };

    const getRandomMessage = (messages) =>
        messages[Math.floor(Math.random() * messages.length)];

    return (
        <>
            <Helmet>
                <title>{isActive ? `Registrar | ${SITE_NAME}` : `Entrar | ${SITE_NAME}`}</title>
            </Helmet>
            <div
                className={`${styles.container} ${isActive ? styles.active : ''}`}
                id="container"
            >
                {isActive && (
                    <div className={`${styles['formulario-container']} ${styles.registrar}`}>
                        <form>
                            <h1>Registrar</h1>
                            <span>Dados cadastrais</span>
                            <input type="text" placeholder="Nome completo" />
                            <input type="email" placeholder="E-mail" />
                            <input type="text" placeholder="Telefone" />
                            <input type="password" placeholder="Senha" />
                            <input type="password" placeholder="Confirmar senha" />
                            <button className={styles.auth}>Registrar</button>
                        </form>
                    </div>
                )}

                {!isActive && (
                    <div className={`${styles['formulario-container']} ${styles.entrar}`}>
                        <form>
                            <h1>Entrar</h1>
                            <input type="text" placeholder="E-mail ou número de telefone" />
                            <input type="password" placeholder="Senha" />
                            <a href="/user/reset-password">Esqueceu sua senha?</a>
                            <button className={styles.auth}>Entrar</button>
                        </form>
                    </div>
                )}

                <div className={styles['trocar-container']}>
                    <div className={styles.trocar}>
                        <div className={`${styles['painel-trocar']} ${styles['trocar-esquerda']}`}>
                            <a href="/" draggable="false"><img src={logo} alt="Logo FusionCake" /></a>
                            <a href="/" draggable="false"><h1>FusionCake</h1></a>
                            <p>{getRandomMessage(registerMessages)}</p>
                            <span>Já possui uma conta?</span>
                            <button
                                className={styles.hidden}
                                id="entrar"
                                onClick={toggleToLogin}
                            >
                                Entrar
                            </button>
                        </div>
                        <div className={`${styles['painel-trocar']} ${styles['trocar-direita']}`}>
                            <a href="/" draggable="false"><img src={logo} alt="Logo FusionCake" /></a>
                            <a href="/" draggable="false"><h1>FusionCake</h1></a>
                            <p>{getRandomMessage(loginMessages)}</p>
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
