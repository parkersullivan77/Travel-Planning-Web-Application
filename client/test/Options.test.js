import './enzyme.config.js'
import React from 'react'
import { shallow } from 'enzyme'
import Options from '../src/components/Application/Options/Options'
import Units from '../src/components/Application/Options/Units'
import Optimization from '../src/components/Application/Options/Optimization'

const startProperties = {
  'options': {
    'units': {'miles':3959, 'kilometers':6371},
    'optimization': {'none': 'none', 'short': 'short'},
    'activeUnit': 'miles'
  },
  'updateOption' : () => {}
};

function testUnitRender() {
  const options = shallow(<Options options={startProperties.options}
                                   config={null}
                                   updateOption={startProperties.updateOption}/>);

  expect(options.contains(<Units options={startProperties.options}
                                 activeUnit={startProperties.options.activeUnit}
                                 updateOption={startProperties.updateOption}/>)).toEqual(true);
}

test('Check to see if a Units component is rendered', testUnitRender);

function testOptRender() {
  const options = shallow(<Options options={startProperties.options}
                                   config={null}
                                   updateOption={startProperties.updateOption}/>);

  expect(options.contains(<Optimization options={startProperties.options}
                                 activeUnit={startProperties.options.activeUnit}
                                 updateOption={startProperties.updateOption}/>)).toEqual(true);
}

test('Check to see if an Optimization component is rendered', testOptRender);
