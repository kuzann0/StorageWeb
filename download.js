const { Handler } = require('@netlify/functions');

exports.handler = async (event) => {
  try {
    const { downloadUrl } = event.queryStringParameters; 

    if (!downloadUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing download URL' }),
      };
    }

    const response = await fetch(downloadUrl);

    if (!response.ok) {
      throw new Error(`Download failed: ${response.status} ${response.statusText}`);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': response.headers.get('content-type'),
        'Content-Disposition': `attachment; filename="${response.headers.get('content-disposition').split(';')[1].trim().slice(10)}"`, 
      },
      body: await response.blob(), 
    };
  } catch (error) {
    console.error('Error downloading file:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error downloading file.' }),
    };
  }
};