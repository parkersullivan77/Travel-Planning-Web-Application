import React, { Component } from 'react'
import { Container, Row, Col, Table } from 'reactstrap'
import { CustomInput, FormGroup } from 'reactstrap';
import { Button } from 'reactstrap'
import { Form, Label, Input } from 'reactstrap'
import { sendServerRequestWithBody } from '../../../api/restfulAPI'
import Pane from '../Pane';
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";


export default class Itinerary extends Component{
    constructor(props){
        super(props);

        this.updateField= this.updateField.bind(this);
        this.createItinerary = this.createItinerary.bind(this);
        this.createFileInput= this.createFileInput.bind(this);
        this.createInputField = this.createInputField.bind(this);

        this.state = {
            origin: {latitude: '', longitude: ''},
            destination: {latitude: '', longitude: ''},
            options:{title: '',earthRadius: ' '},
            places:{id: '', name:'', latitude: '',longitude: ''},
            distances: [],
            filename:' Upload File'
        }

    }


    render(){
        console.log(this.state);
        return (
            <Container>
                <Row>
                    <Col>
                        {this.createHeader()}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={7} lg={6} xl={4}>
                        {this.createFileInput()}
                        {this.createForm('origin','destination')}
                    </Col>
                    <Col xs={12} sm={12} md={7} lg={6} xl={8}>
                        {this.renderMap()}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={7} lg={6} xl={12}>
                        {this.renderTable()}
                    </Col>
                </Row>
            </Container>
        );
    }

   // renderTable(){
   //      const places = this.state.places;
   //      const distances = this.state.distances;
   //
   //      let retArray = "<br><h2>this.state.option</h2>"
   // }

    retrieveTableInfo(){
        var table = [];
        var total = 0;
        for(let i = 0; i < this.state.places.length; i++){
            let cell = [];
            total += this.state.distances[i];
            cell.push(<tr><td>{this.state.places[i]["name"]}</td><td>{this.state.places[i]["latitude"]}</td><td>{this.state.places[i]["longitude"]}</td><td>{this.state.distances[i]}</td></tr>);
            table.push(cell);
        }
        return table;
    }

    renderTable(){
        return (
            <Pane header={"Get a good look at this trip"}
                  bodyJSX={
                        <Table>
                            <thead>
                            <tr>
                                <th>Destination</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Distance</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.retrieveTableInfo()}
                            </tbody>
                        </Table>
                  }/>
        )
    }
    renderMap() {
        return (
            <Pane header={'Where Am I?'}
                  bodyJSX={this.renderLeafletMap()}/>
        );
    }

    renderLeafletMap() {
        // initial map placement can use either of these approaches:
        // 1: bounds={this.coloradoGeographicBoundaries()}
        // 2: center={this.csuOvalGeographicCoordinates()} zoom={10}
        return (
            <Map center={this.csuOvalGeographicCoordinates()} zoom={10}
                 style={{height: 500, maxwidth: 700}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                           attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={this.csuOvalGeographicCoordinates()}
                        icon={this.markerIcon()}>
                    <Popup className="font-weight-extrabold">Colorado State University</Popup>
                </Marker>
            </Map>
        )
    }

    coloradoGeographicBoundaries() {
        // northwest and southeast corners of the state of Colorado
        return L.latLngBounds(L.latLng(41, -109), L.latLng(37, -102));
    }

    csuOvalGeographicCoordinates() {
        return L.latLng(40.576179, -105.080773);
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
    createFileInput (){
        return(
            <Pane header={'Load In Your Itinerary'}
                  bodyJSX={
                      <Form onSubmit= {this.createItinerary}>
                          <FormGroup>
                              <Label for="itinerary">File Browser</Label>
                              <CustomInput onChange = {this.updateField} type="file" id ="itinerary" name="filename" label={this.state.filename} />
                          </FormGroup>
                          <FormGroup>
                              <Button
                                  type ="submit">
                                  Upload
                              </Button>
                          </FormGroup>
                      </Form>
                  }/>
        )
    }


    createHeader() {
        return (
            <Pane header={'Itinerary'}
                  bodyJSX={<div><b>Plan your Trip Boyyyysss</b></div>}/>
        );
    }


    createInputField(stateVar, coordinate) {
        let updateStateVarOnChange = (event) => {
            this.updateLocationOnChange(stateVar, event.target.name, event.target.value)
        };

        let capitalizedCoordinate = coordinate.charAt(0).toUpperCase() + coordinate.slice(1);
        return (
            <Input name={coordinate} placeholder={capitalizedCoordinate}
                   id={`${stateVar}${capitalizedCoordinate}`}
                   value={this.state[stateVar][coordinate]}
                   onChange={updateStateVarOnChange}
                   style={{width: "100%"}}/>
        );
    }
    createForm(stateVar,stateVar2) {
        return (
            <Pane header={'Type a Trip'}
                  bodyJSX={
                      <Form >
                          <label> <b>Start Location</b></label>
                          <FormGroup>
                          {this.createInputField(stateVar, 'latitude')}
                          {this.createInputField(stateVar, 'longitude')}
                          </FormGroup>
                          <label> <b>Finish Location</b></label>
                          <FormGroup>
                          {this.createInputField(stateVar2, 'latitude')}
                          {this.createInputField(stateVar2, 'longitude')}
                          </FormGroup>
                      </Form>
                  }
            />);
    }

    updateField(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        const scope = this;

        reader.onload = function(e) {
            var parsed = JSON.parse(e.target.result);
            scope.setState(parsed);
            console.log(parsed);
        }
        this.setState({filename: event.target.files[0].name})

        reader.readAsText(file);
    }

    createItinerary(event){
        event.preventDefault();
        //var filename = event.target.files[0].name;
        const tipConfigRequest = {
            'type': 'itinerary',
            'version':2,
            'options':this.state.options,
            'places': this.state.places
        }

        sendServerRequestWithBody('itinerary',tipConfigRequest, this.props.settings.serverPort)
            .then((response) => {
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    this.setState({
                        options: response.body.options,
                        places: response.body.places,
                        distances: response.body.distances
                    });
                }
            });
    }
    updateLocationOnChange(stateVar, field, value) {
        let location = Object.assign({}, this.state[stateVar]);
        location[field] = value;
        this.setState({[stateVar]: location});
    }
}