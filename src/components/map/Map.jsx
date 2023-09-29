import GoogleMapReact from 'google-map-react'
import './map.css'
import {LocationPin} from './LocationPin'
export const Map = ({ location, zoomLevel }) => (
    <div className="map my-4">
  
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: import.meta.env.VITE_API_KEY   }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  )

