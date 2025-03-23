#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const configPath = path.join(__dirname, 'config.js');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('===========================================');
console.log('Gemini API Key Setup for Latest Summaries');
console.log('===========================================');
console.log();
console.log('You need a Gemini API key to use the AI overview feature.');
console.log('You can get one from: https://ai.google.dev/');
console.log();

// Ask user for API key
rl.question('Enter your Gemini API key: ', (apiKey) => {
  if (!apiKey || apiKey.trim() === '') {
    console.log('No API key provided. Exiting...');
    rl.close();
    return;
  }

  try {
    // Read the current config file
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    // Replace the API key
    configContent = configContent.replace(/geminiApiKey:.*?,/, `geminiApiKey: '${apiKey.trim()}',`);
    
    // Write the updated config back to the file
    fs.writeFileSync(configPath, configContent, 'utf8');
    
    console.log();
    console.log('API key has been successfully saved to config.js');
    console.log('You can now run "npm start" to start the server.');
  } catch (error) {
    console.error('Error updating config file:', error);
  }
  
  rl.close();
});
