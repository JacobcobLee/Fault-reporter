import React, {useState, useEffect} from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, dateFilter, Comparator } from 'react-bootstrap-table2-filter';
import * as ReactBootStrap from 'react-bootstrap';
import axios from 'axios';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Select from 'react-select';
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';


export default function TableList() {
    const [customerfeedback,setCustomerFeedback] = useState([]);
    const getFeedbacksData = async ()=> {
        try{
            await axios
            .get("http://localhost:8080/api/v1/feedback")
            .then((response) => {
                console.log(response.data);
                setCustomerFeedback(Object.values(response.data));
            })
        }
        catch(e){
            console.log(e);
        }
    }

    const columns = [//,filter: dateFilter()
        {dataField: "date", text:"Submitted On",filter: textFilter()},
        {dataField: "location", text:"Store Location",filter: textFilter()},
        {dataField: "feedbackType", text:"Feedback Type",filter: textFilter()},
        {dataField: "standard", text:"Standard",filter: textFilter()},
        {dataField: "issue", text:"Issue"},
        {dataField: "rating", text:"Ratings",filter: textFilter()},
        {dataField: "staffname", text:"Staff Name"},
        {dataField: "custemail", text:"Customer Email"},
        {dataField: "custcontactno", text:"Customer Contact"},
        {dataField: "custname", text:"Customer Name"},
    ]

    useEffect(() => {
        getFeedbacksData();
    },[])

    const MyExportCSV = (props) => {
        const handleClick = () => {
          props.onExport();
        };
        return (
          <div>
             <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                  <Button onClick={handleClick} fullWidth color="info">Generate Excel Sheet</Button>
              </GridItem>
          </GridContainer>
          </div>
        );
      };

    return (
        <div>
        <Card>
        <CardHeader color="primary">
        <h4>Customer Feedback</h4>
          <p>
            Feedbacks can be generated as excel sheet and downloaded
          </p>
        </CardHeader>
        <CardBody>
        <ToolkitProvider
          keyField="uuid"
          data={ customerfeedback }
          columns={ columns }
          exportCSV ={ {
            exportAll:false,
            onlyExportFiltered:true
          } }
        >
        {
        props => (
          <div>
            <BootstrapTable
            filter={filterFactory()}
            keyField="uuid"
            data={customerfeedback}
            columns={columns}
            pagination={paginationFactory()}
            filterPosition="top"
            { ...props.baseProps } />
            <hr />
            <MyExportCSV { ...props.csvProps } />
          </div>
        )
      }
    </ToolkitProvider>
        </CardBody>
        </Card>
        </div>
    )
}



// import React from "react";
// // @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// // core components
// import GridItem from "components/Grid/GridItem.js";
// import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
// import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
// import CardBody from "components/Card/CardBody.js";
// import axios from 'axios';
// import {useState} from 'react';
// import Button from "components/CustomButtons/Button.js";

// const displayFeedback=[];
// const array=[];
// function getCustomerFeedbacks(){
//   axios
//   .get("http://localhost:8080/api/v1/feedback")
//   .then((response) => {
//     displayFeedback.push(response.data)
//     array.push(Object.values(displayFeedback[0]))
//     console.log(array[0]);
//   })
//   }
// getCustomerFeedbacks();

// const styles = {
//   cardCategoryWhite: {
//     "&,& a,& a:hover,& a:focus": {
//       color: "rgba(255,255,255,.62)",
//       margin: "0",
//       fontSize: "14px",
//       marginTop: "0",
//       marginBottom: "0"
//     },
//     "& a,& a:hover,& a:focus": {
//       color: "#FFFFFF"
//     }
//   },
//   cardTitleWhite: {
//     color: "#FFFFFF",
//     marginTop: "0px",
//     minHeight: "auto",
//     fontWeight: "300",
//     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//     marginBottom: "3px",
//     textDecoration: "none",
//     "& small": {
//       color: "#777",
//       fontSize: "65%",
//       fontWeight: "400",
//       lineHeight: "1"
//     }
//   }
// };

// const useStyles = makeStyles(styles);

// export default function TableList() {
//   const [search, setSearch] = useState('')

//   //filter through all data instead of only 1
//    const filterArray = array[0].filter(function(item){
//     return Object.values(item).some( val => 
//         String(val).toLowerCase().includes(search.toLowerCase()) 
//     )
// })
//   const classes = useStyles();
//   return (
//     <GridContainer>
//       <GridItem xs={12} sm={12} md={12}>
//         <Card>
//           <CardHeader color="primary">
//             <h4 className={classes.cardTitleWhite}>Customer Feedbacks</h4>
//             <p className={classes.cardCategoryWhite}>
//               Customer Feedbacks for every outlets
//             </p>
//           </CardHeader>
//           <CardBody>
//           <input className="form-control" type="text" placeholder="Search" onChange={ e => setSearch(e.target.value)}/>
//             <Table
//               tableHeaderColor="primary"
//               tableHead={["Submitted On", "Store Location", "Feedback Type", "Standard", "Issue", "Ratings", "Served By", "Customer email", "Customer Contact", "Customer Name"]}
//               tableData={
//                 filterArray.map((array) => {
//                   return [array.datetime,array.location,array.feedbackType,array.standard,array.issue,array.rating,array.staffname,array.custemail,array.custcontactno,array.custname]
//               })
//               }
//             />
//           </CardBody>
//         </Card>
//       </GridItem>
//     </GridContainer>
//   );
// }
