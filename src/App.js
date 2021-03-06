import "./App.css";
import React from 'react';
import { BiohackerIcon, ModderIcon, PiercerIcon } from './components/Icons';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import partnerData from "./data/partners.json";

const App = () => {
  const [activeMarker, setActiveMarker] = React.useState(null);

  const initPosition = [47.606209, -122.332069]; //set initial position to Seattle; all hail amal

  return (
    <div>
      <Map center={initPosition} zoom={8} >
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

        {/*create markers for each partner listed in data*/}
        {partnerData.map((partner, i) => (
          <Marker 
            key={i} 
            position={[partner.Coordinates.split(', ')[0], partner.Coordinates.split(', ')[1]]}
            onclick={() => {setActiveMarker(partner);}}
            icon={ partner.Type === "biohacker" ? BiohackerIcon : partner.Type === "modder" ? ModderIcon : PiercerIcon }
          />
        ))}

        {/*handle pop ups for active marker clicked*/}
        {activeMarker && (
          <Popup
            position={[activeMarker.Coordinates.split(', ')[0], activeMarker.Coordinates.split(', ')[1]]}
            onClose={() => setActiveMarker(null)}
          >
            <div>
              <h3>{activeMarker.Type}: {activeMarker.Partner}</h3>
              <ul style={{listStyleType: "none", padding:0}}>
                <li>{ activeMarker.Studio ? <div><b>Studio:</b> {activeMarker.Studio} </div>: null }</li>
                <li>{ activeMarker.Phone ? <div><b>Phone: </b>{activeMarker.Phone}</div> : null }</li>
                <li>{ activeMarker.Website ? <div><b>Website: </b><a href="#" target="_blank">{activeMarker.Website}</a></div> : null }</li>
              </ul>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default App;
