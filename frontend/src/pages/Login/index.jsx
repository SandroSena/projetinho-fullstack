import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Header from "../../components/Header";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: token } = await api.post("/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      localStorage.setItem("token", token);

      navigate("/listar-usuarios");

      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Senha ou email incorretos!");
    }
  };

  return (
    <>
      <Header /> 
      <div className="max-w-md mx-auto mt-10 bg-white p-8 border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <Link
          to="/"
          className="text-blue-700 hover:underline text-center block mt-4"
        >
          Não tem uma conta? Cadastre-se
        </Link>
      </div>
    </>
  );
};

export default Login;
