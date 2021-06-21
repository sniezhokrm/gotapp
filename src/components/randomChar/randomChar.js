import React, {Component} from 'react';
import Spinner from '../../spinner/spinner';
import './randomChar.css';
import GotService from '../../services/gotServices';
import ErrorMasage from '../errorMassage/errorMassage'

export default class RandomChar extends Component {

    gotService = new GotService();
    state = {
      char: {},
      loading: true,
      error: false
    }
    componentDidMount(){
      this.uperChar();
      this.timerID = setInterval(this.uperChar, 2000);
    }
    componentWillUnmount(){
      clearInterval(this.timerID);
    }
    onCharLoaded=(char) => {
      this.setState({
        char,
        loading: false
      })
    }
    onError=(err) => {
      this.setState({
        loading: false,
        error: true
      })
    }
    uperChar = () => {
      const id = Math.floor(Math.random() * 999 + 25)
      this.gotService.getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError);
    }
      render() {
        const {idCharDetail, randomCharOnToggleHide} = this.props;
        let tittleBtn = "Show";
          if (!idCharDetail) {
            tittleBtn = "Hide";
            }
        const {char, loading, error} = this.state;
        const errorMassage = error  ? <ErrorMasage/> : null;
        const loadingMassage = loading ? <Spinner/> : null;
        const content = !(loading || error || idCharDetail)? <View idCharDetail={idCharDetail} randomCharOnToggleHide={randomCharOnToggleHide} char={char}/> : null;

        return (
            <div className="random-block rounded">
              {errorMassage}
              {loadingMassage}
              {content}
              <button className="list-group-item-btn" onClick={randomCharOnToggleHide}>{tittleBtn}</button>
            </div>
        );
    }
}


const View = ({char}) => {
  const {name, gender, born, died, culture} = char;
  return (
    <>
    <h4>Random Character: {name}</h4>
    <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">Gender </span>
            <span>{gender}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">Born </span>
            <span>{born}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">Died </span>
            <span>{died}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">Culture </span>
            <span>{culture}</span>
        </li>
    </ul>
    </>
  )
}
