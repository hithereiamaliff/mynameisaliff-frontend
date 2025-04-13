/**
 * Bank Logo Downloader Script
 * 
 * This script helps download official bank logos for the donation component.
 * Run this script with Node.js to download all the logos at once.
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the target directory
const targetDir = path.join(__dirname, '..', 'public', 'images', 'banks');

// Make sure the directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Bank logo URLs - replace these with the actual official URLs when available
const bankLogos = [
  {
    name: 'eWalletA.png',
    url: 'https://www.BankA2u.com.my/iwov-resources/img/eWalletA/logo-eWalletA.png'
  },
  {
    name: 'BankB.png',
    url: 'https://www.BankB.com/content/dam/BankB/my/en/who-we-are/brand/BankB_logo.png'
  },
  {
    name: 'publicbank.png',
    url: 'https://www.pbebank.com/images/logo.png'
  },
  {
    name: 'BankD.png',
    url: 'https://www.BankDgroup.com/images/logo/BankD-logo.png'
  },
  {
    name: 'hongleong.png',
    url: 'https://www.hlb.com.my/content/dam/hlb/my/images/logo/hlb-logo.png'
  },
  {
    name: 'bankislam.png',
    url: 'https://www.bankislam.com/wp-content/themes/bankislam/assets/img/logo.png'
  },
  {
    name: 'BankG.png',
    url: 'https://www.BankG.com.my/eng/image/catalog/BankG-logo.png'
  },
  {
    name: 'bankrakyat.png',
    url: 'https://www.bankrakyat.com.my/documents/31182/0/logo-bankrakyat.png'
  },
  {
    name: 'alliance.png',
    url: 'https://www.alliancebank.com.my/content/dam/alliance/my/images/logo/alliance-logo.png'
  },
  {
    name: 'other.png',
    url: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png' // Generic bank icon
  }
];

// Function to download a file
function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${url} to ${filePath}...`);
    
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${url} successfully!`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there was an error
      reject(err);
    });
  });
}

// Download all logos
async function downloadAllLogos() {
  console.log('Starting download of bank logos...');
  
  for (const logo of bankLogos) {
    const filePath = path.join(targetDir, logo.name);
    
    try {
      await downloadFile(logo.url, filePath);
    } catch (error) {
      console.error(`Error downloading ${logo.name}: ${error.message}`);
      console.log('Please download this logo manually.');
    }
  }
  
  console.log('All downloads complete! Check the public/images/banks directory.');
  console.log('If any logos failed to download, please download them manually using the URLs in the README.md file.');
}

// Run the download function
downloadAllLogos();

