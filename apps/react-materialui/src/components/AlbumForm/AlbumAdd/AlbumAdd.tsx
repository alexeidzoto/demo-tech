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
import { Album } from '../../../domain/types';
import { albumService } from '../../../domain/services';
import ArtistAutoComplete from '../../AutoComplete/ArtistAutoComplete/ArtistAutoComplete';
import { artistService } from '../../../domain/services';
import { useQuery } from "react-query";

const AlbumAdd = (props: any) => {
  const { open, handleClose } = props;

  const { handleSubmit, control, reset } = useForm();
  const { data, status } = useQuery("artists", artistService.all) as any;

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(albumService.add, {
    onSuccess: data => {
      toast(`The album was created successfully`);
      reset({
        "title": "",
        "artistId": ""
      });
      handleClose();
    },
    onError: () => {
      alert("There was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('albums');
    }
  });

  const onSubmit = async (album: Album) => {
    const getArtist = data.filter((item: any) => item.name === album.artistId)
    if (getArtist.length > 0) {
      const artistId = getArtist[0].artistId
      const newAlbum = {...album, "artistId": artistId};
      await mutateAsync(newAlbum);
    }
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
            Add album
          </DialogTitle>
          <DialogContent>
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      label="Title"
                      fullWidth
                      variant="filled"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                  rules={{ required: 'The title is required' }}
                />
              </Grid>
              <Grid item xs={12}>
                <ArtistAutoComplete label="Artists" variant="filled" control={control} data={data} status={status} defaultValue={-1} />
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

AlbumAdd.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool
};

export default AlbumAdd;
