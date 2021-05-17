import React from "react";
import { Grid, ButtonGroup } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useQuery } from "react-query";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import PlaylistAdd from "../../components/PlaylistForm/PlaylistAdd/PlaylistAdd";
import PlaylistEdit from "../../components/PlaylistForm/PlaylistEdit/PlaylistEdit";
import PlaylistDel from "../../components/PlaylistForm/PlaylistDel/PlaylistDel";
import ButtonModal from "../../components/ButtonModal";

import { playlistService } from '../../domain/services';

export default function Playlists() {
  const { data, status, error } = useQuery("playlists", playlistService.all);

  const columns = [
    {
      label: "Id",
      name: "playlistId",
      options: {
        filter: true,
      }
    },
    {
      label: "Name",
      name: "name",
      options: {
        filter: true,
      }
    },
    {
      label: " ",
      name: "playlistId",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
              <ButtonModal buttonText="Edit" formDialog={PlaylistEdit} initialData={value} />
              <ButtonModal buttonText="Delete" formDialog={PlaylistDel} initialData={value} />
            </ButtonGroup>
          );
        }
      }
    }
  ]; /* <-- Table header columns. this is required */

  const options = {
    hasIndex: true /* <-- use numbers for rows*/,
    // customAction: action /* <-- use action button for row */,
    searchBox: true /* <-- search true or false */,
    csv: true /* <-- csv download true or false */,
    indexColumn:
      "name" /* <-- add your data first unique column name for this like _id, i used fname because i don't have a _id field in my array */,
    printButton: true,
    selectableRows: "none",
  };
  return (
    <>
      <div>
        {status === "error" && <p>Error: {error.message}</p>}
        {status === "loading" && <p>Fetching data...</p>}
      </div>

      <PageTitle title="Playlists" button={<ButtonModal buttonText="Add" formDialog={PlaylistAdd} />}/>
      <Grid container spacing={4}>
        <Grid item xs={12}>
        {status === "success" && (
          <div>
            <MUIDataTable
              title=""
              data={data}
              options={options}
              columns={columns}
            />
          </div>
        )}
          
        </Grid>
      </Grid>
    </>
  );
}