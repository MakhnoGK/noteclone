import { makeStyles } from "@material-ui/core";

const useAppbarStyles = makeStyles((theme) => ({
  appbar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  userArea: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center'
  },
  logoutBtn: {
    color: theme.palette.common.white,
    marginLeft: theme.spacing(2)
  }
}));

export default useAppbarStyles;
