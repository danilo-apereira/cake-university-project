import { Helmet } from 'react-helmet-async'
import SITE_NAME from '../../config'
import styles from '../../assets/styles/Home/Home.module.css'
import { useNavigate } from 'react-router-dom'
import banner from '../../assets/images/banner/fusionCake.png'

const cakesMessages = [
    "Doces Encantos",
    "Arte em Fatias",
    "Camadas de Sabor",
    "Sabores que Encantam",
    "Pequenas Delícias",
    "O Doce da Vida",
    "Um Mundo de Bolos",
    "Sonhos Açucarados",
    "Perfume de Confeitaria",
    "A Magia das Camadas"
];

const Home = () => {
    const navigate = useNavigate();

    const goToAuth = (status, navigate) => {
        navigate(`/user/auth?status=${status}`);
    };

    const getRandomMessage = (messages) =>
        messages[Math.floor(Math.random() * messages.length)];

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

                        <img className={styles.banner} src={banner} alt="Banner FusionCake" draggable="false" />

                        <a href="/user/auth"><button className={styles.experimente}>Experimente</button></a>

                        <div className={styles.mensagens}>
                            <span>Sabores únicos</span>
                            <span>Amor em pedaços</span>
                            <span>Frequência de Sabores</span>
                            <span>Cardápio Doce</span>
                        </div>
                    </section>

                    <section className={styles.gallery}>
                        <h1>{getRandomMessage(cakesMessages)}</h1>

                        {Array.from({ length: 2 }).map((_, rowIndex) => (
                            <div key={rowIndex} className={styles.grid}>
                                {Array.from({ length: 3 }).map((_, cardIndex) => (
                                    <div key={cardIndex} className={styles.card}>
                                        <div className={styles.imageContainer}>
                                            <img
                                                src={`https://via.placeholder.com/400x300?text=Bolo+${rowIndex * 3 + cardIndex + 1}`}
                                                alt={`Bolo ${rowIndex * 3 + cardIndex + 1}`}
                                            />
                                            <div className={styles.overlay}>
                                                <button>Visualizar</button>
                                            </div>
                                        </div>
                                        <div className={styles.details}>
                                            <h3>{`Bolo ${rowIndex * 3 + cardIndex + 1}`}</h3>
                                            <p>{`Empresa ${rowIndex * 3 + cardIndex + 1}`}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
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
