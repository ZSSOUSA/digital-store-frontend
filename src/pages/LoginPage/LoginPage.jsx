import Layout from "../Layout/Layout";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../services/api";
import "./loginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
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
      const response = await api.post("/user/token", {
        email: formData.email.trim(),
        password: formData.password,
      });

      // Salvar token no localStorage
      const { token } = response.data;
      localStorage.setItem("authToken", token);

      setSuccessMessage("Login realizado com sucesso! Redirecionando...");
      setFormData({
        email: "",
        password: "",
      });

      // Redirecionar para home após 1 segundo
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Email ou senha inválidos";
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="loginPageContainer">
        <div className="loginPageBox">
          <h1 className="loginPageTitle">Entrar</h1>
          <p className="loginPageSubtitle">
            Faça login para acessar sua conta
          </p>

          {successMessage && (
            <div className="loginSuccess">{successMessage}</div>
          )}

          {errors.submit && (
            <div className="loginError">{errors.submit}</div>
          )}

          <form onSubmit={handleSubmit} className="loginForm">
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

            {/* Botão Entrar */}
            <button
              type="submit"
              className="loginButton"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Link para Cadastro */}
          <div className="loginFooter">
            <p>
              Não tem uma conta?{" "}
              <Link to="/cadastro" className="loginLink">
                Cadastre-se
              </Link>
            </p>
          </div>

          {/* Credenciais de Teste */}
          <div className="loginTestCredentials">
            <p><strong>Teste com:</strong></p>
            <p> Email: admin@minhaloja</p>
            <p> Senha: 123456</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
