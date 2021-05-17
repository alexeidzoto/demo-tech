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
import { toast } from 'react-toastify';

// domain
import { genreService } from '../../../domain/services';
import { Genre } from '../../../domain/types';

const GenreEdit = (props: any) => {
  const { open, handleClose, initialData } = props;

  const { handleSubmit, control } = useForm();
  const queryClient = useQueryClient();

  const { data: dataGenre } = useQuery(['genre', { initialData }], genreService.get);
  const { mutateAsync, isLoading } = useMutation(genreService.update, {
    onSuccess: data => {
      toast(`The genre was updated successfully`);
      handleClose();
    },
    onError: () => {
      alert("There was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('genres');
    }
  });

  const onSubmit = (genre: Genre) => {
    mutateAsync({...genre, id: initialData});
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
            Edit genre
          </DialogTitle>
          <DialogContent>
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs={12}>
              <Controller
                  name="name"
                  control={control}
                  defaultValue={dataGenre?.name}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      label="Name"
                      variant="filled"
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

GenreEdit.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool
};
// }
export default GenreEdit;