import React from "react";
import { Grid, ButtonGroup } from "@material-ui/core";
// import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { useQuery } from "react-query";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import ArtistAdd from "../../components/ArtistForm/ArtistAdd/ArtistAdd";
import ArtistEdit from "../../components/ArtistForm/ArtistEdit/ArtistEdit";
import ArtistDel from "../../components/ArtistForm/ArtistDel/ArtistDel";
import ButtonModal from "../../components/ButtonModal/ButtonModal";

import { artistService } from '../../domain/services';

// const useStyles = makeStyles(theme => ({
//   tableOverflow: {
//     overflow: 'auto'
//   }
// }))

export default function Artists() {
  // const classes: any = useStyles();

  const { data, status, error } = useQuery("artists", artistService.all) as any;

  const columns: any = [
    {
      label: "Id",
      name: "artistId",
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
      name: "artistId",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          return (
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
              <ButtonModal buttonText="Edit" formDialog={ArtistEdit} initialData={value} />
              <ButtonModal buttonText="Delete" formDialog={ArtistDel} initialData={value} />
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
      <PageTitle title="Artists" button={<ButtonModal buttonText="Add" formDialog={ArtistAdd} />}/>
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