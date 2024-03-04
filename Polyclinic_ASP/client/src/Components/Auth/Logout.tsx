import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserObj from "../Entities/UserObj"

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
            }
    
            if (response.status === 401) 
            { 
                alert("Сначала выполните вход")
                navigate("/login")
            }
          })      
    }
    logOff();
  }, [navigate, setUser])

  return (<></>);
}

export default LogOff