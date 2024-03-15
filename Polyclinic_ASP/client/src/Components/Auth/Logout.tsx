import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserObj from "../Entities/UserObj"
import { notification } from "antd"

interface PropsType {
    setUser: (value: UserObj | null) => void
}

const LogOff: React.FC<PropsType> = ({ setUser }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const logOff = async () => { 
        const requestOptions = {
          method: "POST",
        }
    
        return await fetch("api/logoff", requestOptions)
          .then((response) => {
            if (response.status === 200)
            { 
              setUser(null);
              navigate("/");
              notification.success({
                message: "Выход завершился удачно",
                placement: 'topRight',
                duration: 2
            });
            }
    
            if (response.status === 401) 
            { 
              notification.error({
                message: "Сначала выполните вход",
                placement: 'topRight',
                duration: 2
              });
                //alert("Сначала выполните вход")
                navigate("/login")
            }
          })      
    }
    logOff();
  }, [navigate, setUser])

  return (<></>);
}

export default LogOff