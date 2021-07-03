import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import Api from "../../Axios/Api";
import { CrudDataContext } from './../../Global/Context';

type Inputs = {
  username: string;
  password:String;
};

function Login() {
  const {setLoading} = useContext(CrudDataContext)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm<Inputs>();


  const onSubmit: SubmitHandler<Inputs> =async (data) =>{ 
    const response = await Api.post('/api/token/',data)
    localStorage.setItem('token',response.data.access)
    localStorage.setItem('username', data.username)
    setLoading(true)
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Login
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input className="form-control m-2" {...register("username", { required: true })} />
            {errors.username && <span>This field is required</span>}
            <input className="form-control m-2" {...register("password", { required: true })} />
            {errors.password && <span>This field is required</span>}

            <input className="btn btn-primary" type="submit" />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
