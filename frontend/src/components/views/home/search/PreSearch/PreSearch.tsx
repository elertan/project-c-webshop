import * as React from 'react';
import {Typography} from "@material-ui/core";

interface IProps {}

const styles = {
  mainText: {
    marginTop: 20
  } as React.CSSProperties,
};

const PreSearch: React.SFC<IProps> = (props: IProps) => {
  return (
    <div>
      <Typography
        style={styles.mainText}
        variant="display2"
        align="center"
      >
        You can start searching by typing...
      </Typography>
      <Typography
        variant="display1"
        align="center"
      >
        Or pick one of your previous searches below
      </Typography>
    </div>
  );
};

export default PreSearch;
