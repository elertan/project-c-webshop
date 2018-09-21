import * as React from 'react';
import {Typography, withStyles} from "@material-ui/core";
import styles, {StyleProps} from "./NotFoundStyles";
import {Link} from "react-router-dom";
import sadMarshmallowIcon from "../../../../img/sad-marshmallow.png";

interface IProps extends StyleProps {}

const NotFound: React.SFC<IProps> = (props: IProps) => {
  const classes = props.classes!;
  return (
    <div className={classes.root}>
      <div className={classes.textContainer}>
        <Typography
          className={classes.title}
          variant="title"
        >Whoopsie!</Typography>
        <Typography
          className={classes.subtitle}
          variant="subheading"
        >
          This page does not exists.
        </Typography>
        <Typography>
          Click <Link to="/">here</Link> to go home.
        </Typography>
      </div>
      <div className={classes.imageContainer}>
        <img
          className={classes.image}
          src={sadMarshmallowIcon}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(NotFound);
