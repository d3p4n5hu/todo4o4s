import React from 'react';
import { connect } from 'react-redux';
import { addTodo, toggleTodo } from '../actions';
import TextField from '../components/TextField';
import TodoItem from '../components/TodoItem';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
        this.onToDoChange = this.onToDoChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTodoClick = this.onTodoClick.bind(this);
    }

    onToDoChange(e) {
        const text = e.target.value;
        this.setState(() => ({ text }));
    }

    onSubmit(e) {
        if (e.key === 'Enter') {
            this.props.addTodo(this.state.text);
            this.setState(() => ({ text: '' }));
        }
    }

    onTodoClick(id) {
        this.props.toggleTodo(id);
    }

    render() {
        return (
            <div>
                <h1>Todo App Assignment for O4S</h1>
                <hr />
                <TextField
                    value={this.state.text}
                    onChange={this.onToDoChange}
                    onSubmit={this.onSubmit}
                />
                {this.props.todos.length > 0 && (
                    <ul>
                        {this.props.todos
                            .filter(item => !item.completedAt)
                            .sort((itemOne, itemTwo) =>
                                itemOne.createdAt > itemTwo.createdAt ? -1 : 1
                            )
                            .map(item => (
                                <TodoItem
                                    key={item.id}
                                    item={item}
                                    onClick={this.onTodoClick}
                                />
                            ))}
                        {this.props.todos
                            .filter(item => !!item.completedAt)
                            .sort((itemOne, itemTwo) =>
                                itemOne.completedAt > itemTwo.completedAt
                                    ? -1
                                    : 1
                            )
                            .map(item => (
                                <TodoItem
                                    key={item.id}
                                    item={item}
                                    onClick={this.onTodoClick}
                                />
                            ))}
                    </ul>
                )}
                {this.props.todos.length === 0 && <p>No tasks to do</p>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
    addTodo: text => dispatch(addTodo(text)),
    toggleTodo: id => dispatch(toggleTodo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
