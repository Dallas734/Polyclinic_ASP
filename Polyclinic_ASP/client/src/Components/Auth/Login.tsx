import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Form } from "antd";
import { Link } from "react-router-dom";


interface loginModel {
    email: string,
    password: string,
    rememberMe: boolean
}

function Login() {
    // state variables for email and passwords
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberme] = useState<boolean>(false);
    // state variable for error messages
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    // handle change events for input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "rememberMe") setRememberme(e.target.checked);
    };

    const handleRegisterClick = () => {
        navigate("/register");
    }

    // handle submit event for the form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //e.preventDefault();
        // validate email and passwords
        if (!email || !password) {
            setError("Please fill in all fields.");
        } else {
            // clear error message
            setError("");
            // post data to the /register api
            const model : loginModel = {
                email,
                password,
                rememberMe
            }

            fetch("api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(model),
            })

                .then((data) => {
                    // handle success or error from the server
                    console.log(data);
                    if (data.ok) {
                        setError("Successful Login.");
                        window.location.href = '/';
                    }
                    else
                        setError("Error Logging In.");

                })
                .catch((error) => {
                    // handle network error
                    console.error(error);
                    setError("Error Logging in.");
                });
        }
    };

    return (
        <div className="containerbox">
            <h3>Login</h3>
            <Form onFinish={handleSubmit}>
                <div>
                    <label className="forminput" htmlFor="email">Email:</label>
                </div>
                <div>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                </div>
                <div>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={rememberMe}
                        onChange={handleChange} /><span>Remember Me</span>
                </div>
                <div>
                    <Button key="loginBtn" type="primary" htmlType="submit">Login</Button>
                </div>
                <div>
                    <Button key="regBtn" onClick={() => handleRegisterClick()} type="primary">Register</Button>
                </div>
            </Form>
            {error && <p className="error">{error}</p>}
            <Link to="/register">На страницу входа</Link>
        </div>
    );
}

export default Login;
