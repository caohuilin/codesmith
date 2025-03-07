import webpack from 'webpack';
import { ora } from '@modern-js/utils';
import { getWebpackConfig } from '../constants';

export async function build() {
  const spinner = ora('Loading unicorns').start();
  spinner.color = 'yellow';
  spinner.text = 'Building';
  const pwd = process.cwd();
  return new Promise<void>((resolve, reject) => {
    webpack(getWebpackConfig(pwd), (error, stats) => {
      if (error || stats?.hasErrors()) {
        spinner.stop();
        reject(error || stats?.compilation.errors.join('\n'));
      }
      spinner.stop();
      resolve();
    });
  }).catch(err => {
    if (err) {
      throw err;
    }
  });
}
