import React from 'react';
import Textarea from 'react-textarea-autosize';
import Card from "@material-ui/core/Card";
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/Ai';
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { addList } from "../../actions/trello_list";
import { addCard } from "../../actions/trello_card";

class TrelloActionButton extends React.PureComponent {

    state = {
        formOpen: false
    };

    openForm = () => {
        this.setState({
            formOpen: true
        });
    };

    closeForm = () => {
        this.setState({
            formOpen: false
        });
    };

    handleInputChange = e => {
       this.setState({
            title: e.target.value
       });
    };

    handleAddList = () => {
        const { dispatch } = this.props;
        const { title } = this.state;

        if (title) {
            this.setState({
               title: ""
            });
            dispatch(addList(title));
        }
        return;
    };

    handleAddCard = () => {
        const { dispatch, listID } = this.props;
        const { title } = this.state;

        if (title) {
            this.setState({
               title: ""
            });
            dispatch(addCard(listID, title));
        }
    };

    renderAddButton = () => {
        const { list } = this.props;

        const buttonText = list ? "Add another list" : "Add another card";
        const buttonTextOpacity = list ? 1 : 0.5;
        const buttonTextColor = list ? "white" : "inherit";
        const buttonTextBackground = list ? "rgba(0,0,0,.5)" : "inherit";

        return (
            <div
                onClick={this.openForm}
                style={{
                    ...styles.openForButtonGroup,
                    opacity: buttonTextOpacity,
                    color: buttonTextColor,
                    backgroundColor: buttonTextBackground
                }}
            >
                <AiOutlinePlus />
                <p style={{ ...styles.noMarginP }}>{buttonText}</p>
            </div>
        );
    };

    renderForm = () => {
        const { list } = this.props;

        const placeholder = list ? "Enter list title" : "Enter a title for this card";
        const buttonTitle = list ? "Add List" : "Add a card";


        return <div>
                <Card style={{
                    overflow: "visible",
                    minHeight: 80,
                    minWidth: 272,
                    padding: "6px 8px 2px"
                }}>
                    <Textarea
                        placeholder={placeholder}
                        autoFocus
                        onBlur={this.closeForm}
                        value={this.state.title}
                        onChange={this.handleInputChange}
                        style={{
                            resize: "none",
                            width: "100%",
                            outline: "none",
                            overflow: "hidden",
                            border: "none"
                        }}
                    />
                </Card>
                <div style={styles.formButtonGroup}>
                    <Button onMouseDown={ list ? this.handleAddList : this.handleAddCard }
                            variant="contained"
                            style={{color: "white", backgroundColor: "#5aac44"}}
                    >{buttonTitle}{" "}</Button>
                    <AiOutlineMinus style={{ marginLeft: 8, cursor: "pointer" }}>close</AiOutlineMinus>
                </div>
            </div>
    };

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }
}

const styles = {
    openForButtonGroup: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 3,
        height: 36,
        width: 272,
        padding: 10
    },
    noMarginP: {
        marginTop: 0,
        marginBottom: 0,
    },
    formButtonGroup: {
        marginTop: 8,
        display: "flex",
        alignItems: "center",
    }
};

export default connect() (TrelloActionButton);