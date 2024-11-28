import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/styles/Confeitaria/Confeitaria.module.css";

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
    "A Magia das Camadas",
];

const Confeitaria = () => {
    const navigate = useNavigate();

    const goToCadastrarBolo = () => {
        navigate("/confeitaria/cadastrar-bolo");
    };

    const goToCadastrarConfeitaria = () => {
        navigate("/confeitaria/cadastrar-confeitaria");
    };

    const getRandomMessage = (messages) =>
        messages[Math.floor(Math.random() * messages.length)];

    const handleClickBolo = (boloId) => {
        navigate(`/confeitaria/bolo/${boloId}`);
    };

    return (
        <>
            <Helmet>
                <title>Confeitaria | FusionCake</title>
            </Helmet>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <a href="/"><div className={styles.logo}>FusionCake</div></a>
                    <nav className={styles.navbar}>
                        <button
                            onClick={goToCadastrarBolo}
                            className={styles.createButton}
                        >
                            Criar Bolo
                        </button>
                        <button
                            onClick={goToCadastrarConfeitaria}
                            className={styles.createButton}
                        >
                            Criar Confeitaria
                        </button>
                    </nav>
                </header>

                <main className={styles.main}>
                    <section className={styles.intro}>
                        <h1>Bem-vindo à Confeitaria</h1>
                        <p>Descubra nossos bolos ou crie o seu próprio com apenas alguns cliques.</p>
                    </section>

                    <section className={styles.gallery}>
                        <h2>{getRandomMessage(cakesMessages)}</h2>

                        {Array.from({ length: 4 }).map((_, rowIndex) => (
                            <div key={rowIndex} className={styles.grid}>
                                {Array.from({ length: 3 }).map((_, cardIndex) => {
                                    const boloId = rowIndex * 3 + cardIndex + 1;
                                    return (
                                        <div key={cardIndex} className={styles.card}>
                                            <div className={styles.imageContainer}>
                                                <img
                                                    src={`https://via.placeholder.com/400x300?text=Bolo+${boloId}`}
                                                    alt={`Bolo ${boloId}`}
                                                />
                                                <div className={styles.overlay}>
                                                    <button onClick={() => handleClickBolo(boloId)}>
                                                        Visualizar
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={styles.details}>
                                                <h3>{`Bolo ${boloId}`}</h3>
                                                <p>{`Empresa ${boloId}`}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </section>
                </main>

                <footer className={styles.footer}>
                    <p>&copy; {new Date().getFullYear()} FusionCake. Todos os direitos reservados.</p>
                </footer>
            </div>
        </>
    );
};

export default Confeitaria;
