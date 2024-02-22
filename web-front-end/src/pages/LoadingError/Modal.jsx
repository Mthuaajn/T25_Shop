import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ModalHeader } from 'react-bootstrap';
import React, { useState } from 'react';
function VerticallyCenteredModal(props) {
  //console.log("Props: ", props)
  const { onDelete, onCancel } = props
 const [modalShow, setModalShow] = React.useState(false);

  const onDelete2 = () =>   setModalShow(false)
  const onCancel2 = () =>  setModalShow(false)

  const [active, setActive] = useState(false);
  
  return (
    <div style={{ display: 'block', position: 'initial' }}  className="modal show">
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
  
     data-bs-theme="transparent" //show in
      backdrop="static"
      className={active ? 'modal-backdrop active show in' : 'modal-backdrop inactive show in'}
    >
    
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.body}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" className="bg-danger p-2 rounded-lg" onClick={onDelete}>
            Delete
          </Button>
          <Button variant="primary" className="bg-primary p-2 rounded-lg" onClick={onCancel}>
            Cancel
          </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
}

export default VerticallyCenteredModal;
