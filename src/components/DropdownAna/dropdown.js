import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Button from "components/CustomButtons/Button.js";


export default function dropdown(props) {
  const Checkbox = props => <input type="checkbox" {...props} />;
  const faultOptions = [
    { value: 'Aircon', label: 'Aircon'},
    { value: 'Equipment', label: 'Equipment'},
    { value: 'Furniture', label: 'Furniture'},
    { value: 'Chiller', label: 'Chiller'}
  ];  
  const dateOptions = [
    { value: 'All Time', label: 'All Time'},
    { value: 'Past Week', label: 'Past Week'},
    { value: 'Past Month', label: 'Past Month'},
    { value: 'Past Year', label: 'Past Year'}
  ];  
  const storeOptions = [
    { value: 'Ang Mo Kio', label: 'Ang Mo Kio'},
    { value: 'Hillion Mall', label: 'Hillion Mall'},
    { value: 'Causeway Point', label: 'Causeway Point'},
    { value: 'Vivo City', label: 'Vivo City'}
  ];  
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









