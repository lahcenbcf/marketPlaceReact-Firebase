import {FiMapPin} from 'react-icons/fi'
export const LocationPin = ({ text }) => (
    <div className="pin">
      <FiMapPin  />
      <p className="pin-text">{text}</p>
    </div>
  )