import React, { Component } from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import { Row, Col, Button, ButtonGroup } from 'reactstrap'

export default class Optimization extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        return(
            <Card className={'text-center'}>
                <CardHeader className={'bg-csu-gold text-white font-weight-semibold'}>Shorten Your Trip</CardHeader>
                <CardBody>
                    <ButtonGroup vertical className={'w100'}>
                        {this.renderOptButtons(Object.keys(this.props.options.optimization))}
                    </ButtonGroup>
                </CardBody>
            </Card>
        );
    }

    renderOptButtons(opts){
        return opts.sort().map((level) =>
            <Button
                className={'btn-csu w-100 text-left'}
                key={'button_'+level}
                active={this.props.activeUnit === level}
                value={level}
                onClick={(event) => this.props.updateOption('activeUnit', event.target.value)}
            >
                {level.charAt(0).toUpperCase() + level.slice(1)}
            </Button>
        );
    }
}