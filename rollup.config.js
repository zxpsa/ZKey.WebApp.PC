import typescript from '@rollup/plugin-typescript';
import jsx from 'acorn-jsx';
import resolve from '@rollup/plugin-node-resolve';
import commonjsPlugin from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
// import copy from 'rollup-plugin-copy';
// PostCSS plugins
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import csspreset from 'postcss-preset-env';
import cssnano from 'cssnano';
import vuePlugin from 'rollup-plugin-vue';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import url from "@rollup/plugin-url";
// import less from "rollup-plugin-less";
import styles from "rollup-plugin-styles";
import path from 'path';
import alias from '@rollup/plugin-alias';

/**
 * 
 * @param {Object} param0
 * @param {String} param0.format 五种输出格式：amd /  es6 / iife / umd / cjs 
 * @param {String} param0.target js 代码版本  esnext es5 es2015
 * @param {Boolean} param0.compress 是否压缩
 * 
 */
function createConfig({format = 'esm',target = 'esnext',compress = false,extractCSS=true }) {
    let minTag = compress?'.min':'';
    let output = [];
    if (format == 'esm') {
        if (compress) throw Error('ES6模块不能压缩');
        output.push({
            file: `./dist/index.esm${minTag}.js`,
            format:'esm',
            sourcemap: false,
            paths: {
                // 'ant-design-vue/es/style/themes/default.less':path.resolve(__dirname,'./node_modules/ant-design-vue/es/style/themes/default.less')
            }
        });
    }else{
        output.push({
            name: "ZKeyWebappLayer",
            file: `./dist/index${minTag}.js`,
            format: 'iife',
            sourcemap: false,
            paths: {}
        });
    }
    return {
        input: './src/index.js',
        treeshake: true,
        output,
        acornInjectPlugins: [jsx()],
        plugins: [
            // replace({
            //     'ant-design-vue/es':'ant-design-vue/es',
            //     'ant-design-vue':'ant-design-vue1'
            // }),
            
            alias({
                entries: [
                    { find: '@/components', replacement: path.resolve(__dirname,'./src/libs/ant-design-vue-pro-3/src/components') },
                    { find: '@/layouts', replacement: path.resolve(__dirname,'./src/libs/ant-design-vue-pro-3/src/layouts') },
                ]
            }),
            // alias({
            //     entries: [
            //         { find: '~ant-design-vue', replacement: path.resolve(__dirname,'./node_modules/ant-design-vue') },
            //     ],
            //     customResolver:resolve({ extensions: ['.less'] }),
            // }),
            url({
                limit: 10 * 1024, // inline files < 10k, copy files > 10k
            }),
            resolve({ extensions: ['.mjs', '.js', '.jsx', '.json', '.ts','.vue','.png','.less','.tsx'] }),
            commonjsPlugin({ include:'node_modules/**',extensions: ['.js','.jsx','.tsx'] }),
            // , '**/*.jsx','*/*.jsx'
            typescript({
                // include:[ '*.ts+(|x)', '**/*.ts+(|x)' ],
                exclude:[
                    'src/**.png'
                ],
                noImplicitAny: true,
                tsconfig: false,
                // experimentalDecorators: true,
                lib: ["es5", "es6", "dom", "es7", "es2015.promise"],
                target,
                allowJs: true,
                importHelpers: true,
                removeComments:true,
                jsx:"preserve",
                jsxFactory:"h"
            }),
            vuePlugin({
                css: false,
                // preprocessStyles:true,
                defaultLang:{ script: 'ts' },
                // javascriptEnabled: true,
                // style:{
                //     postcssOptions:{
                //         javascriptEnabled: true,
                //     },
                //     postcssPlugins:[
                //         (aa,a1,a2)=>{
                //             console.log(aa,a1,a2);
                //             console.log(arguments);
                //         }
                //     ]
                // }
                // template: { 
                //     optimizeSSR: true,
                //     // transpileOptions:{
                //     //     target: { chrome: 48, firefox: 44 }
                //     // }
                // } 
            }),
            // less({
            //     // include: ['node_modules/**.less','libs/**.less','src/**.less', 'test/**.less'],
            //     option:{
            //         rootpath:path.resolve(__dirname,'./src'),
            //         javascriptEnabled: true,
            //         // logLevel:1
            //     }
            // }),
            // styles({
            //     include: ['node_modules/**','libs/**','src/**', 'test/**'],
            //     mode:['extract'],
            //     less:{
            //         javascriptEnabled: true
            //     }
            // }),
            postcss({
                name:'index.css',
                include: ['node_modules/**','libs/**','src/**', 'test/**'],
                extract:extractCSS,
                plugins: [
                    simplevars(),
                    nested(),
                    csspreset({
                        warnForDuplicates: false
                    }),
                    compress&&cssnano()
                ],
                use:{ less: { javascriptEnabled: true,rootpath:path.resolve(__dirname,'./src') } }
            }),
            compress&&terser({
                compress: {
                  pure_getters: true,
                  unsafe: true,
                  unsafe_comps: true,
                  warnings: false
                }
            }),
        ],
        watch: {
            exclude: 'node_modules/**'
        },
        external: [
            'vue',
            'vue-router',
            'vuex',
            'ant-design-vue',
            '@ant-design-vue/pro-layout'
            // 'tslib'
        ]
    };
}

export default [
    createConfig({ format: 'esm', target: 'esnext',compress: false, extractCSS: true }),
    // createConfig({ format: 'iife', target: 'es5', extractCSS: false }),
    // createConfig({ format: 'iife', target: 'es5', compress: true, extractCSS: false })
]
