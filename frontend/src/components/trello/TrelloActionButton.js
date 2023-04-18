import React, { useState } from 'react';
import Textarea from 'react-textarea-autosize';
import Card from "@material-ui/core/Card";
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/Ai';
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { connect } from 'react-redux';
import { addList } from "../../actions/trello_list";
import { addNewCard } from "../../actions/trello_card";

const TrelloActionButton = ({ listID, list }) => {

    const [formOpen, setFormOpen] = useState(false);
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();

    const openForm = () => {
        setFormOpen(true);
    };

    const closeForm = () => {
        setFormOpen(false);
    };

    const handleInputChange = e => {
        setTitle(e.target.value);
    };

    const handleAddList = () => {
        if (title) {
            setTitle("");
            dispatch(addList(title));
        }
    };

    const handleAddCard = () => {
        if (title) {
            setTitle("");
            dispatch(addNewCard(title, listID));
        }
    };

    const renderAddButton = () => {

        const buttonText = list ? "Add another list" : "Add another card";
        const buttonTextOpacity = list ? 1 : 0.5;
        const buttonTextColor = list ? "white" : "inherit";
        const buttonTextBackground = list ? "rgba(0,0,0,.5)" : "inherit";

        return (
            <div
                onClick={openForm}
                style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    borderRadius: 3,
                    height: 36,
                    width: 272,
                    padding: 10,
                    opacity: buttonTextOpacity,
                    color: buttonTextColor,
                    backgroundColor: buttonTextBackground
                }}
            >
                <AiOutlinePlus />
                <p style={{ marginTop: 0, marginBottom: 0 }}>{buttonText}</p>
            </div>
        );
    };

    const renderForm = () => {

        const placeholder = list ? "Enter list title" : "Enter a title for this card";
        const buttonTitle = list ? "Add List" : "Add a card";

        return (
            <div>
                <Card style={{
                    overflow: "visible",
                    minHeight: 80,
                    minWidth: 272,
                    padding: "6px 8px 2px"
                }}>
                    <Textarea
                        placeholder={placeholder}
                        autoFocus
                        onBlur={closeForm}
                        value={title}
                        onChange={handleInputChange}
                        style={{
                            resize: "none",
                            width: "100%",
                            outline: "none",
                            overflow: "hidden",
                            border: "none"
                        }}
                    />
                </Card>
                <div style={{ marginTop: 8, display: "flex", alignItems: "center" }}>
                    <Button onMouseDown={ list ? handleAddList : handleAddCard }
                            variant="contained"
                            style={{color: "white", backgroundColor: "#5aac44"}}
                    >{buttonTitle}{" "}</Button>
                    <AiOutlineMinus style={{ marginLeft: 8, cursor: "pointer" }} onClick={closeForm}>close</AiOutlineMinus>
                </div>
            </div>
        );
    };

    return formOpen ? renderForm() : renderAddButton();
};

export default connect(null, { addList, addNewCard })(TrelloActionButton);