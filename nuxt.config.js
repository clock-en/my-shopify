const PATH = require('path');
const STORE_URL = 'https://xn-cck2ba4clb3006j264b.myshopify.com';
const SHOPIFY_TOKEN = 'cc3f475ef8565856632f918782f58cd5';
const { createApolloFetch } = require('apollo-fetch');

export default {
  srcDir: 'app',
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=1280' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/styles/main'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    /*{
      src: '~/plugins/global-components'
    },
    {
      src: '~/plugins/vendors'
    },*/
    {
      src: '~/plugins/helpers'
    },
    {
      src: '~/plugins/filters/roundUp'
    },
    {
      src: '~/plugins/filters/digitComma'
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/apollo'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Apollo module configuration
   ** See https://github.com/nuxt-community/apollo-module
   */
  apollo: {
    clientConfigs: {
      /* Shopify: Storefront API */
      default: {
        httpEndpoint: `${STORE_URL}/api/2020-04/graphql.json`,
        httpLinkOptions: {
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN
          }
        },
        persisting: false
      }
    }
  },
  generate: {
    routes: function() {
      const uri = `${STORE_URL}/api/2020-04/graphql.json`;
      const apolloFetch = createApolloFetch({ uri });

      apolloFetch.use(({ request, options }, next) => {
        if (!options.headers) {
          options.headers = {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN
          };
        }
        next();
      });

      return apolloFetch({
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
          count: 100,
          cursor: null
        }
      }).then((response) => {
        let collections = response.data.collections.edges;
        let routings = [];
        collections.forEach((collection) => {
          routings.push({
            route: `/products/${collection.node.handle}`,
            payload: collection.node
          });
        });
        return apolloFetch({
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
            count: 100,
            cursor: null
          }
        }).then((response) => {
          let products = response.data.products.edges;
          products.forEach((product) => {
            if (product.node.collections.edges.length === 0) {
              return false;
            }
            routings.push({
              route: `/products/${product.node.collections.edges[0].node.handle}/${product.node.handle}`,
              payload: product.node
            });
          });
          return routings;
        });
      });
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      /* aliasの拡張 */
      const addAliases = {
        '@nm@': PATH.join(__dirname, 'node_modules')
      };
      Object.assign(config.resolve.alias, addAliases);

      config.module.rules.push({
        test: /\.(sass|scss)$/,
        use: {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              includePaths: ['./node_modules']
            }
          }
        }
      });
    }
  }
};
