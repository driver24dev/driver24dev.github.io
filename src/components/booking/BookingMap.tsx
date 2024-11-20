import React, { useEffect } from 'react';
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
  pickup?: Location,
  dropoff?: Location 
}> = ({ pickup, dropoff }) => {
  const map = useMap();

  useEffect(() => {
    // Remove existing routing controls
    map.eachLayer((layer) => {
      if (layer instanceof L.Routing.Control) {
        map.removeControl(layer);
      }
    });

    // Add routing if both pickup and dropoff are set
    if (pickup && dropoff) {
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(pickup.lat, pickup.lng),
          L.latLng(dropoff.lat, dropoff.lng)
        ],
        routeWhileDragging: false,
        addWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        lineOptions: {
          styles: [{ color: '#3B82F6', weight: 4, opacity: 0.7 }],
          extendToWaypoints: true,
          missingRouteTolerance: 0
        }
      }).addTo(map);

      // Hide the routing control container
      const container = routingControl.getContainer();
      if (container) {
        container.style.display = 'none';
      }

      // Fit bounds to include both markers
      const bounds = L.latLngBounds([
        [pickup.lat, pickup.lng],
        [dropoff.lat, dropoff.lng]
      ]);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (pickup) {
      map.setView([pickup.lat, pickup.lng], 13);
    } else if (dropoff) {
      map.setView([dropoff.lat, dropoff.lng], 13);
    } else {
      // Default view of Los Angeles
      map.setView([34.0522, -118.2437], 11);
    }

    return () => {
      map.eachLayer((layer) => {
        if (layer instanceof L.Routing.Control) {
          map.removeControl(layer);
        }
      });
    };
  }, [map, pickup, dropoff]);

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