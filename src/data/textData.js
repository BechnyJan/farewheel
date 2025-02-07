export const touristSpots = [
  { id: 1, name: "Prague Castle", destination: "Malostranská" },
  { id: 2, name: "Charles Bridge", destination: "Karlův most" },
  { id: 3, name: "Old Town Square", destination: "Staroměstská" },
  { id: 4, name: "Wenceslas Square", destination: "Muzeum" },
];

export const recommendedTickets = [
  {
    id: 1,
    name: "24-Hour Ticket",
    price: 120,
    description:
      "Unlimited travel for 24 hours across all means of transport in Prague.",
  },
  {
    id: 2,
    name: "3-Day Tourist Ticket",
    price: 330,
    description:
      "Ideal for tourists staying in Prague. Unlimited travel for 72 hours across all means of transport in Prague.",
  },
  {
    id: 3,
    name: "Single Ticket",
    price: 30,
    description: "Valid for 90 minutes on trams, buses, and metro.",
  },
];

export const mockResults = [
  {
    duration: "15",
    departure: "10:15",
    arrival: "10:30",
    line: "Metro A",
    startStation: "Hlavní nádraží",
    endStation: "Malostranská",
    walkTime: "5",
    accessibility: true,
    notes: "Walk to the castle entrance from Malostranská station.",
  },
  {
    duration: "20",
    departure: "10:25",
    arrival: "10:45",
    line: "Tram 22",
    startStation: "Národní třída",
    endStation: "Pražský hrad",
    walkTime: "3",
    accessibility: true,
    notes: "Perfect for enjoying views of the city during the ride.",
  },
  {
    duration: "25",
    departure: "10:35",
    arrival: "11:00",
    line: "Bus 192",
    startStation: "Florenc",
    endStation: "Malostranské náměstí",
    walkTime: "10",
    accessibility: false,
    notes: "Includes a scenic walk through Lesser Town to the castle.",
  },
];
