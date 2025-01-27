const { Handler } = require('@netlify/functions');

// Replace with your actual data storage and retrieval logic
const uploadedFiles = [
  { fileName: 'file1.txt', downloadUrl: 'https://example.com/download/file1' },
  { fileName: 'file2.jpg', downloadUrl: 'https://example.com/download/file2' },
];

exports.handler = async (event) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ files: uploadedFiles }),
    };
  } catch (error) {
    console.error('Error fetching file list:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching file list.' }),
    };
  }
};