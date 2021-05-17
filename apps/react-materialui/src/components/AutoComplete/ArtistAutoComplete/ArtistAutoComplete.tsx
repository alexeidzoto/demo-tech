/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Controller, FieldValues, Control} from "react-hook-form";
import { Artist } from '../../../domain/types';

interface IArtistAutoComplete {
  label: string;
  variant: "standard" | "filled" | "outlined" | undefined;
  data: Array<Artist>;
  status: string;
  defaultValue: any;
  control: Control<FieldValues>;
}

export default function ArtistAutoComplete(
  {
    label,
    variant,
    data,
    status,
    defaultValue,
    control,
    ...props
  }: IArtistAutoComplete) {

  const getArtistIndex = (): number => {
    console.log(defaultValue)
    const pos = data.findIndex((artist: any) => (defaultValue.artistId === artist.artistId));
    return pos;
  }

  return (
    <>
    { status === "success" && (
      <Controller
        name="artistId"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Autocomplete
            {...props}
            id="artists"
            defaultValue={data[getArtistIndex()] || {}}
            options={data}
            autoHighlight
            getOptionLabel={(option: any) => option?.name}
            renderOption={(option) => (
              <React.Fragment>
                {option?.name}
              </React.Fragment>
            )}
            inputValue={value}
            onInputChange={(event, newInputValue) => {
              onChange(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant={variant}
                fullWidth
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            
          />
        )}
        rules={{ required: 'The artist is required' }}
      />
    )}
    </>
  );
}
