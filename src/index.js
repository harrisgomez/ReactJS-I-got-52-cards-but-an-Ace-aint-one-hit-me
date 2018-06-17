import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Hand extends React.Component {
    render() {
        console.log(this.props.hand);
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
            hand: [{suit: null, value: null}],
            alert: false,
            originalDeck: []
        };
    }

    // How do we shuffle deck and reset? Preserve original state via Singleton?
    componentDidMount() {
        const GET_INITIAL_DECK_STATE = (function() {
            let INSTANCE;
            const INIT = () => {
                const INITIAL_DECK_STATE = this.state.deck;
                return {
                    getInitialState: function() {
                        return INITIAL_DECK_STATE;
                    }
                };
            };

            return {
                getInstance: function() {
                    if(!INSTANCE) {
                        INSTANCE = INIT();
                    }
                    return INSTANCE;
                }
            };
        }.bind(this))();
        const ORIGINAL_DECK = GET_INITIAL_DECK_STATE.getInstance();

        this.setState({originalDeck: ORIGINAL_DECK});
        console.log('original deck', this.state.originalDeck);
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

        if(!DECK_REMAINING[0]) {
            let topDeck = document.getElementsByClassName("top-card");
            topDeck[0].style.background = "red";
            return;
        }

        if(HAND[1]) {
            let topHand = document.getElementsByClassName("cards");
            topHand[0].style.background = "white";
        }

        this.setState({
            deck: DECK_REMAINING,
            hand: HAND
        });
    }

    shuffleDeck = () => {
        this.getInitialState();
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
        const PULLED_CARD = this.state.hand[this.state.hand.length - 1];
        console.log(PULLED_CARD);

        return (
            <div className="table">
                <Alert />
                <Headers />
                <div className="dealer">
                    <div className="deck">
                        <Deck onClick={() => this.drawCard(DECK_REMAINING)} />
                    </div>
                    <div className="cards">
                        <Hand hand={PULLED_CARD} />
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
