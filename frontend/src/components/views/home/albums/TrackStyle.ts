import {StyledComponentProps, StyleRulesCallback} from "@material-ui/core";

export type StyleProps = StyledComponentProps<
  "root" |
  "page" |
  "title" |
  "duration"|
  "actions"|
  "artist" |
  "album"
  >;

const textColor = '#5f5f5f';

const trackstyles: StyleRulesCallback = theme => ({
  root: {
  },
  page: {
    paddingLeft: 60,
    overflowY: "auto",
    height: "calc(100vh - 64px)",
    max_width: "100vh",
    overflowX: "hidden"
  },
  title: {
    marginTop: 15,
    fontSize: 14,
    color: textColor,
    boxSizing: "border-box",
    width: 1400,
    textTransform: "uppercase"
  },
  duration:{
    marginTop: 15,
    fontSize: 14,
    color: textColor,
    boxSizing: "border-box",
    width: 200,
    textTransform: "uppercase"
  },
  actions: {
    marginTop: 15,
    fontSize: 14,
    color: textColor,
    boxSizing: "border-box",
    width: 225,
    textTransform: "uppercase"
  },
  artist:{
    marginTop: 15,
    fontSize: 14,
    color: textColor,
    boxSizing: "border-box",
    width: 300,
    textTransform: "uppercase"
  },
  album:{
    marginTop: 15,
    fontSize: 14,
    color: textColor,
    boxSizing: "border-box",
    width: 350,
    textTransform: "uppercase"
  }
});
export default trackstyles;
