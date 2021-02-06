import React from 'react'
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

let DefaultIcon = Leaflet.icon({
    ...Leaflet.Icon.Default.prototype.options,
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;
const position = [37.774929,-122.419418]

class Map extends React.Component {


    render = () => {

        return (
            this.props.incidents ?

                <>
                    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            this.props.incidents.map(incident => {
                                const point = [incident['point']['coordinates'][1], incident['point']['coordinates'][0]]


                                return (
                                    <Marker position={point} key={incident['incident_number']}>
                                        <Popup>
                                            <span>ADDRESS: {incident['address']}, {incident['city']} - {incident['zip_code']}</span>
                                            <br/>
                                            <span>BATTALION: {incident['battalion']}</span><br/>
                                        </Popup>
                                    </Marker>
                                )
                            })
                        }
                    </MapContainer>
                </>

                :

                <><p>Map loading</p></>

        )
    }
}

export default Map;