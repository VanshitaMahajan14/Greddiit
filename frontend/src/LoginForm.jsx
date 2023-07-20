import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
const LoginForm = (props) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");

    const checkSubmittedForm = async (e) => {
        e.preventDefault();
        console.log("entered");
        try {
          console.log(JSON.stringify({ username, pass }));
          const response = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, pass }),
          });
          const data = await response.json();
          console.log(data);
          if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("currentuserlogged",username)
            localStorage.setItem("logged","true")
            navigate("/dashboard");
          } else {
            // alert("Wrong credentials");
          }
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
        if (localStorage.getItem("logged") === "true")
            navigate("/Dashboard");
    }, []);

    return (
        <body class="loginbody">
            <div class="mobile-wrapper">
                <div class="login-wrapper">
                    <div class="brand-logo">
                        LOGIN
                    </div>
                    <div class="form-wrapper">
                        <form onSubmit={checkSubmittedForm} action="#">
                            <div class="input-group">
                                <label for="username"><i class="fas fa-user"></i></label>
                                <input type="username" placeholder="USERNAME" name="username" id="email" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div class="input-group">
                                <label for="password"><i class="fas fa-unlock-alt"></i></label>
                                <input type="password" placeholder="PASSWORD" name="pass" id="password" value={pass} onChange={(e) => setPass(e.target.value)}/>
                            </div>
                            <button type="submit">LOGIN</button>
                            <button onClick={() => props.onFormSwitch('register')}>DON'T HAVE AN ACCOUNT? REGISTER</button>
                        </form>
                    </div>

                </div>

            </div>

        </body>
    );
}

export default LoginForm;







