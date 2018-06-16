import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Hand extends React.Component {
    render() {
        return (
            <div>
                <div><h5>{this.props.hand.value}</h5></div>
                <div className='suit'><h1>{this.props.hand.suit}</h1></div>
            </div>
        );
    }
}

class Card extends React.Component {
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
    render() {
        return (
            <div>
                <Card onClick={() => this.props.onClick()} />
            </div>
        );
    }
}

function Alert() {
    return (
        <div>
            <div id="shuffle-alert">
                <div className="alert alert-primary" role="alert" >
                    Cards have been SHUFFLED!
                </div>
            </div>
        </div>
    )
}

function Headers() {
    return (
        <div>
            <div className="headers">
                <h1>Deck</h1>
                <h1>Your Hand</h1>
            </div>
        </div>
    )
}

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: this.createDeck(),
            hand: [],
            alert: false
        };
    }

    createDeck = () => {
        const DECK = [];
        const VALUE = [
            'K', 'Q', 'J', '10', '9',
            '8', '7', '6', '5', '4',
            '3', '2', 'A'
        ];
        const SUIT = ['♥', '♦', '♣', '♠'];

        for(let v = 0; v < VALUE.length; v++) {
            for(let s = 0; s < SUIT.length; s++) {
                const CARD = {};
                CARD.value = VALUE[v];
                CARD.suit = SUIT[s];
                DECK.push(CARD);
            }
        }

        return DECK;
    }

    drawCard = (deck_remaining) => {
        const DECK_REMAINING = deck_remaining;
        const HAND = this.state.hand;

        HAND.push(DECK_REMAINING.pop());

        this.setState({
            deck: DECK_REMAINING,
            hand: HAND
        });
        console.log('current hand', this.state.hand);
    }

    shuffleDeck = () => {
        const DECK = this.state.deck;
        let remainingCards = DECK.length;
        let temp;
        let i;
        while(remainingCards > 0) {
            i = Math.floor(Math.random() * remainingCards);
            remainingCards--;
            temp = DECK[remainingCards];
            DECK[remainingCards] = DECK[i];
            DECK[i] = temp;
        }
        this.setState({
            deck: DECK,
            alert: true
        });
        if(alert) {
            document.getElementById("shuffle-alert").style.display = "flex";
            setTimeout(function() {
                document.getElementById("shuffle-alert").style.display = "none";
            }, 2000);
        }
    }

    render() {
        const DECK_REMAINING = this.state.deck;

        return (
            <div className="table">
                <Alert />
                <Headers />
                <div className="dealer">
                    <div className="deck">
                        <Deck onClick={() => this.drawCard(DECK_REMAINING)} />
                    </div>
                    <div className="cards">
                        <Hand hand={this.state.deck[this.state.deck.length - 1]} />
                    </div>
                </div>
                <div className="action">
                    <button
                        className="shuffle btn btn-warning"
                        onClick={() => this.shuffleDeck()}
                    >
                        Shuffle Deck
                    </button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Table />, document.getElementById('root'));
