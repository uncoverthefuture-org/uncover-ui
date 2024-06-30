const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const packagesDir = path.join(__dirname, '../packages');
const packages = fs.readdirSync(packagesDir);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function executeAction(action, packageName) {
  const packagePath = path.join(packagesDir, packageName);
  console.log(`${action === 'build' ? 'Building' : 'Publishing'} ${packageName}...`);
  try {
    if (action === 'build') {
      execSync('yarn build', { cwd: packagePath, stdio: 'inherit' });
    } else if (action === 'publish') {
      execSync('yarn publish --non-interactive', { cwd: packagePath, stdio: 'inherit' });
    }
    console.log(`${packageName} ${action === 'build' ? 'built' : 'published'} successfully.`);
  } catch (error) {
    console.error(`Error ${action === 'build' ? 'building' : 'publishing'} ${packageName}:`, error.message);
  }
}

function selectiveAction(action) {
  console.log(`Available packages: ${packages.join(', ')}`);
  console.log('Enter package names separated by commas, or "*" for all packages, or press enter for no selection:');

  rl.question('', (answer) => {
    rl.close();
    let selectedPackages = answer.trim() === '*' ? packages : answer.split(',').map(p => p.trim()).filter(Boolean);
    
    if (selectedPackages.length === 0) {
      console.log('No packages selected. Exiting.');
      return;
    }

    selectedPackages.forEach(pkg => executeAction(action, pkg));
  });
}

const action = process.argv[2];
if (action !== 'build' && action !== 'publish') {
  console.error('Please specify "build" or "publish" as an argument.');
  process.exit(1);
}

selectiveAction(action);