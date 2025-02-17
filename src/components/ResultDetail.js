import { useLocation, useNavigate } from "react-router-dom";
import "./ResultDetail.css";

export default function ResultDetail({ route, from, to, data, index, time }) {
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

  // const calculateArrivalTime = (departureTime, duration) => {
  //   if (!departureTime) return "Unknown";

  //   // Rozdělení uživatelem zadaného času na hodiny a minuty
  //   const [hours, minutes] = departureTime.split(":").map(Number);

  //   // Vytvoření objektu Date podle uživatelského času
  //   const departure = new Date();
  //   departure.setHours(hours);
  //   departure.setMinutes(minutes);
  //   departure.setSeconds(0);

  //   // Přičtení doby jízdy
  //   departure.setMinutes(departure.getMinutes() + duration);

  //   // Formátování na HH:MM
  //   const arrivalHours = departure.getHours().toString().padStart(2, "0");
  //   const arrivalMinutes = departure.getMinutes().toString().padStart(2, "0");

  //   return `${arrivalHours}:${arrivalMinutes}`;
  // };

  const calculateArrivalTime = (departureTime, duration) => {
    let departure;

    if (!departureTime) {
      // Use the current local time if no time is provided
      departure = new Date();
    } else {
      // Parse the provided departure time (e.g., "12:46")
      const [hours, minutes] = departureTime?.split(":").map(Number);

      departure = new Date();
      departure.setHours(hours);
      departure.setMinutes(minutes);
      departure.setSeconds(0);
    }

    console.log(
      departure,
      // minutes,
      departureTime,
      duration,
      +departure.getMinutes() + +duration
    );
    // Add the duration in minutes
    departure.setMinutes(+departure.getMinutes() + +duration);

    // Format arrival time as HH:MM
    return departure.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const noEnteredTime = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  console.log(noEnteredTime);

  return (
    <li className="detailed-result-card">
      <div className="result-summary">
        <p>
          <strong>Time of ride:</strong> {route.duration} min
        </p>
        <div className="result-travel-time">
          <p>
            <strong>Departure:</strong> {from}
          </p>
          <p>
            <strong>Arrival:</strong> {to}
          </p>
          {/* {time && ( */}
          <p>
            <strong>Departure Time:</strong>
            {time ? time : noEnteredTime}
            {/* {time ||
                } */}
          </p>
          {/* )} */}
          {/* {time && ( */}
          <p>
            <strong>Arrival Time:</strong>{" "}
            {calculateArrivalTime(time || noEnteredTime, route.duration)}
          </p>
          {/* )}  */}
        </div>
      </div>
      <div className="line-details">
        <p>
          <strong>Line:</strong> {route.line}
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
          Buy ticket <span>{+route.duration > 20 ? 30 : 20} CZK</span>
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
