import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Item from "./Item";

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

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

const Items = () => {
  return (
    <Query query={ALL_ITEMS_LIST}>
      {({ loading, data, error }) => {
        if (loading) {
          return <p>Loading...</p>;
        }

        if (error) {
          return <p>Error: {error}</p>;
        }
        console.log(data);
        return (
          <ItemsList>
            {data.items.map(item => (
              <Item key={item.id} title={item.title} />
            ))}
          </ItemsList>
        );
      }}
    </Query>
  );
};
export default Items;
