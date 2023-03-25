import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "568px",
    maxwidth: "100%",
    maxheight: "100%",
    bgcolor: "#fff",
    borderradius: "3px",
    overflow: "hidden",
    zIndex: 101,
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
};

const TrelloModal = ({ open, onClose, title: initialTitle, description: initialDescription, icon: initialIcon, date: initialDate, comment: initialComment}) => {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [icon, setIcon] = useState(initialIcon);
    const [date, setDate] = useState(initialDate);
    const [comment, setComment] = useState(initialComment);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    return (
    <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
    <Box sx={style}>
        <Typography variant="h6" component="h2" align="center">
            <TextField
                value={title}
                onChange={handleTitleChange}
                fullWidth
            />
        </Typography>
        <Typography align="center" sx={{ mt: 2 }}>
            <TextField
                value={description}
                onChange={handleDescriptionChange}
                fullWidth
                multiline
                rows={4}
            />
        </Typography>
        <Typography align="center" sx={{ mt: 2 }}>
            <TextField
                value={icon}
                fullWidth
            />
        </Typography>
        <Typography align="center" sx={{ mt: 2 }}>
            <TextField
                value={date}
                fullWidth
            />
        </Typography>
        <Typography align="center" sx={{ mt: 2 }}>
            <TextField
                value={comment}
                onChange={handleCommentChange}
                fullWidth
                multiline
                rows={4}
            />
        </Typography>
        <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={onClose}>
                Close
            </Button>
        </Box>
    </Box>
</Modal>
  );
};

export default TrelloModal;