// import { resolve } from 'path'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { svgBuilder } from 'vite-svg-plugin'
import mkcert from 'vite-plugin-mkcert'
import glsl from 'vite-plugin-glsl'
// import {nativeSW} from 'vite-plugin-native-sw'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svgBuilder({ path: './svg/', prefix: '' }),
        glsl(),
		svelte(),
		// nativeSW({
		  // entries: [{
			// src: resolve(__dirname, 'workers/service-worker.js'),
			// dist: 'sw.js',
		  // }]
		// }),
		mkcert()
	],
	build: {
		outDir: 'public',
		emptyOutDir: false
	},
	server: {
		host: '127.0.0.1',
		port: 8080,
		https: true,
	}
})
