import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

// Prompt the user for a URL
inquirer
  .prompt([{
    message: 'Enter the URL: ',
    name: 'url'
  }])
  .then((answers) => {
    // Get the URL from the user's input
    const url = answers.url; // Corrected from answers.URL to answers.url
    let i=1;
    // Generate the QR code image
    const qr_svg = qr.image(url); // Pass the variable url instead of the string 'url'
    qr_svg.pipe(fs.createWriteStream(`qr_image${i}.png`)); // Save the QR code as an image
    i++;
    // Save the user input to a text file
    fs.writeFile('user_input.txt', url, (err) => {
      if (err) {
        console.error('Error writing to file', err);
      } else {
        console.log('User  input saved to user_input.txt');
      }
    });

    console.log('QR code generated and saved as qr_image.png');
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.error('Prompt could not be rendered in the current environment');
    } else {
      // Something else went wrong
      console.error('An error occurred:', error);
    }
  });