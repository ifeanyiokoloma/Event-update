import { Button, Modal } from 'react-bootstrap';

const DeleteWarn = ({
  handleDelete,
  handleClose,
}: {
  handleDelete: () => void;
  handleClose: () => void;
}) => {
  return (
    <Modal onHide={handleClose} size='lg' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Delete Event
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Event will be permanently gone, Are you sure you want to delete?
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant='primary' onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteWarn;
