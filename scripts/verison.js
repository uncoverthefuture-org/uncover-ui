const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packagesDir = path.join(__dirname, '../packages');
const packages = fs.readdirSync(packagesDir);

packages.forEach(pkg => {
  const pkgPath = path.join(packagesDir, pkg);
  const pkgJsonPath = path.join(pkgPath, 'package.json');
  const pkgJson = require(pkgJsonPath);
  
  console.log(`Versioning ${pkgJson.name}...`);
  
  // Bump version
  execSync('yarn version --patch', { cwd: pkgPath, stdio: 'inherit' });
  
  // Generate changelog (you might want to use a tool like conventional-changelog for this)
  // execSync('conventional-changelog -p angular -i CHANGELOG.md -s', { cwd: pkgPath });
  
  console.log(`${pkgJson.name} versioned successfully.`);
});