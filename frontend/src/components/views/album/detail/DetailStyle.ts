import {StyledComponentProps, StyleRulesCallback} from "@material-ui/core";

export type StyleProps = StyledComponentProps<
  "root" |
  "title" |
  "artistsText" |
  "image" |
  "albumContainerBackground" |
  "albumContainer" |
  "albumInnerContainer"
  >;

const styles: StyleRulesCallback = theme => ({
  root: {
  },
  title: {
    marginTop: 15,
    fontSize: 36
    
  },
  artistsText: {
  },
  albumContainer: {
    position: 'relative',
    top: -350,
    marginBottom: -350,
    padding: 35,
    display: 'flex',
    justifyContent: 'center',
  },
  albumContainerBackground: {
    filter: 'blur(25px)',
    height: 350,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  },
  albumInnerContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'

  },
  image: {
    width: 250,
    height: 250
  }
});

export default styles;
