import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Form, Checkbox} from "antd";
import { Link } from "react-router-dom";
import LoginModel from "../Entities/LoginModel";
import UserObj from "../Entities/UserObj";

interface ResponseModel {
    message: string,
    responseUser: UserObj
} 
interface PropsType {
    setUser: (value: UserObj) => void 
}

const Login : React.FC<PropsType> = ({ setUser }) => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberme] = useState<boolean>(false);
    const [message, setMessage] = useState<Array<string>>([]);
    const navigate = useNavigate();

    // handle submit event for the form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setMessage([]);
        const model : LoginModel =
        {
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
        .then((response) => {
            // handle success or error from the server
            if (response.ok) {
                setMessage(["Вход завершился удачно"]);
                // Переход куда-то
                navigate("/");
                //window.location.href = '/';
            }
            return response.json();
        })
        .then((data : ResponseModel) => {
            if (data.responseUser === null)
            {
                console.log(data.message);
                setMessage(["Вход завершился неудачно"].concat(data.message));
            }
            else
            {
                //console.log(data.message);
                setUser(data.responseUser);
                setMessage([...message, data.message]);
            }
        })
        .catch((error) => {
            // handle network error
            console.error(error);
        });
    }


    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },
    };

    return (
        <div className="containerbox">
            <Form onFinish={handleSubmit} {...layout}>
                <h3>Вход</h3>
                <Form.Item
                name="email"
                label="Email"
                hasFeedback
                rules={[
                    {
                        required: true, 
                        message: "Введите Email"
                    },
                    {
                        type: "email",
                        message: "Введите корректный Email"
                    }
                ]}
                >
                    <Input name="email" onChange={(e) => setEmail(e.target.value)}/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Пароль"
                    hasFeedback
                    rules={[
                        {
                            required: true, 
                            message: "Введите пароль"
                        },
                        () => ({
                            validator(_, value) {
                                if (/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? _"]).*$/.test(value))
                                    return Promise.resolve();
                                return Promise.reject(new Error("Пароль должен должен состоять минимум из 6 символов, содержать только латинские символы, содержать заглавные, строчные буквы, цифры и специальные символы"));
                            }
                        })
                    ]}    
                >
                    <Input.Password name="password" onChange={(e) => setPassword(e.target.value)}/>
                </Form.Item>
                <Form.Item
                    name="rememberMe"
                    wrapperCol={{ offset: 5, span: 16 }}
                >
                    <Checkbox value={rememberMe} onChange={(e) => setRememberme(e.target.checked)}>Запомнить?</Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                {message && message.map((value, key) => (<p key={key}>{value}</p>))}<br/>
                    <Button htmlType="submit" type="primary">Вход</Button>
                    <Link to="/register">На страницу регистрации</Link>
                </Form.Item>
            </Form><br/>
        </div>
    );
}

export default Login;
