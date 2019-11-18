import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import api from '~/services/api';

import { HelpOrderModal, HelpOrderFade } from './styles';

const helpOrderAnswerSchema = Yup.object().shape({
  answer: Yup.string()
    .trim()
    .min(1)
    .max(240)
    .required(),
});

export default function AnswerHelpOrderModal({ helpOrder, test }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAnswerHelpOrder = async () => {};

  return (
    <>
      <button className="edit" type="button" onClick={() => handleOpen()}>
        responder
      </button>
      <HelpOrderModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <HelpOrderFade in={open}>
          <div>
            <h3 id="transition-modal-title">PERGUNTA DO ALUNO</h3>
            <p id="transition-modal-description">{helpOrder.question}</p>
            <h3 id="transition-modal-title">SUA RESPOSTA</h3>
            <Form onSubmit={() => {}}>
              <Input name="answer" type="text" multiline required />
              <button type="submit">Responder aluno</button>
            </Form>
          </div>
        </HelpOrderFade>
      </HelpOrderModal>
    </>
  );
}

AnswerHelpOrderModal.propTypes = {
  helpOrder: PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    student: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
