const esbuild = require('esbuild');
const {copy} = require('esbuild-plugin-copy');
const {clean} = require('esbuild-plugin-clean');
const {sassPlugin, postcssModules} = require('esbuild-sass-plugin');

const [, , watchMode] = process.argv;

const outdir = 'dist';
const options = {
  entryPoints: [
    {
      in: 'src/content-script/index.ts',
      out: 'content-script',
    },
    {
      in: 'src/service-worker/index.ts',
      out: 'service-worker',
    },
    {
      in: 'src/pages/errors/index.tsx',
      out: 'errors-page',
    },
    {
      in: 'src/pages/options/index.tsx',
      out: 'options-page',
    },
  ],
  outdir,
  bundle: true,
  write: true,
  plugins: [
    clean({
      patterns: outdir,
    }),
    copy({
      assets: [
        {from: 'assets/*', to: 'assets'},
        {from: 'public/*', to: '.'},
        {from: 'manifest.json', to: 'manifest.json'},
      ],
    }),
    sassPlugin({
      filter: /\.module\.scss$/,
      transform: postcssModules({}),
    }),
    sassPlugin({
      filter: /\.scss$/,
    }),
    logger(),
  ],
};

if (watchMode) {
  esbuild
    .context({...options})
    .then(ctx => ctx.watch())
    /**
     * wait forever
     * https://github.com/evanw/esbuild/issues/1885#issuecomment-1000866366
     * https://github.com/muxinc/elements/pull/55
     */
    .then(() => new Promise(() => undefined));
} else {
  esbuild
    .build({
      ...options,
      metafile: true,
      minify: true,
    })
    .then(result => esbuild.analyzeMetafile(result.metafile))
    .then(resultInfo => console.log(resultInfo));
}

function logger() {
  return {
    name: 'esbuild-logger',
    setup: build => {
      build.onEnd(result => {
        console.log(`build ended with ${result.errors.length} errors`);
      });
    },
  };
}
