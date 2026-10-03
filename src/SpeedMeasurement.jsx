import React, { useEffect, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';

export function useSpeedTracker() {

  const [speed, setSpeed] = useState(0);
  const [status, setStatus] = useState('Initializing GPS...');

  useEffect(() => {
    let watchId = null;

    const initGeolocation = async () => {
      try {
        const permission = await Geolocation.requestPermissions();
        if (permission.location !== 'granted') {
          setStatus('Location permission denied');
          return;
        }

        setStatus('Watching position...');

        watchId = await Geolocation.watchPosition(
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          },
          (position, err) => {
            if (err) {
              console.error('GPS Error:', err);
              setStatus(`Error: ${err.message}`);
              return;
            }

            if (position) {
              const speedNormal = position.coords.speed ?? 0;
              // I think this is  m/s, so convert to km/h
              const speedKmh = speedNormal > 0 ? speedNormal * 3.6 : 0;
              setSpeed(speedKmh);
            }
          }
        );
      } catch (error) {
        console.error('Geolocation setup failed:', error);
        setStatus(`Failed: ${error.message}`);
      }
    };

    initGeolocation();

    return () => {
      if (watchId) {
        Geolocation.clearWatch({ id: watchId });
      }
    };
  }, []);
  return { speed, status };
}

export function SpeedKm_h() {
  const { speed, status } = useSpeedTracker();
  return (speed).toFixed(1);
}

export function SpeedTracker() {
  const { speed, status } = useSpeedTracker();
  return (
    <div>
      <p>GPS Status: {status}</p>
      <h2>{speed.toFixed(1)} km/h</h2>
    </div>
  );
}