import React, {Component} from 'react';
import ItemDetails, { Field } from '../../../itemDetails/itemDetails';
import GotService from '../../../../services/gotServices';


export default class BookPage extends Component {
  gotService = new GotService();

    render() {

        return (
          <ItemDetails  itemId = {this.props.bookId}
            getData={this.gotService.getBook}>
            <Field label="NumberOfPages" field='numberOfPages'/>
            <Field label="Publisher" field='publisher'/>
            <Field label="Released" field='released'/>
          </ItemDetails>
    );
  }
};
