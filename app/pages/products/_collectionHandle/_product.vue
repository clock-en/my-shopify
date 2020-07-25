<template>
  <div class="page-content" data-sidebar="true">
    <main id="main" class="page-content__main-section">
      <div class="product-features">
        <div class="swc-grid swc-grid--equalize-2">
          <div class="swc-grid__cell">
            <div
              v-if="product.media && product.media.edges.length > 0"
              class="swc-grid"
            >
              <div
                v-for="(image, index) in product.media.edges"
                :key="image.node.previewImage.id"
                class="swc-grid__cell"
                :class="
                  index === 0 ? 'swc-grid__cell--12' : 'swc-grid__cell--3'
                "
              >
                <figure class="swc-media swc-helper-center product-image">
                  <div class="swc-media__frame">
                    <img :src="image.node.previewImage.originalSrc" />
                  </div>
                </figure>
              </div>
            </div>
          </div>
          <div class="swc-grid__cell">
            <div class="swc-h1-heading">
              <h1 class="swc-h1-heading__label">{{ product.title }}</h1>
            </div>
            <div
              v-if="product.tags && product.tags.length > 0"
              class="product-tags"
            >
              <div
                v-for="tag in product.tags"
                :key="tag"
                class="swc-chip swc-chip--secondary"
              >
                {{ tag }}
              </div>
            </div>
            <div v-if="product.collections" class="swc-lead-text">
              コレクション：{{ product.collections.edges[0].node.title }}
            </div>
            <div v-if="product.priceRange" class="swc-lead-text">
              価格：¥{{
                product.priceRange.minVariantPrice.amount | roundUp | digitComma
              }}
              <template
                v-if="
                  product.priceRange.minVariantPrice.amount !==
                    product.priceRange.maxVariantPrice.amount
                "
                >～</template
              >
            </div>
            <div class="swc-lead-text">
              在庫：
              <template v-if="product.totalInventory">
                {{ product.totalInventory }}
              </template>
              <template v-else>売り切れ</template>
            </div>
            <script>
              var Shopify = Shopify || {};
              Shopify.shop = 'xn-cck2ba4clb3006j264b.myshopify.com';
            </script>
            <div v-if="productSfId">
              <script async src="/product-reviews.js"></script>
              <div id="shopify-product-reviews" :data-id="productSfId"></div>
            </div>
            <a
              v-if="product.onlineStoreUrl"
              class="swc-button swc-button--primary swc-button--raised"
              :href="product.onlineStoreUrl"
              >商品ページへ</a
            >
          </div>
        </div>
        <section v-if="product.variants && product.variants.edges.length > 0">
          <div class="swc-h2-heading">
            <h2 class="swc-h2-heading__label">{{ product.title }}</h2>
          </div>
          <div class="swc-grid swc-grid--equalize-5">
            <div
              v-for="variant in product.variants.edges"
              :key="variant.node.id"
              class="swc-grid__cell"
            >
              <figure class="swc-media">
                <div class="swc-media__frame">
                  <img
                    v-if="variant.node.image"
                    :src="variant.node.image.originalSrc"
                    :alt="variant.node.title"
                  />
                </div>
                <figcaption>
                  {{ variant.node.title }}
                  <br />
                  ¥{{ variant.node.priceV2.amount | roundUp | digitComma }}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
        <div
          v-if="product.media"
          class="yotpo yotpo-main-widget"
          :data-product-id="productSfId"
          :data-name="product.title"
          :data-url="
            `https://xn-cck2ba4clb3006j264b.myshopify.com/products/${product.handle}`
          "
          :data-image-url="product.media.edges[0].node.previewImage.originalSrc"
          :data-description="product.description"
        >
          <script async src="/review.js"></script>
        </div>
      </div>
    </main>
    <ProductsSidebar />
  </div>
</template>

<script>
/* Components */
import ProductsSidebar from '~/components/layouts/ProductsSidebar';

/* GraphQL */
import getProductGql from '~/apollo/queries/getProduct.gql';

/* Mixins */
import Meta from '~/mixins/meta';

export default {
  components: {
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
      collectionHandle: this.$route.params.collectionHandle,
      productHandle: this.$route.params.product,
      product: {},
      productSfId: null
    };
  },
  created() {
    if (process.client) {
      this.getProducts(getProductGql, this.productHandle).then((response) => {
        this.product = response.data.productByHandle;
        this.productSfId = this.$parseGid(atob(this.product.id));
      });
    }
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

<style scoped lang="scss">
.product-features {
  max-width: 1280px;
  margin: 0 auto;
  padding: 5em;
}
.product-image {
  img {
    width: 25em;
  }
}
</style>
<style>
.yotpo .yotpo-bottomline .yotpo-icon-empty-star {
  color: #000 !important;
}
</style>
