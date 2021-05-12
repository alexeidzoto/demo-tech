import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';

// styles
import useStyles from "./styles";

export const LoginButtonAuthO = () => {
  const {loginWithPopup} = useAuth0();
  const classes = useStyles();

  const login = () => {
    localStorage.setItem("provider", "authO");
    loginWithPopup();
  }

  return(
    <Button size="large" className={classes.buttonAuth0} onClick={() => login()}>
      Sign in AuthO
    </Button>
  )
}