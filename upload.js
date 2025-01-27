const { Handler } = require('@netlify/functions');
const busboy = require('busboy');
const fs = require('fs');

exports.handler = async (event) => {
  const { headers, body } = event;

  return new Promise((resolve, reject) => {
    const bb = busboy({ headers });

    bb.on('file', async (fieldname, file, info) => {
      const { filename, mimeType } = info;

      // Basic file type validation
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']; 
      if (!allowedTypes.includes(mimeType)) {
        reject({
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid file type' })
        });
        return;
      }

      // Temporary file path (adjust as needed)
      const filePath = `/tmp/${filename}`; 

      try {
        await file.pipe(fs.createWriteStream(filePath)).on('error', (err) => {
          reject({
            statusCode: 500,
            body: JSON.stringify({ error: 'Error writing file' })
          });
        });

        resolve({
          statusCode: 200,
          body: JSON.stringify({ message: 'File uploaded successfully' })
        });

      } catch (err) {
        reject({
          statusCode: 500,
          body: JSON.stringify({ error: 'Error uploading file' })
        });
      }
    });

    bb.on('error', (err) => {
      reject({
        statusCode: 500,
        body: JSON.stringify({ error: 'Error parsing request' })
      });
    });

    bb.end(body);
  });
};