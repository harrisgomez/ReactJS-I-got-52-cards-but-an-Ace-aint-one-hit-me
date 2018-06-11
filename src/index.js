import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Table extends React.Component {
  render() {
    return (
      <div className="table">
        <p>test</p>
      </div>
    );
  }
}

ReactDOM.render(<Table />, document.getElementById('root'));
