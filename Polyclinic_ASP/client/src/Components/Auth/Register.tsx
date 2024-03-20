import React, { useState } from "react";
import { Input, Button, Form, Radio } from "antd";
import { Link } from "react-router-dom";
import RegModel from "../Entities/RegModel";
import "./ContainerStyle.css";
import { notification } from "antd";
import { useErrorBoundary } from "react-error-boundary";
import axios from "axios";

interface responseModel {
  message: string;
  error: Array<string>;
}

interface PropsType {}

const Register: React.FC<PropsType> = () => {
  // state variables for email and passwords
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setConfirmPassword] = useState<string>("");
  const [doctorId, setDoctorId] = useState<number>();
  const [role, setRole] = useState<string>("");

  const [error, setError] = useState<Array<string>>([]);

  const [componentDisabled, setDisabled] = useState<boolean>(false);

  const { showBoundary } = useErrorBoundary();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setError([]);

    const model: RegModel = {
      email,
      password,
      passwordConfirm,
      doctorId,
      role,
    };

    const register = async () => {
        try
        {
          const response = await axios.post<responseModel>("api/register", model);;
          if (response.status === 200)
          {
            notification.success({
              message: "Регистрация завершилась удачно",
              placement: "topRight",
              duration: 2,
            });
            if (response.data.error !== undefined) {
              console.log(response.data.error);
              setError(["Регистрация завершилась неудачно "].concat(response.data.error));
            } else {
              setError([response.data.message]);
            }
          }
          else
          {
            notification.error({
              message: "Регистрация завершилась неудачно",
              placement: "topRight",
              duration: 2,
            });
          }
        }
        catch (error)
        {
          showBoundary(error);
          console.error(error);
        }

      // await fetch("api/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(model),
      // })
      //   .then((response) => {
      //     if (response.ok) {
      //       notification.success({
      //         message: "Регистрация завершилась удачно",
      //         placement: "topRight",
      //         duration: 2,
      //       });
      //     } else {
      //       notification.error({
      //         message: "Регистрация завершилась неудачно",
      //         placement: "topRight",
      //         duration: 2,
      //       });
      //     }
      //     return response.json();
      //   })
      //   .then((data: responseModel) => {
      //     if (data.error !== undefined) {
      //       console.log(data.error);
      //       setError(["Регистрация завершилась неудачно "].concat(data.error));
      //     } else {
      //       setError([data.message]);
      //     }
      //   })
      //   .catch((error) => {
      //     // Сетевая ошибка
      //     showBoundary(error);
      //     console.error(error);
      //   });
    };

    register();
  };

  const handleSelectRole = (role: string) => {
    if (role === "Registrator") {
      setDisabled(true);
      setDoctorId(undefined);
    } else if (role === "Doctor") {
      setDisabled(false);
    }
    setRole(role);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <div className="containerbox">
      <Form onFinish={handleSubmit} {...layout}>
        <h3>Регистрация</h3>
        <Form.Item
          name="roleId"
          label="Роль"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Выберите роль",
            },
          ]}
          wrapperCol={{ span: 16 }}
        >
          <Radio.Group
            onChange={(e) => handleSelectRole(e.target.value)}
            value={role}
          >
            <Radio value={"Registrator"}>Регистратор</Radio>
            <Radio value={"Doctor"}>Врач</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="doctorId"
          label="Уникальный номер"
          hasFeedback
          rules={
            componentDisabled
              ? []
              : [
                  {
                    required: true,
                    message: "Введите Email",
                  },
                  () => ({
                    validator(_, value) {
                      if (Number(value) === parseInt(value, 10))
                        return Promise.resolve();
                      return Promise.reject(
                        new Error("Введите корректный уникальный номер")
                      );
                    },
                  }),
                ]
          }
        >
          <Input
            name="doctorId"
            onChange={(e) => setDoctorId(Number(e.target.value))}
            value={doctorId}
            disabled={componentDisabled}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Введите Email",
            },
            {
              type: "email",
              message: "Введите корректный Email",
            },
          ]}
        >
          <Input name="email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Введите пароль",
            },
            () => ({
              validator(_, value) {
                if (
                  /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? _"]).*$/.test(
                    value
                  )
                )
                  return Promise.resolve();
                return Promise.reject(
                  new Error(
                    "Пароль должен должен состоять минимум из 6 символов, содержать только латинские символы, содержать заглавные, строчные буквы, цифры и специальные символы"
                  )
                );
              },
            }),
          ]}
        >
          <Input.Password
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Повторите пароль"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Повторите пароль",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают"));
              },
            }),
          ]}
        >
          <Input.Password
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType="submit" type="primary">
            Регистрация
          </Button>
          {error && error.map((value, key) => <p key={key}>{value}</p>)}
          <br />
          <Link to="/login">На страницу входа</Link>
        </Form.Item>
      </Form>
      <br />
    </div>
  );
};

export default Register;
