const gulp = require('gulp');
const rollup = require('rollup');
// const rollupTypescript = require('rollup-plugin-typescript');
const config = require('./rollup.config.js');
// console.log(config[0].output);
gulp.task('build', async function () {
    const bundle = await rollup.rollup(config[0]);
    // console.log(bundle.pipe);
    console.log(bundle.imports); // an array of external dependencies
    console.log(bundle.exports); // an array of names exported by the entry point
    console.log(bundle.modules); // an array of module objects
    await bundle.write(config[0].output);
})