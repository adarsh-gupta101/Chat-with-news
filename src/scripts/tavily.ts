"use server"

import { TavilySearchAPIRetriever } from "@langchain/community/retrievers/tavily_search_api";
import PrePareDataasync from "./pinecone-prepare-docs";


export async function fetchDataFromTavily(userInput: string ) {
  try {
    const retriever = new TavilySearchAPIRetriever({
      k: 3,
      apiKey: "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",
      searchDepth:"advanced"
    });
  
    const retrievedDocs = await retriever.getRelevantDocuments(userInput);
    console.log({ retrievedDocs });
    await PrePareDataasync(retrievedDocs as any);
    // Replace arg2 and arg3 with the actual arguments


    // return retrievedDocs;
    
    // Process the retrieved documents further as needed
  } catch (error) {
    console.error('Error fetching data from Tavily:', error);
  }
}

// Get user input (you can modify this based on how you're receiving user input)
// const userInput = 'user query here';

// Call the function with user input
// fetchDataFromTavily(userInput);
