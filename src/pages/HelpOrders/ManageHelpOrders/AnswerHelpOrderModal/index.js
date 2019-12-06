import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import api from '~/services/api';

import { HelpOrderModal, HelpOrderFade, Scroll } from './styles';

const helpOrderAnswerSchema = Yup.object().shape({
  answer: Yup.string()
    .trim()
    .min(1, 'A resposta não pode ser vazia!')
    .max(240, 'Tamanho máximo: 240 characteres!')
    .required('A resposta não pode ser vazia!'),
});

export default function AnswerHelpOrderModal({ helpOrder, loadHelpOrders }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAnswerHelpOrder = async ({ answer }) => {
    try {
      await api.post(
        `/students/${helpOrder.student.id}/help_orders/${helpOrder.id}/answer`,
        {
          answer,
        }
      );

      loadHelpOrders();

      handleClose();
      toast.success('Pedidos de auxílio respondido com sucesso!');
    } catch (err) {
      toast.error('Falha na resposta, verifique os dados!');
    }
  };

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
            <Scroll id="transition-modal-description">
              {helpOrder.question}
            </Scroll>
            <h3 id="transition-modal-sub-title">SUA RESPOSTA</h3>
            <Form
              schema={helpOrderAnswerSchema}
              onSubmit={handleAnswerHelpOrder}
            >
              <Input name="answer" type="text" multiline />
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
  loadHelpOrders: PropTypes.func.isRequired,
};
