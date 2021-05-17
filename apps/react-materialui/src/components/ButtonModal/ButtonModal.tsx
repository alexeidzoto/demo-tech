/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

// styles
// import useStyles from "./styles";

interface ButtonModalProps {
  buttonText: string;
  formDialog: any;
  initialData?: any;
}

const ButtonModal = (props: ButtonModalProps) => {
  const { buttonText, formDialog: FormDialog, initialData } = props;
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: any) => {
    setOpen(false);
  };

  return (
    <>
      <Button
        color="primary"
        onClick={handleClickOpen}
        variant="contained"
      >
        {buttonText}
      </Button>
      <FormDialog handleClose={handleClose} open={open} initialData={initialData} />
    </>
  );
};

ButtonModal.propTypes = {
  className: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  formDialog: PropTypes.any.isRequired
};

export default ButtonModal;