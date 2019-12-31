import React from 'react';
import { connect } from 'react-redux';
import { addTodo, toggleTodo, resetTodo } from '../actions';
import TextField from '../components/TextField';
import TodoItem from '../components/TodoItem';
import '../styles/index.scss';
import HashTag from '../components/HashTag';

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
        this.setState(() => ({ filter: [] }));
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
            <div className="container">
                <div className="header">
                    <div className="date-wrapper">
                        <div className="today">{new Date().toDateString()}</div>
                        <div className="active-tasks">
                            {
                                this.props.todos.filter(
                                    item => !item.completedAt
                                ).length
                            }{' '}
                            Active Tasks
                        </div>
                    </div>
                    <div className="reset-wrapper">
                        <button
                            className="reset-button"
                            onClick={this.onResetClick}
                        >
                            Reset
                        </button>
                    </div>
                </div>
                <div>
                    <TextField
                        className="text-input"
                        placeholder="Enter a task... &#9166; "
                        value={this.state.text}
                        onChange={this.onToDoChange}
                        onSubmit={this.onSubmit}
                    />
                </div>
                <div
                    className="hashtag-filter-wrapper"
                    style={{
                        marginBottom:
                            this.state.filter.length > 0 ? '0' : '12px',
                    }}
                >
                    {this.state.filter.length > 0 &&
                        this.state.filter.map((item, index) => (
                            <HashTag
                                key={index}
                                text={item}
                                onHashTagClick={this.onHashTagClick}
                            />
                        ))}
                </div>
                {this.props.todos.length > 0 && (
                    <div>
                        <hr />
                        <ul className="todo-item-wrapper">
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
                                    itemOne.createdAt > itemTwo.createdAt
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
                    </div>
                )}
                {this.props.todos.length === 0 && (
                    <p style={{ textAlign: 'center', letterSpacing: '5px' }}>
                        ----You're all clear----
                    </p>
                )}
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
