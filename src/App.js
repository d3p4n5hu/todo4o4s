import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    console.log(this.props.todos);
    return (
      <div>
        <h1>Todo App Assignment for o4s</h1>
        <hr />
        <input type="text" />
        <ul>
          <li>Change clothes</li>
          <li>Work on assignment</li>
          <li>Eat, sleep, repeat</li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
});

export default connect(mapStateToProps)(App);
