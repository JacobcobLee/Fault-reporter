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


export default function managestoreModal(props){
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
          Manage Stores
          &nbsp;&nbsp;&nbsp;
          <Button color="info">Add</Button>
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
      <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Store Location", "Store Address", "", ""]}
              tableData={[
                ["1","Hillion Mall", "Bukit View Street 71 #01-22 543221", <Button fullWidth color="info">Edit</Button>, <Button fullWidth color="danger">Remove</Button>],
                ["2","Causeway Point", "Woodlands Ave 3 #B1-22 721233", <Button fullWidth color="info">Edit</Button>, <Button fullWidth color="danger">Remove</Button>],
                ["3","Vivo City", "Bendemeer Street 1 #03-61 123999", <Button fullWidth color="info">Edit</Button>, <Button fullWidth color="danger">Remove</Button>]
              ]}
            />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={props.onHide}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}

