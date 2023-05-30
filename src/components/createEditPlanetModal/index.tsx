import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Planet, PlanetForm} from "../../types/planet";
import { People } from "../../types/people";
import CustomSelect, { OptionType } from "../customSelect";

export interface ModalProps {
  onHide: () => void;
  show?: boolean;
  type: 'create' | 'edit';
  onSave: (planet: PlanetForm) => void;
  peopleList: People[];
  planet: Planet | null;
  planetsUrl: string[]
}

interface ErrorPlanetForm {
    name: boolean;
    climate: boolean;
    terrain: boolean;
    diameter: boolean;
    url: boolean;
}

function CreateEditPlanetModal(props: ModalProps) {
    const [inputs, setInputs] = useState<PlanetForm>({
        name: '',
        diameter: 0,
        climate: '',
        terrain: '',
        population: 0,
        residents: [],
        url: ''
    });

    const [selectedResidents, setSelectedResidents] = useState<OptionType[]>([]);

    const [error, setErrors] = useState<ErrorPlanetForm>({
        name: false,
        climate: false,
        terrain: false,
        diameter: false,
        url: false
    })

    const options:OptionType[] = props.peopleList.map((each) => ({value:each.url, label: each.name}))

    useEffect(() => {
        clear()
        if (props.planet) {
            setInputs({
                name: props.planet.name,
                diameter: Number(props.planet.diameter),
                climate: props.planet.climate,
                terrain: props.planet.terrain,
                population: Number(props.planet.population),
                residents: [],
                url: props.planet.url
            })
            setSelectedResidents(options.filter(({ value }: OptionType) => props.planet?.residents.includes(value)))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.planet])

    const isValid = (): boolean => {
        const errors = {...error};
        errors.name = inputs.name === ''
        errors.climate = inputs.climate === ''
        errors.terrain = inputs.terrain === ''
        errors.diameter = !(inputs.diameter > 0)
        errors.url = inputs.url === '' || (props.type === 'create' ? props.planetsUrl.includes(inputs.url) : false);

        setErrors(errors);
        return !errors.name && !errors.climate && !errors.terrain && !errors.diameter && !errors.url;
    }

    const clear = (): void => {
        setInputs({
            name: '',
            diameter: 0,
            climate: '',
            terrain: '',
            population: 0,
            residents: [],
            url: ''
        })
        setSelectedResidents([]);
        setErrors({
            name: false,
            climate: false,
            terrain: false,
            diameter: false,
            url: false
        })
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }

    const handleChangeSelect = (option: readonly OptionType[]) => {
        setSelectedResidents([...option]);
    };

    const handleSubmit = (event: React.MouseEvent<HTMLElement>): void => {
      event.preventDefault()
      if (isValid()) {
          inputs.residents = selectedResidents.map(({ value }: OptionType) => ( value ))
          props.onSave(inputs)
          clear()
      }
    }

    return (
        <Modal
          show={props.show}
          onHide={() => {
            clear()
            props.onHide()
          }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {props.type === 'create' ? 'Create new' : 'Edit'} planet
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Floating className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="name"
                  id="name"
                  required
                  value={inputs.name || ''}
                  onChange={handleChange}
                  isInvalid={error.name}
                />
                <label htmlFor="name">Planet name</label>
                <Form.Control.Feedback type="invalid">
                  Please do not leave this field blank
                </Form.Control.Feedback>
              </Form.Floating>
              <Form.Floating className="mb-3" >
                <Form.Control
                  type="text"
                  placeholder="Url"
                  name="url"
                  required
                  id="url"
                  value={inputs.url || ''}
                  onChange={handleChange}
                  isInvalid={error.url}
                  disabled={props.type === 'edit'}
                />
                <label htmlFor="url">Planet url</label>
                <Form.Control.Feedback type="invalid">
                  Please do not leave this field blank, this field cannot be repeated because it will be used as a planet identifier.
                </Form.Control.Feedback>
              </Form.Floating>
              <InputGroup className="mb-3">
                <Form.Floating >
                  <Form.Control
                    type="number"
                    placeholder="Diameter"
                    aria-label="Recipient's username"
                    name="diameter"
                    min="0"
                    id="diameter"
                    value={inputs.diameter || 0}
                    onChange={handleChange}
                    isInvalid={error.diameter}
                  />
                  <label htmlFor="diameter">Diameter</label>
                  <Form.Control.Feedback type="invalid">
                    The diameter must be a number greater than 0
                  </Form.Control.Feedback>
                </Form.Floating>
                <InputGroup.Text id="basic-addon2">Km</InputGroup.Text>
              </InputGroup>
              <Form.Floating className="mb-3" >
                <Form.Control
                  type="text"
                  placeholder="Climate"
                  name="climate"
                  id="climate"
                  required
                  value={inputs.climate || ''}
                  onChange={handleChange}
                  isInvalid={error.climate}
                />
                <label htmlFor="climate">Climate</label>
                <Form.Control.Feedback type="invalid">
                  Please do not leave this field blank
                </Form.Control.Feedback>
              </Form.Floating>
              <Form.Floating className="mb-3" >
                <Form.Control
                  type="text"
                  placeholder="Terrain"
                  name="terrain"
                  id="terrain"
                  required
                  value={inputs.terrain || ''}
                  onChange={handleChange}
                  isInvalid={error.terrain}
                />
                <label htmlFor="terrain">Terrain</label>
                <Form.Control.Feedback type="invalid">
                  Please do not leave this field blank
                </Form.Control.Feedback>
              </Form.Floating>
              <Form.Floating className="mb-3" >
                <Form.Control
                  type="number"
                  placeholder="Number of habitants of the planet"
                  name="population"
                  id="population"
                  required
                  min="0"
                  value={inputs.population || 0}
                  onChange={handleChange}
                />
                <label htmlFor="population">Number of habitants of the planet</label>
              </Form.Floating>
              <label htmlFor="Residents" className="m-1">Residents</label>
              <CustomSelect
                  value={selectedResidents}
                  isMulti
                  name="Residents"
                  id="Residents"
                  getOptionValue={(option) => option.value}
                  getOptionLabel={(option) => option.label}
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleChangeSelect}
                  closeMenuOnSelect={false}
                />

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="success" onClick={handleSubmit}>Save</Button>
            <Button variant="danger" onClick={() => {
              clear()
              props.onHide()
            }}>Close</Button>
          </Modal.Footer>
        </Modal>
    )
}

export default CreateEditPlanetModal;