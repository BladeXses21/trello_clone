import React, { Fragment, useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from "styled-components";
import TrelloForm from './TrelloForm';

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";

const CardContainer = styled.div`
    margin-bottom: 8px;
`

const style = {
    position: "absolute as absolute",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const TrelloCard = ({ title, description, icon, date, comment, id, index}) => {
    const [card, setCard] = useState({});
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        axios.get(`/cards/${id}`).then((response) => {
            setCard(response.data);
        });
    }, [id]);

    const handleModalOpen = () => {
        console.log('open');
        setModalOpen(true);
    }

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <Fragment>
            <Draggable draggableId={String(id)} index={index}>
            {provided => (
                <CardContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={handleModalOpen}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom>
                                {title}
                            </Typography>
                        </CardContent>
                    </Card>
                </CardContainer>
            )}
            </Draggable>
            <TrelloForm open={modalOpen} onClose={handleModalClose} title={title} description={description} icon={icon} date={date} comment={comment}/>
        </Fragment>
    );
};


export default TrelloCard;
