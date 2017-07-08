/**
 * Check out https://googlechrome.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'ionic-cache'
};


self.toolbox.router.get('/(.*)', self.toolbox.cacheFirst);
self.toolbox.router.get('/(.*)', self.toolbox.cacheFirst, {
	origin: /newsapi\.org$/
});
