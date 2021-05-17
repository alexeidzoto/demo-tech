import React from "react";
import { Grid, ButtonGroup } from "@material-ui/core";
// import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { useQuery } from "react-query";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import MediaTypeAdd from "../../components/MediaTypeForm/MediaTypeAdd/MediaTypeAdd";
import MediaTypeEdit from "../../components/MediaTypeForm/MediaTypeEdit/MediaTypeEdit";
import MediaTypeDel from "../../components/MediaTypeForm/MediaTypeDel/MediaTypeDel";
import ButtonModal from "../../components/ButtonModal/ButtonModal";

import { mediatypeService } from '../../domain/services';

// const useStyles = makeStyles(theme => ({
//   tableOverflow: {
//     overflow: 'auto'
//   }
// }))

export default function MediaTypes() {
  // const classes: any = useStyles();

  const { data, status, error } = useQuery("mediatypes", mediatypeService.all) as any;

  const columns: any = [
    {
      label: "Id",
      name: "mediaTypeId",
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
      name: "mediaTypeId",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          return (
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
              <ButtonModal buttonText="Edit" formDialog={MediaTypeEdit} initialData={value} />
              <ButtonModal buttonText="Delete" formDialog={MediaTypeDel} initialData={value} />
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
      <PageTitle title="Media Types" button={<ButtonModal buttonText="Add" formDialog={MediaTypeAdd} />}/>
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