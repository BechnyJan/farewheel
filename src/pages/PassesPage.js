import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import SingleTicketDetail from "../components/SingleTicketDetail";
import "./PassesPage.css";

export default function PassesPage({ process, setProcessPurchase }) {
  const [activeTab, setActiveTab] = useState("individual");
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  const passesData = {
    individual: [
      {
        name: "15-day Budapest pass",
        price: "500",
        icon: "🕒",
        duration: "360",
      },
      {
        name: "Monthly Prague-pass",
        price: "950",
        icon: "📅",
        duration: "720",
      },
      {
        name: "Prague County Pass (full-price)",
        price: "1 450",
        icon: "📍",
        duration: "168",
      },
      { name: "Czech Pass Adult", price: "3 000", icon: "🇭🇺" },
      { name: "Annual Adult-pass", price: "6 550", icon: "📆" },
      {
        name: "Discounted annual Budapest-pass",
        price: "4 250",
        icon: "💸",
      },
    ],
    business: [
      { name: "Corporate 1-month pass", price: "820", icon: "🏢" },
      { name: "Corporate annual pass", price: "5800", icon: "💼" },
    ],
  };

  const ticketOptions = [
    { name: "Single ticket", price: "15", icon: "🚌", duration: "" },
    // { name: "Heritage service single ticket", price: "500 CZK", icon: "🏛️" },
    { name: "30minutes ticket", price: "20", icon: "⏱️", duration: "30" },
    { name: "90minutes ticket", price: "30", icon: "⏳", duration: "90" },
    { name: "Airport shuttle", price: "100", icon: "✈️", duration: "" },
    { name: "Block of 10 tickets", price: "130", icon: "🔟", duration: "" },
  ];

  const handleDetails = (pass) => {
    navigate(`/passes/${pass.name}`, { state: pass });
  };

  const processingHandler = () => {
    console.log("hhhh");
    setProcessPurchase();
  };

  const ticketPage = true;
  return (
    <>
      <BackButton
        ticketPage={ticketPage}
        setProcessPurchase={setProcessPurchase}
        title={location.pathname !== "/tickets/single" ? "Passes" : "Single"}
      />
      <div className="passes-page">
        {/* <h1>Passes</h1> */}
        <div className="tab-container">
          <button
            className={activeTab === "individual" ? "active" : ""}
            onClick={() => setActiveTab("individual")}
          >
            {location.pathname !== "/tickets/single"
              ? "Private individual"
              : "Adult"}
          </button>
          <button
            className={activeTab === "business" ? "active" : ""}
            onClick={() => setActiveTab("business")}
          >
            {location.pathname !== "/tickets/single" ? "Business" : "Reduced"}
          </button>
        </div>
        {location.pathname !== "/tickets/single" ? (
          <div className="info-box">
            <p>
              <strong>Information:</strong> The Block of 10 tickets is now
              available digitally in selected apps.
            </p>
          </div>
        ) : (
          <div className="info-box">
            <span>ℹ️</span>
            <p>
              Those tickets are neccessary to be activated before the usage.
            </p>
          </div>
        )}
        <div className="passes-list">
          {location.pathname !== "/tickets/single" &&
            passesData[activeTab].map((pass, index) => (
              <>
                <SingleTicketDetail
                  id={index}
                  name={pass.name}
                  icon={pass.icon}
                  price={pass.price}
                />
              </>
            ))}
          {location.pathname === "/tickets/single" &&
            ticketOptions.map((option, index) => (
              <SingleTicketDetail
                id={index}
                name={option.name}
                price={option.price}
                icon={option.icon}
                duration={option.duration}
              />
            ))}
        </div>
      </div>
    </>
  );
}
