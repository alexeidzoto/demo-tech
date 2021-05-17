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
// import useStyles from "./styles";

// domain
import { albumService } from '../../../domain/services';
import { Album } from '../../../domain/types';
import { artistService } from '../../../domain/services';
import ArtistAutoComplete from '../../AutoComplete/ArtistAutoComplete/ArtistAutoComplete';

const AlbumEdit = (props: any) => {
  const { open, handleClose, initialData } = props;

  const { handleSubmit, control, reset } = useForm();
  const queryClient = useQueryClient();

  const { data: dataAlbum } = useQuery(['album', { initialData }], albumService.get) as any;
  const { data: dataArtists, status } = useQuery("artists", artistService.all) as any;
  const { mutateAsync, isLoading } = useMutation(albumService.update, {
    onSuccess: data => {
      toast(`The album was updated successfully`);
      closeModal();
    },
    onError: () => {
      alert("There was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('albums');
    }
  });

  const resetForm = () => {
    reset({
      "title": "",
      "artistId": ""
    });
  }

  const closeModal = () => {
    // resetForm();
    handleClose();
  }

  const onSubmit = async (album: Album) => {
    const artist = dataArtists.filter((item: any) => item.name === album.artistId)
    if (artist.length > 0) {
      const artistId = artist[0].artistId;
      const updateAlbum = {...album, "artistId": artistId, "id": initialData};
      await mutateAsync(updateAlbum);
    }
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
            Edit album
          </DialogTitle>
          <DialogContent>
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  defaultValue={dataAlbum?.title}
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
                <ArtistAutoComplete label="Artists" variant="filled" control={control} data={dataArtists} status={status} defaultValue={dataAlbum} />
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

AlbumEdit.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool
};
// }
export default AlbumEdit;