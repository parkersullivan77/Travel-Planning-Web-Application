
// Note the name of this file has X.test.js. Jest looks for any files with this pattern.
import './enzyme.config.js'
import React from 'react'
import { shallow } from 'enzyme'        // <--- use this instead of mount
import About from '../src/components/Application/About/About.js'


function testValidInput() {
    const example = shallow(<About/>);
    let numberOfInputs = example.find('Input').length;
    expect(numberOfInputs).toEqual(1);
}

function testRenderMap() {
    const exampleComponent = shallow(<About/>);
    expect(exampleComponent.contains(<createHeader/>)).toEqual(false);
}



//test('Testing Number of inputs', testValidInput);
test('random',testRenderMap);
//test('random test',testRenderMap);
//test('Testing to see if createFileInput is rendered', testCreateHeaderExists);


