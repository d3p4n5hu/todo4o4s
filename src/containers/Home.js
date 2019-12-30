import React from 'react';
import { connect } from 'react-redux';
import { addTodo, toggleTodo, resetTodo } from '../actions';
import TextField from '../components/TextField';
import TodoItem from '../components/TodoItem';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            filter: [],
        };
        this.onToDoChange = this.onToDoChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTodoClick = this.onTodoClick.bind(this);
        this.onResetClick = this.onResetClick.bind(this);
        this.onHashTagClick = this.onHashTagClick.bind(this);
        this.onResetFilterClick = this.onResetFilterClick.bind(this);
    }

    onToDoChange(e) {
        const text = e.target.value;
        this.setState(() => ({ text }));
    }

    onSubmit(e) {
        if (e.key === 'Enter' && this.state.text) {
            this.props.addTodo(this.state.text);
            this.setState(() => ({ text: '' }));
        }
    }

    onTodoClick(id) {
        this.props.toggleTodo(id);
    }

    onResetClick() {
        this.props.resetTodo();
    }

    onHashTagClick(tag) {
        const filter = this.state.filter.includes(tag)
            ? this.state.filter.filter(item => item !== tag)
            : this.state.filter.concat(tag);

        this.setState(() => ({ filter }));
    }

    onResetFilterClick() {
        this.setState(() => ({ filter: [] }));
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
                <button onClick={this.onResetClick}>Reset State</button>
                {this.state.filter.length > 0 ? (
                    <div>Filters: {this.state.filter.join()}</div>
                ) : (
                    <div>No filters applied</div>
                )}
                <button onClick={this.onResetFilterClick}>Reset Filters</button>
                {this.props.todos.length > 0 && (
                    <ul>
                        {this.props.todos
                            .filter(
                                item =>
                                    !item.completedAt &&
                                    (!this.state.filter.length ||
                                        item.hashTags.some(x =>
                                            this.state.filter.includes(x)
                                        ))
                            )
                            .sort((itemOne, itemTwo) =>
                                itemOne.createdAt > itemTwo.createdAt ? -1 : 1
                            )
                            .map(item => (
                                <TodoItem
                                    key={item.id}
                                    item={item}
                                    onClick={this.onTodoClick}
                                    onHashTagClick={this.onHashTagClick}
                                />
                            ))}
                        {this.props.todos
                            .filter(
                                item =>
                                    !!item.completedAt &&
                                    (!this.state.filter.length ||
                                        item.hashTags.some(x =>
                                            this.state.filter.includes(x)
                                        ))
                            )
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
                                    onHashTagClick={this.onHashTagClick}
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
    resetTodo: id => dispatch(resetTodo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
