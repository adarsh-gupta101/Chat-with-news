"use server";

import { TavilySearchAPIRetriever } from "@langchain/community/retrievers/tavily_search_api";
import PrePareDataasync from "./pinecone-prepare-docs";
import ScrapeDetails from "../scripts/webScraper";
const cheerio = require("cheerio"); // 1.0.0-rc.12
const axios = require("axios"); // 0.21.1

export async function fetchDataFromTavily(userInput, isFromPDF) {
  try {
    const retriever = new TavilySearchAPIRetriever({
      k: 3,
      apiKey: "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",
      searchDepth: "advanced",
      includeGeneratedAnswer: true,
      // includeRawCo/tent: true,
    });

    const retrievedDocs = await retriever.getRelevantDocuments(userInput);

    // console.log({News_data} );

    // let array_Data=retrievedDocs.results?.map((doc:[])=>{return doc?.raw_co/ntent as string})
    // console.log(array_Data)
    console.log({retrievedDocs})
    // console.log(retrievedDocs[0].metadata.source);
    const response = await axios.get(retrievedDocs[0].metadata.source);
    //webscrappiing
    
    const $ = cheerio.load(response.data);
    // Extract relevant data from the webpage
    const title = $("title").text().trim();
    // Extract text content from specific HTML elements
    const content = $("p").text().trim();
    console.log(
      "result after scrapping",content);

    await PrePareDataasync(content, false);
    // Replace arg2 and arg3 with the actual arguments

    // return retrievedDocs;

    // Process the retrieved documents further as needed
  } catch (error) {
    console.error(
      "Error fetching data from Tavily:====================================",
      error
    );
  }
}

// Get user input (you can modify this based on how you're receiving user input)
// const userInput = 'user query here';

// Call the function with user input
// fetchDataFromTavily(userInput);
