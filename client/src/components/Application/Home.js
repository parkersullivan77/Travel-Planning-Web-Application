import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { Map, Marker, Popup, TileLayer} from 'react-leaflet';
import Pane from './Pane'

/*
 * Renders the home page.
 */
export default class Home extends Component {

  constructor(props){
    super(props);

    this.getLocation = this.getLocation.bind(this);
    this.currentLocation = this.currentLocation.bind(this);
    this.state = {pos: null};
  }

  render() {
    return (
        <Container>
          <Row>
            <Col xs={12} sm={12} md={7} lg={8} xl={9}>
              {this.renderMap()}
            </Col>
            <Col xs={12} sm={12} md={5} lg={4} xl={3}>
              {this.renderIntro()}
            </Col>
          </Row>
        </Container>
    );
  }

  renderMap() {
    return (
        <Pane header={'Where Am I?'}>
          {this.renderLeafletMap()}
        </Pane>
    );
  }

  renderLeafletMap() {
    // initial map placement can use either of these approaches:
    // 1: bounds={this.coloradoGeographicBoundaries()}
    // 2: center={this.csuOvalGeographicCoordinates()} zoom={10}

    this.currentLocation();
    if(this.state.pos == null){this.setState({pos: this.csuOvalGeographicCoordinates()});}
    return (
        <Map center={this.state.pos} zoom={10}
             style={{height: 500, maxwidth: 700}}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <Marker position={this.state.pos}
                  icon={this.markerIcon()}>
            <Popup className="font-weight-extrabold">Colorado State University</Popup>
          </Marker>
        </Map>
    )
  }

  renderIntro() {
    return(
        <Pane header={'Bon Voyage!'}
              bodyJSX={'Let us help you plan your next trip.'}/>
    );
  }

  csuOvalGeographicCoordinates() {
    return L.latLng(40.576179, -105.080773);
  }

  getLocation(location){
    let latlong = new L.latLng(
        location.coords.latitude,
        location.coords.longitude);
    this.setState({pos: latlong});
  }

  currentLocation(){
    navigator.geolocation.getCurrentPosition(this.getLocation)
  }

  markerIcon() {
    // react-leaflet does not currently handle default marker icons correctly,
    // so we must create our own
    return L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconAnchor: [12,40]  // for proper placement
    })
  }
}
