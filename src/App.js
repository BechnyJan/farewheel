import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AccountSetting from "./components/AccountSetting";
import PurchaseTicketDetail from "./components/PurchaseTicketDetail";
import RouteExtraDetailPage from "./components/RouteExtraDetailPage";
import RouteResultPage from "./components/RouteResultPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import Extras from "./pages/Extras";
import HomePage from "./pages/HomePage";
import MorePage from "./pages/MorePage";
import SignUpSignInPage from "./pages/SignIn";
import TicketDetailPage from "./pages/TicketDetailPage";
import TicketsPage from "./pages/TicketsPage";
import TouristPage from "./pages/TouristPage";
import TypePage from "./pages/TypePage";

function App() {
  const [processPurchase, setProcessPurchase] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    try {
      const storedAccount = localStorage.getItem("account");
      if (storedAccount) {
        const account = JSON.parse(storedAccount);
      } else {
        console.log("Žádná data v localStorage.");
      }
    } catch (error) {
      console.error("Chyba při parsování JSON:", error);
    }
  }, [isSignedIn]);

  const processUpdate = () => {
    setProcessPurchase((prev) => !prev);
  };

  const logoutHandler = () => {
    localStorage.removeItem("account");
    localStorage.removeItem("loggedin");
    setIsSignedIn(false);
  };

  const loginHandler = () => {
    setIsSignedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/route-results" element={<RouteResultPage />} />

        <Route
          path="/tickets"
          element={
            <TicketsPage
              process={processPurchase}
              setProcessPurchase={processUpdate}
            />
          }
        />
        <Route
          path="/tickets/:id"
          element={
            <TypePage
              process={processPurchase}
              setProcessPurchase={processUpdate}
            />
          }
        />
        <Route path="/extras" element={<Extras />} />
        <Route path="extras/route-detail" element={<RouteExtraDetailPage />} />
        <Route path="/tickets/details/:id" element={<PurchaseTicketDetail />} />
        <Route path="/ticket/:id" element={<TicketDetailPage />} />

        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route
          path="/more"
          element={
            <MorePage setIsSignedIn={logoutHandler} isSignedIn={isSignedIn} />
          }
        />
        <Route path="/account" element={<AccountSetting />} />
        <Route
          path="/signin"
          element={<SignUpSignInPage setIsSignedIn={loginHandler} />}
        />
        <Route path="/tourist" element={<TouristPage />} />
      </Routes>
    </Router>
  );
}

export default App;
