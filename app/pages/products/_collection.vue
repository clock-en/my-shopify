<template>
  <div class="page-content" data-sidebar="true">
    <main id="main" class="page-content__main-section">
      <header id="jumbotron" class="swc-jumbotron">
        <figure class="swc-jumbotron__image">
          <picture>
            <source :srcset="collectionHeroImage.originalSrc" />
            <img :src="collectionHeroImage.originalSrc" alt />
          </picture>
        </figure>
        <div class="swc-jumbotron__body">
          <h1 class="swc-jumbotron__heading">{{ collectionLabel }}</h1>
        </div>
      </header>
      <div class="content-container">
        <ProductsList :products="collectionProducts" />
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
import getProductsByCollectionGql from '~/apollo/queries/getProductsByCollection.gql';

/* Mixins */
import Meta from '~/mixins/meta';

export default {
  components: {
    ProductsList,
    ProductsSidebar
  },
  mixins: [Meta],
  asyncData({ payload }) {
    if (payload) {
      return {
        meta: {
          title: payload.title
        }
      };
    }
  },
  data() {
    return {
      collection: this.$route.params.collection,
      collectionLabel: '',
      collectionHeroImage: '',
      collectionProducts: {}
    };
  },
  created() {
    this.getProducts(getProductsByCollectionGql, this.collection).then(
      (response) => {
        this.collectionLabel = response.data.collectionByHandle.title;
        this.collectionHeroImage = response.data.collectionByHandle.image;
        this.collectionProducts =
          response.data.collectionByHandle.products.edges;
      }
    );
  },
  methods: {
    getProducts(gql, handle) {
      return this.$apollo.query({
        query: gql,
        variables: {
          handleName: handle,
          cursor: null
        }
      });
    }
  }
};
</script>
