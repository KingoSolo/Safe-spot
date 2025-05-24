import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

const sampleIncidents = [
  { id: 1, position: [40.7128, -74.006], description: 'Theft reported here', type: 'theft' },
  { id: 2, position: [40.7138, -74.001], description: 'Suspicious activity', type: 'suspicious' },
];

function App() {
  const [incidents, setIncidents] = useState(sampleIncidents);
  const [desc, setDesc] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleReport = (e) => {
    e.preventDefault();
    const newReport = {
      id: Date.now(),
      position: [parseFloat(lat), parseFloat(lng)],
      description: desc,
    };
    setIncidents([...incidents, newReport]);
    setDesc('');
    setLat('');
    setLng('');
  };

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-2xl font-bold text-center py-4">SafeSpot – Public Safety Map</h1>
      <div className="flex flex-1">
        <div className="w-2/3 h-full">
          <MapContainer center={[40.7128, -74.006]} zoom={14} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {incidents.map((incident) => (
              <Marker key={incident.id} position={incident.position}>
                <Popup>{incident.description}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <div className="w-1/3 p-4 bg-gray-50">
          <h2 className="text-lg font-semibold">Report an Incident</h2>
          <form className="flex flex-col gap-2 mt-4" onSubmit={handleReport}>
            <input
              type="text"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Longitude"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
