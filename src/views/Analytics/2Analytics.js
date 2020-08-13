import React, {useState, useEffect} from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, dateFilter, Comparator, selectFilter } from 'react-bootstrap-table2-filter';
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

export default function Analytics2() {
    const [analytics,setAnalytics] = useState([]);
    const getAnalyticsData = async ()=> {
        try{
            await axios
            .get("http://localhost:8080/api/v1/fault2")
            .then((response) => {
                console.log(response.data);
                setAnalytics(Object.values(response.data));
            })
        }
        catch(e){
            console.log(e);
        }
    }

    const selectOptions = [
      { value: 'Unresolved', label: 'Unresolved' },
      { value: 'Pending', label: 'Pending' },
      { value: 'Resolved', label: 'Resolved' }
    ];

    const columns = [//,filter: dateFilter()
        {dataField: "date", text:"Case reported on",sort:true,filter: textFilter()},
        {dataField: "storeName", text:"Store Location",filter: textFilter()},
        {dataField: "problem.category", text:"Category",filter: textFilter()},
        {dataField: "description", text:"Description"},
        {dataField: "staffName", text:"Staff Name"},
        {dataField: "comments", text:"Comments"},
        {dataField: "status", text:"Status",filter: selectFilter({
          options: selectOptions
        })},
    ]

    useEffect(() => {
        getAnalyticsData();
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
        <h4>Cases</h4>
          <p>
            Cases can be generated as excel sheet and downloaded
          </p>
        </CardHeader>
        <CardBody>
        <ToolkitProvider
          keyField="uuid"
          data={ analytics }
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
            data={analytics}
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
