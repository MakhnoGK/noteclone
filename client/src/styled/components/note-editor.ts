import { makeStyles } from "@material-ui/core";
import { DRAWER_WIDTH } from "../../constants/ui";

const useEditorStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    display: 'flex',
    top: 80,
    left: (props: { drawerState: boolean }) => props.drawerState ? DRAWER_WIDTH + 20 : 20,
    right: 20,
    bottom: 20,
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  editorContainer: {
    display: 'flex',
  },
  editorContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
}));

export default useEditorStyles;
