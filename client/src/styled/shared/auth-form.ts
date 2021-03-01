import { makeStyles } from "@material-ui/core";

const useAuthStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: theme.palette.grey[100]
  },
  formContainer: {
    margin: '0 auto',
    padding: theme.spacing(4),
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    [theme.breakpoints.up('sm')]: {
      width: 'unset'
    }
  },
  typography: {
    textAlign: 'center'
  },
  formControl: {
    display: 'block',
    width: '100%',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(2)
    }
  },
  textField: {
    width: '100%'
  }
}));

export default useAuthStyles;
