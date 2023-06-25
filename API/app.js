const express = require("express");
const axios = require("axios");

const app = express();

// Register your company with the John Doe Railway Server
app.post("/register", async (req, res) => {
  try {
    // Make a POST request to register your company
    const response = await axios.post("http://104.211.219.98/train/register", {
      companyName: "Train Central",
      ownerName: "Ram",
      rollNo: "20R11A6701",
      ownerEmail: "ram@abc.edu",
      accessCode: "nSFqRI",
    });

    // Return the response from the John Doe Railway Server
    res.json(response.data);
  } catch (error) {
    // Handle any errors that occur during registration
    res
      .status(500)
      .json({ error: "Failed to register with the John Doe Railway Server" });
  }
});

app.post("/authorize", async (req, res) => {
  try {
    // Make a POST request to authenticate
    const response = await axios.post(":http://104.211.219.98/train/auth", {
      companyName: "Train Central",
      clientID: "e1e0fcfc-5809-451c-9dbe-43b9ca224f76",
      ownerName: "Ram",
      ownerEmail: "ram@abc.edu",
      rollNo: "20R11A6701",
      clientSecret: "aKgXcxfcXVutzuIk",
    });

    // Return the response from the John Doe Railway Server
    res.json(response.data);
  } catch (error) {
    // Handle any errors that occur during registration
    res
      .status(500)
      .json({ error: "Failed to register with the John Doe Railway Server" });
  }
});

// API endpoint to get real-time train schedules, seat availability, and pricing
app.get("/trains", async (req, res) => {
  try {
    // Get the current time and calculate the departure time threshold (12 hours from now)
    const currentTime = new Date();
    const departureTimeThreshold = new Date(
      currentTime.getTime() + 12 * 60 * 60 * 1000
    );

    // Make a request to the John Doe Railway Server to get all train schedules
    const response = await axios.get("http://104.211.219.98/train/schedules", {
      headers: {
        // Add the authentication token in the headers
        Authorization: "http://104.211.219.98/train/auth",
      },
    });

    // Filter the train schedules based on the departure time threshold and sort the results
    const trains = response.data.trains
      .filter((train) => {
        const departureTime = new Date(train.departureTime);
        return (
          departureTime > currentTime && departureTime <= departureTimeThreshold
        );
      })
      .sort((a, b) => {
        // Sort by price in ascending order, tickets in descending order, and departure time in descending order
        if (a.price !== b.price) {
          return a.price - b.price;
        } else if (a.seatsAvailability !== b.seatsAvailability) {
          return b.seatsAvailability - a.seatsAvailability;
        } else {
          return new Date(b.departureTime) - new Date(a.departureTime);
        }
      });

    res.json(trains);
  } catch (error) {
    // Handle any errors that occur during the API call
    res.status(500).json({ error: "Failed to fetch train schedules" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
