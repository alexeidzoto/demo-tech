import React from "react";
import { Grid } from "@material-ui/core";
// import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { useQuery } from "react-query";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

// data

import { trackService } from '../../domain/services';

// const useStyles = makeStyles(theme => ({
//   tableOverflow: {
//     overflow: 'auto'
//   }
// }))

const dollarUS = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Playlists() {
  // const classes = useStyles();

  const { data, status, error } = useQuery("tracks", trackService.all);

  const columns = [
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
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <span>{dollarUS.format(value)}</span>
          );
        }
      }
    },
    {
      label: "",
      name: "actions",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <>
            <button onClick={() => {
              console.log(dataIndex)
            }}>
              Delete
            </button>
            <button onClick={() => window.alert(`Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`)}>
              Edit
            </button>
            </>
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
    // responsive: 'scroll',
    // expandableRows: true,
    // renderExpandableRow: (rowData, rowMeta) => {
    //   const colSpan = rowData.length + 1;
    //   return (
    //     <TableRow>
    //       <TableCell colSpan={colSpan}>
    //         Custom expandable row option. Data: {JSON.stringify(rowData)}
    //       </TableCell>
    //     </TableRow>
    //   );
    // }
  };
  
    // filter: true,
    // filterType: "checkbox",
    // viewColumns: false,
    // selectableRows: 'single',
    // selectableRowsOnClick: true,
    // elevation: 0,
    // rowsPerPage: 10,
    // responsive: 'simple',
    // filterType: 'dropdown',
  

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