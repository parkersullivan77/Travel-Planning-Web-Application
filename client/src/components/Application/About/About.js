import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button } from 'reactstrap'
import { Form, Label, Input } from 'reactstrap'
import { sendServerRequestWithBody } from '../../../api/restfulAPI'
import Pane from '../Pane';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';



import dziugas from'./resources/Dziugas.jpg'
import westin from './resources/westin.jpg'
import kareem from './resources/Kareem1.jpg'
import parker from './resources/parker.jpg'

export default class About extends Component {
    constructor(props) {
        super(props);
        /*this.state = {
            bio: {parker: "My name is Parker Sullivan and I am a currently a CS major at Colorado State University. I like long walks on the beach and candlelit dinners."
                ,kareem: "I'm a senior CS student at Colorado State University. Interests: VR and cloud computing"
                ,westin: "I'm a third year computer science major with a minor (and love) for mathematics. I'm particularly interested in security, but in my free time I enjoy picking up games of volleyball and watching movies."
                ,dziugas: "I am a second year computer science student, meme connoisseur, aspiring entrepreneur."},

            name: {parker: "Parker Sullivan",kareem: "Kareem Youssef", dziugas: "Dziugas Butkus", westin: "Westin Musser"},

            img: {parker:"./resources/parker.jpg",kareem: "https://imgur.com/a/mhnXq55", dziugas: "https://imgur.com/a/tUzALTA", westin: "https://imgur.com/a/edEWksR"}

        }*/
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col >
                        {this.createHeader()}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.createParker()}

                    </Col>
                    <Col>
                        {this.createWestin()}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.createKareem()}
                    </Col>
                    <Col>
                        {this.createDziugas()}
                    </Col>

                </Row>



            </Container>
        );
    }

    createHeader() {
        return (
            <Pane header={'About'}
                  bodyJSX={<div>About <b>We Them Boys</b> page.</div>}/>
        );
    }

    /*createCard(name){
        return (
            <div>
                <Card>
                    <div className="container">
                        <img   src = {this.state.img[name]}/>
                    </div>
                    <CardBody>
                        <CardTitle>{this.state.name[name]}</CardTitle>
                        <CardText>{this.state.bio[name]}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    };*/
    createParker(){
        return (
            <div>
                <Card>
                    <div className="container">
                        <img  src={parker} />
                    </div>
                    <CardBody>
                        <CardTitle>Parker Sullivan</CardTitle>
                        <CardText>My name is Parker Sullivan and I am a currently a CS major at Colorado State University. I like long walks on the beach and candlelit dinners.</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    };
    createDziugas(){
        return (
            <div>
                <Card>
                    <div className="container">
                        <img  src={dziugas} />
                    </div>
                    <CardBody>
                        <CardTitle>Dziugas Butkus</CardTitle>
                        <CardText>I am a second year computer science student, meme connoisseur, aspiring entrepreneur.</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    };
    createWestin(){
        return (
            <div>
                <Card>
                    <div className="container">
                        <img  src={westin} />
                    </div>
                    <CardBody>
                        <CardTitle>Westin Musser</CardTitle>
                        <CardText> I'm a third year computer science major with a minor (and love) for mathematics. I'm particularly interested in security, but in my free time I enjoy picking up games of volleyball and watching movies. </CardText>
                    </CardBody>
                </Card>
            </div>
        );
    };
    createKareem() {
        return (
            <div>
                <Card>
                    <div className="container">
                        <img src={kareem}/>
                    </div>
                    <CardBody>
                        <CardTitle>Kareem Youssef</CardTitle>
                        <CardText> I'm a senior CS student at Colorado State University. Interests: VR and cloud
                            computing</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

}