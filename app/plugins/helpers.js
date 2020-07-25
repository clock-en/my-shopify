import Vue from 'vue';
import { parseGid } from '@nm@/@shopify/admin-graphql-api-utilities';

/**
 * 汎用変数の取得
 *
 * @function
 * @retuen {Object}
 */
Vue.prototype.$getUtilVars = () => {
  return {
    pathname: location.pathname,
    ua: navigator.userAgent.toLowerCase(),
    ieVer: window.navigator.appVersion.toLowerCase()
  };
};

/**
 * NodeList用each関数
 *
 * @function
 * @param {NodeList} NodeList
 * @param {Function} iteratee
 */
Vue.prototype.$elEach = (NodeList, iteratee) => {
  for (let i = 0, len = NodeList.length; i < len; i++) {
    iteratee(NodeList[i], i, NodeList);
  }
};

/**
 * Storefront API のGidをパースして返却
 *
 * @function
 * @param {string} gid
 * @param {string}
 */
Vue.prototype.$parseGid = (gid) => {
  return parseGid(gid);
};
