import TrelloCard from "./TrelloCard";
import React, { useState, Fragment } from 'react';
import TrelloActionButton from "./TrelloActionButton";

const TrelloList = ({ title, cards, listID }) => {
    return (
        <Fragment>
            <div style={styles.container}>
                <h4>{title}</h4>
                { cards.map(card => (
                    <TrelloCard text={card.text} />
                ))}
                <TrelloActionButton listID={listID}/>
            </div>
        </Fragment>
    );
};

const styles = {
    container: {
        backgroundColor: "#fff",
        borderRadius: 5,
        width: 300,
        padding: 8,
        height: "100%",
        marginRight: 8,
    }
};

export default TrelloList;