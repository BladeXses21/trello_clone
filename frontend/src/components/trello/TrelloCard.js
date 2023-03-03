import React, { Fragment } from 'react';
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

const TrelloCard = ({ text }) => {
    return (
        <Fragment>
            <Card style={styles.cardContainer}>
                <CardContent>
                    <Typography gutterBottom>
                        {text}
                    </Typography>
                </CardContent>
            </Card>
        </Fragment>
    );
};

const styles = {
    cardContainer: {
        marginBottom: 8,
    }
}

export default TrelloCard;
