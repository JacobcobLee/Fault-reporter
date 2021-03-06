import React from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";    
import axios from 'axios';
import {useState} from 'react';

export default function Addstore(){
    const [storename,setStoreName] = useState("");
    const [storecode,setStoreCode] = useState("");
    const [storeaddress,setStoreAddress] = useState ("");

    function addStore(){
        if((storename !== '')&&(storecode !== '')&&(storeaddress !== '') )
        {
            axios
            .post("https://bchfrserver.herokuapp.com/api/v1/store",{
                "name": storename.toString(),
                "code": storecode.toString(),
                "address": storeaddress.toString()
            }).catch((e)=>{console.log("err is at "+e)})
            window.alert('Successfully added new store!!')
            window.location.href = "/admin/functions"
           console.log("successfully added store")
        }
        else{
            window.alert('Please input neccessary data!')
    }
}
    return(
        <div>
            <h3 style={{textAlign: 'left', marginLeft:'2.5em' }}><b>Add Store</b></h3>
            <GridContainer justify="space-around">
            <GridItem xs={12} sm={10} md={10} lg={11}>
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
                <GridItem xs={12} sm={10} md={10} lg={11}>
                    <Button onClick={addStore} fullWidth color="success">Add</Button>
                    <Button onClick={event =>  window.location.href='/admin/functions'} fullWidth color="danger">Cancel</Button> 
                </GridItem>
            </GridContainer>
        </div>
    )
}