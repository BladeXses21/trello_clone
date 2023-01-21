import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getTodos } from '../../actions/todos';

class List extends Component {

    static propTypes = {
        todos: PropTypes.array.isRequired
    };

    componentDidMount() {
        this.props.getTodos();
    };

    render() {
        return (
            <Fragment>
                <h2>Todo list</h2>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>title</th>
                            <th>description</th>
                            <th>done</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.todos.map(todo => (
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td><input type='checkbox' defaultChecked={todo.done} /></td>
                                <td><button className='btn btn-danger btn-sm'>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos.todos
})
export default connect(mapStateToProps, { getTodos })(List);