import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;

const useNoteListStyles = makeStyles((theme) => ({
  root: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  }
}));

export default useNoteListStyles;
