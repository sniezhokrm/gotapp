import React, {Component} from 'react';
import RowBlock from '../../rowBlock/rowBlock';
import ItemList from '../../itemList/itemList';
import ItemDetails, { Field } from '../../itemDetails/itemDetails';
import ErrorMasagge from '../../errorMassage/errorMassage';
import './charCharacters.scss';
import gotService from '../../../services/gotServices';

export default class CharCharacters extends Component {
  gotService = new gotService();

    state = {
      charId: 41,
      error: false
    }

    componentDidCatch() {
      this.setState({error: true});
    }


    onClickCharacterUpdate = (id) => {
        this.setState({
          charId: id
        }
      )}
    render() {
      const itemList = (
          <ItemList
            getData={this.gotService.getAllCharacters }
            renderItem = {(item) => `${item.name} (${item.gender})`}
            onClickCharacterUpdate={this.onClickCharacterUpdate}/>
        )

      if (this.state.error) {
        return <ErrorMasagge/>;
      }
      const itemDetails = (
        <ItemDetails  itemId = {this.state.charId}
          getData={this.gotService.getCharacter}>
          <Field label="Gender" field='gender'/>
          <Field label="Born" field='born'/>
          <Field label="Died" field='died'/>
          <Field label="Culture" field='culture'/>
        </ItemDetails>
        )
        return (
          <RowBlock left={itemList} right={itemDetails}/>
    );
  }
};
