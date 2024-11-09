import { Helmet } from 'react-helmet-async'
import SITE_NAME from '../../config'
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();

    const goToAuth = (status, navigate) => {
        navigate(`/user/auth?status=${status}`);
    };

    return (
        <>
            <Helmet>
                <title>{SITE_NAME}</title>
            </Helmet>
            <div className={styles.container}>
                <nav className={styles.navbar}>
                    <a href="/"><div className={styles.logo}>FusionCake</div></a>
                    <div className={styles.navItems}>
                        <a href="#">Produto</a>
                        <a href="#">Equipe</a>
                        <a href="#">Contato</a>
                    </div>
                    <div className={styles.authButtons}>
                        <button onClick={() => goToAuth('login', navigate)} className={styles.signIn}>
                            Entrar
                        </button>
                        <button onClick={() => goToAuth('register', navigate)} className={styles.signUp}>
                            Registrar
                        </button>
                    </div>
                </nav>

                <main>
                    <section>
                        <h1>Pedaços de Felicidade</h1>
                        <p>A vida ganha mais cor e sabor quando cada pedaço é um momento doce para recordar</p>
                        <a href="/user/auth"><button className={styles.experimente}>Experimente</button></a>
                        <div className={styles.mensagens}>
                            <span>Sabores únicos</span>
                            <span>Amor em pedaços</span>
                            <span>Frequência de Sabores</span>
                            <span>Cardápio Doce</span>
                        </div>
                    </section>
                </main>

                <footer className={styles.footer}>
                    <p>&copy; {new Date().getFullYear()} FusionCake. Todos direitos reservados.</p>
                </footer>
            </div>
        </>
    );
}

export default Home
