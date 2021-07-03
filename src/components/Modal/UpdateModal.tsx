import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Api from "../../Axios/Api";
import { CrudDataContext } from "./../../Global/Context";

interface UpdateModalProps {
  data: {
    id: Number;
    username: String;
    email: String;
    date_of_birth: String;
    profession: String;
    password:String;
  };
}
function UpdateModal(props: UpdateModalProps) {
  const { id, username, email, date_of_birth, profession, password } = props.data;
  const { setLoading } = useContext(CrudDataContext);
  const [show, setShow] = useState(false);

  const [data, setData] = useState({
    id ,
    username,
    email,
    date_of_birth,
    profession ,
    password
  });
  useEffect(() => {
    setData(props.data);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChangeHandler = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };
  

  const onSubmit = async (e:any)=>{
     e.preventDefault()
     const response = await Api.put(`/api/users/${id}/`,data);
     console.log(response)
     setLoading(true)
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Update
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
          <form>
            <input
              onChange={onChangeHandler}
              value={`${data.username}`}
              name="username"
              className="form-control m-2"
            />

            <input
              onChange={onChangeHandler}
              value={`${data.email}`}
              name="email"
              className="form-control m-2"
            />

            <input
              onChange={onChangeHandler}
              value={`${data.date_of_birth}`}
              type="date"
              className="form-control m-2"
              name="date_of_birth"
            />

            <input
              onChange={onChangeHandler}
              value={`${data.profession}`}
              name="profession"
              className="form-control m-2"
            />
            <input
              onChange={onChangeHandler}
              value={`${data.password}`}
              name="password"
              className="form-control m-2"
            />

            <input onClick={onSubmit} className="btn btn-primary" type="submit" />
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

export default UpdateModal;
