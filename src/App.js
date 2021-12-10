import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/shop/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { selectCurrentUser } from "./redux/user/user.selectors";
import CheckoutPage from "./pages/checkout/checkout.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";

import "./App.css";
import React from "react";
import { setCurrentUser } from "./redux/user/user.actions";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        await createUserProfileDocument(userAuth);
        const db = getFirestore();
        onSnapshot(doc(db, "users", userAuth.uid), (doc) => {
          setCurrentUser({
            id: doc.id,
            ...doc.data(),
          });

          console.log(this.state);
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/shop/*" element={<ShopPage />} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Navigate to="/" /> : <SignInAndSignUp />
            }
          />
          <Route exact path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
