import React, { useEffect } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import axios from 'axios';
import Select from 'react-select';
import { useState } from 'react';
// import Modal from 'react-bootstrap/Modal';


var pageURL = window.location.href;
var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
//console.log(lastURLSegment);


export default function Solve() {
    const [displayspecificCases, setdisplayspecificCases] = useState([])
    const [edit, setEdit] = useState("Unresolved");
    const [comment, setComment] = useState(displayspecificCases.comments);
    const [img, setimg] = useState('');
    const statusOptions = [{ value: "Unresolved", label: "Unresolved" }, { value: "Pending", label: "Pending" }, { value: "Resolved", label: "Resolved" }]
    let user2 = "sample text";
    useEffect(()=>{
        axios
        .get("https://bchfrserver.herokuapp.com/api/v1/fault/" + lastURLSegment)
        .then((response) => {
            setdisplayspecificCases(response.data);
        });
    });
    //const [currentuser,setCurrentUser] = useState();
    
    useEffect(()=>{
        axios
        .put("https://bchfrserver.herokuapp.com/api/v1/fault/" + lastURLSegment, { "status": edit.toString(), "comments": comment.toString(), "lasteditedby": user2.toString() })
        .then((response) => {
            window.alert('Successfully edited case!');
            window.location.reload();
            window.location.href = "/admin/dashboard";
        });
    });

    useEffect(()=>{
        axios
        .get("https://bchfrserver.herokuapp.com/api/v1/image?location=" + displayspecificCases.imageurl)
        .then((response) => {
            console.log("image here");
            console.log(response.data);
            setimg(response.data.toString());
        })
    })    
    
    //this function will get the email the user entered from the local storage
    function userName() {
        if (localStorage.getItem('user')) {
            user2 = localStorage.getItem('user');// this sets the local var with the one in the local storage
            //setCurrentUser(user2)
            return (
                <div>
                <h4>Posting/Saving As:</h4>
                <input type="text" defaultValue={user2} className="form-control" disabled="true"></input>
                </div>
            )
            // console.log(user2); //display the the username to check in the console 
        }
    }
    
    //loop for all answers and if there's 2 or more, put comma in between
    function displayAnswer(dis) {
        let test = '';
        for (let i = 0; i < dis.length; i++) {
            if (i === dis.length - 1) {
                test += dis[i];
            } else {
                test += dis[i] + ',';
            }
        }
        return test;
    }

    //if data has no radio, it will display empty instead of error.
    function displayRadio(display) {
        if (display == null) {
            return 'There is no radio';
        } else {
            return display;
        }
    }
    //if data has one or more checkbox 
    function displayData2(dis) {
        if (displayspecificCases.problem.checkbox != null) {
            if (displayspecificCases.problem.checkbox.length > 1) {
                return (displayspecificCases.problem.checkbox.map(item => {
                    return (
                        <Card>
                            <CardHeader>
                                <h4>{item.name} : </h4>
                            </CardHeader>
                            <CardBody>
                                <h5><b>{displayAnswer(item.answer)}</b></h5>
                            </CardBody>
                        </Card>
                    )
                }))
            } else {
                return (
                    <Card>
                        <CardHeader>
                            <h4>{displayspecificCases.problem.checkbox.name} : </h4>
                        </CardHeader>
                        <CardBody>
                            <h5><b>{displayAnswer(displayspecificCases.problem.checkbox.answer)}</b></h5>
                        </CardBody>
                    </Card>
                )
            }
        } else {
        }

    }
    //return radio if there is 
    function tryReturnRadio() {
        try {
            return displayspecificCases.problem.radio.name
        } catch (error) {
            return null;
        }
    }
    function tryReturnRadio2() {
        try {
            return displayspecificCases.problem.radio.answer
        } catch (error) {
            return null;
        }
    }
    //function to retrieve image from firestore
    if(!displayspecificCases){return }
    return (
        <div>
            <h3 style={{textAlign: 'left', marginLeft:'2.5em' }}><b>Solve Case</b></h3>
            <GridContainer justify="space-around">
                <GridItem xs={12} sm={12} md={9} lg={5}>
                    <Card>
                        <CardHeader>
                            <h4><b>Reported on:</b></h4>
                        </CardHeader>
                        <CardBody>
                            <h5>{displayspecificCases.dateTime}</h5>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>
                            <h4><b>Store Location:</b></h4>
                        </CardHeader>
                        <CardBody>
                            <h5>{displayspecificCases.storeName}</h5>
                        </CardBody>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={6} lg={5}>
                    <Card>
                        <CardHeader>
                            <h4><b>Staff Reported:</b></h4>
                        </CardHeader>
                        <CardBody>
                            <h5>{displayspecificCases.staffName}</h5>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>
                            <h4><b>Fault Type:</b></h4>
                        </CardHeader>
                        <CardBody>
                            <h5>{displayspecificCases.problem.category}</h5>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            <h3 style={{ textAlign: 'left', marginLeft:'2.5em' }}><b>Incident Details</b></h3>
            <GridContainer justify="space-around">
                <GridItem xs={12} sm={10} md={11} xl={11}>
                    <Card>
                        <CardBody>
                            <h4>{displayRadio(tryReturnRadio())}:</h4>
                            <h5><b>{displayRadio(tryReturnRadio2())}</b></h5>
                            <br></br>
                            {
                                displayData2(displayspecificCases.problem.checkbox)
                            }
                            <h4>Fault Image:</h4>
                            <img width="360px" height="270px" src={img} alt="staff did not upload/take"/>
                            <br></br>
                            <br></br>
                            <h4>Description:</h4>
                            {displayspecificCases.description}
                            <br></br>
                            <br></br>
                            <h4>Issue Status:</h4>
                            <Select
                                defaultValue={{ value: "unresolved", label: "Unresolved" }}
                                className="basic-single"
                                classNamePrefix="select"
                                name="color"
                                options={statusOptions}
                                onChange={e => setEdit(e.value)}
                            />
                            <br></br>
                            <h4>Comments:</h4>
                            <textarea type="text" defaultValue={comment} onChange={e => setComment(e.target.value)} className="form-control" />
                            <br></br>
                            {userName()}
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer justify="space-around">
                <GridItem xs={12} sm={10} md={11} xl={11}>
                    <Button onClick={putSpecificCases} fullWidth color="success">Save</Button>
                    <Button onClick={event =>  window.location.href='/admin/dashboard'} fullWidth color="danger">Cancel</Button>
                </GridItem>
            </GridContainer>
        </div>
    );                    
}
