import './globus.js'
import './app.css'
import App from './App.svelte'

// const app = new App({
  // target: document.getElementById('app'),
// })

// export default app
if (location.protocol === 'https:') {
	// L.gmx._sw = '1';	// признак загрузки данных через Service Worker
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('../gmx-sw1.js')
		  .then(function(registration) {
			if (registration.active) {
				// L.gmx.serviceWorker = registration.active;
			}
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		  })
		  .catch(function(err) {
			console.log('ServiceWorker registration failed: ', err);
		  });
	} else {
		console.error('Your browser does not support Service Workers.');
	}
}