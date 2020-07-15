import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import React from 'react';
import Infections from './Infections.react';
import Country from './Country.react'
import CountriesList from './CountriesList.react'

import { shallow, mount, render } from 'enzyme';

//Block console.log
beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => { });
});

//Simple unit tests
test('Country shows country title 1', () => {
    const wrapper = shallow(<Country item={{ Slug: 'mexico', Country: 'Mexico' }} />);
    expect(wrapper.text()).toEqual('Mexico');
});

test('Country shows country title 2', () => {
    const wrapper = shallow(<Country item={{ Slug: 'china', Country: 'China' }} />);
    expect(wrapper.text()).toEqual('China');
});

test('Country list shows at least one of class country', () => {
    const wrapper = mount(<CountriesList countries={[{ Slug: 'china', Country: 'China' }, { Slug: 'mexico', Country: 'Mexico' }]} />);
    expect(wrapper.find('.country')).toExist();
    wrapper.unmount();
});

test('Country list shows text for a country', () => {
    const wrapper = mount(<CountriesList countries={[{ Slug: 'china', Country: 'China' }, { Slug: 'mexico', Country: 'Mexico' }]} />);
    expect(wrapper).toIncludeText('Mexico');
    wrapper.unmount();
});

test('Country list shows text for a country 2', () => {
    const wrapper = mount(<CountriesList countries={[{ Slug: 'china', Country: 'China' }, { Slug: 'mexico', Country: 'Mexico' }]} />);
    expect(wrapper).toIncludeText('China');
    wrapper.unmount();
});

test('Clicking country calls prop method', () => {
    const clickFn = jest.fn();
    const wrapper = mount(<Country item={{ Slug: 'mexico', Country: 'Mexico' }} onGetStats={clickFn} />);

    wrapper.find('button')
        .simulate('click');
    expect(clickFn).toHaveBeenCalled();

    wrapper.unmount();
});

// test('Country list contains country from API', () => {

//     let getMock;

//     const response = [{"Country":"Mexico","Slug":"mexico","ISO2":"MX"},{"Country":"Niger","Slug":"niger","ISO2":"NE"},{"Country":"Bermuda","Slug":"bermuda","ISO2":"BM"},{"Country":"Dominican Republic","Slug":"dominican-republic","ISO2":"DO"},{"Country":"France","Slug":"france","ISO2":"FR"},{"Country":"Italy","Slug":"italy","ISO2":"IT"},{"Country":"Gabon","Slug":"gabon","ISO2":"GA"}]
//     getMock = jest.spyOn(axios, 'get');
//     getMock.mockResolvedValue({ data: response });

//     // axios.get.mockResolvedValue(response);

//     const wrapper = mount(<Infections />);

//     console.log(wrapper.html());
// });
