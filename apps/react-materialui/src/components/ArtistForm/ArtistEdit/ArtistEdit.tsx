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

// styles
import useStyles from "./styles";

// domain
import { genreService } from '../../../domain/services';
import { Artist } from '../../../domain/types';

const ArtistEdit = (props: any) => {
  const { open, handleClose, initialData } = props;

  const classes = useStyles();
  
  const { handleSubmit, control } = useForm();
  const queryClient = useQueryClient();

  const { data } = useQuery(['genre', { initialData }], genreService.get);
  const { mutateAsync, isLoading } = useMutation(genreService.update, {
    onSuccess: data => {
      toast(`The artist was updated successfully`);
      handleClose();
    },
    onError: () => {
      alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('genres');
    }
  });

  const onSubmit = (genre: Artist) => {
    mutateAsync({...genre, id: initialData});
  }

  return (
    <>
      <Dialog
        aria-labelledby="form-dialog-title"
        onClose={handleClose}
        open={open}
      >
        <form className={classes.root} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <DialogTitle color="primary" id="form-dialog-title">
            Edit genre
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

ArtistEdit.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool
};
// }
export default ArtistEdit;