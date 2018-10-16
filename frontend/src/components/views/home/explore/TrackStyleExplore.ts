import {StyledComponentProps, StyleRulesCallback} from "@material-ui/core";



export type StyleProps = StyledComponentProps<
  "root" |
  "page" |
  "title" |
  "duration"|
  "favorite"|
  "artist" |
  "album"
  
  
  >;

const textColor = 'black';

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
    fontSize: 24,
    color: textColor,
    boxSizing: "border-box",
    width: 200,
   
  },
  duration:{
    marginTop: 15,
    fontSize: 26,
    color: textColor,
    boxSizing: "border-box",
    width: 20
  },
  favorite: {
    marginTop: 15,
    fontSize: 26,
    color: textColor,
    boxSizing: "border-box",
    width: 25
  },
  artist:{
    marginTop: 15,
    fontSize: 26,
    color: textColor,
    boxSizing: "border-box",
    width: 30
    
  },
  album:{
    marginTop: 15,
    fontSize: 26,
    color: textColor,
    boxSizing: "border-box",
    width: 35,
    
  }
});
export default trackstyles;
