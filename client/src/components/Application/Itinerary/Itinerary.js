import React, { Component } from 'react'
import { Container, Row, Col, Table, ButtonGroup } from 'reactstrap'
import { CustomInput, FormGroup } from 'reactstrap';
import { Button } from 'reactstrap'
import { Form, Label, Input,} from 'reactstrap'
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
        this.saveFile = this.saveFile.bind(this);
        this.deleteLocations = this.deleteLocations.bind(this);
        this.state = {
            origin: {latitude: '', longitude: ''},
            destination: {latitude: '', longitude: ''},
            options:{title: '',earthRadius: ' '},
            places:[{id: '0', name:'', latitude: '0',longitude: '0'}],
            distances: [],
            filename: 'Upload File',
            match: {matcher: ''}
        }
    }

    render(){
        console.log(this.state)
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
                        {this.createForm('match')}
                    </Col>
                    <Col xs={12} sm={12} md={7} lg={6} xl={8}>
                        {this.renderMap()}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        {this.renderTable()}
                    </Col>
                </Row>
            </Container>
        );
    }

    retrieveTableInfo(){
        var table = [];
        var total = 0;
        for(let i = 0; i < this.state.places.length; i++){
            let cell = [];
            total += this.state.distances[i];
            cell.push(
                <tr>
                <td>{this.state.places[i]["name"]}</td>
                <td>{this.state.places[i]["latitude"]}</td>
                <td>{this.state.places[i]["longitude"]}</td>
                <td>{this.state.distances[i]}</td>
                <td>
                    <ButtonGroup>
                        <Button> \/</Button>
                        <Button> /\ </Button>
                        <Button>  X </Button>
                </ButtonGroup>
                </td>
            </tr>);
            table.push(cell);
        }
        return table;
    }

    renderTable(){
        console.log("CALLED RENDERTABLE")
        return (
            <Pane header={"Get a good look at this trip"}>
                <Button
                    onClick={this.reversePlaces.bind(this)}>
                    Reverse
                </Button>
                <Button color="danger"
                    onClick={this.deleteLocations}>
                    Remove All
                </Button>
            <Table>
                <thead>
                    <tr>
                        <th>Destination</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Distance</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                {this.retrieveTableInfo()}
                </tbody>
            </Table>
            </Pane>
        )
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
        var points = [];
        if(this.state.places.length !== 0){
            points = this.getPositions();
        }
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
            <Pane header={'Load In Your Itinerary'}>
                <Form onSubmit= {this.deleteLocations.bind(this)}>
                    <FormGroup>
                        <Label for="itinerary">File Browser</Label>
                        <CustomInput onChange = {this.updateField} type="file" id ="itinerary" name="filename" label={this.state.filename} />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            type ="submit">
                            Download
                        </Button>
                    </FormGroup>
                </Form>
            </Pane>
        )
    }


    createHeader() {
        return (
            <Pane header={'Itinerary'}>
            <div>
                <b>Plan your Trip Boyyyysss</b>
            </div>
            </Pane>
        );
    }


    createInputField(stateVar, coordinate) {
        let updateStateVarOnChange = (event) => {
            this.updateLocationOnChange(stateVar, event.target.name, event.target.value)
        };

        let capitalizedCoordinate = coordinate.charAt(0).toUpperCase() + coordinate.slice(1);
        return (
            <Input name={coordinate} placeholder={'Location'}
                   id={`${stateVar}${capitalizedCoordinate}`}
                   value={this.state[stateVar][coordinate]}
                   onChange={updateStateVarOnChange}
                   style={{width: "100%"}}/>
        );
    }
    createForm(stateVar) {
        return (
            <Pane header={'Type a Location'}>
                <Form >
                    <label> <b>Add Location</b></label>
                    <FormGroup>
                        {this.createInputField(stateVar,'matcher')}
                        {console.log(this.state.places)}
                    </FormGroup>
                    <Button onClick={this.sendFindRequest.bind(this)}>
                        Search
                    </Button>
                </Form>
            </Pane>
            );
    }
    updateField(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        const scope = this;

        reader.onload = function(e) {
            var parsed = JSON.parse(e.target.result);
            scope.setState(parsed);
            scope.createItinerary(e);

        }
        this.setState({filename: event.target.files[0].name})
        reader.readAsText(file);
    }

    createItinerary(event){
        event.preventDefault();
        const tipItineraryRequest = {
            'type': 'itinerary',
            'version':3,
            'options':this.state.options,
            'places': this.state.places,
            'earthRadius' : this.props.options.units[this.props.options.activeUnit]
        }
        console.warn(this.props.options.units[this.props.options.activeUnit]);

        sendServerRequestWithBody('itinerary',tipItineraryRequest, this.props.settings.serverPort)
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

    saveFile(event) {
        event.preventDefault();
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        var fileName = this.state.filename;
        var data = this.state;
        delete(data["filename"]);
        delete(data["origin"]);
        delete(data["destination"]);

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
        this.setState({[stateVar]: location});
    }
    getPositions(){
        var length = this.state.places.length;
        var points= []
        for(var i = 0;  i<length+1; i++){
            points[i] =[this.state.places[i % length].latitude,this.state.places[i % length].longitude];
        }


        return points;
    }

    deleteLocation(){
        this.state.places.splice(0, 1);
        this.setState(this.state);
    }

    deleteLocations(e) {
        e.preventDefault()
        delete(this.state.places);
        this.setState({places:{id: '0', name:'', latitude: '0',longitude: '0'}})
    }

    reversePlaces(e) {
        e.preventDefault()
        let tempPlacesArray = []
        if(this.state.places.length > 2) {
            tempPlacesArray.push(this.state.places[0])
            var j = 1
            for(var i = this.state.places.length-1; i > 0; i--) {
                tempPlacesArray.push(this.state.places[i])
                j++
            }
        }
        this.setState({ places: tempPlacesArray })
    }

    sendFindRequest(){
        const tipFindRequest = {
            'requestType': 'find',
            'requestVersion':3,
            'limit' : 1,
            'match': this.state.match.matcher
        }
        console.log("hello:")
        console.log(this.state)
        sendServerRequestWithBody('find', tipFindRequest,this.props.settings.serverPort)
            .then((response) => {
            if (response.statusCode >= 200 && response.statusCode <= 299) {
                this.setState({
                    places: response.body.places
                });
            }
        });
    }

}