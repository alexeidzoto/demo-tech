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

// styles
import useStyles from "./styles";

// domain
import { MediaType } from '../../../domain/types';
import { mediatypeService } from '../../../domain/services';

const MediaTypeAdd = (props: any) => {
  const { open, handleClose } = props;
  const classes = useStyles();

  const { handleSubmit, control } = useForm();

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(mediatypeService.add, {
    onSuccess: data => {
      toast(`The media type was created successfully`);
      handleClose();
    },
    onError: () => {
      alert("There was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('mediatypes');
    }
  });

  const onSubmit = async (mediatypes: MediaType) => {
    await mutateAsync(mediatypes);
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
            Add media types
          </DialogTitle>
          <DialogContent>
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      label="Name"
                      variant="filled"
                      defaultValue=""
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: 'The name is required' }}
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

MediaTypeAdd.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool
};

export default MediaTypeAdd;
