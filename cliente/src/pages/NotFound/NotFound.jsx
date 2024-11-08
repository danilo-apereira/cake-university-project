import { Helmet } from 'react-helmet-async'
import SITE_NAME from '../../config'
import styles from './NotFound.module.css'
import imagemNaoEncontrada from '../../assets/images/NotFound/NotFound.png'

const NotFound = () => {
    return (
        <>
            <Helmet>
                <title>404 | {SITE_NAME}</title>
            </Helmet>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.row}>
                        <div className={styles.caixaErro}>
                            <h2>Oooops!</h2>
                            <p>Não conseguimos encontrar a página que você está procurando...</p>
                            <a href="/" className={styles.botaoCta} aria-label="Voltar para a página inicial">Voltar para o início</a>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <img src={imagemNaoEncontrada} alt="Página não encontrada" className={styles.imagem} draggable="false" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotFound
