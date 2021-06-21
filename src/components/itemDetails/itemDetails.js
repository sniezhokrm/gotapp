import React, {Component} from 'react';
import './itemDetails.css';
import Spinner from '../../spinner/spinner';
import ErrorMasagge from '../errorMassage/errorMassage';
import GotService from '../../services/gotServices';

export const Field = ({item, label, field}) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
        <span className="term">{label}</span>
        <span>{item[field]}</span>
    </li>
  )
}

export default class ItemDetails extends Component {
  gotService = new GotService();

  state = {
    item: null,
    loading: false,
    error: false
  }

    componentDidMount() {
        this.updateChar();

    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateChar();
        }
    }

    onCharDetailsLoaded = (item) => {
        this.setState({
            item,
            loading: false
        })
    }

    updateChar() {
        const {itemId, getData} = this.props;
        if (!itemId) {
            return;
        }

        this.setState({
            loading: true
        })

        getData(itemId)
            .then( this.onCharDetailsLoaded )
            .catch( () => this.onError())
    }

    onError(){
        this.setState({
            item: null,
            error: true
        })
    }

    render() {
      if (!this.state.item && this.state.error) {
          return <ErrorMasagge/>
      } else if (!this.state.item) {
          return <Spinner/>
      }
      const{item} = this.state;
      const {name} = item;


      if (this.state.loading) {
          return (
              <div className="char-details rounded">
                  <Spinner/>
              </div>
          )
      }

      return (
          <div className="char-details rounded">
              <h4>{name}</h4>
              <ul className="list-group list-group-flush">
             {
                React.Children.map(this.props.children, (child) => {
                  return React.cloneElement(child, {item})
                })
              }
              </ul>
          </div>
      );
  }
}
