import Vue from 'vue';

/**
 * 切り上げフィルタ
 *
 * @function
 * @param {number}
 * @param {number}
 * @returns {number}
 */
Vue.filter('roundUp', function(value, place = 0) {
  const cursor = 10 ** place;
  return Math.ceil(value * cursor) / cursor;
});
