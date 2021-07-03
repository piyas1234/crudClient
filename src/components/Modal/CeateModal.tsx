import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import Api from "../../Axios/Api";
import { CrudDataContext } from './../../Global/Context';

type Inputs = {
  username: string;
  email: string;
  date_of_birth: string;
  profession: string;
  password:String;
};

function CreateModal() {
  const {setLoading} = useContext(CrudDataContext)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();


  const onSubmit: SubmitHandler<Inputs> =async (data) =>{ 
     
    console.log(data)
    const response = await Api.post('/api/users/',data)
    setLoading(true)
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add User
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
            <input placeholder="username" className="form-control m-2" {...register("username", { required: true })} />
            {errors.username && <span>This field is required</span>}
            <input placeholder="email" className="form-control m-2" {...register("email", { required: true })} />
            {errors.email && <span>This field is required</span>}
            <input   type="date" className="form-control m-2" {...register("date_of_birth", { required: true })} />
            {errors.date_of_birth && <span>This field is required</span>}
            <input placeholder="profession" className="form-control m-2" {...register("profession", { required: true })} />
            {errors.profession && <span>This field is required</span>} 
            
            <input placeholder="password" className="form-control m-2" {...register("password", { required: true })} />
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

export default CreateModal;
