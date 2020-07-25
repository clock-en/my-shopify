<template>
  <div class="page-content" data-sidebar="true">
    <main id="main" class="page-content__main-section">
      <header id="jumbotron" class="swc-jumbotron">
        <figure class="swc-jumbotron__image">
          <picture>
            <source srcset="https://placehold.jp/4460x2974.png?text=Noimage" />
            <img src="https://placehold.jp/4460x2974.png?text=Noimage" alt />
          </picture>
        </figure>
        <div class="swc-jumbotron__body">
          <h1 class="swc-jumbotron__heading">Products</h1>
        </div>
      </header>
      <div class="content-container">
        <section
          v-for="collection in collections"
          :key="collection.node.handle"
        >
          <div class="swc-h2-heading">
            <h2 class="swc-h2-heading__label">
              {{ collection.node.title }}
            </h2>
          </div>
          <ProductsList :products="collection.node.products.edges" />
          <div class="swc-helper-center">
            <a
              :href="`/products/${collection.node.handle}/`"
              class="swc-button swc-button--secondary swc-button--raised"
            >
              {{ collection.node.title }}一覧へ
            </a>
          </div>
        </section>
      </div>
    </main>
    <ProductsSidebar />
  </div>
</template>

<script>
/* Components */
import ProductsList from '~/components/products/ProductsList';
import ProductsSidebar from '~/components/layouts/ProductsSidebar';

/* GraphQL */
import getProductsGql from '~/apollo/queries/getProducts.gql';

/* Mixins */
import Meta from '~/mixins/meta';

export default {
  components: {
    ProductsList,
    ProductsSidebar
  },
  mixins: [Meta],
  data() {
    return {
      meta: {
        title: 'Products'
      },
      collections: []
    };
  },
  created() {
    this.getProducts(getProductsGql).then((response) => {
      this.collections = response.data.collections.edges;
    });
  },
  methods: {
    getProducts(gql) {
      return this.$apollo.query({
        query: gql
      });
    }
  }
};
</script>
