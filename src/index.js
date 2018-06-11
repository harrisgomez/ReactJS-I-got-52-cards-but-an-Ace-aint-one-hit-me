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
                <button className="top-card" onClick={() => this.props.onClick()}>
                    {this.props.value}
                </button>
            </div>
        );
    }
}

class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: []
        };
    }
    generateDeck() {
        const deck = this.state.deck.slice();
        const value = [
            'A', '2', '3', '4', '5',
            '6', '7', '8', '9', '10',
            'J', 'Q', 'K'
        ];
        const suit = ['♠', '♣', '♦', '♥'];
        for(var v = 0; v < value.length; v++) {
            for(var s = 0; s < suit.length; s++) {
                var card = {};
                card.value = value[v];
                card.suit = suit[s];
                deck.push(card);
            }
        }
        console.log(deck);
    }
    // When user clicks, order the deck and show top card
    handleClick() {
        this.generateDeck();
    }
    orderedDeck(deck) {

    }
    renderCard() {

    }
    render() {
        return (
            <div>
                <Card value={this.state.deck[0]} onClick={() => this.handleClick()} />
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
