import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { useQuery } from "react-query";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import { trackService } from '../../domain/services';

const dollarUS = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Tracks() {
  const { data, status, error } = useQuery("tracks", trackService.all) as any;

  const columns: any = [
    {
      label: "Track",
      name: "trackId",
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
      label: "Album",
      name: "albumId",
      options: {
        filter: true,
      }
    },
    {
      label: "Media Type",
      name: "mediaTypeId",
      options: {
        filter: true,
      }
    },
    {
      label: "Genre",
      name: "genreId",
      options: {
        filter: true,
      }
    },
    {
      label: "Composer",
      name: "composer",
      options: {
        filter: true,
      }
    },
    {
      label: "Milliseconds",
      name: "milliseconds",
      options: {
        filter: true,
      }
    },
    {
      label: "Milliseconds",
      name: "milliseconds",
      options: {
        filter: true,
      }
    },
    {
      label: "Bytes",
      name: "bytes",
      options: {
        filter: true,
      }
    },
    {
      label: "Unit Price",
      name: "unitPrice",
      options: {
        filter: true,
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          return (
            <span>{dollarUS.format(value)}</span>
          );
        }
      }
    },
  ]; /* <-- Table header columns. this is required */

  const options: any = {
    hasIndex: true /* <-- use numbers for rows*/,
    // customAction: action /* <-- use action button for row */,
    searchBox: true /* <-- search true or false */,
    csv: true /* <-- csv download true or false */,
    indexColumn:
      "name" /* <-- add your data first unique column name for this like _id, i used fname because i don't have a _id field in my array */,
    printButton: true,
  };
  
  return (
    <>
      <div>
        {status === "error" && <p>Error: {error.message}</p>}
        {status === "loading" && <p>Fetching data...</p>}
      </div>

      <PageTitle title="Tracks" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {status === "success" && (
            <MUIDataTable
              title="Tracks"
              data={data}
              options={options}
              columns={columns}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}