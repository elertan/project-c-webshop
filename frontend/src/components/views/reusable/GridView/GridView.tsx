import * as React from 'react';
import './GridView.css';

interface IProps {
  elements: JSX.Element[];
}

const GridView: React.SFC<IProps> = (props: IProps) => {
  return (
    <div className="GridView-root">
      {props.elements.map((element, i) =>
        <div key={i} className="GridView-element">{element}</div>
      )}
    </div>
  );
};

export default GridView;
