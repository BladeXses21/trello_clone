import React, { useState, Fragment, Component } from 'react';
import { connect } from 'react-redux';
import TrelloList from './TrelloList';
import { PropTypes } from 'prop-types';
import TrelloActionButton from './TrelloActionButton';

const List = ({ lists }) => {
    return (
        <Fragment>
            <>
                <div style={styles.listsContainer}>
                    {lists.map((list) => (
                        <TrelloList listID={list.id} key={list.id} title={list.title} cards={list.cards} />
                    ))}
                    <TrelloActionButton list />
                </div>
            </>
        </Fragment>
    );
};

const styles = {
    listsContainer: {
        display: 'flex',
        flexDirection: 'row',
    }
};

List.propTypes = {
    lists: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    lists: state.lists,
});

export default connect(mapStateToProps)(List);