import {BrowserRouter as Router,Route,} from "react-router-dom";

import { Provider } from 'react-redux';
import {createStore} from 'redux';
import allReducers from './reducers/index'

import HomeStructure from './HomePage/HomeStructure'
import CatalogueStructure from './CataloguePage/CatalogueStructure';
import ContactStructure from './ContactPage/ContactStructure';
import Navbar from "./Components/Navbar";
import Wtr from "./CataloguePage/Wtr";
import Arc from "./CataloguePage/Arc";
import Cru from "./CataloguePage/Cru";
import Mon from "./CataloguePage/Mon";
import CartList from "./CartPage/CartList";
import WtrSealed from "./CataloguePage/product/WtrSealed";
import ArcSealed from "./CataloguePage/product/ArcSealed";
import CruSealed from "./CataloguePage/product/CruSealed";
import MonSealed from "./CataloguePage/product/MonSealed";
import SignIn from "./ContactPage/SignIn";
import Command from "./CommandPage/Command";
import Paymentok from "./Components/Paymentok";


const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
        <Navbar/>
        </div>
        <Route exact path="/">
          <HomeStructure />
        </Route>
        <Route  path="/sealed">
          <CatalogueStructure/>
        </Route>
        <Route  path="/about">
          <ContactStructure />
        </Route>
        <Route  path="/wtr">
          <Wtr />
        </Route>
        <Route  path="/wtr-sealed">
          <WtrSealed/>
        </Route>
        <Route  path="/arc">
          <Arc />
        </Route>
        <Route  path="/arc-sealed">
          <ArcSealed/>
        </Route>
        <Route  path="/cru">
          <Cru />
        </Route>
        <Route  path="/cru-sealed">
          <CruSealed />
        </Route>
        <Route  path="/mon">
          <Mon />
        </Route>
        <Route  path="/mon-sealed">
          <MonSealed />
        </Route>
        <Route  path="/cart">
          <CartList/>
        </Route>
        <Route  path="/sign-in">
          <SignIn/>
        </Route>
        <Route  path="/my-command">
          <Command/>
        </Route>
        <Route  path="/payment-success">
          <Paymentok/>
        </Route>
      </Router>
    </Provider>
  );
}

export default App;
