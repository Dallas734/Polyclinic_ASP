import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserObj from "../Entities/UserObj";
import { notification } from "antd";
import { useErrorBoundary } from "react-error-boundary";

interface PropsType {
  setUser: (value: UserObj | null) => void;
}

const LogOff: React.FC<PropsType> = ({ setUser }) => {
  const navigate = useNavigate();

  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const logOff = async () => {
      const requestOptions = {
        method: "POST",
      };

      await fetch("api/logoff", requestOptions)
        .then((response) => {
          if (response.status === 200) {
            setUser(null);
            navigate("/");
            notification.success({
              message: "Выход завершился удачно",
              placement: "topRight",
              duration: 2,
            });
          }

          if (response.status === 401) {
            notification.error({
              message: "Сначала выполните вход",
              placement: "topRight",
              duration: 2,
            });
            navigate("/login");
          }
        })
        .catch((error) => showBoundary(error));
    };
    logOff();
  }, [navigate, setUser, showBoundary]);

  return <></>;
};

export default LogOff;
