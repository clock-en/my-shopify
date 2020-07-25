<template>
  <div id="page-container" class="page-container">
    <SiteHeader id="mashead" />
    <nuxt id="page-content" class="page-content" />
    <SiteFooter id="colophon" />
  </div>
</template>

<script>
import SiteHeader from '~/components/layouts/SiteHeader';
import SiteFooter from '~/components/layouts/SiteFooter';

export default {
  components: {
    SiteHeader,
    SiteFooter
  }
};
</script>
