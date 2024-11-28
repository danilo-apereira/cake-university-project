import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/styles/Confeitaria/CadastrarConfeitaria.module.css";

const CadastrarConfeitaria = () => {
  const [formData, setFormData] = useState({
    nomeConfeitaria: "",
    cnpj: "",
    razaoSocial: "",
    emailCoorporativo: "",
    endereco: "",
    numero: "",
    complemento: "",
    cep: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = "Este campo é obrigatório.";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Dados cadastrados:", formData);
      alert("Confeitaria cadastrada com sucesso!");
      navigate("/confeitaria");
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate("/confeitaria")}>
        Voltar
      </button>
      <h1 className={styles.title}>Cadastrar Confeitaria</h1>
      <div className={styles.form}>
        {[
          { label: "Nome da Confeitaria", key: "nomeConfeitaria" },
          { label: "CNPJ", key: "cnpj" },
          { label: "Razão Social", key: "razaoSocial" },
          { label: "E-mail Coorporativo", key: "emailCoorporativo" },
          { label: "Endereço", key: "endereco" },
          { label: "Número", key: "numero" },
          { label: "Complemento", key: "complemento" },
          { label: "CEP", key: "cep" },
        ].map(({ label, key }) => (
          <div key={key}>
            <label>{label}:</label>
            <input
              type="text"
              placeholder={`Digite ${label.toLowerCase()}`}
              value={formData[key]}
              onChange={(e) => handleInputChange(key, e.target.value)}
            />
            {errors[key] && <p className={styles.error}>{errors[key]}</p>}
          </div>
        ))}

        <button className={styles.submitButton} onClick={handleSubmit}>
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export default CadastrarConfeitaria;
