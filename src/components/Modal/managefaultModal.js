import React from 'react';
import Button from "components/CustomButtons/Button.js";
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Table from "components/Table/Table.js";
import axios from 'axios';
import {useState} from 'react';
import { error } from 'jquery';

var fault = [];

function getFault(){
  axios
  .get("https://bchfrserver.herokuapp.com/api/v1/category")
  .then((response) => {
    
    // const array = [];
      // console.log(response.data );
      fault.push(response.data)
      // console.log(fault + "this is fault")
      // array.push(fault[0]))
      // console.log(array + "this is array");
  })
}
getFault();
export default function ManagefaultModal(props){
  // console.log(fault)
  getFault();
  function deleteFault(faultid){
    var answer = window.confirm("Are you sure you want to delete?");
    if(answer){
      axios
     .delete("https://bchfrserver.herokuapp.com/api/v1/category/" + faultid)
     window.location.href = "/admin/functions"
    }
    else{
        window.close();
    } 
  }

  const [search, setSearch] = useState('')


  // console.log(getFault().array[0]+"@@@@@@@@@!!!!!!!!!!!!!")
  //filter through all data instead of only 1
  // const filterArray = fault[0].filter((item)=>{
  //     return item.name.toLowerCase().includes(search.toLowerCase())
  //   })
  

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      keyboard={false}
    >
      <ModalHeader closeButton >
        <ModalTitle id="contained-modal-title-vcenter">
          Manage Faults
          &nbsp;&nbsp;&nbsp;
          <Button onClick={event =>  window.location.href='/fault/addfault'} color="info">Add</Button>
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
      <input className="form-control" type="text" placeholder="Search" onChange={ e => setSearch(e.target.value)}/>
      <Table
              tableHeaderColor="primary"
              tableHead={["Fault type", "Has Radio Option?", "Has Checkbox Option?", "", ""]}
              // tableData={
              //   filterArray.map((array) => {
              //     return [array.name,array.haveRadio,array.haveCheck,<Button onClick={event =>  window.location.href='/fault/editfault/'+array.uuid} fullWidth color="info">Edit</Button>,<Button onClick={() => deleteFault(array.uuid)} fullWidth color="danger">Remove</Button>]
              // })
              // }
            />
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={e => setSearch(e.value = "")}>Reset Filter</Button>
        <Button color="danger" onClick={props.onHide}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}

