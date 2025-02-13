import { useLocation, useNavigate } from "react-router-dom";
import "./ResultDetail.css";

export default function ResultDetail({ route, from, to, data, index }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(data);

  const handleBuyTicket = (e) => {
    // const navigation = `/tickets/details/${+route.duration > 20 ? 2 : 1}`;
    const buttonText = e.target.innerText;
    const extractedPrice = parseInt(buttonText.match(/\d+/)[0], 10);

    console.log(extractedPrice);
    let indexData = 0;
    if (data) {
      for (let i = 0; i < data?.length; i++) {
        if (+data[i].price === extractedPrice) {
          indexData = i;
          // return indexData
        }
      }
    }
    const ticket = data[indexData];

    if (ticket) {
      navigate(`/tickets/details/${ticket.id}`, {
        state: {
          id: ticket.id,
          name: ticket.name,
          price: ticket.price,
          duration: ticket.duration,
          quantity: 1,
          total: ticket.price,
          // time: new Date().getTime(),
        },
      });
    } else {
      console.error("No matching ticket found for price:", extractedPrice);
    }
    // let navigation = `/tickets/single`;
    // if (+data.price) {
    // }
    // /tickets/details/${ticket.id}${index}
    console.log(data);
    const val = +route.duration > 20 ? 30 : 20;
    //  navigate(navigation, { state: { line: route.line, price: val } });
  };

  return (
    <li className="detailed-result-card">
      <div className="result-summary">
        <p>
          <strong>Čas:</strong> {route.duration}
        </p>
        <div className="result-travel-time">
          <p>
            <strong>Odjezd:</strong> {from}
          </p>
          <p>
            <strong>Příjezd:</strong> {to}
          </p>
        </div>
      </div>
      <div className="line-details">
        <p>
          <strong>Linka:</strong> {route.line}
          {route.accessibility && <span className="accessible-icon">♿</span>}
        </p>
      </div>
      <div className="result-detail-btn">
        <button
          className="buy-ticket-btn"
          onClick={(e) => {
            console.log(e.target.innerText);
            handleBuyTicket(e);
          }}
        >
          Koupit jízdenku <span>{+route.duration > 20 ? 30 : 20} CZK</span>
        </button>
      </div>
    </li>
  );
}

// const handleNavigate = (destination, id) => {
//     // details/1
//     let ticket = ticketOptions[id];
//     if (id === 2) {
//       ticket = ticketOptions[1];
//     }

//   navigate(`/tickets/details/${id}`, {
//     state: {
//       id: ticket.id,
//       name: ticket.name,
//       price: ticket.price,
//       duration: ticket.duration,
//       quantity: 1,
//       total: ticket.price,
//       // from: currentLocation,
//       // to: destination,
//       // results: mockResults,
//       time: new Date().getTime(),
//     },
//   });
// };
