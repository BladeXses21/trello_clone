import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTodos, deleteTodo, toggleTodo, moveTodo} from '../../actions/todos';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

const List = ({todos, getTodos, toggleTodo, deleteTodo, moveTodo}) => {

    useEffect(() => {
        console.log('List');
        getTodos();
    }, [getTodos]);

    const onDragEnd = (result) => {
        const {destination, source} = result;

        if (!destination) {
            return;
        }

        if (destination.index === source.index) {
            return;
        }

        // Створюємо копію масиву todo та встановлюємо новий порядок елементів
        const newTodos = [...todos];
        const [reorderedTodo] = newTodos.splice(source.index, 1);
        newTodos.splice(destination.index, 0, reorderedTodo);

        // Передаємо всі необхідні дані у action creator moveTodo
        moveTodo(source, destination, newTodos);
    };

    return (<>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="todos">
                {(provided) => (<div className="card card-body mt-4 mb-4" ref={provided.innerRef} {...provided.droppableProps}>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>title</th>
                            <th>description</th>
                            <th>done</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {todos.map((todo, index) => (<Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                            {(provided) => (<tr
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                key={todo.id}
                            >
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>
                                    <input onChange={() => toggleTodo(todo)} type="checkbox" defaultChecked={todo.done}/>
                                </td>
                                <td>
                                    <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger btn-sm">
                                        Delete
                                    </button>
                                </td>
                            </tr>)}
                        </Draggable>))}
                        {provided.placeholder}
                        </tbody>
                    </table>
                </div>)}
            </Droppable>
        </DragDropContext>
    </>);
};

List.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired, title: PropTypes.string.isRequired, description: PropTypes.string, done: PropTypes.bool.isRequired,
    })).isRequired,
    getTodos: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    moveTodo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    todos: Array.isArray(state.todos.todos) ? state.todos.todos : [],
});

export default connect(mapStateToProps, {getTodos, deleteTodo, toggleTodo, moveTodo})(List);