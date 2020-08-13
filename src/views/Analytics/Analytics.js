import React from "react";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { Container, List } from "semantic-ui-react";
import {Fragment} from 'react';
import axios from 'axios';
import Table from "components/Table/Table.js";
import ReactPaginate from 'react-paginate';


const newCases = [];
const array = [];

// const download = function (data) {
//   const blob = new Blob([data], { type: 'text/csv' });
//   const url = window.URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.setAttribute('hidden', '');
//   a.setAttribute('href', url);
//   a.setAttribute('download', 'download.csv');
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
// };


// function generateResolvedCases() {
//   axios
//     .get("http://localhost:8080/api/v1/fault?status=Resolved")
//     .then((response) => {
//       newCases.push(response.data)
//       array.push(Object.values(newCases[0]))
//       console.log(array);

//       const data = array[0].map(row => ({
//         ReportedOn: row.dateTime,
//         StoreName: row.storeName,
//         Category: row.problem.category,
//         Description: row.description,
//         StaffName: row.staffName,
//         Comments: row.comments
//       }));
//       console.log('sadas');
//       //console.log(data);

//       const csvRows = [];

//       //get the headers
//       const headers = Object.keys(data[0]);

//       csvRows.push(headers.join(','));

//       //loop over rows
//       for (const row of data) {
//         const values = headers.map(header => {

//           return row[header];
//         });
//         csvRows.push(values.join(','));
//       }
//       //form escaped comma seperated values
//       const newdata = csvRows.map(e => e).join('\n');
//       console.log(newdata);
//       download(newdata);
//     })
    
// }

const resolvedCases = [];
const temp =[];
function getResolvedCases(){
  axios
  .get("http://localhost:8080/api/v1/fault?status=Resolved")
  .then((response) => {
    try{
    resolvedCases.push(response.data)
    temp.push(Object.values(resolvedCases[0]))
    console.log(array[0]);
    }
    catch(error){
      console.log(error);
    }
})
}
getResolvedCases();





export default function Analytics() {
  return (
    <div>
    <GridContainer>
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4>Resolved Cases</h4>
          <p>
            Resolved cases can be generated as excel sheet and downloaded
          </p>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor="primary"
            tableHead={["Case Reported On", "Store Location", "Category", "Description", "Staff Name", "Comments"]}
            tableData={
              temp[0].map((temp) => {
                return [temp.dateTime,temp.storeName,temp.problem.category,temp.description,temp.staffName,temp.comments]
            })
            }
          />
        </CardBody>
      </Card>
    </GridItem>
  </GridContainer>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
      {/* <Button onClick={() => generateResolvedCases()} fullWidth color="info">Generate Excel Sheet</Button> */}
      </GridItem>
    </GridContainer>
    </div>
  );
}
