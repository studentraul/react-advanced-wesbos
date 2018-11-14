import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Item from "./Item";

const ALL_ITEMS_LIST = gql`
  query ALL_ITEMS_LIST {
    items {
      description
      id
      image
      largeImage
      price
      title
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

const Items = () => {
  return (
    <Center>
      <h1>Items</h1>
      <Query query={ALL_ITEMS_LIST}>
        {({ loading, data, error }) => {
          if (loading) {
            return <p>Loading...</p>;
          }

          if (error) {
            return <p>Error: {error}</p>;
          }
          return (
            <ItemsList>
              {data.items.map(item => (
                <Item key={item.id} {...item} />
              ))}
            </ItemsList>
          );
        }}
      </Query>
    </Center>
  );
};
export default Items;
