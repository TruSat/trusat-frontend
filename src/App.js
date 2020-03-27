import React, { useState, useEffect, Fragment } from "react";
import { checkAuthExpiry } from "./auth/auth-helpers";
import { setCookies, AnimatedRoutes, RouteTransition } from "./app/app-helpers";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuthDispatch } from "./auth/auth-context";
import ScrollToTop from "./app/components/ScrollToTop";
import NavBar from "./app/components/NavBar";
import MobileHeader from "./app/components/MobileHeader";
import Catalog from "./views/Catalog";
import Submit from "./views/Submit";
import Welcome from "./views/Welcome";
import Profile from "./views/Profile";
import AccountSettings from "./views/AccountSettings";
import AddStation from "./views/AddStation";
import Join from "./views/Join";
import LogIn from "./views/LogIn";
import SignUp from "./views/SignUp";
import ObjectInfo from "./views/ObjectInfo";
import BurgerMenu from "./app/components/BurgerMenu";
import MetamaskImport from "./views/MetamaskImport";
import ClaimAccount from "./views/ClaimAccount";
import VerifyClaimAccount from "./views/VerifyClaimAccount";
import CookieBanner from "./app/components/CookieBanner";
import Footer from "./app/components/Footer";
import About from "./views/About";
import ReactGA from "react-ga";
import PrivacyPolicy from "./views/PrivacyPolicy";
import Terms from "./views/Terms";
import SubscriptionConfirmed from "./views/SubscriptionConfirmed";
import TestPilotConfirmed from "./views/TestPilotConfirmed";
import ChatIcon from "./app/components/ChatIcon";

export default function App() {
  const authDispatch = useAuthDispatch();
  const [isBannerOpen, setIsBannerOpen] = useState(true);

  useEffect(() => {
    // If JWT found in localstorage, delete and log user out as app will now use http only cookies for auth
    if (localStorage.getItem("trusat-jwt")) {
      localStorage.removeItem("trusat-jwt");
      window.location.reload(); // refresh page.
    }

    // get login credentials from local storage (address and expiry date for auth)
    const retrieveLoginCredentials = async () => {
      const { address, exp } = JSON.parse(
        localStorage.getItem("trusat-login-credentials")
      );
      // checks if expiry date on auth is valid (hasn't expired)
      checkAuthExpiry(exp);

      authDispatch({
        type: "SET_USER_ADDRESS",
        payload: address
      });
      authDispatch({
        type: "SET_AUTH_EXPIRY",
        payload: exp
      });
    };

    const retrieveCookieChoice = () => {
      // true or false
      const allowCookies = localStorage.getItem("trusat-allow-cookies");
      if (allowCookies) {
        setCookies();
      }
    };
    // get users choice on cookie banner from last visit
    if (localStorage.getItem("trusat-allow-cookies")) {
      setIsBannerOpen(false);
      retrieveCookieChoice();
    }

    if (localStorage.getItem("trusat-login-credentials")) {
      retrieveLoginCredentials();
    }
  }, [authDispatch]);

  return (
    <div className="app">
      <Router>
        <ScrollToTop />
        {/* Shown on mobile view */}
        <BurgerMenu right />
        <MobileHeader />
        {/* Shown on desktop view */}
        <NavBar />
        <Route
          path="/"
          render={({ location }) => {
            ReactGA.pageview(location.pathname + location.search);
          }}
        />
        <AnimatedRoutes exitBeforeEnter initial={false}>
          <RouteTransition exact path="/">
            <Welcome />
          </RouteTransition>
          <RouteTransition path="/catalog/:catalogFilter">
            <Catalog />
          </RouteTransition>
          <RouteTransition path="/about">
            <About />
          </RouteTransition>
          <RouteTransition path="/submit/:form">
            <Submit />
          </RouteTransition>
          <RouteTransition path="/submit">
            <Submit />
          </RouteTransition>
          <RouteTransition path="/object/:number">
            <ObjectInfo />
          </RouteTransition>
          <RouteTransition exact path="/profile/:address">
            <Profile />
          </RouteTransition>
          <RouteTransition exact path="/settings">
            <AccountSettings />
          </RouteTransition>
          <RouteTransition path="/settings/metamask">
            <MetamaskImport />
          </RouteTransition>
          <RouteTransition path="/settings/stations">
            <AddStation />
          </RouteTransition>
          <RouteTransition path="/join">
            <Join />
          </RouteTransition>
          <RouteTransition path="/login">
            <LogIn />
          </RouteTransition>
          <RouteTransition path="/signup">
            <SignUp />
          </RouteTransition>
          <RouteTransition exact path="/claim">
            <ClaimAccount />
          </RouteTransition>
          <RouteTransition path="/claim/:jwt">
            <VerifyClaimAccount />
          </RouteTransition>
          <RouteTransition path="/privacy">
            <PrivacyPolicy />
          </RouteTransition>
          <RouteTransition path="/terms">
            <Terms />
          </RouteTransition>
          {/* User is sent to this RouteTransition when they complete a mail chimp sign up */}
          <RouteTransition path="/subscription-confirmed">
            <SubscriptionConfirmed />
          </RouteTransition>
          <RouteTransition path="/test-pilot-confirmed">
            <TestPilotConfirmed />
          </RouteTransition>
          <RouteTransition component={NoMatch} />
        </AnimatedRoutes>

        {isBannerOpen ? (
          <CookieBanner
            isBannerOpen={isBannerOpen}
            setIsBannerOpen={setIsBannerOpen}
          />
        ) : (
          <Fragment>
            <Footer />
            <ChatIcon />
          </Fragment>
        )}
      </Router>
    </div>
  );
}

function NoMatch({ location }) {
  return (
    <div>
      <h3 className="app__error-message">
        <code>{location.pathname}</code> is not a RouteTransition in TruSat.
        Please check that you entered the correct URL
      </h3>
    </div>
  );
}
