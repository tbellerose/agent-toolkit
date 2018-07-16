import React, { Component } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');

export class EscalationModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        contentlabel="Escalation Template"
        onRequestClose={this.props.handleCloseModal}
        closeTimeoutMS={200}
        className="modal"
      >
        <h2 className="modal__title">Escalation Template</h2>
      </Modal>
    );
  };
};

export default EscalationModal;
