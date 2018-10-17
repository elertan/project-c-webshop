import {StyledComponentProps, StyleRulesCallback} from "@material-ui/core";
export type StyleProps = StyledComponentProps<"root" |
    "appBar" |
    "drawerPaper" |
    "content"
  >;

const drawerWidth = 240;

const styles: StyleRulesCallback = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    top: theme.spacing.unit * 8,
    marginBottom: -Math.abs(theme.spacing.unit * 8)
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    minWidth: 0, // So the Typography noWrap works
    position: 'relative',
    top: theme.spacing.unit * 8,
    marginBottom: -Math.abs(theme.spacing.unit * 8)
  },
  toolbar: theme.mixins.toolbar,
});

export default styles;

