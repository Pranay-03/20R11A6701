import React from "react";
import moment from "moment";
import "./App.css";

function App() {
  const trainSchedule = [
    {
      trainNumber: "123",
      destination: "Chennai",
      departureTime: "09:00 AM",
      no: "1",
    },
    {
      trainNumber: "456",
      destination: "MUmbai",
      departureTime: "10:30 AM",
      no: "2",
    },
    {
      trainNumber: "789",
      destination: "Vapi",
      departureTime: "12:15 PM",
      no: "3",
    },
  ];

  return (
    <div className="App">
      <h1>Train Scheduled </h1>
      <table>
        <thead>
          <tr>
            <th>Train Number</th>
            <th>Destination</th>
            <th>no</th>
            <th>depature time</th>
          </tr>
        </thead>
        <tbody>
          {trainSchedule.map((train) => (
            <tr key={train.trainNumber}>
              <td>{train.trainNumber}</td>
              <td>{train.destination}</td>
              <td>{train.no}</td>
              <td>
                {moment(train.departureTime, "hh:mm A").format("hh:mm A")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
