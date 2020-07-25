import Vue from 'vue';

/**
 * 切り上げフィルタ
 *
 * @function
 * @param {number}
 * @returns {number}
 */
Vue.filter('digitComma', function(value) {
  return String(value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
});
