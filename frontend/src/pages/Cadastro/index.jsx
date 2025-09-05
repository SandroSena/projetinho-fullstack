import { useRef } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Header from "../../components/Header";
import CryptoJS from "crypto-js";
import CRYPTO_CONFIG from "../../config/crypto.js";

const Cadastro = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Criptografar a senha antes de enviar
      // Adicionamos o salt para aumentar a segurança
      const saltedPassword = passwordRef.current.value + CRYPTO_CONFIG.SECRET_KEY;
      const hashedPassword = CryptoJS.SHA256(saltedPassword).toString();
      
      await api.post("/register", {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: hashedPassword,
      });
      
      alert("Usuário cadastrado com sucesso!");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Erro ao cadastrar usuário!");
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto mt-10 bg-white p-8 border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Cadastro
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            ref={nameRef}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            ref={emailRef}
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            ref={passwordRef}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-400 cursor-pointer"
          >
            Cadastrar
          </button>
        </form>
        <Link
          to="/login"
          className="text-blue-700 hover:underline text-center block mt-4"
        >
          Já tem uma conta? Faça o login
        </Link>
      </div>
    </>
  );
};

export default Cadastro;
