<template>
  <div class="swc-grid swc-grid--equalize-5">
    <div
      v-for="product in products"
      :key="`newArrivals-${product.cursor}`"
      class="swc-grid__cell"
    >
      <div class="swc-media-container swc-media-container--vertical">
        <div class="swc-media-container__media">
          <figure class="swc-media">
            <div class="swc-media__frame swc-helper-square-aspect">
              <img
                v-if="product.node.images.edges.length > 0"
                :src="product.node.images.edges[0].node.originalSrc"
                :alt="product.node.title"
              />
              <img
                v-else
                src="https://placehold.jp/3d4070/ffffff/1080x1080.png?text=%E7%94%BB%E5%83%8F%E3%81%AA%E3%81%97"
                alt="No Image"
              />
            </div>
          </figure>
        </div>
        <div class="swc-media-container__body">
          <div v-if="product.node.tags.length > 0" class="product-tags">
            <div
              v-for="tag in product.node.tags"
              :key="tag"
              class="swc-chip swc-chip--secondary"
            >
              {{ tag }}
            </div>
          </div>

          <h5 class="swc-heading--h5">{{ product.node.title }}</h5>
          <p>
            ¥{{
              product.node.priceRange.minVariantPrice.amount
                | roundUp
                | digitComma
            }}
            <template
              v-if="
                product.node.priceRange.minVariantPrice.amount !==
                  product.node.priceRange.maxVariantPrice.amount
              "
              >～</template
            >
            <br />在庫：
            <template v-if="product.node.totalInventory">
              {{ product.node.totalInventory }}
            </template>
            <template v-else>売り切れ</template>
          </p>
          <a
            v-if="
              product.node.collections.edges &&
                product.node.collections.edges.length > 0
            "
            class="swc-button swc-button--primary swc-button--raised"
            :href="
              `/products/${product.node.collections.edges[0].node.handle}/${product.node.handle}/`
            "
            >詳細を見る</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: [Array, Object],
      required: true
    }
  }
};
</script>
