import React from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface BookingMapProps {
  pickup?: Location;
  dropoff?: Location;
}

const MapUpdater: React.FC<{ 
  center: [number, number], 
  bounds?: L.LatLngBounds,
  pickup?: Location,
  dropoff?: Location 
}> = ({ center, bounds, pickup, dropoff }) => {
  const map = useMap();

  React.useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    } else {
      map.setView(center, map.getZoom());
    }

    map.eachLayer((layer) => {
      if (layer instanceof L.Routing.Control) {
        map.removeControl(layer);
      }
    });

    if (pickup && dropoff) {
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(pickup.lat, pickup.lng),
          L.latLng(dropoff.lat, dropoff.lng)
        ],
        routeWhileDragging: false,
        addWaypoints: false,
        fitSelectedRoutes: false,
        showAlternatives: false,
        lineOptions: {
          styles: [{ color: '#3B82F6', weight: 4, opacity: 0.7 }]
        }
      }).addTo(map);

      const container = routingControl.getContainer();
      if (container) {
        container.style.display = 'none';
      }
    }

    return () => {
      map.eachLayer((layer) => {
        if (layer instanceof L.Routing.Control) {
          map.removeControl(layer);
        }
      });
    };
  }, [map, center, bounds, pickup, dropoff]);

  return null;
};

const BookingMap: React.FC<BookingMapProps> = ({ pickup, dropoff }) => {
  const defaultCenter: [number, number] = [34.0522, -118.2437]; // Los Angeles coordinates

  return (
    <div className="h-[400px] rounded-lg overflow-hidden">
      <MapContainer
        center={defaultCenter}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapUpdater
          center={defaultCenter}
          pickup={pickup}
          dropoff={dropoff}
        />
        {pickup && (
          <Marker position={[pickup.lat, pickup.lng]} />
        )}
        {dropoff && (
          <Marker position={[dropoff.lat, dropoff.lng]} />
        )}
      </MapContainer>
    </div>
  );
};

export default BookingMap;