import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserObj from "../Entities/UserObj";
import { notification } from "antd";
import { useErrorBoundary } from "react-error-boundary";
import { Fetch } from "../../axiosInstance";

interface PropsType {
  setUser: (value: UserObj | null) => void;
}

const LogOff: React.FC<PropsType> = ({ setUser }) => {
  const navigate = useNavigate();

  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const logOff = async () => {
      try {
      const response = await Fetch.post(`${process.env.REACT_APP_BACKEND_URL}api/logoff`);
      if (response.status === 200)
      {
        setUser(null);
            navigate("/");
            notification.success({
              message: "Выход завершился удачно",
              placement: "topRight",
              duration: 2,
            });
      }
      else if (response.status === 401)
      {
        notification.error({
          message: "Сначала выполните вход",
          placement: "topRight",
          duration: 2,
        });
        navigate("/login");
      }
    }
    catch (error)
    {
      showBoundary(error);
    }
    };
    logOff();
  }, [navigate, setUser, showBoundary]);

  return <></>;
};

export default LogOff;
