import React from 'react';
import { Fragment } from 'react';
import Select from 'react-select';
import {useState} from 'react';
import Button from "components/CustomButtons/Button.js";
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Table from "components/Table/Table.js";
import axios from 'axios';


const users = [];
const array = [];
function getUsers(){
  
  axios
  .get("http://localhost:8080/api/v1/allusers")
  .then((response) => {
    //console.log(response.data);
      users.push(response.data)
      array.push(users[0])
      //to test and see the get form DB
      // console.log(array[0].lastSignInTime);
      // console.log("@@@@@@@@@@@@@@@@@@@@@@@@")
  })
}
getUsers();



export default function ManageaccountModal(props){
  const [search, setSearch] = useState('')

  //filter through all data instead of only 1
   const filterArray = users[0].filter(function(item){
    return Object.values(item).some( val => 
        String(val).toLowerCase().includes(search.toLowerCase()) 
    )
})
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
          View Accounts
          &nbsp;&nbsp;&nbsp;
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <input className="form-control" type="text" placeholder="Search" onChange={ e => setSearch(e.target.value)}/>
      <Table
              tableHeaderColor="primary"
              tableHead={["Account ID", "Account Email", "Last login"]}
              tableData= {
                filterArray.map((array) =>{
                  return [array.uid,array.email,array.metadata.lastSignInTime]})
              }
            />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={props.onHide}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}


