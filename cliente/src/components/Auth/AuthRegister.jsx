import React, { useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import styles from '../../assets/styles/Auth/Auth.module.css';

const AuthRegister = () => {
    const [registerStep, setRegisterStep] = useState(1);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [values, setValues] = useState({
        nome: '',
        email: '',
        telefone: '',
        senha: '',
        confirmeSenha: '',
        endereco: '',
        numero: '',
        cidade: '',
        estado: '',
        cep: '',
        complemento: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setValues((prevValues) => ({ ...prevValues, [id]: value }));

        if (!value) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [id]: id === 'numero' ? 'Obrigatório' : 'Este campo é obrigatório',
            }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Verifica se todos os campos obrigatórios estão preenchidos
        if (!values.nome || !values.email || !values.senha) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome: values.nome,
                    email: values.email,
                    senha: values.senha,
                    telefone: values.telefone,
                    endereco: values.endereco,
                    numero: values.numero,
                    cidade: values.cidade,
                    estado: values.estado,
                    cep: values.cep,
                    complemento: values.complemento,
                }),
            });
    
            if (!response.ok) {
                const error = await response.text();
                alert(`Erro ao cadastrar: ${error}`);
                return;
            }
    
            const result = await response.text();
            console.log(result); // toaster depois pls
            setValues({
                nome: "",
                email: "",
                telefone: "",
                senha: "",
                confirmeSenha: "",
                endereco: "",
                numero: "",
                cidade: "",
                estado: "",
                cep: "",
                complemento: "",
            });
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            alert("Erro ao conectar com o servidor.");
        }
    };
    

    const handleContinue = (e) => {
        e.preventDefault();
        setRegisterStep(2);
    };

    const handleBack = (e) => {
        e.preventDefault();
        setTooltipVisible(false);
        setRegisterStep(1);
    };

    return (
        <div className={`${styles.formularioContainer} ${styles.registrar}`}>
            <form onSubmit={handleSubmit}>
                <h1>Registrar</h1>
                {registerStep === 1 ? (
                    <>
                        <span>Dados iniciais</span>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                id="nome"
                                placeholder=" "
                                value={values.nome}
                                onChange={handleChange}
                            />
                            <label htmlFor="nome">Nome completo</label>
                            {errors.nome && (
                                <p className={styles.errorMessage}>{errors.nome}</p>
                            )}
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="email"
                                id="email"
                                placeholder=" "
                                value={values.email}
                                onChange={handleChange}
                            />
                            <label htmlFor="email">E-mail</label>
                            {errors.email && (
                                <p className={styles.errorMessage}>{errors.email}</p>
                            )}
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                id="telefone"
                                placeholder=" "
                                value={values.telefone}
                                onChange={handleChange}
                            />
                            <label htmlFor="telefone">Telefone</label>
                            {errors.telefone && (
                                <p className={styles.errorMessage}>{errors.telefone}</p>
                            )}
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="password"
                                id="senha"
                                placeholder=" "
                                value={values.senha}
                                onChange={handleChange}
                            />
                            <label htmlFor="senha">Senha</label>
                            {errors.senha && (
                                <p className={styles.errorMessage}>{errors.senha}</p>
                            )}
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="password"
                                id="confirmeSenha"
                                placeholder=" "
                                value={values.confirmeSenha}
                                onChange={handleChange}
                            />
                            <label htmlFor="confirmeSenha">Confirmar senha</label>
                            {errors.confirmeSenha && (
                                <p className={styles.errorMessage}>{errors.confirmeSenha}</p>
                            )}
                        </div>
                        <button className={styles.auth} onClick={handleContinue}>
                            Continuar
                        </button>
                    </>
                ) : (
                    <>
                        <div
                            className={styles.iconContainer}
                            onMouseEnter={() => setTooltipVisible(true)}
                            onMouseLeave={() => setTooltipVisible(false)}
                        >
                            <IoIosArrowRoundBack className={styles.icon} onClick={handleBack} />
                            {tooltipVisible && (
                                <div className={styles.infoBox}>
                                    Volte para ajustar as informações anteriores.
                                </div>
                            )}
                        </div>
                        <span>Dados de endereço</span>
                        <div className={styles.addressContainer}>
                            <div className={`${styles.inputContainer} ${styles.address}`}>
                                <input
                                    type="text"
                                    id="endereco"
                                    placeholder=" "
                                    value={values.endereco}
                                    onChange={handleChange}
                                />
                                <label htmlFor="endereco">Endereço</label>
                                {errors.endereco && (
                                    <p className={styles.errorMessage}>{errors.endereco}</p>
                                )}
                            </div>
                            <div className={`${styles.inputContainer} ${styles.number}`}>
                                <input
                                    type="text"
                                    id="numero"
                                    placeholder=" "
                                    value={values.numero}
                                    onChange={handleChange}
                                />
                                <label htmlFor="numero">Número</label>
                                {errors.numero && (
                                    <p className={styles.errorMessage}>{errors.numero}</p>
                                )}
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                id="cidade"
                                placeholder=" "
                                value={values.cidade}
                                onChange={handleChange}
                            />
                            <label htmlFor="cidade">Cidade</label>
                            {errors.cidade && (
                                <p className={styles.errorMessage}>{errors.cidade}</p>
                            )}
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                id="estado"
                                placeholder=" "
                                value={values.estado}
                                onChange={handleChange}
                            />
                            <label htmlFor="estado">Estado</label>
                            {errors.estado && (
                                <p className={styles.errorMessage}>{errors.estado}</p>
                            )}
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                id="cep"
                                placeholder=" "
                                value={values.cep}
                                onChange={handleChange}
                            />
                            <label htmlFor="cep">CEP</label>
                            {errors.cep && (
                                <p className={styles.errorMessage}>{errors.cep}</p>
                            )}
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                id="complemento"
                                placeholder=" "
                                value={values.complemento}
                                onChange={handleChange}
                            />
                            <label htmlFor="complemento">Complemento</label>
                            {errors.complemento && (
                                <p className={styles.errorMessage}>{errors.complemento}</p>
                            )}
                        </div>
                        <button type="submit" className={styles.auth}>
                            Cadastrar
                        </button>
                    </>
                )}
            </form>
        </div>
    );
}

export default AuthRegister
