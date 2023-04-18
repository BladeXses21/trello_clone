import React, {Fragment, useState, useEffect} from 'react';
import {Draggable} from 'react-beautiful-dnd';
import styled from "styled-components";
import TrelloForm from './TrelloForm';

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from '@material-ui/core/Typography';
import axios from "axios";

const CardContainer = styled.div`
  margin-bottom: 8px;
`


const TrelloCard = ({card, index}) => {
    const [cardCase, setCardCase] = useState({});
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        axios.get(`/api/cards/?id=${card.id}`).then((response) => {
            setCardCase(response.data);
        });
    }, [card]);

    const handleModalOpen = () => {
        setModalOpen(true);
    }

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <Fragment>
            <Draggable draggableId={String(card.id)} index={index}>
                {provided => (
                    <CardContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={handleModalOpen}>
                        <Card>
                            <CardContent>
                                <Typography gutterBottom>
                                    {card.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </CardContainer>
                )}
            </Draggable>
            <TrelloForm open={modalOpen} onClose={handleModalClose} title={card.name} description={card.description} icon={card.icon} date={card.date}
                        comment={card.comment}/>
        </Fragment>
    );
};


export default TrelloCard;
