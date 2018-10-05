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
    top: -400,
    marginBottom: -400,
    padding: 35,
    display: 'flex',
    justifyContent: 'center',
  },
  albumContainerBackground: {
    filter: 'blur(25px)',
    height: 400,
    width: '100%',
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
    height: 250,
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  }
});

export default styles;
