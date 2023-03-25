import React, { Fragment, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import TrelloList from './TrelloList';
import TrelloActionButton from './TrelloActionButton';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { sort } from '../../actions/trello_list';
import styled from 'styled-components';
import { getLists } from '../../actions/trello_list';
import { connect } from 'react-redux';
import axios from 'axios';

const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const Placeholder = styled.div`
    background-color: lightgrey;
    width: 100%; height: 50px;
`;

const List = () => {
    const dispatch = useDispatch();
    const [lists, setLists] = useState([])

    useEffect(() => {
        axios.get('/lists/')
            .then(response => setLists(response.data))
            .catch(error => console.error(error))
    }, []);

    const onDragEnd = useCallback(
        (result) => {
            const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        dispatch(
            sort(
                source.droppableId,
                destination.droppableId,
                source.index,
                destination.index,
                draggableId,
                type
            )
        );
    },
    [dispatch]
);
    if (typeof lists === 'object' && Array.isArray(lists)) {
      console.log(lists, "масив");
    } else {
      console.log(lists, "не масив");
    }

      return (
        <Fragment>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-lists" direction="horizontal" type="list">
              {(provided) => (
                <Fragment>
                  <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
                    {lists.map((list, index) => (
                      <TrelloList
                        key={list.id}
                        title={list.title}
                        listID={list.id}
                        index={index}
                      />
                    ))}
                    <TrelloActionButton list />
                  </ListContainer>
                  {provided.placeholder}
                </Fragment>
              )}
            </Droppable>
          </DragDropContext>
        </Fragment>
      );
    };

export default List;
