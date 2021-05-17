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
import { toast } from 'react-toastify';

// domain
import { Genre } from '../../../domain/types';
import { genreService } from '../../../domain/services';

const GenreAdd = (props: any) => {
  const { open, handleClose } = props;

  const { handleSubmit, control } = useForm();

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(genreService.add, {
    onSuccess: data => {
      toast(`The genre was created successfully`);
      handleClose();
    },
    onError: () => {
      alert("There was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('genres');
    }
  });

  const onSubmit = async (genre: Genre) => {
    await mutateAsync(genre);
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
            Add genre
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
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

GenreAdd.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool
};

export default GenreAdd;
