import TrelloCard from "./TrelloCard";
import React, {Fragment, useEffect, useState} from 'react';
import TrelloActionButton from "./TrelloActionButton";
import {Droppable, Draggable} from 'react-beautiful-dnd';
import styled from "styled-components";
import { useDispatch } from 'react-redux';

const ListContainer = styled.div`
  background-color: #fff;
  border-radius: 5px;
  width: 300px;
  padding: 8px;
  height: 100%;
  margin-right: 8px;
`

const TrelloList = ({title, listID, index, cards}) => {
    const dispatch = useDispatch();

    useEffect(() => {
    }, [dispatch, listID, cards]);
    const handleClickCard = (card) => {
        console.log(`Clicked on card ${card.id}`);
    };

    return (
        <Fragment>
            <Draggable draggableId={String(listID)} index={index}>
                {provided => (
                    <ListContainer {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                        <Droppable droppableId={String(listID)} type="card">
                            {provided => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    <h4>{title}</h4>
                                    {cards.map((card, index) => (
                                        <TrelloCard key={index} index={index} card={card} onClick={() => handleClickCard(card)}/>
                                    ))}
                                    {provided.placeholder}
                                    <TrelloActionButton listID={listID}/>
                                </div>
                            )}
                        </Droppable>
                    </ListContainer>
                )}
            </Draggable>
        </Fragment>
    );
};


export default TrelloList;