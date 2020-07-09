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


export default function manageaccountModal(props){
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
          Manage Accounts
          &nbsp;&nbsp;&nbsp;
          <Button color="info">Add</Button>
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
      <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Account Name", "Account Email", "", ""]}
              tableData={[
                ["1","Mary", "mary22@bch.com", <Button fullWidth color="info">Edit</Button>, <Button fullWidth color="danger">Remove</Button>],
                ["2","John Doe", "john@bch.com", <Button fullWidth color="info">Edit</Button>, <Button fullWidth color="danger">Remove</Button>],
                ["3","Vivan Mar", "vivi@bch.com", <Button fullWidth color="info">Edit</Button>, <Button fullWidth color="danger">Remove</Button>]
              ]}
            />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={props.onHide}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}

