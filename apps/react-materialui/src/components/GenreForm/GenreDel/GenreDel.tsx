/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { genreService } from '../../../domain/services';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  CircularProgress,
  Button,
} from '@material-ui/core';

// interface GenreDelProps {
//   handleClose: ;
//   open: boolean;
//   initialData: any;
// }

const GenreDel = (props: any) => {
  const { open, handleClose, initialData } = props;

  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation(genreService.delete, {
    onSuccess: data => {
      console.log(data);
      handleClose()
    },
    onError: () => {
      alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('genres');
    }
  });

  const removePlaylist = async () => {
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
            Delete genre
          </DialogTitle>
          <DialogContent>
            Are you sure that you want to deleteGenre?
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
              onClick={removePlaylist}
            >
              Delete
            </Button>
          </DialogActions>
      </Dialog>
    </>
  );
};

GenreDel.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  initialData: PropTypes.number
};

export default GenreDel;