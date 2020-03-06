import React, { useEffect, useState } from 'react';
import { loadGoogleMaps } from '../../scripts/googlemaps';
const Map = (props) => {
    const [map, setMap] = useState(null);
    const [mapMarkers, setMapMarkers] = useState([]);
    useEffect(() => {
        loadGoogleMaps().then(() => {
            setMap(new google.maps.Map(document.getElementById('wtb-map'), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8
            }));
        });
    }, [])
    useEffect(() => {
        if (!map) return;
        
        mapMarkers.forEach((marker) => marker.setMap(null));
        let bounds = new google.maps.LatLngBounds();
        const markers = props.results.map((result) => {
            var marker = new google.maps.Marker({
                position: { lat: result.latitude, lng: result.longitude },
                title: result.name
            });
            marker.setMap(map);
            bounds.extend(new google.maps.LatLng(marker.position.lat(), marker.position.lng()));
            return marker;
        });
        map.fitBounds(bounds);
        setMapMarkers(markers);
    }, [props.results, map]);
    return <div>
        <div id='wtb-map' style={{ height: '500px', width: '500px', position: 'absolute', right: '0', top: '0', border: '3px solid black', borderRadius: '3px' }}></div>
    </div>;
}
export default React.memo(Map);
