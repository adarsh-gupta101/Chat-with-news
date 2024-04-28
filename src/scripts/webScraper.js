const axios = require('axios');
const cheerio = require('cheerio');

export default async function scrapeDetails(documents) {
  const details = [];

  for (const doc of documents) {
    try {
      const response = await axios.get(doc.metadata.source);
      const html = response.data;
      const $ = cheerio.load(html);

      const title = $('title').text(); // Extract title from <title> tag
      const description = $('meta[name="description"]').attr('content'); // Extract description from meta tag

      details.push({
        title,
        description
      });
    } catch (error) {
      console.error('Error scraping details:', error);
    }
  }

  console.log(details)

  return details;
}

