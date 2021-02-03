import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    event.preventDefault(); //Detiene la recarga
    //Lógica de Iniciar Sesión

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        //Iniciar sesión, redireccionar a la pagina principal
        history.push("/");
      })
      .catch((e) => alert(e.message));
  };

  const register = (event) => {
    event.preventDefault(); //Detiene la recarga
    //Lógica de registrarse

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        //Al crear un usuario y al logearse, redirecciona a la pagina principal
        if (auth) {
          history.push("/");
        }
      })
      .catch((e) => alert(e.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className="login__container">
        <h1>Iniciar Sesión</h1>

        <form>
          <h5>Correo</h5>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />

          <h5>Password</h5>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />

          <button type="submit" onClick={login} className="login__signInButton">
            Iniciar Sesión
          </button>
        </form>

        <p>
          Al continuar, aceptas las Condiciones de uso y el Aviso de privacidad
          de AMAZON CLONE hecho por VARGAS RICHARD :v.
        </p>

        <button
          type="submit"
          onClick={register}
          className="login__registerButton"
        >
          Crear cuenta de amazon clone
        </button>
      </div>
    </div>
  );
}

export default Login;
