
import { getChunkedDocsFromPDF } from "@/lib/pdf-loader";
import { pineconeEmbedAndStore } from "@/lib/vector-store";
import { getPineconeClient } from "@/lib/pinecone-client";
import {ActualgetChunkedDocsFromPDF} from "@/lib/actual-pdfloader"

// This operation might fail because indexes likely need
// more time to init, so give some 5 mins after index
// creation and try again.
export default async function PrePareDataasync(retrievedDocs: any, pdf: boolean) {
  "use server"
  
  try {
    console.log("Initializing pinecone client...");
    const pineconeClient = await getPineconeClient();
    console.log("Preparing chunks from PDF file");
    if(pdf){
      const docs = await ActualgetChunkedDocsFromPDF(retrievedDocs);
      console.log(`Loading ${docs.length} chunks into pinecone...`);
      await pineconeEmbedAndStore(pineconeClient, docs);
      console.log("Data embedded and stored in pine-cone index");
    }
    const docs = await getChunkedDocsFromPDF(retrievedDocs);
    console.log(`Loading ${docs.length} chunks into pinecone...`);
    await pineconeEmbedAndStore(pineconeClient, docs);
    console.log("Data embedded and stored in pine-cone index");
  } catch (error) {
    console.error("Init client script failed ", error);
  }
}
