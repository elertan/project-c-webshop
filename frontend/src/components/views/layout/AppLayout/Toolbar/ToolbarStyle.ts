import {StyledComponentProps, StyleRulesCallback} from "@material-ui/core";
export type StyleProps = StyledComponentProps<
  "appBarTitle" |
  "appIcon" |
  "grow" |
  "margin" |
  "menuButton" |
  "toolbar" |
  "sectionDesktop" |
  "sectionMobile">


const styles: StyleRulesCallback = theme => ({
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
  }
});

export default styles;
