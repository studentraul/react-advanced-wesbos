import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";

import Page from "../components/Page";
import withData from "../lib/withData";

class CustomApp extends App {
  // Particularity from next to get "page=1... page=2... etc"
  static async getInitialProps({ Component, context }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(context);
    }
    // This exposes query to the user
    // pageProps.query = context.query; //not working =S
    // console.log("VAI SE FODER", context);
    
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(CustomApp);
