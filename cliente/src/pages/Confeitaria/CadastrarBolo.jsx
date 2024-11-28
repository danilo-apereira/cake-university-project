import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../../assets/styles/Confeitaria/CadastrarBolo.module.css"

const CadastrarBolo = () => {
	const [step, setStep] = useState(1);
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		nomeBolo: "",
		evento: "",
		tamanho: "",
		sabor: "",
		cobertura: "",
		decoracao: "",
		peso: "",
		andares: "",
		detalhes: "",
	});

	const handleInputChange = (key, value) => {
		setFormData((prev) => ({ ...prev, [key]: value }));
		setErrors((prev) => ({ ...prev, [key]: "" }));
	};

	const handleSelect = (key, value) => {
		setFormData((prev) => ({ ...prev, [key]: value }));
		setErrors((prev) => ({ ...prev, [key]: "" }));
	};

	const validateStep = () => {
		const newErrors = {};

		if (step === 1) {
			if (!formData.nomeBolo) newErrors.nomeBolo = "Este campo é obrigatório.";
			if (!formData.evento) newErrors.evento = "Este campo é obrigatório.";
		} else if (step === 2) {
			if (!formData.tamanho) newErrors.tamanho = "Escolha um tamanho.";
			if (!formData.sabor) newErrors.sabor = "Este campo é obrigatório.";
			if (!formData.cobertura) newErrors.cobertura = "Este campo é obrigatório.";
			if (!formData.decoracao) newErrors.decoracao = "Este campo é obrigatório.";
		} else if (step === 3) {
			if (!formData.peso) newErrors.peso = "Escolha um peso.";
			if (!formData.andares) newErrors.andares = "Este campo é obrigatório.";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const nextStep = () => {
		if (validateStep()) {
			setStep((prev) => prev + 1);
		}
	};

	const prevStep = () => setStep((prev) => prev - 1);

	return (
		<div className={styles.container}>
			<button
				className={styles.backButton}
				onClick={() => navigate("/confeitaria")}
			>
				Clique para voltar
			</button>
			<h1 className={styles.title}>Montagem do bolo</h1>
			<p className={styles.subtitle}>
				Formas e detalhes para bolos únicos que surpreendem e conquistam em cada mordida.
			</p>

			<div className={styles.steps}>
				<div className={styles.progressLineBg}></div>
				<div
					className={styles.progressLine}
					style={{
						width: `${((step - 1) / 3) * 100}%`,
					}}
				></div>

				{[1, 2, 3, 4].map((num) => (
					<span
						key={num}
						className={`${styles.step} ${
							num < step ? styles.completed : num === step ? styles.active : ""
						}`}
					>
						{num}
					</span>
				))}
			</div>

			{step === 1 && (
				<div className={styles.form}>
					<h2>Identificação do Bolo</h2>
					<label>Nome do Bolo:</label>
					<input
						type="text"
						placeholder="Digite o nome do bolo"
						value={formData.nomeBolo}
						onChange={(e) => handleInputChange("nomeBolo", e.target.value)}
					/>
					{errors.nomeBolo && <p className={styles.error}>{errors.nomeBolo}</p>}

					<label>Tipo de Evento:</label>
					<input
						type="text"
						placeholder="Casamento, aniversário, etc."
						value={formData.evento}
						onChange={(e) => handleInputChange("evento", e.target.value)}
					/>
					{errors.evento && <p className={styles.error}>{errors.evento}</p>}

					<button className={styles.nextButton} onClick={nextStep}>
						Próximo
					</button>
				</div>
			)}

			{step === 2 && (
				<div className={styles.form}>
					<h2>Características do Bolo</h2>
					<label>Tamanho:</label>
					<div className={styles.options}>
						<button
							className={
								formData.tamanho === "Pequeno"
									? styles.selectedButton
									: styles.button
							}
							onClick={() => handleSelect("tamanho", "Pequeno")}
						>
							Pequeno
						</button>
						<button
							className={
								formData.tamanho === "Médio"
									? styles.selectedButton
									: styles.button
							}
							onClick={() => handleSelect("tamanho", "Médio")}
						>
							Médio
						</button>
						<button
							className={
								formData.tamanho === "Grande"
									? styles.selectedButton
									: styles.button
							}
							onClick={() => handleSelect("tamanho", "Grande")}
						>
							Grande
						</button>
					</div>
					{errors.tamanho && <p className={styles.error}>{errors.tamanho}</p>}

					<label>Sabor da Massa:</label>
					<input
						type="text"
						placeholder="Ex: Chocolate, Baunilha"
						value={formData.sabor}
						onChange={(e) => handleInputChange("sabor", e.target.value)}
					/>
					{errors.sabor && <p className={styles.error}>{errors.sabor}</p>}

					<label>Cobertura:</label>
					<input
						type="text"
						placeholder="Ex: Chantilly, Fondant"
						value={formData.cobertura}
						onChange={(e) => handleInputChange("cobertura", e.target.value)}
					/>
					{errors.cobertura && <p className={styles.error}>{errors.cobertura}</p>}

					<label>Decoração:</label>
					<input
						type="text"
						placeholder="Ex: Flores, Desenhos"
						value={formData.decoracao}
						onChange={(e) => handleInputChange("decoracao", e.target.value)}
					/>
					{errors.decoracao && <p className={styles.error}>{errors.decoracao}</p>}

					<button className={styles.prevButton} onClick={prevStep}>
						Anterior
					</button>
					<button className={styles.nextButton} onClick={nextStep}>
						Próximo
					</button>
				</div>
			)}

			{step === 3 && (
				<div className={styles.form}>
					<h2>Especificações Técnicas</h2>
					<label>Peso:</label>
					<div className={styles.options}>
						<button
							className={
								formData.peso === "300g-800g"
									? styles.selectedButton
									: styles.button
							}
							onClick={() => handleSelect("peso", "300g-800g")}
						>
							300g-800g
						</button>
						<button
							className={
								formData.peso === "1kg-2kg"
									? styles.selectedButton
									: styles.button
							}
							onClick={() => handleSelect("peso", "1kg-2kg")}
						>
							1kg-2kg
						</button>
						<button
							className={
								formData.peso === "2kg+"
									? styles.selectedButton
									: styles.button
							}
							onClick={() => handleSelect("peso", "2kg+")}
						>
							2kg+
						</button>
					</div>
					{errors.peso && <p className={styles.error}>{errors.peso}</p>}

					<label>Quantidade de Andares:</label>
					<input
						type="text"
						placeholder="Ex: 2 andares"
						value={formData.andares}
						onChange={(e) => handleInputChange("andares", e.target.value)}
					/>
					{errors.andares && <p className={styles.error}>{errors.andares}</p>}

					<button className={styles.prevButton} onClick={prevStep}>
						Anterior
					</button>
					<button className={styles.nextButton} onClick={nextStep}>
						Próximo
					</button>
				</div>
			)}

			{step === 4 && (
				<div className={styles.form}>
					<h2>Resumo do Pedido</h2>
					<ul>
						<li><strong>Nome do Bolo:</strong> {formData.nomeBolo}</li>
						<li><strong>Evento:</strong> {formData.evento}</li>
						<li><strong>Tamanho:</strong> {formData.tamanho}</li>
						<li><strong>Sabor:</strong> {formData.sabor}</li>
						<li><strong>Cobertura:</strong> {formData.cobertura}</li>
						<li><strong>Decoração:</strong> {formData.decoracao}</li>
						<li><strong>Peso:</strong> {formData.peso}</li>
						<li><strong>Andares:</strong> {formData.andares}</li>
					</ul>
					<button className={styles.prevButton} onClick={prevStep}>
						Anterior
					</button>
					<button className={styles.nextButton}>Criar</button>
				</div>
			)}
		</div>
	);
}

export default CadastrarBolo
