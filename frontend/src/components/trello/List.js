import React, {Fragment, useCallback, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TrelloList from './TrelloList';
import TrelloActionButton from './TrelloActionButton';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import {getLists, moveListSuccess, saveLists} from '../../actions/trello_list';
import {connect} from 'react-redux';
import {getCards} from "../../actions/trello_card";

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Placeholder = styled.div`
  background-color: lightgrey;
  width: 100%;
  height: 50px;
`;

const List = ({getLists, getCards, moveListSuccess}) => {
    const dispatch = useDispatch();

    const lists = useSelector((state) => state.lists.lists);
    const cards = useSelector((state) => state.cards.cards);

    useEffect(() => {
        getLists()
        getCards()
    }, [dispatch]);

    const onDragEnd = (result) => {
        const {type} = result;

        // переміщення списку
        if (type === 'list') {
            const {draggableId: listId, source, destination} = result;
            if (!destination) return;
            if (source.index === destination.index) return;
            // оновлюємо позицію списку в Redux Store
            moveListSuccess(listId, lists[destination.index].id);
        }
    }

    return (<Fragment>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-lists" direction="horizontal" type="list">
                {(provided) => (<Fragment>
                    <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
                        {lists.map((list, index) => {
                            const listCards = cards.filter((card) => card.list === list.id);
                            return (<TrelloList
                                key={list.id}
                                title={list.title}
                                listID={list.id}
                                index={index}
                                cards={listCards} // pass filtered cards to TrelloList
                            />);
                        })}
                        <TrelloActionButton list/>
                    </ListContainer>
                    {provided.placeholder}
                </Fragment>)}
            </Droppable>
        </DragDropContext>
    </Fragment>);
};

const mapDispatchToProps = {
    getLists,
    getCards,
    moveListSuccess
};

export default connect(null, mapDispatchToProps)(List);
