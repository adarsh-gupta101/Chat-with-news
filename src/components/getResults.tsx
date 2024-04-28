
"use server"

import { fetchDataFromTavily } from "@/scripts/tavily";
import PrePareDataasync from "@/scripts/pinecone-prepare-docs";

export default async function getResultFromTavily(userInput: string) {
    // Call the function with user input
   await fetchDataFromTavily(userInput).then((retrievedDocs:any) => {
     console.log({ retrievedDocs });

     PrePareDataasync(retrievedDocs as any,false); // Replace arg2 and arg3 with the actual arguments
        //   PrePareDataasync(retrievedDocs as any); // Replace arg2 and arg3 with the actual arguments
     // return retrievedDocs;
   })
  }