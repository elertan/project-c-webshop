import {StyledComponentProps, StyleRulesCallback} from "@material-ui/core";

export type StyleProps = StyledComponentProps<
  "root" |
  "title" |
  "subtitle" |
  "image" |
  "imageContainer" |
  "textContainer"
  >;

const styles: StyleRulesCallback = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 50,
    width: '100vw',
    overflow: 'hidden'
  },
  textContainer: {
    textAlign: 'center'
  },
  title: {
    fontSize: 36
  },
  subtitle: {
    margin: 20
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 500
  },
  image: {
    width: 150
  }
});

export default styles;
