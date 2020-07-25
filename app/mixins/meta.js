export default {
  head() {
    return {
      title: this.meta.title
        ? this.meta.title + ' | Storefront テストサイト'
        : 'Storefront テストサイト',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            this.meta.description ||
            'Shopify Storefront API のテストサイトです。'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.meta.title
            ? this.meta.title + ' | Storefront テストサイト'
            : 'Storefront テストサイト'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            this.meta.description ||
            'Shopify Storefront API のテストサイトです。'
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: this.meta.type || 'article'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://zealous-fermi-5a3a26.netlify.app${this.$route.path}`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            this.meta.image ||
            'https://zealous-fermi-5a3a26.netlify.app/dummy.jpg'
        }
      ]
    };
  }
};
