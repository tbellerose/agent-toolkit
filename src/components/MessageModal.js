import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#app');
}

export const MessageModal = (props) => (
  <Modal
    isOpen={ props.modalIsOpen }
    contentLabel='Message Modal'
    onAfterOpen={ () => { setTimeout(props.handleCloseModal, 3000); } }
    onRequestClose={ props.handleCloseModal }
    closeTimeoutMS={ 200 }
    className='modal--message'
    overlayClassName='modal--message__overlay'
  >
    <p>{props.message}</p>
  </Modal>
);

MessageModal.propTypes = {
  modalIsOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  message: PropTypes.string
};

export default MessageModal;
