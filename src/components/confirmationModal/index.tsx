import { Modal, Button } from 'react-bootstrap';
import './style.css'

export interface ConfirmationModalProps {
    onHide: () => void;
    show?: boolean;
    onConfirm: () => void;
    title: string
}

function ConfirmationModal({ show, onHide, onConfirm, title }: ConfirmationModalProps) {
    return(
        <Modal
          show={show}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="btn-confirmation">
                  <Button variant="danger" onClick={onConfirm}>Accept</Button>
                  <Button variant="primary" onClick={onHide}>Cancel</Button>
              </div>
          </Modal.Body>
        </Modal>
      );
}

export default ConfirmationModal;
