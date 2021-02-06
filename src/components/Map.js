import React from 'react'
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import Airtable from 'airtable'

import {
    useParams
} from 'react-router-dom'
let DefaultIcon = Leaflet.icon({
    ...Leaflet.Icon.Default.prototype.options,
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;
const position = [51.7519,-1.2578]

class Map extends React.Component {

    render = () => {

        console.log("Map markers = ")
        console.log(this.props.markers)
        return (
            this.props.markers ?

                <>
                    <MapContainer center={position} zoom={8} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            this.props.markers.map(marker => {
                                console.log(marker);
                                const point = [marker['latlng'][0], marker['latlng'][1]]
                                console.log(point);

                                return (
                                    <Marker position={point} key={marker['id']}>
                                        <Popup>
                                            <span>NAME: {marker['name']}
                                            <br/>
                                            <a href={"/record/" + marker['id']}>Wikipedia page</a>
                                            </span>
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