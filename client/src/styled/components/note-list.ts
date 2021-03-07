import { makeStyles } from '@material-ui/core';

import { DRAWER_WIDTH } from '../../constants/ui';

const useNoteListStyles = makeStyles((_theme) => ({
  root: {
    width: DRAWER_WIDTH
  },
  drawerPaper: {
    width: DRAWER_WIDTH
  }
}));

export default useNoteListStyles;
