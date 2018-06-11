import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showTop: false
        };
    }
    render() {
        return (
            <div>
                <button className="top-card"></button>
            </div>
        );
    }
}

class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: Array(52)
        };
    }
    orderedDeck() {
        const deck = this.state.deck.slice();
    }
    render() {
        return (
            <div>
                <Card />
            </div>
        );
    }
}

class Hand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hand: []
        };
    }
    render() {
        let handLength = this.state.hand.length;
        let topCard = this.state.hand[handLength - 1];
        return (
            <div>
                <h1>{topCard}</h1>
            </div>
        );
    }
}

class Table extends React.Component {
  render() {
    return (
      <div className="table">
        <div className="headers">
            <h1>Deck</h1>
            <h1>Your Card</h1>
        </div>
        <div className="dealer">
            <div className="deck">
                <Deck />
            </div>
            <div className="cards">
                <Hand />
            </div>
        </div>
        <div className="action">
            <button type="button" className="order btn btn-info">Fresh Deck</button>
            <button className="shuffle btn btn-warning">Shuffled Deck</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Table />, document.getElementById('root'));
