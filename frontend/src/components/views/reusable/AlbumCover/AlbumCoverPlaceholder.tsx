import * as React from 'react';
import {Placeholder} from "semantic-ui-react";

interface IProps {
}

const AlbumCoverPlaceholder: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <div className="AlbumCover-root">
      <div className="AlbumCover-img">
        <Placeholder>
          <Placeholder.Image square/>
        </Placeholder>
      </div>
      <div className="AlbumCover-name">
        <div style={{ margin: 10 }}>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line/>
              <Placeholder.Line/>
            </Placeholder.Header>
          </Placeholder>
        </div>
      </div>
    </div>
  );
};

export default AlbumCoverPlaceholder;
