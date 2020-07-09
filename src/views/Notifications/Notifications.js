/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function Notifications() {
  const classes = useStyles();
  const [tl, setTL] = React.useState(false);
  const [tc, setTC] = React.useState(false);
  const [tr, setTR] = React.useState(false);
  const [bl, setBL] = React.useState(false);
  const [bc, setBC] = React.useState(false);
  const [br, setBR] = React.useState(false);
  React.useEffect(() => {
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });
  const showNotification = place => {
    switch (place) {
      case "tr":
        if (!tr) {
          setTR(true);
          setTimeout(function() {
            setTR(false);
          }, 6000);
        }
        break;
      case "br":
        if (!br) {
          setBR(true);
          setTimeout(function() {
            setBR(false);
          }, 6000);
        }
        break;
      default:
        break;
    }
  };
  return (
    <Card>
      <CardHeader color="info">
        <h4 className={classes.cardTitleWhite}>Notifications</h4>
      </CardHeader>
      <CardBody>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6} style={{ textAlign: "center" }}>
            <h5>
              Allow Web to turn on Notifications?
              <br />
            </h5>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Button
                  fullWidth
                  color="success"
                  onClick={() => showNotification("tr")}
                >
                  ON
                </Button>
                <Snackbar
                  place="tr"
                  color="success"
                  icon={AddAlert}
                  message="Notifications has been turned ON"
                  open={tr}
                  closeNotification={() => setTR(false)}
                  close
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Button
                  fullWidth
                  color="danger"
                  onClick={() => showNotification("br")}
                >
                  OFF
                </Button>
                <Snackbar
                  place="br"
                  color="danger"
                  icon={AddAlert}
                  message="Notifications has been turned OFF"
                  open={br}
                  closeNotification={() => setBR(false)}
                  close
                />
              </GridItem>
            </GridContainer>
      </CardBody>
    </Card>
  );
}
