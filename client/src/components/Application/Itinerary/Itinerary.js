import React, { Component } from 'react'
import { Container, Row, Col, Table, ButtonGroup, ButtonToolbar } from 'reactstrap'
import { CustomInput, FormGroup } from 'reactstrap';
import { Button } from 'reactstrap'
import { Form, Label, Input,} from 'reactstrap'
import { sendServerRequestWithBody } from '../../../api/restfulAPI'
import Pane from '../Pane';
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import {Map, Marker, Popup, TileLayer,Polyline} from "react-leaflet";
import { FaSearchLocation, FaFileDownload, FaFileUpload, FaAngleUp, FaAngleDown, FaTimes, FaMapMarkerAlt,
    FaSyncAlt, FaEraser, FaTrash } from 'react-icons/fa';


export default class Itinerary extends Component{
    constructor(props){
        super(props);
        this.updateField= this.updateField.bind(this);
        this.createItinerary = this.createItinerary.bind(this);
        //this.createFileInput= this.createFileInput.bind(this);
        this.createInputField = this.createInputField.bind(this);
        this.saveFile = this.saveFile.bind(this);
        this.deleteLocations = this.deleteLocations.bind(this);
        this.callInputField = this.callInputField.bind(this);
        this.state = {
            origin: {latitude: '', longitude: ''},
            destination: {latitude: '', longitude: ''},
            options:{title: '',earthRadius: '3958.8'},
            places:[],
            distances: [],
            filename: 'Upload File',
            match: {matcher: ''},
            itineraryPlaces: [],
            toggleSwitch: [],
            limit: 10

        }
    }
    render(){
        console.log(this.state)
        return (
            <Container>
                <Row>
                    <Col>{this.renderMap()}</Col>
                </Row>
                <Row>
                    <Col>
                        {this.renderItinTable()}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.renderSearchTable()}
                    </Col>
                </Row>
            </Container>
        );
    }
    renderItinTable(){
        return (
            <Pane header={"Itinerary"}>
                <ButtonGroup>
                    <Button
                        style={{ backgroundColor: "#1E4D2B" }}
                        onClick={this.reversePlaces.bind(this)}>
                        <FaSyncAlt/>
                    </Button>
                    <Button color="danger"
                            onClick={this.deleteLocations}>
                        <FaTrash/>
                    </Button>
                    <Button color="primary"
                            onClick={this.removeMarkers.bind(this)}>
                        <FaEraser/>
                    </Button>
                </ButtonGroup>
                <ButtonGroup className="float-right">
                        <Label for="itinerary"></Label>
                        <Button style={{ backgroundColor: "#1E4D2B" }}
                                onClick={this.callInputField}
                        >
                            <FaFileUpload />
                    </Button>
                    <input type="file" id ="itinerary" name="filename" label={this.state.filename}
                           style={{display: "none"}} onChange={this.updateField}/>
                    <Button style={{ backgroundColor: "#1E4D2B" }}
                            onClick={this.saveFile}>
                        <FaFileDownload />
                    </Button>
                </ButtonGroup>
                <Table responsive={true} hover={true}>
                    <thead>
                    <tr>
                        <th>Destination</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Distance</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody> {this.retrieveItinTableInfo()}</tbody>
                </Table>
            </Pane>
        )
    }
    renderSearchTable(){
        return (
            <Pane header={"Add locations to itinerary"}>
                <Form inline onSubmit={this.preventRefresh.bind(this)}>
                    <ButtonGroup>
                        {this.createInputField('match','matcher')}
                        <Button style={{ backgroundColor: "#1E4D2B" }} onClick={this.sendFindRequest.bind(this)}>
                            <FaSearchLocation />
                        </Button>
                    </ButtonGroup>
                </Form>
            <Table responsive={true}>
                <thead>
                <tr>
                    <th>Destination</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {this.retrieveSearchTableInfo()}
                </tbody>
            </Table>
        </Pane>
        )
    }

    renderMap() {
        return (
            <div>
                {this.renderLeafletMap()}
            </div>
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
            <Map center={this.csuOvalGeographicCoordinates()} zoom={2}
                 style={{height: 500, maxwidth: 700}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                           attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"/>
                {this.coords()}
                <Polyline color= "black"  positions = {points} />
            </Map>
        )
    }

    retrieveSearchTableInfo(){
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
                <td>
                    <ButtonGroup>
                        <Button size={"sm"} style={{ backgroundColor: "#1E4D2B" }}
                                onClick={(event) => {this.addToItinerary(i);}}> Add </Button>
                </ButtonGroup>
                </td>
            </tr>);
            table.push(cell);
        }
        return table;
    }

    addToItinerary(index){
        console.log("In addToItinerary, itineraryPlaces before:", this.state.itineraryPlaces)
        this.state.itineraryPlaces.push(this.state.places[index])
        console.log("After adding", this.state.itineraryPlaces)
        this.createItinerary(null)
    }
    retrieveItinTableInfo(){
        var table = [];
        var total = 0;
        for(let i = 0; i < this.state.itineraryPlaces.length; i++){
            let cell = [];
            total += this.state.distances[i];
            cell.push(
                <tr>
                    <td>{this.state.itineraryPlaces[i]["name"]}</td>
                    <td>{this.state.itineraryPlaces[i]["latitude"]}</td>
                    <td>{this.state.itineraryPlaces[i]["longitude"]}</td>
                    <td>{this.state.distances[i]}</td>
                    <td>
                        <ButtonGroup>
                            <Button size={"sm"} style={{ backgroundColor: "#1E4D2B" }}
                                    onClick={(event) => {this.moveUP(i);}}> <FaAngleUp/> </Button>
                            <Button size={"sm"} style={{ backgroundColor: "#1E4D2B" }}
                                    onClick={(event) => {this.moveDown(i);}}> <FaAngleDown/> </Button>
                            <Button size={"sm"} color={"danger"} onClick={(event) => {this.deleteClicked(i);}}> <FaTimes/> </Button>
                            <Button size={"sm"} color={"primary"} onClick={(event) => {this.toggleMarker(i);}}> <FaMapMarkerAlt/> </Button>
                        </ButtonGroup>
                    </td>
                </tr>);
            table.push(cell);
        }
        return table;
    }
    createItinerary(event){

        if(event !== null){event.preventDefault();}
        console.warn(this.state.itineraryPlaces)
        const tipItineraryRequest = {
            'requestType': 'itinerary',
            'requestVersion':5,
            'options':this.state.options,
            'places': this.state.itineraryPlaces,

    }
        tipItineraryRequest.options.earthRadius = this.props.options.units[this.props.options.activeUnit].toString();
        sendServerRequestWithBody('itinerary',tipItineraryRequest, this.props.settings.serverPort)
            .then((response) => {
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    this.setState({
                        options: response.body.options,
                        itineraryPlaces: response.body.places,
                        distances: response.body.distances
                    });
                }
            });
    }

    sendFindRequest(){
        const tipFindRequest = {
            'requestType': 'find',
            'requestVersion':5,
            'limit' : this.state.limit,
            'match': this.state.match.matcher,
            'narrow': []
        }
        sendServerRequestWithBody('find', tipFindRequest,this.props.settings.serverPort)
            .then((response) => {
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    this.setState({
                        places: response.body.places,
                    });
                }
                if (this.state.places.length !== 0) {
                    this.createItinerary(null);
                }
            });

    }

    coloradoGeographicBoundaries() {
        // northwest and southeast corners of the state of Colorado
        return L.latLngBounds(L.latLng(41, -109), L.latLng(37, -102));
    }

    csuOvalGeographicCoordinates() {
        return L.latLng(31.7, -42.080773);
    }

    coords(){
        return this.state.itineraryPlaces.map(function(p,i){
            var pos;
            pos = L.latLng(p.latitude,p.longitude);
            if(this.state.toggleSwitch[i]){
            return(
                <Marker position={pos}
                        icon={this.markerIcon()}>
                    <Popup className="font-weight-extrabold">{this.state.itineraryPlaces[i].name}</Popup>
                </Marker>
            );
            }
            else return null;
        }.bind(this));
    }

    markerIcon(){
        // react-leaflet does not currently handle default marker icons correctly,
        // so we must create our own
        return L.icon({
            iconUrl: icon,
            shadowUrl: iconShadow,
            iconAnchor: [12,40]  // for proper placement
        })
    }

    preventRefresh(e) {
        e.preventDefault()
        this.sendFindRequest()
    }

    callInputField(event) {
        event.preventDefault()
        var a = document.getElementById("itinerary")
        a.click()
    }

    createInputField(stateVar, coordinate) {
        let updateStateVarOnChange = (event) => {
            this.updateLocationOnChange(stateVar, event.target.name, event.target.value)
        };

        let capitalizedCoordinate = coordinate.charAt(0).toUpperCase() + coordinate.slice(1);
        return (
            <Input name={coordinate} placeholder={'Add Location'}
                   id={`${stateVar}${capitalizedCoordinate}`}
                   value={this.state[stateVar][coordinate]}
                   onChange={updateStateVarOnChange}
                   style={{width: "100%"}}/>
        );
    }

    updateField(event) {
        var file = event.target.files[0];
        console.log("asdasd", file)
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
        var points= [];
        if(this.state.itineraryPlaces.length === 0){
            return points
        }
        var length = this.state.itineraryPlaces.length;
        for(var i = 0;  i<length+1; i++){
            points[i] =[this.state.itineraryPlaces[i % length].latitude,this.state.itineraryPlaces[i % length].longitude];
        }
        return points;
    }
    moveDown(index){
        let swappedPlaces = [];
        if(index !== this.state.itineraryPlaces.length -1) {
            let temp = this.state.itineraryPlaces[index];
            this.state.itineraryPlaces[index] = this.state.itineraryPlaces[index + 1];
            this.state.itineraryPlaces[index + 1] = temp;
            swappedPlaces = this.state.itineraryPlaces;
            this.setState({itineraryPlaces:swappedPlaces});
            this.createItinerary(null);
        }
    }

    moveUP(index){
        let swappedPlaces = [];
        if(index !== 0) {
            let temp = this.state.itineraryPlaces[index - 1];
            this.state.itineraryPlaces[index - 1] = this.state.itineraryPlaces[index]
            this.state.itineraryPlaces[index] = temp;
            swappedPlaces = this.state.itineraryPlaces;
            this.setState({itineraryPlaces: swappedPlaces});
            this.createItinerary(null);
        }
    }
    
    deleteClicked(index){
        this.state.itineraryPlaces.splice(index,1);
        let deletedList = this.state.itineraryPlaces;
        this.setState({itineraryPlaces: deletedList});
        if(this.state.itineraryPlaces.length !== 0)
            this.createItinerary(null);
    }

    reversePlaces(e) {
        e.preventDefault();
        let tempPlacesArray = [];
        if(this.state.itineraryPlaces.length > 2) {
            tempPlacesArray.push(this.state.itineraryPlaces[0]);
            var j = 1;
            for(var i = this.state.itineraryPlaces.length-1; i > 0; i--) {
                tempPlacesArray.push(this.state.itineraryPlaces[i]);
                j++
            }
            this.setState({ itineraryPlaces: tempPlacesArray })
        } else if(this.state.itineraryPlaces.length === 2) {
            tempPlacesArray.push(this.state.itineraryPlaces[1])
            tempPlacesArray.push(this.state.itineraryPlaces[0])
            this.setState({ itineraryPlaces: tempPlacesArray })
        }
    }

    deleteLocations(e) {
        e.preventDefault();
        delete(this.state.itineraryPlaces);
        this.setState({itineraryPlaces:[]})
    }
    toggleMarker(index){
        var toggle = [];
        toggle = this.state.toggleSwitch;
        if(this.state.toggleSwitch.length === 0)
            toggle[index] = true;


        else if(this.state.toggleSwitch[index])
            toggle[index] = false;


        else  toggle[index] = true;


        this.setState({toggleSwitch: toggle})
    }
    removeMarkers(){
        var removalList = [];
        console.warn(removalList);
        for(var i =0; i< this.state.itineraryPlaces.length; i++){
            removalList[i] = false
        }
        this.setState({toggleSwitch: removalList})
    }

}