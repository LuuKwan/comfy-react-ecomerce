import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import styled from "styled-components"; // use styled as a popular naming convention
import {
  Home,
  Products,
  About,
  SingleProduct,
  Cart,
  Error,
  Checkout,
  PrivateRoute,
  AuthWrapper,
} from "./pages/Pages_index";
function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          {/*=======HOME========*/}
          <Route exact path="/">
            <Home />
          </Route>
          {/* ======ABOUT==== */}
          <Route exact path="/about">
            <About />
          </Route>
          {/* =====PRODUCTS===== */}
          <Route exact path="/products">
            <Products />
          </Route>
          <Route
            exact
            path="/products/:id"
            children={<SingleProduct />}
          ></Route>
          {/* ====CHECK-OUT===== */}
          <PrivateRoute exact path="/checkout">
            <Checkout />
          </PrivateRoute>
          {/* =====CART==== */}
          <Route exact path="/cart">
            <Cart />
          </Route>
          {/* =====ERROR==== */}
          <Route path="*">
            <Error />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
