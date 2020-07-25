import Vue from 'vue';

class ShopifyRoutings {
  constructor() {
    this.collections = [];
    this.products = [];
    this.routings = [];
  }

  async getCollections(counter, current) {
    Vue.$apollo
      .query({
        query: `query($count: Int!, $cursor: String) {
          collections(first: $count, after: $cursor) {
            edges {
              cursor
              node {
                title
                handle
              }
            }
          }
        }`,
        variables: {
          count: counter,
          cursor: current
        }
      })
      .then((response) => {
        this.collections = response.data.collections.edges;
        this.collections.forEach((collection) => {
          this.routings.push(`/procucts/${collection.node.handle}`);
        });
      });
    return this.routings;
  }

  async getProducts(counter, current) {
    Vue.$apollo
      .query({
        query: `query($count: Int!, $cursor: String) {
          products(first: $count, after: $cursor) {
            edges {
              cursor
              node {
                title
                handle
                collections(first: 1) {
                  edges {
                    node {
                      title
                      handle
                    }
                  }
                }
              }
            }
          }
        }`,
        variables: {
          count: counter,
          cursor: current
        }
      })
      .then((response) => {
        this.products = response.data.products.edges;
        this.products.forEach((product) => {
          this.routings.push(
            `/procucts/${product.node.collections.edges[0].node.handle}/${product.node.handle}`
          );
        });
      });
    return this.routings;
  }
}

module.exports = ShopifyRoutings;
