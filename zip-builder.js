const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

// Paths
const rootDir = __dirname;
const webAppDistDir = path.join(rootDir, 'web-app', 'dist');
const apkSrc = path.join(rootDir, '.build-outputs', 'app-debug.apk');
const apkDest = path.join(webAppDistDir, 'app-debug.apk');
const distZipDest = path.join(webAppDistDir, 'dist.zip');
const projectZipDest = path.join(webAppDistDir, 'project.zip');

console.log("--- STARTING WORKSPACE ZIP & REQUISITE COMPRESSION ENGINE ---");

// 1. Copy APK file from /.build-outputs to /web-app/dist/app-debug.apk
console.log("Copying Compiled Android App (APK)...");
try {
  if (fs.existsSync(apkSrc)) {
    fs.copyFileSync(apkSrc, apkDest);
    console.log(`Success: Copied APK to ${apkDest}`);
  } else {
    console.error(`Error: Compiled APK not found at ${apkSrc}`);
  }
} catch (e) {
  console.error("Failed to copy APK:", e);
}

// 2. Compress Compiled Web-App dist folder into dist.zip
console.log("Compressing Web compiled build...");
try {
  const distZip = new AdmZip();
  // We only add files and subdirectories of /web-app/dist, EXCLUDING any existing zip or apk files!
  const items = fs.readdirSync(webAppDistDir);
  for (let item of items) {
    const fullPath = path.join(webAppDistDir, item);
    const isDir = fs.statSync(fullPath).isDirectory();
    
    // Ignore previously created zips or apks
    if (item === 'dist.zip' || item === 'project.zip' || item === 'app-debug.apk') {
      continue;
    }
    
    if (isDir) {
      distZip.addLocalFolder(fullPath, item);
    } else {
      distZip.addLocalFile(fullPath);
    }
  }
  
  distZip.writeZip(distZipDest);
  console.log(`Success: Generated dist.zip at ${distZipDest}`);
} catch (err) {
  console.error("Web compression failed:", err);
}

// 3. Compress full Project Source into project.zip
console.log("Compressing full project source files...");
try {
  const projectZip = new AdmZip();
  
  function addDirectoryToZip(localPath, zipPath = "") {
    const items = fs.readdirSync(localPath, { withFileTypes: true });
    for (let item of items) {
      const fullPath = path.join(localPath, item.name);
      const itemZipPath = zipPath ? `${zipPath}/${item.name}` : item.name;

      // Filter heavy and generated folders to keep project.zip clean and lightweight
      if (item.name === 'node_modules' || 
          item.name === '.gradle' || 
          item.name === 'build' || 
          item.name === '.git' || 
          item.name === '.kotlin' ||
          item.name === 'dist' || // Skip web-app's output folder
          item.name === 'dist.zip' || 
          item.name === 'project.zip' ||
          item.name === 'zip-builder.js' ||
          item.name === 'app-debug.apk') {
        continue;
      }

      if (item.isDirectory()) {
        addDirectoryToZip(fullPath, itemZipPath);
      } else {
        projectZip.addLocalFile(fullPath, zipPath);
      }
    }
  }

  addDirectoryToZip(rootDir);
  projectZip.writeZip(projectZipDest);
  console.log(`Success: Generated project.zip at ${projectZipDest}`);
} catch (err) {
  console.error("Project compression failed:", err);
}

console.log("--- COMPRESSION COMPLETE ---");
