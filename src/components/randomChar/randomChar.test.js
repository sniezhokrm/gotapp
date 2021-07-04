import React from 'react';
import RandomChar from './randomChar';
import {shallow} from 'enzyme';

describe('Testing RandomChar', () => {
  const char = shallow(<RandomChar/>);
  describe('Testing snap & state', () => {
    it('RandomChar have rendered corectly', () => {
      expect(char).toMatchSnapshot();
    });
    it('RandomChar state is empty object', () => {
      expect(char.state().char).toBeObject();
    });
    it('RandomChar state loading is true', () => {
      expect(char.state().loading).toBeTruthy();
    });
  });
  describe('Handlers tests', () => {
    it('testing onCharLoaded', () => {
      char.instance().onCharLoaded();
      expect(char.state().loading).toBeFalsy();
    });
    it('testing onError', () => {
      char.instance().onError();
      expect(char.state().loading).toBeFalsy();
      expect(char.state().error).toBeTruthy();
    });
      it('testing uperChar', () => {
        char.instance().uperChar();
        expect(char.state().loading).toBeFalsy();
      });
});
});
