/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  CircularProgress,
  Grid,
  Button,
  TextField,
} from '@material-ui/core';
import { playlistService } from '../../../domain/services';
import { Playlist } from '../../../domain/types';

const PlaylistEdit = (props: any) => {
  const { open, handleClose, initialData } = props;

  const { handleSubmit, control } = useForm();
  const queryClient = useQueryClient();

  const { data } = useQuery(['playlist', { initialData }], playlistService.get);
  const { mutateAsync, isLoading } = useMutation(playlistService.update, {
    onSuccess: data => {
      console.log(data);
      handleClose();
    },
    onError: () => {
      alert("There was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('playlists');
    }
  });

  const onSubmit = (playlist: Playlist) => {
    mutateAsync({...playlist, id: initialData});
  }

  return (
    <>
      <Dialog
        aria-labelledby="form-dialog-title"
        onClose={handleClose}
        open={open}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <DialogTitle color="primary" id="form-dialog-title">
            Edit playlist
          </DialogTitle>
          <DialogContent>
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs={12}>
              <Controller
                  name="name"
                  control={control}
                  defaultValue={data?.name}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      label="Name"
                      variant="filled"
                      fullWidth
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: 'First name required' }}
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
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

PlaylistEdit.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool
};
// }
export default PlaylistEdit;