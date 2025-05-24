import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import L from 'leaflet';
import iconUrl from './assets/marker-icon.png';
import iconShadow from './assets/marker-shadow.png';
import { useMapEvents } from 'react-leaflet/hooks';
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot
} from "firebase/firestore";  



delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});



function LocationMarker({ onAddReport }) {
  useMapEvents({
    click(e) {
      const latlng = e.latlng;
      const description = prompt("Describe the issue at this location:");
      if (description) {
        onAddReport({ position: latlng, description });
      }
    },
  });
  return null;
}
useEffect(() => {
  const unsub = onSnapshot(collection(db, "incidents"), (snapshot) => {
    const loaded = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setIncidents(loaded);
  });

  return () => unsub();
}, []);


function AddMarker() {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      const title = prompt("Describe the issue:");
      if (title) {
        await addDoc(collection(db, "incidents"), {
          title,
          lat,
          lng,
          createdAt: new Date()
        });
      }
    }
  });
  return null;
}

function App() {
  const [reports, setReports] = useState([
    {
      position: { lat: 6.5244, lng: 3.3792 },
      description: "Reported robbery incident here."
    },
  ]);

  const addReport = (report) => {
    setReports((prev) => [...prev, report]);
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <header className="bg-red-600 text-white p-4 text-center text-2xl font-bold shadow-md">
        SafeSpot - Report & View Danger Zones
      </header>
      <h2>Click On Location To Report Incident</h2>
      <main className="flex-1">
        <MapContainer center={[6.5244, 3.3792]} zoom={13} className="h-full w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <LocationMarker onAddReport={addReport} />
          {reports.map((report, idx) => (
            <Marker
            key={incident.id}
            position={[incident.lat, incident.lng]}>
            <Popup>{incident.title}</Popup>
          </Marker>
          ))}
        </MapContainer>
      </main>
    </div>
  );
}
export default App;