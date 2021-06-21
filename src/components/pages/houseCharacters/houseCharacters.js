import React, {Component} from 'react';
import RowBlock from '../../rowBlock/rowBlock';
import ItemList from '../../itemList/itemList';
import ItemDetails, { Field } from '../../itemDetails/itemDetails';
import ErrorMasagge from '../../errorMassage/errorMassage';
import './houseCharacters.scss';
import gotService from '../../../services/gotServices';

export default class HouseCharacters extends Component {
  gotService = new gotService();

    state = {
      houseId: 41,
      error: false
    }

    componentDidCatch() {
      this.setState({error: true});
    }


    onClickCharacterUpdate = (id) => {
        this.setState({
          houseId: id
        }
      )}
    render() {
      const itemList = (
          <ItemList
            getData={this.gotService.getAllHouses }
            renderItem = {(item) => `${item.name} (${item.words})`}
            onClickCharacterUpdate={this.onClickCharacterUpdate}/>
        )

      if (this.state.error) {
        return <ErrorMasagge/>;
      }
      const itemDetails = (
        <ItemDetails  itemId = {this.state.houseId}
          getData={this.gotService.getHouse}>
          <Field label="Region" field='region'/>
          <Field label="Words" field='words'/>
          <Field label="Titles" field='titles'/>
          <Field label="AncestralWeapons" field='ancestralWeapons'/>
        </ItemDetails>
        )
        return (
          <RowBlock left={itemList} right={itemDetails}/>
    );
  }
};
