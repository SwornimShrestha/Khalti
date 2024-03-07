const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
require("dotenv").config();
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/khalti-api", async (req, res) => {
  try {
    const payload = req.body;
    const khaltiResponse = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      payload,
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`, // Fixed missing quotes and added a comma after Content-Type
        },
      }
    );
    console.log(khaltiResponse.data);
    res.json(khaltiResponse.data); // Return the Khalti response to the client
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing request");
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
