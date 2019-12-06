import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import { MdCancel, MdDeleteForever } from 'react-icons/md';

import { Button, HelpOrderModal, HelpOrderFade } from './styles';

export default function EditButton({ onClick, remove, ...rest }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="button" onClick={() => handleOpen(remove)} {...rest}>
        apagar
      </Button>
      <HelpOrderModal
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
            <h2>Alerta!</h2>

            <p>Você tem certeza que deseja deletar este objeto?</p>

            <button type="button" onClick={() => handleClose()}>
              <MdCancel size={20} color="#fff" />
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => {
                onClick(remove);
                handleClose();
              }}
            >
              <MdDeleteForever size={20} color="#fff" />
              Deletar
            </button>
          </div>
        </HelpOrderFade>
      </HelpOrderModal>
    </>
  );
}

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  remove: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
