import terser from "@rollup/plugin-terser";
import brotli from "rollup-plugin-brotli";

export default [
	{
		input: "./dist/mod.js",
		output: {
			file: "./dist/wctk.js",
			name: "wctk",
		},
	},
	{
		input: "./dist/mod.js",
		output: {
			file: "./dist/wctk.min.js",
			name: "wctk-min",
		},
		plugins: [terser(), brotli()],
	},
];
