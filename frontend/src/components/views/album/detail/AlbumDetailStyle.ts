import {StyledComponentProps, StyleRulesCallback} from "@material-ui/core";

export type StyleProps = StyledComponentProps<
  "root" |
  "title" |
  "artistsText" |
  "image" |
  "albumContainerBackground" |
  "albumContainer" |
  "albumInnerContainer" |
  "albumInnerContainerDarkenLayer"
  >;

const headerSize = 400;
const textColor = '#FFF';

const styles: StyleRulesCallback = theme => ({
  root: {
  },
  title: {
    marginTop: 25,
    fontSize: 26,
    color: textColor
  },
  artistsText: {
    marginTop: 15,
    color: textColor
  },
  albumContainer: {
    position: 'relative',
    top: -headerSize,
    marginBottom: -headerSize + 50,
    padding: 35,
    display: 'flex',
    justifyContent: 'center',
  },
  albumContainerBackground: {
    filter: 'blur(25px)',
    height: headerSize,
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  },
  albumInnerContainerDarkenLayer: {
    backgroundColor: 'rgba(20, 20, 20, 0.5)',
    position: 'relative',
    top: -headerSize,
    marginBottom: -headerSize,
    height: headerSize
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
