import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Form } from "antd";


function Register() {
    // state variables for email and passwords
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [doctorId, setDoctorId] = useState<number>();
    //const [roleId, setRoleId] = useState<number>();
    const navigate = useNavigate();

    // state variable for error messages
    const [error, setError] = useState("");

    const handleLoginClick = () => {
        navigate("/login");
    }


    // handle change events for input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
        if (name === "doctorId") setDoctorId(Number(value));
        //if (name === "roleId") setRoleId(Number(value));
    };

    // handle submit event for the form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //e.preventDefault();
        // validate email and passwords
        if (!email || !password || !confirmPassword) {
            setError("Пожалуйста, заполните все обязательные поля.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Пожалуйста, введите корректный адрес электронной почты.");
        } else if (password !== confirmPassword) {
            setError("Пароли не совпадают.");
        } else {
            setError("");
            fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    doctorId
                }),
            })
                .then((data) => {
                    console.log(data);
                    if (data.ok)
                        setError("Регистрация прошла успешно.");
                    else
                        setError("Ошибка регистрации.");

                })
                .catch((error) => {
                    // handle network error
                    console.error(error);
                    setError("Ошибка регистрации.");
                });
        }
    };

    return (
        <div className="containerbox">
            <h3>Регистрация</h3>

            <Form onFinish={handleSubmit}>
                <div>
                    <label htmlFor="roleId">Роль:</label>
                </div><div>
                    <Input
                        id="role"
                        name="role"
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="doctorId">Уникальный код:</label>
                </div><div>
                    <Input
                        id="doctorId"
                        name="doctorId"
                        value={doctorId}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                </div><div>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Пароль:</label></div><div>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Повторите пароль:</label></div><div>
                    <Input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <Button htmlType="submit" type="primary">Регистрация</Button>

                </div>
                <div>
                    <Button onClick={() => handleLoginClick()} type="primary">На страницу входа</Button>
                </div>
            </Form>

            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Register;
