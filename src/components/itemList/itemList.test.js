import React from 'react';
import ItemList from './itemList';
import {mount} from 'enzyme';
import gotService from '../../services/gotServices';

describe('Testing ItemList', () => {
  const service = new gotService();
  const list = mount(<ItemList
                        getData={service.getAllCharacters}
                        renderItem={(name) => name}/>);
  describe('Testing snap & state', () => {
    it('Click on item list must rerender all list in 1 instanse', () => {
      list.setState({itemList: [{name: 'rrr', id: 1}, {name: 'nnn', id: 2}]})
      list.find('.list-group-item:first-child').simulate('click');
      expect(list.find('ul')).toHaveLength(1);
    });
});
});
