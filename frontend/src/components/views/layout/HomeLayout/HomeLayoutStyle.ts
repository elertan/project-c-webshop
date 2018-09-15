import {StyledComponentProps, StyleRulesCallback} from "@material-ui/core";
import {fade} from "@material-ui/core/styles/colorManipulator";
export type StyleProps = StyledComponentProps<"root" |
    "appBar" |
    "appIcon" |
    "appBarTitle" |
    "grow" |
    "margin" |
    "menuButton" |
    "drawerPaper" |
    "content" |
    "toolbar" |
    "search" |
    "searchIcon" |
    "inputRoot" |
    "inputInput" |
    "sectionDesktop" |
    "sectionMobile">

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
  appIcon: {
    width: 40,
    borderRadius: 20,
    marginRight: 15
  },
  appBarTitle: {
    fontSize: 18
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    top: theme.spacing.unit * 8,
    marginBottom: -Math.abs(theme.spacing.unit * 8)
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 350,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
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

