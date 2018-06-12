import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Hand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    };
    render() {
        console.log(this.props.card);
        return (
            <div>
                {/*Stringified because won't cooperate with me for now*/}
                <div className="pulled-card"><h5>{JSON.stringify(this.props.card)}</h5></div>
            </div>
        );
    }
}

// function Hand(props) {
//     // const card = JSON.stringify(props.card);
//     console.log(props.card);
//     return (
//         <div>
//             <div className="pulled-card">{JSON.stringify(props.card)}</div>
//         </div>
//     );
// }

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

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
            deck: [],
            hand: [],
            alert: false
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
        const suit = ['♥', '♦', '♣', '♠'];
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
    }

    shuffleDeck() {
        const deck = this.state.deck;
        let remainingCards = deck.length;
        let temp;
        let i;
        while(remainingCards > 0) {
            i = Math.floor(Math.random() * remainingCards);
            remainingCards--;
            temp = deck[remainingCards];
            deck[remainingCards] = deck[i];
            deck[i] = temp;
        }
        this.setState({
            deck: deck,
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
        return (
            <div className="table">
                <Alert />
                <Headers />
                <div className="dealer">
                    <div className="deck">
                        <Deck onClick={() => this.drawCard(this.state.deck)} />
                    </div>
                    <div className="cards">
                        <Hand card={this.state.hand[this.state.hand.length - 1]} />
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
