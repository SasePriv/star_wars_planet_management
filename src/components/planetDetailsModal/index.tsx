import { Planet } from "../../types/planet";
import { People } from "../../types/people";
import { Button, Modal, Badge, ListGroup } from 'react-bootstrap';
import './style.css'


export interface PlanetDetailsModalProps {
    planet: Planet;
    onHide: () => void;
    show?: boolean;
    peoples: People[];
}

function PlanetDetailsModal({ show, onHide, planet, peoples }: PlanetDetailsModalProps) {
    const peopleResident = () => {
      const rows: JSX.Element[] = [];
      peoples.forEach((people: People) => {
        if (planet.residents.includes(people.url)) {
          rows.push(<li key={people.url}>{people.name}</li>)
        }
      })
      return rows;
    }

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
          <b>{planet.name}</b> / Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup as="ol" className="list-detail">
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Diameter</div>
              {planet.diameter} Km
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Climate</div>
              {planet.climate}
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Terrain</div>
              {planet.terrain}
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Population</div>
              {planet.population}
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Residents of the planet <Badge bg="primary" pill>{planet.residents.length}</Badge></div>
              <ul>
                {peopleResident()}
              </ul>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default PlanetDetailsModal;