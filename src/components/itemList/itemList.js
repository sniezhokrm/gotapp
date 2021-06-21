import React, {Component} from 'react';
import Spinner from '../../spinner/spinner';
import ErrorMasagge from '../errorMassage/errorMassage';
import './itemList.css';
import gotService from '../../services/gotServices';


class ItemList extends Component {

    renderItems(arr) {
      return arr.map((item, i) => {
        const label = this.props.renderItem(item);
        const {id} = item;
        return (
          <li key={id}
            onClick={()=>this.props.onClickCharacterUpdate(id)}
            className="list-group-item">
              {label}
          </li>
        )
      })
    }

    render() {
      const {data,error} = this.props;
      if (error) {
        return <ErrorMasagge/>
      }
      const items = this.renderItems(data);
        return (
            <ul className="item-list list-group">
              {items}
            </ul>
        );
    }
}
const withData = (View, getData) => {
  return class extends Component {

        state = {
          idata: null,
          error: false
        }

        componentDidMount() {
          const {getData} = this.props;

            getData()
             .then( (data) => {
                 this.setState({
                     data
                 })
             })
            .catch(this.onError);
        }

        componentDidCatch() {
          this.setState({error: true});
        }


        onError=(err) => {
          this.setState({
            loading: false,
            error: true
          })
        }
    render () {
      if (!this.state.data) {
        return <Spinner/>
      }
      return <View {...this.props} data={this.state.data} error={this.state.error}/>
    }
  }
}
const {getAllCharacters} = new gotService();
export default withData(ItemList, getAllCharacters);
