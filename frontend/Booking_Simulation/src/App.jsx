import React, { useState } from 'react';
import axios from 'axios';

const venues = ["Stadium A", "Court B", "Ground C"];

function App() {
  const [selectedVenue, setSelectedVenue] = useState(venues[0]);
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const fetchSlots = async () => {
    if (!date) return;
    const res = await axios.get(`http://localhost:5000/slots?venue=${selectedVenue}&date=${date}`);
    setSlots(res.data);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/book", {
      name,
      venue: selectedVenue,
      date,
      sport,
      slot: selectedSlot,
    });
    fetchSlots(); // refresh slots
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Book a Sport Slot</h1>

      <select value={selectedVenue} onChange={e => setSelectedVenue(e.target.value)} className="mb-2 p-2 w-full">
        {venues.map(v => <option key={v}>{v}</option>)}
      </select>

      <input type="date" value={date} onChange={e => setDate(e.target.value)} className="mb-2 p-2 w-full" />
      <button onClick={fetchSlots} className="bg-blue-500 text-white px-4 py-2 mb-4">View Slots</button>

      <ul className="mb-4">
        {slots.map(slot => (
          <li key={slot.time} className={`p-2 ${slot.booked ? 'bg-gray-300' : 'bg-green-200'} mb-1`}>
            <label>
              <input type="radio" name="slot" disabled={slot.booked} value={slot.time} onChange={e => setSelectedSlot(e.target.value)} />
              {slot.time} - {slot.booked ? 'Booked' : 'Available'}
            </label>
          </li>
        ))}
      </ul>

      <form onSubmit={handleBooking} className="flex flex-col">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" className="p-2 mb-2" required />
        <input value={sport} onChange={e => setSport(e.target.value)} placeholder="Sport" className="p-2 mb-2" required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2">Book Slot</button>
      </form>
    </div>
  );
}

export default App;