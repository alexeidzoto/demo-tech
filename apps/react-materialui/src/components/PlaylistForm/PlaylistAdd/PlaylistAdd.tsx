/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogActions,
  CircularProgress,
  Grid,
  Button,
  TextField,
  DialogTitle
} from '@material-ui/core';

import { Playlist } from '../../../domain/types';
import { playlistService } from '../../../domain/services';

const PlaylistAdd = (props: any) => {
  const { open, handleClose } = props;
  const { handleSubmit, control } = useForm();

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(playlistService.add, {
    onSuccess: data => {
      console.log(data);
      handleClose();
    },
    onError: () => {
      alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('playlists');
    }
  });

  const onSubmit = async (playlist: Playlist) => {
    await mutateAsync(playlist);
  }

  return (
    <div>
      <Dialog
        aria-labelledby="form-dialog-title"
        onClose={handleClose}
        open={open}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <DialogTitle color="primary" id="form-dialog-title">
            Add playlist
          </DialogTitle>
          <DialogContent>
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      label="Name"
                      variant="filled"
                      value={value}
                      fullWidth
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: 'The name is required' }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              startIcon={
                isLoading ? (
                  <CircularProgress color="inherit" size={25} />
                ) : null
              }
            >
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

PlaylistAdd.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool
};

export default PlaylistAdd;