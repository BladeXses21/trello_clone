import {GET_TODO_LIST, ADD_TODO, DELETE_TODO, TOGGLE_TODO, MOVE_TODO} from '../actions/types';

const initialState = {
    todos: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TODO_LIST:
            return {
                ...state, todos: action.payload
            };
        case DELETE_TODO:
            return {
                ...state, todos: state.todos.filter(todo => todo.id != action.payload)
            };
        case TOGGLE_TODO:
            return {
                ...state, todos: [...state.todos]
            };
        case ADD_TODO:
            return {
                ...state, todos: [...state.todos, action.payload]
            };
        case MOVE_TODO:
            const {source, destination} = action.payload;
            const newTodos = [...state.todos];
            const [reorderedTodo] = newTodos.splice(source.index, 1);
            newTodos.splice(destination.index, 0, reorderedTodo);

            // Оновлюємо індекси елементів у списку
            const updatedTodos = newTodos.map((todo, index) => ({...todo, index}));

            return {
                ...state,
                todos: updatedTodos,
            };
        default:
            return state;
    }
};