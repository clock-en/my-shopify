<template>
  <div id="sidebar" class="page-content__sidebar-section">
    <nav class="page-drawer">
      <section class="page-drawer__section">
        <h3 class="page-drawer__label">
          <a href="/products/">Products</a>
        </h3>
        <ul class="swc-drawer-menu page-drawer__menu--primary">
          <li
            v-for="collection in collections.edges"
            :key="`sidebar-${collection.node.handle}`"
            class="swc-drawer-menu__item"
          >
            <a
              class="swc-drawer-menu__label page-drawer__menu__label"
              :href="`/products/${collection.node.handle}/`"
            >
              {{ collection.node.title }}
            </a>
          </li>
        </ul>
      </section>
    </nav>
  </div>
</template>

<script>
/* GraphQL */
import getCollectionsGql from '~/apollo/queries/getCollections.gql';

export default {
  data() {
    return {
      collections: []
    };
  },
  apollo: {
    collections: {
      query: getCollectionsGql,
      variables: {
        count: 10
      }
    }
  }
};
</script>
