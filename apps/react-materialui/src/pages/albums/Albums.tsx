import React from "react";
import { Grid, ButtonGroup } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useQuery } from "react-query";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import AlbumAdd from "../../components/AlbumForm/AlbumAdd/AlbumAdd";
import AlbumEdit from "../../components/AlbumForm/AlbumEdit/AlbumEdit";
import AlbumDel from "../../components/AlbumForm/AlbumDel/AlbumDel";
import ButtonModal from "../../components/ButtonModal/ButtonModal";

import { albumService } from '../../domain/services';

export default function Albums() {

  const { data, status, error } = useQuery("albums", albumService.all) as any;

  const columns: any = [
    {
      label: "Id",
      name: "albumId",
      options: {
        filter: true,
      }
    },
    {
      label: "Title",
      name: "title",
      options: {
        filter: true,
      }
    },
    {
      label: "Artist",
      name: "artistId",
      options: {
        filter: true,
      }
    },
    {
      label: " ",
      name: "albumId",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          return (
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
              <ButtonModal buttonText="Edit" formDialog={AlbumEdit} initialData={value} />
              <ButtonModal buttonText="Delete" formDialog={AlbumDel} initialData={value} />
            </ButtonGroup>
          );
        }
      }
    }
  ]; /* <-- Table header columns. this is required */

  const options: any = {
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
      <PageTitle title="Albums" button={<ButtonModal buttonText="Add" formDialog={AlbumAdd} />}/>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {status === "error" && <p>Error: {error.message}</p>}
          {status === "loading" && <p>Fetching data...</p>}
        </Grid>
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