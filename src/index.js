/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import { Provider } from 'react-redux';
import Login from './containers/Login';
import LoadingComponent from './containers/LoadingComponent';
import AuthenticatedComponent from './containers/AuthenticatedComponent';


// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import Solve from "layouts/Solve.js";
import View from "layouts/View.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  <BrowserRouter>
  <LoadingComponent>
  <Router history={hist}>
    <Switch>
      {/* Default go to login page first */}
      <Route path="/Login" component={Login}/>

      {/* Only if user is logged in then can access */}
      <AuthenticatedComponent>
      <Route path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} />
      <Route path="/newcases/solve" component={Solve} />
      <Route path="/resolvedcases/view" component={View} />
      <Redirect from="/" to="/admin/dashboard" />
      </AuthenticatedComponent>
    </Switch>
  </Router>
  </LoadingComponent>
  </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
