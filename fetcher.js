const fs = require('fs');
const needle = require('needle');

// Get the command line arguments
const args = process.argv.slice(2);
const url = args[0];
const localFilePath = args[1];

// Function to download the resource
const downloadResource = (url, localFilePath) => {
  // Make an HTTP GET request to the URL
  needle.get(url, (error, response) => {
    if (error) {
      console.error(`Failed to download resource: ${error.message}`);
      return;
    }
    
    // Get the response data
    const data = response.body;

    // Write the data to a local file
    fs.writeFile(localFilePath, data, (error) => {
      if (error) {
        console.error(`Failed to save file: ${error.message}`);
        return;
      }
      
      // Print a success message with the file size
      const fileSize = fs.statSync(localFilePath).size;
      console.log(`Downloaded and saved ${fileSize} bytes to ${localFilePath}`);
    });
  });
};

// Call the function with the URL and local file path
downloadResource(url, localFilePath);
