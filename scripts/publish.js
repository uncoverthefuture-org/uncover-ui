const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packagesDir = path.join(__dirname, '../packages');
const packages = fs.readdirSync(packagesDir);

packages.forEach(pkg => {
  const pkgPath = path.join(packagesDir, pkg);
  const pkgJsonPath = path.join(pkgPath, 'package.json');
  const pkgJson = require(pkgJsonPath);
  
  console.log(`Publishing ${pkgJson.name}...`);
  
  execSync('yarn publish --non-interactive', { cwd: pkgPath, stdio: 'inherit' });
  
  console.log(`${pkgJson.name} published successfully.`);
});