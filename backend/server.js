const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const slotsData = {}; // { "venue-date": [{ time, booked }] }

app.get("/slots", (req, res) => {
  const { venue, date } = req.query;
  const key = `${venue}-${date}`;
  if (!slotsData[key]) {
    // Initialize with mock slots
    slotsData[key] = ["10:00 AM", "11:00 AM", "12:00 PM"].map(time => ({ time, booked: false }));
  }
  res.json(slotsData[key]);
});

app.post("/book", (req, res) => {
  const { name, venue, date, slot, sport } = req.body;
  const key = `${venue}-${date}`;
  const slotEntry = slotsData[key].find(s => s.time === slot);
  console.log(slotEntry);
  if (slotEntry && !slotEntry.booked) {
    slotEntry.booked = true;
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Slot unavailable" });
  }
});

app.listen(5000, () => console.log("Mock server running on http://localhost:5000"));

