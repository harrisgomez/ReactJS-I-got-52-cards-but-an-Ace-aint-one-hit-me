import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Hand(props) {
    const card = JSON.stringify(props.value[props.value.length - 1]);
    console.log(card);
    return (
        <div>
            <div className="pulled-card">{card}</div>
        </div>
    );
}

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
            deck: [],
            hand: []
        };
    }

    render() {
        return (
            <div>
                <Card onClick={() => this.props.onClick()} />
            </div>
        );
    }
}

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: [],
            hand: []
        };
    }

    componentDidMount() {
        this.setState({deck: this.createDeck()});
    }

    createDeck() {
        const deck = this.state.deck;
        const value = [
            'K', 'Q', 'J', '10', '9',
            '8', '7', '6', '5', '4',
            '3', '2', 'A'
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
        return deck;
    }

    drawCard(deck) {
        const hand = this.state.hand;
        hand.push(deck.pop());
        this.setState({
            deck: deck,
            hand: hand
        });
        console.log(this.state.deck);
    }

    render() {
        return (
            <div className="table">
                <div className="headers">
                    <h1>Deck</h1>
                    <h1>Your Hand</h1>
                </div>
                <div className="dealer">
                    <div className="deck">
                        <Deck onClick={() => this.drawCard(this.state.deck)} />
                    </div>
                    <div className="cards">
                        <Hand value={this.state.hand} />
                    </div>
                </div>
                <div className="action">
                    <button className="shuffle btn btn-warning">Shuffle Deck</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Table />, document.getElementById('root'));
