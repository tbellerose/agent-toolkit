import React from 'react';
import Modal from 'react-modal';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#app');
}

export const MessageModal = (props) => (
  <Modal
    isOpen={props.modalIsOpen}
    contentLabel="Message Modal"
    onAfterOpen={() => { setTimeout(props.handleCloseModal, 3000) }}
    onRequestClose={props.handleCloseModal}
    closeTimeoutMS={200}
    className="modal--message"
    overlayClassName="modal--message__overlay"
  >
    <p>{props.message}</p>
  </Modal>
);

export default MessageModal;