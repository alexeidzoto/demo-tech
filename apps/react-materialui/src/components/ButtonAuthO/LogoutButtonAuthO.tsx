import { useAuth0 } from '@auth0/auth0-react';
import Typography from '@material-ui/core/Button';

// styles
import useStyles from "./styles";

export const LogoutButtonAuthO = () => {
  const { logout } = useAuth0();
  const classes = useStyles();

  const logoutAuthO = () => {
    localStorage.removeItem("provider");
    logout()
  }

  return(
    <Typography
      className={classes.profileMenuLink}
      color="primary"
      onClick={() =>  logoutAuthO()}
    >
      Sign Out
    </Typography>
  )
}