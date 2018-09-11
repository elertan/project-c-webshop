export interface IConfig {
  GRAPHQL_URL: string;
}

const config: IConfig = {
  GRAPHQL_URL: process.env.REACT_APP_GRAPHQL_URL as string
};

export default config;
