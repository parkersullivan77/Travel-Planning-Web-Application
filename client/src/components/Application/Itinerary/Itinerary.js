import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { CustomInput, FormGroup } from 'reactstrap';
import { Button } from 'reactstrap'
import { Form, Label, Input } from 'reactstrap'
import { sendServerRequestWithBody } from '../../../api/restfulAPI'
import Pane from '../Pane';
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import {Map, Marker, Popup, TileLayer,Polyline} from "react-leaflet";
import Coordinates from "coordinate-parser";

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
            places:{id: '0', name:'a', latitude: '0',longitude: '0'},
            distances: [],
            filename: 'Upload File'
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
            </Container>
        );
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
        var points = [];
        if(this.state.places.length !== 0){
            console.log("in if statement");
            points = this.getPositions();
            console.log("after if statement");
        }
        console.log("points" + points);
        return (
            <Map center={this.csuOvalGeographicCoordinates()} zoom={10}
                 style={{height: 500, maxwidth: 700}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                           attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"/>
                <Marker position={this.csuOvalGeographicCoordinates()}
                        icon={this.markerIcon()}>
                    <Popup className="font-weight-extrabold">Colorado State University</Popup>
                </Marker>
                <Polyline color= "black"  positions = {points} />
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
                    this.saveFile();
                }
            });
    }

    saveFile() {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        var fileName = this.state.filename;
        var data = this.state;
        delete(data["filename"]);

        var json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    updateLocationOnChange(stateVar, field, value) {
        let location = Object.assign({}, this.state[stateVar]);
        location[field] = value;
        var position = new Coordinates('40:7:22.8N 74:7:22.8W');
        console.log("value",position.validate());
        if(position){
            this.setState({[stateVar]: location});
        }

    }
    getPositions(){
        console.log("in getPositions");

        var length = this.state.places.length;
        console.log("length: ",length);
        var points= []
        for(var i = 0;  i<length+1; i++){
            points[i] =[this.state.places[i % length].latitude,this.state.places[i % length].longitude];
            console.log("chicken" +points);
        }
        console.log("got points about to return");


        return points;
    }

}