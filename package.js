const fs = require('fs');
const packager = require('electron-packager');

const pkg = {
  name: 'MyApp',
  productName: 'MyApp',
  version: '0.0.1',
  main: 'main.js'
}

fs.writeFile('./build/package.json', JSON.stringify(pkg), function(err) {
    if(err) {
      console.log(err);
    } else {
      packager({
        dir: './build',
        arch: 'all', // ia32, x64, all
        platform: 'all', // linux, win32, darwin, mas, all
        'app-copyright': '',
        'app-version': pkg.version,
        prune: false,
        out: './release'
      }, function(err){
        if (err) console.error(err);
      });
    }
});
