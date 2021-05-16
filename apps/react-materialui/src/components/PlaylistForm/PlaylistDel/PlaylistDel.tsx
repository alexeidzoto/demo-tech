/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { playlistService } from '../../../domain/services';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  CircularProgress,
  Button,
} from '@material-ui/core';

// interface PlaylistDelProps {
//   handleClose: ;
//   open: boolean;
//   initialData: any;
// }

const PlaylistDel = (props: any) => {
  const { open, handleClose, initialData } = props;

  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation(playlistService.delete, {
    onSuccess: data => {
      console.log(data);
    },
    onError: () => {
      alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('playlists');
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
            Delete playlist
          </DialogTitle>
          <DialogContent>
            Are you sure that you want to delete Playlist?
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

PlaylistDel.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  initialData: PropTypes.number
};

export default PlaylistDel;