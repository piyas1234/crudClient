import React, { useEffect } from "react";
import { useContext } from "react";
import Api from "../../Axios/Api";
import { CrudDataContext } from './../../Global/Context';
import UpdateModal from './../Modal/UpdateModal';
interface CrudProps {
  data: {
    id: Number;
    username: String;
    email: String;
    date_of_birth: String;
    profession: String;
    password:String
  };
}

export default function Crud(props: CrudProps) {
  const { id, username, email, date_of_birth, profession, password } = props.data;

  const {setLoading} =useContext(CrudDataContext)
  
 
  const DeleteData = async ()=>{
      const ResponseData = await Api.delete(`/api/users/${id}`)
      setLoading(true)
  }
  return (
    <div className="shadow-lg m-2 text-primary">
      <div className="d-flex justify-content-center">
        <h6 className="mr-5">{id}. </h6> 
        <h6 className="w-25">{username}</h6>
        <h6 className="w-25">{email}</h6>
        <h6 className="w-25">{date_of_birth}</h6>
        <h6 className="w-25">{profession}</h6>
        <h6 className="ml-2 mr-2">{password}</h6>
        <div className="d-flex">
          {" "}
          <button onClick={DeleteData} className="btn btn-sm btn-danger mr-2" type="submit">Detete</button>
           <UpdateModal data={props.data}/>
        </div>
      </div>
    </div>
  );
}
