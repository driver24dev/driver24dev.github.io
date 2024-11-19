import React, { useState, useCallback, useEffect } from 'react';
import { X, Car, MapPin, Clock, Calculator } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

interface BookingFormProps {
  onClose: () => void;
}

interface Location {
  address: string;
  lat: number;
  lng: number;
}

// Custom marker icons
const pickupIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div class="w-8 h-8 rounded-full bg-green-500 border-2 border-white shadow-lg flex items-center justify-center text-white font-bold">P</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const dropoffIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div class="w-8 h-8 rounded-full bg-red-500 border-2 border-white shadow-lg flex items-center justify-center text-white font-bold">D</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapUpdater: React.FC<{ 
  center: [number, number], 
  bounds?: L.LatLngBounds,
  pickup?: Location,
  dropoff?: Location 
}> = ({ center, bounds, pickup, dropoff }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    } else {
      map.setView(center, map.getZoom());
    }

    // Clear existing routing control
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
        draggableWaypoints: false,
        fitSelectedRoutes: false,
        showAlternatives: false,
        lineOptions: {
          styles: [{ color: '#3B82F6', weight: 4, opacity: 0.7 }]
        }
      }).addTo(map);

      // Hide the routing instructions
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

const BookingForm: React.FC<BookingFormProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'book' | 'quote'>('book');
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    date: '',
    time: '',
    passengers: '1',
    vehicleType: 'sedan',
    name: '',
    email: '',
    phone: ''
  });

  const [selectedLocations, setSelectedLocations] = useState<{
    pickup?: Location;
    dropoff?: Location;
  }>({});

  const [activeInput, setActiveInput] = useState<'pickup' | 'dropoff' | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const searchLocation = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=us&viewbox=-118.6681759,33.7036917,-118.1552891,34.3373061&bounded=1`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const calculatePrice = useCallback(() => {
    if (selectedLocations.pickup && selectedLocations.dropoff) {
      // Calculate distance in kilometers using Haversine formula
      const R = 6371; // Earth's radius in km
      const lat1 = selectedLocations.pickup.lat * Math.PI / 180;
      const lat2 = selectedLocations.dropoff.lat * Math.PI / 180;
      const dLat = (selectedLocations.dropoff.lat - selectedLocations.pickup.lat) * Math.PI / 180;
      const dLon = (selectedLocations.dropoff.lng - selectedLocations.pickup.lng) * Math.PI / 180;

      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;

      // Base price calculation
      let basePrice = 75; // Base fare
      const pricePerKm = 2.5;
      const vehicleMultiplier = {
        sedan: 1,
        suv: 1.3,
        van: 1.5,
        stretch: 2
      }[formData.vehicleType];

      const price = (basePrice + (distance * pricePerKm)) * vehicleMultiplier;
      setEstimatedPrice(Math.round(price));
    }
  }, [selectedLocations, formData.vehicleType]);

  useEffect(() => {
    calculatePrice();
  }, [selectedLocations, formData.vehicleType, calculatePrice]);

  const handleLocationSelect = async (location: any, type: 'pickup' | 'dropoff') => {
    const newLocation = {
      address: location.display_name,
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lon)
    };

    setSelectedLocations(prev => ({
      ...prev,
      [type]: newLocation
    }));

    setFormData(prev => ({
      ...prev,
      [`${type}Location`]: location.display_name
    }));

    setSuggestions([]);
    setActiveInput(null);
  };

  const mapCenter = useCallback(() => {
    if (selectedLocations.pickup && selectedLocations.dropoff) {
      return [
        (selectedLocations.pickup.lat + selectedLocations.dropoff.lat) / 2,
        (selectedLocations.pickup.lng + selectedLocations.dropoff.lng) / 2
      ] as [number, number];
    }
    return [34.0522, -118.2437] as [number, number]; // Los Angeles coordinates
  }, [selectedLocations]);

  const getMapBounds = useCallback(() => {
    if (selectedLocations.pickup && selectedLocations.dropoff) {
      return L.latLngBounds(
        [selectedLocations.pickup.lat, selectedLocations.pickup.lng],
        [selectedLocations.dropoff.lat, selectedLocations.dropoff.lng]
      ).pad(0.1);
    }
    return undefined;
  }, [selectedLocations]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Car className="h-6 w-6" />
            <h2 className="text-2xl font-bold">Luxury Transportation</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('book')}
            className={`flex-1 py-2 text-center rounded-lg font-medium transition ${
              activeTab === 'book'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Car className="h-5 w-5 inline-block mr-2" />
            Book Your Ride
          </button>
          <button
            onClick={() => setActiveTab('quote')}
            className={`flex-1 py-2 text-center rounded-lg font-medium transition ${
              activeTab === 'quote'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Calculator className="h-5 w-5 inline-block mr-2" />
            Price Quote
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.pickupLocation}
                    onChange={(e) => {
                      setFormData({ ...formData, pickupLocation: e.target.value });
                      setActiveInput('pickup');
                      searchLocation(e.target.value);
                    }}
                    onFocus={() => setActiveInput('pickup')}
                  />
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {activeInput === 'pickup' && suggestions.length > 0 && (
                  <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.place_id}
                        className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50"
                        onClick={() => handleLocationSelect(suggestion, 'pickup')}
                      >
                        {suggestion.display_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dropoff Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.dropoffLocation}
                    onChange={(e) => {
                      setFormData({ ...formData, dropoffLocation: e.target.value });
                      setActiveInput('dropoff');
                      searchLocation(e.target.value);
                    }}
                    onFocus={() => setActiveInput('dropoff')}
                  />
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {activeInput === 'dropoff' && suggestions.length > 0 && (
                  <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.place_id}
                        className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50"
                        onClick={() => handleLocationSelect(suggestion, 'dropoff')}
                      >
                        {suggestion.display_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {activeTab === 'book' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time
                      </label>
                      <input
                        type="time"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Passengers
                      </label>
                      <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.passengers}
                        onChange={(e) => setFormData({...formData, passengers: e.target.value})}
                      >
                        {[1,2,3,4,5,6].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vehicle Type
                      </label>
                      <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.vehicleType}
                        onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                      >
                        <option value="sedan">Luxury Sedan</option>
                        <option value="suv">Executive SUV</option>
                        <option value="van">Luxury Van</option>
                        <option value="stretch">Stretch Limousine</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Book Now
                  </button>
                </>
              )}

              {activeTab === 'quote' && estimatedPrice && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Estimated Price</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Base Fare</span>
                      <span className="font-medium">$75.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Distance Fee</span>
                      <span className="font-medium">${(estimatedPrice - 75).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Total Estimate</span>
                        <span>${estimatedPrice.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        *Final price may vary based on traffic, waiting time, and additional services
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('book')}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-4"
                    >
                      Proceed to Booking
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="h-[600px] rounded-lg overflow-hidden">
            <MapContainer
              center={mapCenter()}
              zoom={12}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <MapUpdater 
                center={mapCenter()} 
                bounds={getMapBounds()}
                pickup={selectedLocations.pickup}
                dropoff={selectedLocations.dropoff}
              />
              {selectedLocations.pickup && (
                <Marker
                  position={[selectedLocations.pickup.lat, selectedLocations.pickup.lng]}
                  icon={pickupIcon}
                />
              )}
              {selectedLocations.dropoff && (
                <Marker
                  position={[selectedLocations.dropoff.lat, selectedLocations.dropoff.lng]}
                  icon={dropoffIcon}
                />
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;