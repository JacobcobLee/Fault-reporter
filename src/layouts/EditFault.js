import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import faultimg from "assets/img/celling_aircon.jpg";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Button from "components/CustomButtons/Button.js";
import axios from 'axios';
import { Fragment } from 'react';
import Select from 'react-select';
import pendingcaseModal from "components/Modal/pendingcaseModal";
import resolvedcaseModal from "components/Modal/resolvedcaseModal";
import { useState } from 'react';

var pageURL = window.location.href;
var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);

const fault = [];
const array = [];
const temp = [];
const temp2 = [];
const test2 = [];
const up = {};
function getSpecificFault() {
    axios
        .get("http://localhost:8080/api/v1/category/" + lastURLSegment)
        .then((response) => {
            console.log('response')
            fault.push(response.data)
            array.push(fault[0])
            temp.push(Object.values(response.data))
            //temp2.push(Object.keys(array[0]))
            console.log('Temp');
            console.log(temp[0][0]);
        })
}
getSpecificFault();


export default function EditFault() {
    const [displayhaveradio, setDisplayHaveRadio] = useState(temp[0][0].haveRadio);
    const [displayhaveinput, setDisplayHaveInput] = useState(temp[0][0].haveInput);
    const [displayhavecheckbox, setDisplayHaveCheckbox] = useState(temp[0][0].haveCheck);
    const dropdowndata = [{ value: "true", label: "True" }, { value: "false", label: "False" }];
    //for all answer state

    const [faultname, setFaultName] = useState(temp[0][0].name);
    let radioval = {};
    if (temp[0][0].radio != null) {
        radioval = Object.values(temp[0][0].radio);
        console.log('success');
    } else {
        radioval = [{ name: '', answer: '' }];
    }
    let checkval = {};
    if (temp[0][0].checkbox != null) {
        checkval = Object.values(temp[0][0].checkbox);
        if (checkval.length > 1) {
            checkval = [{ name: checkval[0].name, answer: checkval[0].answer }, { name: checkval[1].name, answer: checkval[1].answer }]
        } else {
            checkval = [{ name: checkval[0].name, answer: checkval[0].answer }, { name: '', answer: '' }]
        }
    } else {
        checkval = [{ name: '', answer: '' }, { name: '', answer: '' }]
    }

    let inputval = {};
    if (temp[0][0].input != null) {
        inputval = Object.values(temp[0][0].input);
        console.log('hi');
    } else {
        inputval = '';
    }
    const [inputquestion, setInputQuestion] = useState(inputval.toString());
    const [radioquestion, setRadioQuestion] = useState(radioval[0].name);
    const [radioanswer, setRadioAnswer] = useState(radioval[0].answer.toString());
    const [checkboxquestion1, setCheckboxQuestion1] = useState(checkval[0].name);
    const [checkboxanswer1, setCheckboxAnwer1] = useState(checkval[0].answer.toString());
    const [checkboxquestion2, setCheckboxQuestion2] = useState(checkval[1].name);
    const [checkboxanswer2, setCheckboxAnwer2] = useState(checkval[1].answer.toString());

    //const radioval = Object.values(temp[0][0].radio)

    function validateCheckbox() {
        if ((checkboxquestion1 != '') && (checkboxanswer1 != '')) {
            if ((checkboxquestion2 != '') && (checkboxanswer2 != '')) {
                return { checkboxquestion1: { answer: checkboxanswer1.split(','), name: checkboxquestion1 }, checkboxquestion2: { answer: checkboxanswer2.split(','), name: checkboxquestion2 } };
            } else {
                return { checkboxquestion1: { answer: checkboxanswer1.split(','), name: checkboxquestion1 } };
            }
        } else {
            return null;
        }

    }
    function validateRadio() {
        if ((radioquestion != '') && (radioanswer != '')) {
            return { radioquestion: { name: radioquestion, answer: radioanswer.split(',') } };
        } else {
            return null;
        }
    }
    function validateInput() {
        if (inputquestion != '') {
            return inputquestion.split(',');
        } else {
            return null;
        }
    }
    function validateData(havCheck,submitCheckbox,havRadio,submitRadio,havInput,submitInput){
        if(havCheck == 'true'){
            if(submitCheckbox == null){
                window.alert('Please key in checkbox data or set checkbox to false');
                 return false;
            }
        }
        if(havRadio == 'true'){
            if(submitRadio == null){
                window.alert('Please key in Radio data or set Radio to false');
                return false;
            }
        }
        if(havInput == 'true'){
            if(submitInput == null){
                window.alert('Please key in Input data or set Input to false');
                return false;
            }
        }
        return true;
    }
    function submit() {
        const name = faultname;
        const havRadio = displayhaveradio;
        const havInput = displayhaveinput;
        const havCheck = displayhavecheckbox;
        const submitRadio = validateRadio();
        const submitInput = validateInput();
        const submitCheckbox = validateCheckbox();
        let validatedata = validateData(havCheck,submitCheckbox,havRadio,submitRadio,havInput,submitInput);
    
        if(validatedata == true){
            if ((name != '') && ((submitRadio != null) || (submitCheckbox != null))) {
                const total = { name: name, haveRadio: havRadio, haveInput: havInput, haveCheck: havCheck, input: submitInput, radio: submitRadio, checkbox: submitCheckbox };
                console.log(total);
                axios.put("http://localhost:8080/api/v1/category/" + lastURLSegment, total)
                window.alert('Successfully Updated fault type!')
                window.location.href = "/admin/functions"
            } else {
                window.alert('Please enter nessasary data!\nRequired minimum value: Name & Radio/Checkbox');
            }
        }else{

        }
    }
    function onChangeRadio(e) {
        setDisplayHaveRadio(e.value);
        if (e.value == 'false') {
            setRadioQuestion('');
            setRadioAnswer('');
        }



    }
    function onChangeCheckbox(e) {
        setDisplayHaveCheckbox(e.value);
        if (e.value == 'false') {
            setCheckboxQuestion1('');
            setCheckboxAnwer1('');
            setCheckboxQuestion2('');
            setCheckboxAnwer2('');
        }
    }
    function onChangeInput(e) {
        setDisplayHaveInput(e.value);
        if (e.value == 'false') {
            setInputQuestion('');
        }

    }
    function displayRadio() {
        if (displayhaveradio == "true") {
            return (
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader>
                            <h3><b>Radio</b></h3>
                        </CardHeader>
                        <CardBody>
                            <h4>Radio Question :</h4>
                            <input type="text" onChange={e => setRadioQuestion(e.target.value)} className="form-control" value={radioquestion} isDisabled="false" />
                            <br></br>
                            <h4>Radio Answer :</h4>
                            <input type="text" onChange={e => setRadioAnswer(e.target.value)} className="form-control" value={radioanswer} isDisabled="false" />
                        </CardBody>
                    </Card>
                </GridItem>
            )
        } else {
        }
    }

    function displayCheckbox() {
        if (displayhavecheckbox == "true") {
            if (checkval.length > 1) {
                return (
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader>
                                <h3><b>Checkbox</b></h3>
                            </CardHeader>
                            <CardBody>
                                <h4>Checkbox Question :</h4>
                                <input className="form-control" onChange={e => setCheckboxQuestion1(e.target.value)} type="text" value={checkboxquestion1} placeholder="Enter Checkbox Question.." />
                                <br></br>
                                <h4>Checkbox Answer (Text will be split into using (,) e.g Apple,Orange) :</h4>
                                <input className="form-control" onChange={e => setCheckboxAnwer1(e.target.value)} type="text" value={checkboxanswer1} placeholder="Enter Checkbox Answer.." />
                                <br></br>
                                <h4>Checkbox Question 2 :</h4>
                                <input className="form-control" onChange={e => setCheckboxQuestion2(e.target.value)} type="text" value={checkboxquestion2} placeholder="Enter Checkbox Question 2.." />
                                <br></br>
                                <h4>Checkbox Answer 2 (Text will be split into using (,) e.g Apple,Orange) :</h4>
                                <input className="form-control" onChange={e => setCheckboxAnwer2(e.target.value)} type="text" value={checkboxanswer2} placeholder="Enter Checkbox Answer 2.." />
                            </CardBody>
                        </Card>
                    </GridItem>
                )
            } else {
                return (
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader>
                                <h3><b>Checkbox</b></h3>
                            </CardHeader>

                            <CardBody>
                                <h4>Checkbox Question :</h4>
                                <input className="form-control" onChange={e => setCheckboxQuestion1(e.target.value)} type="text" value={checkboxquestion1} placeholder="Enter Checkbox Question.." />
                                <br></br>
                                <h4>Checkbox Answer (Text will be split into using (,) e.g Apple,Orange) :</h4>
                                <input className="form-control" onChange={e => setCheckboxAnwer1(e.target.value)} type="text" value={checkboxanswer1} placeholder="Enter Checkbox Answer.." />
                                <br></br>
                                <h4>Checkbox Question 2 :</h4>
                                <input className="form-control" onChange={e => setCheckboxQuestion2(e.target.value)}v alue={checkboxquestion2} type="text" placeholder="Enter Checkbox Question 2.." />
                                <br></br>
                                <h4>Checkbox Answer 2 (Text will be split into using (,) e.g Apple,Orange) :</h4>
                                <input className="form-control" onChange={e => setCheckboxAnwer2(e.target.value)} value={checkboxanswer2} type="text" placeholder="Enter Checkbox Answer 2.." />

                            </CardBody>
                        </Card>
                    </GridItem>
                )
            }
        } else {
        }
    }
    function displayInput() {
        if (displayhaveinput == "true") {
            return (
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader>
                            <h3><b>Input</b></h3>
                        </CardHeader>
                        <CardBody>
                            <h4>Input Question:</h4>
                            <input className="form-control" onChange={e => setInputQuestion(e.target.value)} type="text" on value={inputquestion} placeholder="Enter Input Question.." />
                        </CardBody>
                    </Card>
                </GridItem>
            )
        } else {
        }
    }
    function returnDefValue(e){
        if(e == 'true'){
            return {value: 'true', label: 'True'};
        }else{
            return {value: 'false', label: 'False'};
        }
    }
    return (
        <div>
            <h3><b>Edit Fault</b></h3>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardBody>
                            <h4><b>Fault Name (Category) :</b></h4>
                            <input className="form-control" onChange={e => setFaultName(e.target.value)} type="text" placeholder="Edit Fault Name, example..Electric Griller" defaultValue={faultname} onChange={e => setFaultName(e.target.value)} />
                            <br></br>
                            <h4><b>Have Radio :</b></h4>
                            {console.log(temp[0][0].haveRadio)}
                            <Select
                                defaultValue={returnDefValue(displayhaveradio)}
                                className="basic-single"
                                classNamePrefix="select"
                                name="color"
                                options={dropdowndata}
                                onChange={e => onChangeRadio(e)}
                            />
                            <br></br>
                            <h4><b>Have Checkbox :</b></h4>
                            <Select
                                defaultValue={returnDefValue(displayhavecheckbox)}
                                className="basic-single"
                                classNamePrefix="select"
                                name="color"
                                options={dropdowndata}
                                onChange={e => onChangeCheckbox(e)}
                            />
                            <br></br>
                            <h4><b>Have Input :</b></h4>
                            <Select
                                defaultValue={returnDefValue(displayhaveinput)}
                                className="basic-single"
                                classNamePrefix="select"
                                name="color"
                                options={dropdowndata}
                                onChange={e => onChangeInput(e)}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
                {

                    displayRadio()
                }
                {
                    displayCheckbox()
                }
                {
                    displayInput()
                }
                <Button onClick={submit} fullWidth color="success">Save</Button>
            </GridContainer>
        </div>
    )
}