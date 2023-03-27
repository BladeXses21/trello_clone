import TrelloCard from "./TrelloCard";
import React, { Fragment, useEffect, useState } from 'react';
import TrelloActionButton from "./TrelloActionButton";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from "styled-components";
import { addCard, getCards } from '../../actions/trello_card';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';


const ListContainer = styled.div`
    background-color: #fff;
    border-radius: 5px;
    width: 300px;
    padding: 8px;
    height: 100%;
    margin-right: 8px;
`

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
`

const ModalContent = styled.div`
    background-color: #fff;
    border-radius: 5px;
    padding: 16px;
`

const TrelloList = ({ title, listID, index }) => {

    const dispatch = useDispatch();
    const [cards, setCards] = useState([])

    useEffect(() => {
        axios.get(`/card-lists/?list=${listID}`)
            .then(response => setCards(response.data))
            .catch(error => console.error(error))
    }, [listID]);


    console.log(cards, 'cards')
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
                                        <TrelloCard key={listID} index={index} title={card.name}
                                        description={card.description} icon={card.icon} date={card.date}
                                        comment={card.comment} id={card.id} onClick={() => handleClickCard(card)}/>
                                    ))}
                                    {provided.placeholder}
                                    <TrelloActionButton listID={listID} />
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