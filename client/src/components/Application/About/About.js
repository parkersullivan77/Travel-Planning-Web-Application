import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Pane from '../Pane';
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';



import dziugas from'./images/Dziugas.jpg'
import westin from './images/westin.jpg'
import kareem from './images/Kareem1.jpg'
import parker from './images/parker.jpg'

export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: {parker: "My name is Parker Sullivan and I am a currently a CS major at Colorado State University. I like long walks on the beach and candlelit dinners."
                ,kareem: "I'm a senior CS student at Colorado State University. Interests: VR and cloud computing"
                ,westin: "I'm a third year computer science major with a minor (and love) for mathematics. I'm particularly interested in security, but in my free time I enjoy picking up games of volleyball and watching movies."
                ,dziugas: "I am a second year computer science student, meme connoisseur, aspiring entrepreneur."},

            name: {parker: "Parker Sullivan",kareem: "Kareem Youssef", dziugas: "Dziugas Butkus", westin: "Westin Musser"},

            img: {parker:parker,kareem: kareem, dziugas: dziugas, westin: westin}

        }
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
                        {this.createCard('parker')}
                        {this.createCard('kareem')}
                    </Col>
                    <Col>
                        {this.createCard('westin')}
                        {this.createCard('dziugas')}
                    </Col>
                </Row>
            </Container>
        );
    }

    createHeader() {
        return (
            <Pane header={'About'}
                  bodyJSX={<div>About <b>We Them Boys</b> page.</div>}>
                Get to know the boys behind this tool
            </Pane>
        );
    }

    createCard(name){
        return (
                <Card color="light">
                    <CardImg src = {this.state.img[name]}/>
                    <CardBody>
                        <CardTitle>
                            <big> <b>{this.state.name[name]}</b></big>
                        </CardTitle>
                        <CardText>{this.state.bio[name]}</CardText>
                    </CardBody>
                </Card>
        );
    };


}