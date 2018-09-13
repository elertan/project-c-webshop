import gql from "graphql-tag";
import * as React from 'react';
import { Query } from 'react-apollo';
import './Home.css';

interface IProps {}

const Home: React.SFC<IProps> = (props: IProps) => {
  return (
    <div className="Home">
      <p className="Home-Title">Project 5: Webshop</p>
      <p className="Home-Subtitle">Marshmallow-Style</p>
      <p>GraphQL Test Hieronder:</p>
      <Query query={gql`
        {
          track(id: 1) {
            name
            artists {
              name
            }
          }
        }
      `}>
        {(ctx) => {
          if (ctx.loading) {
            return <p>Loading...</p>;
          }
          if (ctx.error) {
            return <p>{ctx.error!.message}</p>;
          }
          const track = ctx.data.track;
          return (
          <div>
            <div>Track met id 1 heet {track.name}</div>
          </div>
          );
        }}
      </Query>
    </div>
  );
}

export default Home;
