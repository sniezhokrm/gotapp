import React, {Component} from 'react';
import ItemList from '../../itemList/itemList';
import ErrorMasagge from '../../errorMassage/errorMassage';
import './bookCharacters.scss';
import gotService from '../../../services/gotServices';

export default class BookCharacters extends Component {
  gotService = new gotService();

    state = {
      itemId: 1,
      error: false
    }

    componentDidCatch() {
      this.setState({error: true});
    }


    onClickCharacterUpdate = (id) => {
        this.setState({
          itemId: id
        }
      )}
    render() {

      if (this.state.error) {
        return <ErrorMasagge/>;
      }
        return (
            <ItemList
              getData={this.gotService.getAllBooks }
              renderItem = {(item) => `${item.name} (${item.publisher})`}
              onClickCharacterUpdate={(itemId) => {
                this.props.history.push(itemId)
              }}/>
        )

  }
};
