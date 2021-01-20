import './App.css';

import { MapContainer, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';

import Marcadores from './Componentes/Marcadores'
import { Component } from 'react';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


class App extends Component{

  state ={
        marcadores:[]
      };
  
    componentDidMount() {
      fetch("http://localhost:3500/get_data",{ 
      method: 'GET',
      headers: {
        Accept: 'application/json',
                'Content-Type':'application/json',
                //'Authorization': '3ywg&hsnxu43o9+iaz&sdtr'
      }})// Aqui va la ruta
       .then(res => res.json())
        .then((data) => {
          console.log(data)
          this.setState({ marcadores : Object.entries(data)[0][1]})
          console.log(this.state.marcadores)
       })
        .catch(console.log)
      };
  
  
  render(){
    return(
      <MapContainer center={[4.08892, -76.20143]} zoom={13} scrollWheelZoom={true}>
        <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <Marcadores marcadores={this.state.marcadores} />
      
      </MapContainer>

    );
  }
}

export default App;
