const { Handler } = require('@netlify/functions');
const fs = require('fs');

exports.handler = async (event) => {
  const { filename } = event.queryStringParameters; 

  if (!filename) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing filename' })
    };
  }

  const filePath = `/tmp/${filename}`; 

  try {
    const fileContent = fs.readFileSync(filePath); 
    return {
      statusCode: 200,
      body: fileContent,
      headers: {
        'Content-Disposition': `attachment; filename="${filename}"` 
      }
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'File not found' })
    };
  }
};