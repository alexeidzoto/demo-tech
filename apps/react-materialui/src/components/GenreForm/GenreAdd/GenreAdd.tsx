/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
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
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";

import { Genre } from '../../../domain/types';
import { genreService } from '../../../domain/services';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const GenreAdd = (props: any) => {
  const { open, handleClose } = props;
  const classes = useStyles();

  // const schema = yup.object().shape({
  //   name: yup.string().required(),
  // });
  // const { register, handleSubmit, formState} = useForm<Genre>({
  //   resolver: yupResolver(schema),
  // });
  const { handleSubmit, control, formState } = useForm();

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(genreService.add, {
    onSuccess: data => {
      console.log(data);
      handleClose();
    },
    onError: () => {
      alert("there was an error")
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
        <form className={classes.root} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
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
                {/* <p>{formState.errors.name?.message}</p> */}
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
// }
export default GenreAdd;