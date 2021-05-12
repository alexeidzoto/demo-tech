import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  buttonAuth0: {
    backgroundColor: "white",
    width: "100%",
    textTransform: "none",
  },
  profileMenuLink: {
    fontSize: 16,
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
