import React, { useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import styles from '../../assets/styles/Auth/Auth.module.css';

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
        complemento: '',
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
                errosAtuais[campo] = 'Este campo é obrigatório';
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
    };

    const handleContinuar = () => {
        const temErros = validarEtapa();
        if (!temErros) {
            definirEtapaRegistro(2);
        }
    };

    const handleVoltar = (e) => {
        e.preventDefault();
        definirTooltipVisivel(false);
        setFormData((prevFormData) => ({
            ...prevFormData,
            senha: '',
            confirmarSenha: '',
        }));
        definirEtapaRegistro(1);
        definirBotaoDesativado(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const temErros = validarEtapa();

        if (!temErros) {
            const dadosParaEnvio = {
                ...formData,
                telefone: formData.telefone.replace(/\D/g, ''), // Remove caracteres não numéricos do telefone
                cep: formData.cep.replace(/\D/g, ''), // Remove caracteres não numéricos do CEP
            };

            try {
                const response = await fetch('http://localhost:8080/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dadosParaEnvio),
                });

                if (response.ok) {
                    const result = await response.text();
                    console.log('Registro bem-sucedido:', result);
                    alert('Usuário registrado com sucesso!');
                } else {
                    const error = await response.text();
                    console.error('Erro no registro:', error);
                    alert(`Erro ao registrar: ${error}`);
                }
            } catch (error) {
                console.error('Erro ao conectar com o servidor:', error);
                alert('Não foi possível conectar com o servidor.');
            }
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
                        {camposPorEtapa[2].map((campo) => (
                            <div key={campo} className={styles.inputContainer}>
                                <input
                                    type="text"
                                    id={campo}
                                    placeholder=" "
                                    value={formData[campo]}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                                <label htmlFor={campo}>
                                    {campo === 'endereco' && 'Endereço *'}
                                    {campo === 'numero' && 'Número *'}
                                    {campo === 'cidade' && 'Cidade *'}
                                    {campo === 'estado' && 'Estado *'}
                                    {campo === 'cep' && 'CEP *'}
                                    {campo === 'complemento' && 'Complemento'}
                                </label>
                                {erros[campo] && <p className={styles.errorMessage}>{erros[campo]}</p>}
                            </div>
                        ))}
                    </>
                )}
                <button
                    type={etapaRegistro === 1 ? 'button' : 'submit'}
                    className={`${styles.auth} ${botaoDesativado ? styles.buttonDisabled : ''}`}
                    onClick={etapaRegistro === 1 ? handleContinuar : undefined}
                    disabled={botaoDesativado}
                >
                    {etapaRegistro === 1 ? 'Continuar' : 'Cadastrar'}
                </button>
            </form>
        </div>
    );
};

export default AuthRegister;
