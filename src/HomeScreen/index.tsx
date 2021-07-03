import React from "react";
import { useContext } from "react";
import { CrudDataContext } from "./../Global/Context";
import Crud from "./../components/Crud/index";
import CreateModal from './../components/Modal/CeateModal';
import Login from "../components/Modal/Login";
function HomeScreen() {
  const { data , Auth, setLoading } = useContext(CrudDataContext);
   
  const logout = () =>{
      localStorage.setItem('token','')
      localStorage.setItem('username','')
      setLoading(true)
  }
  return (
    <div>
      <h1 className="text-center shadow-lg p-2 text-info mt-5">CRUD</h1>
       <CreateModal/>  {!Auth.username && <Login/>}  {Auth.username && <h3>username{Auth.username}</h3> }  
       {Auth.username &&  <button onClick={logout} className="btn btn-danger">logout</button>}
      {data && data.map((item: any) => <Crud data={item} />)}
    </div>
  );
}

export default HomeScreen;
