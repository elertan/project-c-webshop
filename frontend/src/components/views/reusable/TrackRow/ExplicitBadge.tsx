import * as React from 'react';

interface IProps {}

const styles = {
  root: {
    border: '1px solid gray',
    borderRadius: 3,
    padding: 3,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 11
  } as React.CSSProperties
};

const ExplicitBadge: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <span style={styles.root}>
      EXPLICIT
    </span>
  );
};

export default ExplicitBadge;
