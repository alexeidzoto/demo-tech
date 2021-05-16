import React from "react";
import { Grid, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { useQuery } from "react-query";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import GenreAdd from "../../components/GenreForm/GenreAdd/GenreAdd";
import GenreEdit from "../../components/GenreForm/GenreEdit/GenreEdit";
import GenreDel from "../../components/GenreForm/GenreDel/GenreDel";
import ButtonModal from "../../components/ButtonModal";

import { genreService } from '../../domain/services';

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Genres() {
  const classes = useStyles();

  const { data, status, error } = useQuery("genres", genreService.all);

  const columns = [
    {
      label: "Id",
      name: "genreId",
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
      name: "genreId",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
              <ButtonModal buttonText="Edit" formDialog={GenreEdit} initialData={value} />
              <ButtonModal buttonText="Delete" formDialog={GenreDel} initialData={value} />
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
      <PageTitle title="Genres" button={<ButtonModal buttonText="Add" formDialog={GenreAdd} />}/>
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