import React from 'react';
import { Fragment } from 'react';
import Select from 'react-select';
import Button from "components/CustomButtons/Button.js";
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Table from "components/Table/Table.js";



export default function pendingcaseModal(props){
  const faultOptions = [
    { value: 'Aircon', label: 'Aircon'},
    { value: 'Equipment', label: 'Equipment'},
    { value: 'Furniture', label: 'Furniture'},
    { value: 'Chiller', label: 'Chiller'}
  ];  
  const storeOptions = [
    { value: 'Ang Mo Kio', label: 'Ang Mo Kio'},
    { value: 'Hillion Mall', label: 'Hillion Mall'},
    { value: 'Causeway Point', label: 'Causeway Point'},
    { value: 'Vivo City', label: 'Vivo City'}
  ];  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <ModalHeader closeButton >
        <ModalTitle id="contained-modal-title-vcenter">
          Pending Issues
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
      <Fragment>
        <p><b>Fault types</b></p>
        <Select
          className="basic-single"
          classNamePrefix="select"
          name="color"
          options={faultOptions}
        />
        <br></br>
        <p><b>Store Location</b></p>
        <Select
          className="basic-single"
          classNamePrefix="select"
          name="color"
          options={storeOptions}
        />
      </Fragment>
      <Table
              tableHeaderColor="primary"
              tableHead={["Reported on", "Fault type", "Store Location", "PENDING"]}
              tableData={[
                ["02/07/2020 2.30PM", "Chiller", "Hillion Mall", <Button fullWidth color="info">View</Button>],
                ["06/07/2020 10.30AM", "Griller", "Causeway Point", <Button fullWidth color="info">View</Button>],
                ["04/07/2020 5.30PM", "Aircon", "AMK Hub", <Button fullWidth color="info">View</Button>]
              ]}
            />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={props.onHide}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}

