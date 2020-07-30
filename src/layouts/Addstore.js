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
import { Fragment} from 'react';
import Select from 'react-select';
import pendingcaseModal from "components/Modal/pendingcaseModal";
import resolvedcaseModal from "components/Modal/resolvedcaseModal";
import {useState} from 'react';

export default function Addstore(){
    const [storename,setStoreName] = useState("");
    const [storecode,setStoreCode] = useState("");
    const [storeaddress,setStoreAddress] = useState("");
    function addStore(){
        if((storename != '')&&(storecode != '')&&(storeaddress != '') )
        {
            axios
            .post("http://localhost:8080/api/v1/store/",{
                "name": storename.toString(),
                "code": storecode.toString(),
                "address": storeaddress.toString()
            })
            window.alert('Successfully added new store!!')
            window.location.href = "/admin/functions"
           
        }
        else{
            window.alert('Please input neccessary data!')
    }
}
    return(
        <div>
            <h3><b>Add Store</b></h3>
            <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                    <Card>    
                        <CardBody>
                        <h4><b>Store Name :</b></h4>
                        <input className="form-control" type="text" placeholder="Enter Store Name, example..Hillion Mall" onChange={e=>setStoreName(e.target.value)}/>
                        <br></br>
                        <h4><b>Store Code :</b></h4>
                        <input className="form-control" type="text" placeholder="Enter Store Code, last 4 digit of store no **** 5753" onChange={e=>setStoreCode(e.target.value)}/>
                        <br></br>
                        <h4><b>Store Address :</b></h4>
                        <input className="form-control" type="text" placeholder="Enter Store Address" onChange={e=>setStoreAddress(e.target.value)}/>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <Button onClick={addStore} fullWidth color="success">Add</Button> 
                </GridItem>
            </GridContainer>
        </div>
    )
}