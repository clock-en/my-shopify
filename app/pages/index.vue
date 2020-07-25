<template>
  <div class="page-content" data-sidebar="false">
    <main id="main" class="page-content__main-section">
      <div class="hero">
        <img
          src="https://placehold.jp/1920x540.png?text=TOP%E7%94%A8%E7%94%BB%E5%83%8F"
          alt
        />
      </div>
      <section class="home-section">
        <h2 class="swc-heading--h2 swc-helper-center">NEW ARRIVALS</h2>
        <p class="swc-helper-center">新しく登録した商品順で5件表示</p>
        <ProductsList :products="newArrivals" />
      </section>
    </main>
  </div>
</template>

<script>
/* Components */
import ProductsList from '~/components/products/ProductsList';

/* GraphQL */
import getNewArrivalsGql from '~/apollo/queries/getNewArrivals.gql';

/* Mixins */
import Meta from '~/mixins/meta';

export default {
  components: {
    ProductsList
  },
  mixins: [Meta],
  data() {
    return {
      meta: {
        type: 'website'
      },
      newArrivals: {}
    };
  },
  created() {
    this.getProducts(getNewArrivalsGql).then((response) => {
      this.newArrivals = response.data.products.edges;
    });
  },
  methods: {
    getProducts(gql, number = 5) {
      return this.$apollo.query({
        query: gql,
        variables: {
          count: number,
          cursor: null
        }
      });
    }
  }
};
</script>
