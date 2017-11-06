import typescript from "rollup-plugin-typescript2";
import uglify from "rollup-plugin-uglify-es";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";

const plugins = [
    typescript({ useTsconfigDeclarationDir: true }),
    babel({ exclude: 'node_modules/**' }),
    commonjs(),
];

// Disabling minification makes faster watch and better coverage debugging
if (!process.env.DEV) {
    plugins.push(uglify({
        output: {
            comments: /^!/,
        },
    }));
}

/**
 * This configuration is designed for building the browser version
 * of the library, ideally included using the <script> element
 */
export default {
    //name: "__pixiTween",
    input: "src/index.ts",
    sourcemap: true,
    external: ['pixi.js'],
    globals: { 'pixi.js': 'PIXI' },
    plugins: plugins,
    output: [
        {
            name: '__pixiTween',
            file: 'dist/' + pkg.name + '.js',
            format: 'cjs',
        },
        {
            name: '__pixiTween',
            file: 'dist/' + pkg.name + '.es.js',
            format: 'es',
        },
        {
            name: '__pixiTween',
            file: 'dist/' + pkg.name + '.iife.js',
            format: 'iife'
        }
    ]
};