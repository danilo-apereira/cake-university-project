import { Helmet } from 'react-helmet-async'
import SITE_NAME from '../../config'
import styles from './Home.module.css'

const Home = () => {
    return (
        <div className={styles.container}>
            <Helmet>
                <title>{SITE_NAME}</title>
            </Helmet>

            <nav className={styles.navbar}>
                <a href="/"><div className={styles.logo}>FusionCake</div></a>
                <div className={styles.navItems}>
                    <a href="#">Produto</a>
                    <a href="#">Equipe</a>
                    <a href="#">Contato</a>
                </div>
                <div className={styles.authButtons}>
                    <button className={styles.signIn}>Entrar</button>
                    <button className={styles.signUp}>Registrar</button>
                </div>
            </nav>

            <main>
                <section>
                    <h1>Pedaços de Felicidade</h1>
                    <p>A vida ganha mais cor e sabor quando cada pedaço é um momento doce para recordar</p>
                    <button className={styles.experimente}>Experimente</button>
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
    );
};

export default Home
