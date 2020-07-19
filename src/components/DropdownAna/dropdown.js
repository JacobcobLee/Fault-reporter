import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Button from "components/CustomButtons/Button.js";
import axios from 'axios';

const faultOptions = [];
const storeOptions = [];
// const faultOptions = [];
//   axios
//   .get("http://localhost:8080/api/v1/category")
//   .then((response) => {
//     var data = response.data
//     data.forEach(catName => {
//       var object = {value: catName, label: catName}
//       faultOptions.push(object)
//     });
//     console.log(response.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
function getFaultOptions(){
  axios
  .get("http://localhost:8080/api/v1/category")
  .then((response) => {
    response.data.forEach(catName => {
      var object = {value: catName, label: catName}
      faultOptions.push(object)
  });
  console.log(faultOptions);
})
  .catch((err) => {
    console.log(err);
  });
}
getFaultOptions();

function getStoreOptions(){
  axios
  .get("http://localhost:8080/api/v1/store")
  .then((response) => {
    response.data.forEach(storeName => {
      var object = {value: storeName, label: storeName}
      storeOptions.push(object)
  });
  //console.log(storeOptions);
})
  .catch((err) => {
    console.log(err);
  });
}
getStoreOptions();



export default function dropdown(props) {
  
 
  // const faultOptions = [
  //   { value: 'Aircon', label: 'Aircon'},
  //   { value: 'Equipment', label: 'Equipment'},
  //   { value: 'Furniture', label: 'Furniture'},
  //   { value: 'Chiller', label: 'Chiller'}
  // ];  
  const dateOptions = [
    { value: 'All Time', label: 'All Time'},
    { value: 'Past Week', label: 'Past Week'},
    { value: 'Past Month', label: 'Past Month'},
    { value: 'Past Year', label: 'Past Year'}
  ];  
  // const storeOptions = [
  //   { value: 'Ang Mo Kio', label: 'Ang Mo Kio'},
  //   { value: 'Hillion Mall', label: 'Hillion Mall'},
  //   { value: 'Causeway Point', label: 'Causeway Point'},
  //   { value: 'Vivo City', label: 'Vivo City'}
  // ];  
    return (
      <Fragment>
      <p>Generate Excel Sheet</p>
      <p><b>Fault types</b></p>
      <Select
        className="basic-single"
        classNamePrefix="select"
        name="color"
        options={faultOptions}
      />
      <br></br>
      <p><b>Date</b></p>
      <Select
        className="basic-single"
        classNamePrefix="select"
        name="color"
        options={dateOptions}
      />
       <br></br>
      <p><b>Store Location</b></p>
      <Select
        className="basic-single"
        classNamePrefix="select"
        name="color"
        options={storeOptions}
      />
      <br></br>
      <br></br>
       <Button fullWidth color="info">Generate Excel Sheet</Button>
    </Fragment>
    );
}









