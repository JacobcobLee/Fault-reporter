import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import CardIcon from "components/Card/CardIcon.js";
import CropFree from "@material-ui/icons/CropFree";
import Store from "@material-ui/icons/Store";
import ReportProblem from "@material-ui/icons/ReportProblem";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import ManageQrModal from "components/Modal/manageqrModal.js";
import ManageStoreModal from "components/Modal/managestoreModal.js";
import ManageFaultModal from "components/Modal/managefaultModal.js";
import ManageAccountModal from "components/Modal/manageaccountModal.js";
import { useState } from 'react';
import axios from 'axios';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";


const useStyles = makeStyles(styles);


export default function Functions() {
  const classes = useStyles();
  const [role, setRole] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [ modalShow3, setModalShow3] = React.useState(false);
  const [modalShow4, setModalShow4] = React.useState(false);

  // function test2go(){
  //     console.log("@@@@@@@@@@@@@")
  //     db.ref('users/').on('value', snapshot => {
  //       let data = snapshot.val();
  //       data.map((element) => {
  //         if(element === localStorage.email){
  //           setRole(element.role)
  //           return console.log(element.email)
  //         }else{
  //           setRole("Member")
  //           return console.log("member")
  //         }
  //       });
  //     })
  // }

  // new ManageFaultModal().getFault();
  // new ManageAccountModal().getUsers();
  // new ManageQrModal().getQR();
  // new ManageStoreModal().getStores();

  function getRole(){
    axios
  .get("https://bchfrserver.herokuapp.com/api/v1/role")
  .then((response) => {
    var obj = response.data;
    var arr = [];
    var userEmail = localStorage.getItem('user')
    for (var i in obj){
      arr.push(obj[i])
    }
    // console.log(arr[1].role);
    // console.log(userEmail)
     for( var v = 0; v < arr.length; v++ ){
      //  console.log(arr.length)
        if (arr[v].email === userEmail){
          // console.log("role is " + arr[v].role + " email is " +arr[v].email)
          setRole(arr[v].role)
          // console.log("roleSet!")
          break
        }
     }
     
    })
  .catch((err) => {
    console.log(err + "error at Functions.js at testigo line 55")
  })
  }

  // function test() {
  //   auth.onAuthStateChanged(function (user) {
  //     console.log(user.uid+"@@@@@@@@@@@@@@@@@@@")
  //     db.ref('users/' + user.uid).once('value').then( snapshot => {
  //       let data = snapshot.val();
  //       console.log(data.role);
  //       console.log(data.email);
  //       setRole(data.role);
  //     })
  //   })
  // }
  getRole()
  function displayAccountModal() {
    if (role === "Admin") {
      return (
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <SupervisorAccount />
              </CardIcon>
              <p className={classes.cardCategory}>Manage Accounts</p>
              <h5 className={classes.cardTitle}>View/Create Accounts</h5>
            </CardHeader>
            <CardBody>
              <Button onClick={() => setModalShow4(true)} fullWidth color="success">View</Button>
              <ManageAccountModal
                show={modalShow4}
                onHide={() => setModalShow4(false)}
              />
            </CardBody>
          </Card>
        </GridItem>
      )
    }
    else
    {

    }
  }


  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={4}>
        <Card>
          <CardHeader color="info" stats icon>
            <CardIcon color="info">
              <CropFree />
            </CardIcon>
            <p className={classes.cardCategory}>Manage QR Codes</p>
            <h5 className={classes.cardTitle}>Edit QR here</h5>
          </CardHeader>
          <CardBody>
            <Button onClick={() => setModalShow(true)} fullWidth color="success">View</Button>
            <ManageQrModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <Card>
          <CardHeader color="warning" stats icon>
            <CardIcon color="warning">
              <Store />
            </CardIcon>
            <p className={classes.cardCategory}>Manage Stores</p>
            <h5 className={classes.cardTitle}>Add/Remove/Edit Stores here</h5>
          </CardHeader>
          <CardBody>
            <Button onClick={() => setModalShow2(true)} fullWidth color="success">View</Button>
            <ManageStoreModal
              show={modalShow2}
              onHide={() => setModalShow2(false)}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <Card>
          <CardHeader color="danger" stats icon>
            <CardIcon color="danger">
              <ReportProblem />
            </CardIcon>
            <p className={classes.cardCategory}>Manage Faults</p>
            <h5 className={classes.cardTitle}>Add/Remove/Edit Faults here</h5>
          </CardHeader>
          <CardBody>
            <Button onClick={() => setModalShow3(true)} fullWidth color="success">View</Button>
            <ManageFaultModal
              show={modalShow3}
              onHide={() => setModalShow3(false)}
            />
          </CardBody>
        </Card>
      </GridItem>
      {displayAccountModal()}
    </GridContainer>
  );
}
