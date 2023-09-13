import React ,{useState,useEffect} from 'react'
import Geocode from "react-geocode";
import { BsTruckFlatbed } from 'react-icons/bs';
import { toast } from 'react-toastify';
function useCoords(address="chlef") {
  const [coords,setCoords] = useState(null);
  const [loading,setLoading]=useState(BsTruckFlatbed)
  useEffect(() => {
   const myGoogleMapAPI_KEY=import.meta.env.VITE_API_KEY;
    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(myGoogleMapAPI_KEY);

// set response language. Defaults to english.
Geocode.setLanguage("en");

//enable debugs
Geocode.enableDebug()

// Get latitude & longitude from address.
Geocode.fromAddress(address).then(
    (response) => {
      console.log(response)
      const { lat, lng } = response.results[0].geometry.location;
      setCoords({
        lat,
        lng,
        address
      })
      setLoading(false)
    },
    (error) => {
      console.error(error)
    }
  );
  
  },[]);

  return {coords,loading}
}

export default useCoords