import React, { useEffect, useState } from "react";
import Api from "../Axios/Api";

interface NavbarContextValue {
  data: any;
  setData: any;
  loading: any;
  setLoading: any;
  Modal: any;
  setModal: any;
  updateUser:any;
  setUpdateUser:any;
  Auth:any;
  setAuth:any
}

export const CrudDataContext = React.createContext<NavbarContextValue>({
  data: String,
  setData: () => {},
  loading: String,
  setLoading: () => {},
  Modal: Boolean,
  setModal: () => {},
  updateUser:String,
  setUpdateUser:()=>{},
  Auth:String,
  setAuth:()=>{},
});

const Context = (props: any) => {
  const [data, setData] = useState([]);
  const [Auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const [Modal, setModal] = useState(false);
  const [updateUser, setUpdateUser] = useState({})
  
  useEffect(() => {
    fetchData();
    setLoading(false);
    const auth:any = localStorage.getItem('token')
    const username:any = localStorage.getItem('username')
    setAuth({auth, username})
    
  }, [loading]);

  const fetchData = async () => {
    const Data = await Api.get("/api/users/");
    setData(Data.data);
  };
  console.log(Auth);
  return (
    <CrudDataContext.Provider
      value={{ data, setData, loading, setLoading, Modal, setModal,updateUser, setUpdateUser,Auth,setAuth }}
    >
      {props.children}
    </CrudDataContext.Provider>
  );
};

export default Context;
