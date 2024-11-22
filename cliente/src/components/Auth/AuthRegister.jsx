import React, { useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import styles from '../../assets/styles/Auth/Auth.module.css'

const AuthRegister = () => {
    const [etapaRegistro, definirEtapaRegistro] = useState(1);
    const [tooltipVisivel, definirTooltipVisivel] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        senha: '',
        confirmarSenha: '',
        endereco: '',
        numero: '',
        cidade: '',
        estado: '',
        cep: '',
        complemento: ''
    });
    const [erros, definirErros] = useState({});
    const [botaoDesativado, definirBotaoDesativado] = useState(true);

    const camposPorEtapa = {
        1: ['nome', 'email', 'telefone', 'senha', 'confirmarSenha'],
        2: ['endereco', 'numero', 'cidade', 'estado', 'cep', 'complemento'],
    };

    const validarEtapa = () => {
        const camposAtuais = camposPorEtapa[etapaRegistro];
        const errosAtuais = {};

        camposAtuais.forEach((campo) => {
            if (campo !== 'complemento' && !formData[campo]?.trim()) {
                errosAtuais[campo] = campo === 'numero' ? 'Obrigatório' : 'Este campo é obrigatório';
            } else {
                errosAtuais[campo] = '';
            }
        });

        definirErros((prevErrors) => ({ ...prevErrors, ...errosAtuais }));
        return Object.values(errosAtuais).some((erro) => erro !== '');
    };

    const handleChange = (e) => {
        const { id, value } = e.target;

        let formattedValue = value;

        if (id === 'telefone') {
            formattedValue = value
                .replace(/\D/g, '')
                .slice(0, 11)
                .replace(/^(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
        }

        if (id === 'cep') {
            formattedValue = value
                .replace(/\D/g, '')
                .slice(0, 8)
                .replace(/^(\d{5})(\d{1,3})$/, '$1-$2');
        }

        setFormData((prevFormData) => {
            const updatedFormData = { ...prevFormData, [id]: formattedValue };

            const camposAtuais = camposPorEtapa[etapaRegistro].filter((campo) => campo !== 'complemento');
            const formularioValido = camposAtuais.every((campo) => {
                if (campo === 'telefone') return updatedFormData[campo]?.replace(/\D/g, '').length === 11;
                if (campo === 'cep') return updatedFormData[campo]?.replace(/\D/g, '').length === 8;
                return updatedFormData[campo]?.trim();
            });

            definirBotaoDesativado(!formularioValido);

            return updatedFormData;
        });

        if (id === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                definirErros((prevErrors) => ({
                    ...prevErrors,
                    email: 'Formato de e-mail inválido'
                }));
            } else {
                definirErros((prevErrors) => ({
                    ...prevErrors,
                    email: ''
                }));
            }
        }

        if (id === 'nome') {
            if (/^\d+$/.test(value)) {
                definirErros((prevErrors) => ({
                    ...prevErrors,
                    nome: 'Formato de nome inválido'
                }));
            } else {
                definirErros((prevErrors) => ({
                    ...prevErrors,
                    nome: ''
                }));
            }
        }

        if (id === 'numero') {
            if (/\D/.test(value)) {
                definirErros((prevErrors) => ({
                    ...prevErrors,
                    numero: 'Inválido'
                }));
            } else {
                definirErros((prevErrors) => ({
                    ...prevErrors,
                    numero: ''
                }));
            }
        }

        if (id === 'confirmarSenha' && formData.senha !== value) {
            definirErros((prevErrors) => ({
                ...prevErrors,
                confirmarSenha: 'As senhas não coincidem'
            }));
        } else if (id === 'confirmarSenha') {
            definirErros((prevErrors) => ({
                ...prevErrors,
                confirmarSenha: ''
            }));
        }
    };

    const handleContinuar = (e) => {
        e.preventDefault();
        const temErros = validarEtapa();

        if (!temErros) {
            definirEtapaRegistro(2);
            const camposAtuais = camposPorEtapa[2].filter((campo) => campo !== 'complemento');
            const formularioValido = camposAtuais.every((campo) => formData[campo]?.trim());
            definirBotaoDesativado(!formularioValido);
        }
    };

    const handleVoltar = (e) => {
        e.preventDefault();
        definirTooltipVisivel(false);
        setFormData((prevFormData) => ({
            ...prevFormData,
            senha: '',
            confirmarSenha: ''
        }));
        definirEtapaRegistro(1);
        definirBotaoDesativado(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const temErros = validarEtapa();

        if (!temErros) {
            const dadosParaEnvio = {
                ...formData,
                telefone: formData.telefone.replace(/\D/g, ''),
                cep: formData.cep.replace(/\D/g, ''),
            };
            console.log(dadosParaEnvio);
        }
    };

    return (
        <div className={`${styles.formularioContainer} ${styles.registrar}`}>
            <form onSubmit={handleSubmit}>
                <h1>Registrar</h1>
                {etapaRegistro === 1 ? (
                    <>
                        <span>Dados iniciais</span>
                        {camposPorEtapa[1].map((campo) => (
                            <div key={campo} className={styles.inputContainer}>
                                <input
                                    type={campo === 'senha' || campo === 'confirmarSenha' ? 'password' : 'text'}
                                    id={campo}
                                    placeholder=" "
                                    value={formData[campo]}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                                <label htmlFor={campo}>
                                    {campo === 'nome' && 'Nome completo *'}
                                    {campo === 'email' && 'E-mail *'}
                                    {campo === 'telefone' && 'Telefone *'}
                                    {campo === 'senha' && 'Senha *'}
                                    {campo === 'confirmarSenha' && 'Confirmar senha *'}
                                </label>
                                {erros[campo] && <p className={styles.errorMessage}>{erros[campo]}</p>}
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        <div
                            className={styles.iconContainer}
                            onMouseEnter={() => definirTooltipVisivel(true)}
                            onMouseLeave={() => definirTooltipVisivel(false)}
                        >
                            <IoIosArrowRoundBack className={styles.icon} onClick={handleVoltar} />
                            {tooltipVisivel && (
                                <div className={styles.infoBox}>
                                    Volte para ajustar as informações anteriores.
                                </div>
                            )}
                        </div>
                        <span>Dados de Endereço</span>
                        <div className={styles.addressContainer}>
                            <div className={`${styles.inputContainer} ${styles.address}`}>
                                <input
                                    type="text"
                                    id="endereco"
                                    placeholder=" "
                                    value={formData.endereco}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                                <label htmlFor="endereco">Endereço *</label>
                                {erros.endereco && <p className={styles.errorMessage}>{erros.endereco}</p>}
                            </div>
                            <div className={`${styles.inputContainer} ${styles.number}`}>
                                <input
                                    type="text"
                                    id="numero"
                                    placeholder=" "
                                    value={formData.numero}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                                <label htmlFor="numero">Número *</label>
                                {erros.numero && <p className={styles.errorMessage}>{erros.numero}</p>}
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                id="cidade"
                                placeholder=" "
                                value={formData.cidade}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                            <label htmlFor="cidade">Cidade *</label>
                            {erros.cidade && <p className={styles.errorMessage}>{erros.cidade}</p>}
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                id="estado"
                                placeholder=" "
                                value={formData.estado}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                            <label htmlFor="estado">Estado *</label>
                            {erros.estado && <p className={styles.errorMessage}>{erros.estado}</p>}
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                id="cep"
                                placeholder=" "
                                value={formData.cep}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                            <label htmlFor="cep">CEP *</label>
                            {erros.cep && <p className={styles.errorMessage}>{erros.cep}</p>}
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                id="complemento"
                                placeholder=" "
                                value={formData.complemento}
                                onChange={handleChange}
                                autoComplete="off"
                            />
                            <label htmlFor="complemento">Complemento</label>
                        </div>
                    </>
                )}
                <button
                    type={etapaRegistro === 1 ? 'button' : 'submit'}
                    className={`${styles.auth} ${botaoDesativado ? styles.buttonDisabled : ''}`}
                    onClick={etapaRegistro === 1 ? handleContinuar : handleSubmit}
                    disabled={botaoDesativado}
                >
                    {etapaRegistro === 1 ? 'Continuar' : 'Cadastrar'}
                </button>
            </form>
        </div>
    );
}

export default AuthRegister
