import React from "react";
import {InfoWindow, withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";

class WHPMap extends React.Component {

    render(){

        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
              zoom={12}
              defaultCenter={{ lat: 37.481007, lng: -94.504627 }}
            >
              <Marker
                position={{ lat: 37.481007, lng: -94.504627 }}
              >
                <InfoWindow>
                  <div className="google-title">Prairie Center Farm Lake, Ozark Township, MO 64762</div>
                </InfoWindow>
                </Marker>
            </GoogleMap>
          ));
          
        return(
        <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAw5U3mNEBGPNCwHmjJF40V4KVHNWUCnvA"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `300px` }} />}
        mapElement={<div style={{ height: `100%`, borderRadius: `20px`, boxShadow:  '4px 2px 5px black', width: `500px` }} />}
        />

        )
    }
    
}
 
export default WHPMap;