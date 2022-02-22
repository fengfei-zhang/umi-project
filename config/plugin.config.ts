/*
 * @Author: zhangfengfei
 * @Date: 2021-06-28 17:05:42
 * @LastEditTime: 2022-02-22 11:48:37
 * @LastEditors: zhangfengfei
 */
// Change theme plugin
import path from 'path';

function getModulePackageName(module: { context: string }) {
  if (!module.context) return null;

  const nodeModulesPath = path.join(__dirname, '../node_modules/');
  if (module.context.substring(0, nodeModulesPath.length) !== nodeModulesPath) {
    return null;
  }

  const moduleRelativePath = module.context.substring(nodeModulesPath.length);
  const [moduleDirName] = moduleRelativePath.split(path.sep);
  let packageName: string | null = moduleDirName;
  // handle tree shaking
  if (packageName && packageName.match('^_')) {
    // eslint-disable-next-line prefer-destructuring
    packageName = packageName.match(/^_(@?[^@]+)/)![1];
  }
  return packageName;
}

export default (config: any) => {
  // optimize chunks
  config.optimization
    // share the same chunks across different modules
    .runtimeChunk(false)
    .splitChunks({
      chunks: 'async',
      name: 'vendors',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: (module: { context: string }) => {
            const packageName = getModulePackageName(module);
            if (packageName) {
              return ['bizcharts', '@antv_data-set'].indexOf(packageName) >= 0;
            }
            return false;
          },
          name(module: { context: string }) {
            const packageName = getModulePackageName(module);
            if (packageName) {
              if (['bizcharts', '@antv_data-set'].indexOf(packageName) >= 0) {
                return 'viz'; // visualization package
              }
            }
            return 'misc';
          },
        },
      },
    });

  // if (process.env.NODE_ENV === 'production') {
  //   config.merge({
  //     output: {
  //       filename: `static/js/${name}.[contenthash:8].js`,
  //       chunkFilename: `static/js/[name].[contenthash:8].chunk.js`,
  //       library: `${name}`,
  //       libraryTarget: 'umd',
  //     },
  //   });

  //   config.plugin('extract-css').init((Plugin: any, args: any[]) => {
  //     return new Plugin({
  //       filename: `static/css/${name}.[contenthash:8].css`,
  //       chunkFilename: 'static/css/[name].[contenthash:8].css',
  //       ignoreOrder: true,
  //     });
  //   });
  // }
};
