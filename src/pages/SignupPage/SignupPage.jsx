import Layout from "../Layout/Layout";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../services/api";
import "./signupPage.css";

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpar erro do campo quando usuário começa a digitar
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstname.trim()) {
      newErrors.firstname = "Primeiro nome é obrigatório";
    }

    if (!formData.surname.trim()) {
      newErrors.surname = "Sobrenome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter no mínimo 6 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não conferem";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setSuccessMessage("");

    try {
      await api.post("/user", {
        firstname: formData.firstname.trim(),
        surname: formData.surname.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      setSuccessMessage("Cadastro realizado com sucesso! Redirecionando para login...");
      setFormData({
        firstname: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirecionar para login após 2 segundos
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Erro ao criar conta. Tente novamente.";
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="signupPageContainer">
        <div className="signupPageBox">
          <h1 className="signupPageTitle">Criar Conta</h1>
          <p className="signupPageSubtitle">
            Preencha os campos abaixo para criar sua conta
          </p>

          {successMessage && (
            <div className="signupSuccess">{successMessage}</div>
          )}

          {errors.submit && (
            <div className="signupError">{errors.submit}</div>
          )}

          <form onSubmit={handleSubmit} className="signupForm">
            {/* Primeiro Nome */}
            <div className="formGroup">
              <label htmlFor="firstname" className="formLabel">
                Primeiro Nome
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="João"
                className={`formInput ${errors.firstname ? "error" : ""}`}
              />
              {errors.firstname && (
                <span className="formError">{errors.firstname}</span>
              )}
            </div>

            {/* Sobrenome */}
            <div className="formGroup">
              <label htmlFor="surname" className="formLabel">
                Sobrenome
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder="Silva"
                className={`formInput ${errors.surname ? "error" : ""}`}
              />
              {errors.surname && (
                <span className="formError">{errors.surname}</span>
              )}
            </div>

            {/* Email */}
            <div className="formGroup">
              <label htmlFor="email" className="formLabel">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                className={`formInput ${errors.email ? "error" : ""}`}
              />
              {errors.email && (
                <span className="formError">{errors.email}</span>
              )}
            </div>

            {/* Senha */}
            <div className="formGroup">
              <label htmlFor="password" className="formLabel">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••"
                className={`formInput ${errors.password ? "error" : ""}`}
              />
              {errors.password && (
                <span className="formError">{errors.password}</span>
              )}
            </div>

            {/* Confirmar Senha */}
            <div className="formGroup">
              <label htmlFor="confirmPassword" className="formLabel">
                Confirmar Senha
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••"
                className={`formInput ${errors.confirmPassword ? "error" : ""}`}
              />
              {errors.confirmPassword && (
                <span className="formError">{errors.confirmPassword}</span>
              )}
            </div>

            {/* Botão Cadastrar */}
            <button
              type="submit"
              className="signupButton"
              disabled={loading}
            >
              {loading ? "Criando conta..." : "Cadastrar"}
            </button>
          </form>

          {/* Link para Login */}
          <div className="signupFooter">
            <p>
              Já tem uma conta?{" "}
              <Link to="/login" className="signupLink">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
