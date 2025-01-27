const { Handler } = require('@netlify/functions');
const axios = require('axios');

exports.handler = async (event) => {
  try {
    const formData = await event.formData();
    const file = formData.get('file');

    const apiKey = process.env.FILETRANSFER_IO_API_KEY;
    const uploadUrl = `https://api.filetransfer.io/upload?api_key=${apiKey}`;

    const response = await axios.post(uploadUrl, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data.success) {
      throw new Error(`Upload failed: ${response.data.message}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File uploaded successfully!', downloadUrl: response.data.link }),
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error uploading file.' }),
    };
  }
};