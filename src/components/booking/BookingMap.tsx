import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

// Override default Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: '/images/pickup-marker.png',
  iconRetinaUrl: '/images/pickup-marker.png',
  shadowUrl: null,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface BookingMapProps {
  pickup?: Location;
  dropoff?: Location;
  stops?: Location[];
  onPickupChange?: (location: Location) => void;
  onDropoffChange?: (location: Location) => void;
}

const MapUpdater: React.FC<{ 
  pickup?: Location,
  dropoff?: Location,
  stops?: Location[]
}> = ({ pickup, dropoff, stops = [] }) => {
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
      const waypoints = [
        L.latLng(pickup.lat, pickup.lng),
        ...stops.filter(stop => stop.lat && stop.lng).map(stop => L.latLng(stop.lat, stop.lng)),
        L.latLng(dropoff.lat, dropoff.lng)
      ];

      const routingControl = L.Routing.control({
        waypoints,
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

      // Fit bounds to include all points
      const bounds = L.latLngBounds(waypoints);
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
  }, [map, pickup, dropoff, stops]);

  return null;
};

const BookingMap: React.FC<BookingMapProps> = ({ pickup, dropoff, stops = [], onPickupChange, onDropoffChange }) => {
  const defaultCenter: [number, number] = [34.0522, -118.2437]; // Los Angeles coordinates

  const handleMarkerDragEnd = async (type: 'pickup' | 'dropoff', event: L.LeafletEvent) => {
    const marker = event.target;
    const position = marker.getLatLng();
    
    try {
      // Simulate reverse geocoding with a dummy address
      const newLocation: Location = {
        lat: position.lat,
        lng: position.lng,
        address: `${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}`
      };

      if (type === 'pickup' && onPickupChange) {
        onPickupChange(newLocation);
      } else if (type === 'dropoff' && onDropoffChange) {
        onDropoffChange(newLocation);
      }
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

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
          stops={stops}
        />
        {pickup && (
          <Marker 
            position={[pickup.lat, pickup.lng]}
            draggable={true}
            eventHandlers={{
              dragend: (e) => handleMarkerDragEnd('pickup', e)
            }}
          />
        )}
        {stops.map((stop, index) => (
          stop.lat && stop.lng && (
            <Marker 
              key={index}
              position={[stop.lat, stop.lng]}
              draggable={true}
            />
          )
        ))}
        {dropoff && (
          <Marker 
            position={[dropoff.lat, dropoff.lng]}
            draggable={true}
            eventHandlers={{
              dragend: (e) => handleMarkerDragEnd('dropoff', e)
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default BookingMap;