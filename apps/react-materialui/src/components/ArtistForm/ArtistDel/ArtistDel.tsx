/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { artistService } from '../../../domain/services';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  CircularProgress,
  Button,
} from '@material-ui/core';
import { toast } from 'react-toastify';

const ArtistDel = (props: any) => {
  const { open, handleClose, initialData } = props;

  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation(artistService.delete, {
    onSuccess: data => {
      toast(`The artist was successfully deleted.`);
      handleClose()
    },
    onError: () => {
      alert("There was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('artists');
    }
  });

  const removeArtist = async () => {
    await mutateAsync(initialData)
  }

  return (
    <>
    <Dialog
        aria-labelledby="form-dialog-title"
        onClose={handleClose}
        open={open}
      >
          <DialogTitle color="primary" id="form-dialog-title">
            Delete artist
          </DialogTitle>
          <DialogContent>
            Are you sure that you want to delete Artist?
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              disabled={isLoading}
              startIcon={
                isLoading ? (
                  <CircularProgress color="inherit" size={25} />
                ) : null
              }
              onClick={removeArtist}
            >
              Delete
            </Button>
          </DialogActions>
      </Dialog>
    </>
  );
};

ArtistDel.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  initialData: PropTypes.number
};

export default ArtistDel;