import React from 'react';
import Modal from 'react-modal';
import EscalationForm from './EscalationForm';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#app');
}

export const EscalationModal = (props) => (
  <Modal
    isOpen={props.modalIsOpen}
    contentlabel="Escalation Template"
    onRequestClose={props.handleCloseModal}
    closeTimeoutMS={200}
    className="modal"
  >
    <h2 className="modal__title">Escalation Template</h2>
    <EscalationForm site={props.site} />
  </Modal>
);

export default EscalationModal;
