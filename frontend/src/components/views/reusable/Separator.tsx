import * as React from 'react';

interface IProps {
  horizontal?: boolean;
  vertical?: boolean;
  weight?: number;
}

const color = 'rgb(225, 225, 225)';
const margin = 0;// 5;

const Separator: React.SFC<IProps> = (props: IProps) => {
  if (props.horizontal) {
    return (
      <div
        style={{
          minHeight: props.weight || 1,
          width: '100%',
          backgroundColor: color,
          marginTop: margin,
          marginBottom: margin
        }}
      />
    );
  }

  if (props.vertical) {
    return (
      <div
        style={{
          minWidth: props.weight || 1,
          height: '100%',
          backgroundColor: color,
          marginLeft: margin,
          marginRight: margin
        }}
      />
    );
  }

  throw new Error('Horizontal or vertical must be set');
};

export default Separator;