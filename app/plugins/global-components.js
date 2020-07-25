import Vue from 'vue';

import Logo from '~/components/ui/Logo';
import Menu from '~/components/ui/Menu';
import Jumbotron from '~/components/ui/Jumbotron';

Vue.mixin({
  components: {
    Logo,
    Menu,
    Jumbotron
  }
});
