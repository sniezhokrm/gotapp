import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharCharacters from '../pages/charCharacters/charCharacters';
import ErrorMasagge from '../errorMassage/errorMassage';
import gotService from '../../services/gotServices';
import HouseCharacters from '../pages/houseCharacters/houseCharacters';
import BookCharacters from '../pages/bookCharacters/bookCharacters';
import BookPage from '../pages/bookCharacters/bookPage/bookPade';
import {BrowserRouter as Router, Route} from "react-router-dom";


export default class App extends Component {
  gotService = new gotService();
  constructor(props) {
    super(props);

    this.state = {
      idCharDetail: false,
      error: false
    }

    this.randomCharOnToggleHide = this.randomCharOnToggleHide.bind(this);
    }
    componentDidCatch() {
      this.setState({error: true});
    }
    randomCharOnToggleHide() {
      this.setState(({idCharDetail}) => {
      return {
      idCharDetail: !idCharDetail
      }
    })
  }
    render() {
      if (this.state.error) {
        return <ErrorMasagge/>;
      }
        return (
        <Router>
          <div className="app">
              <Container>
                  <Route path="/" component={Header} />
              </Container>
            <Container>
                <Row>
                    <Col lg={{size: 5, offset: 0}}>
                        <RandomChar idCharDetail={this.state.idCharDetail} randomCharOnToggleHide={this.randomCharOnToggleHide}/>
                    </Col>
                </Row>
                  <Route path="/char" component={CharCharacters}/>
                  <Route path="/house" component={HouseCharacters}/>
                  <Route path="/book" exact component={BookCharacters}/>
                  <Route path="/book/:id" render={
                      ({match}) => {
                      const {id} = match.params;
                      return <BookPage bookId={id}/>}
                      } />
              </Container>
        </div>
      </Router>
    );
  }
};
