import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

export default makeStyles((theme: Theme) => ({
    root: {},
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: 1,
        marginBottom: 2
        // marginLeft: theme.spacing(3)
    },
    spacer: {
        flexGrow: 1
    },
    importButton: {
        marginRight: 1
    },
    exportButton: {
        marginRight: 1
    },
    searchInput: {
        marginRight: 1
    }
}));