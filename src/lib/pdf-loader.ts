// import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


export async function getChunkedDocsFromPDF(retrievedDocs: any) {
  try {
    // const loader = new PDFLoader(env.PDF_PATH);
    // const docs = await loader.load();

    
    const docs= retrievedDocs as any;
    // const pageContents: string[] = docs.retrievedDocs.map(doc=> doc.pageContent);
    // console.log(docs[0].Document.pageContent)
    // console.log(pageContents)
    // const pageContents: string[] = docs.map(doc => doc.pageContent);


    // From the docs https://www.pinecone.io/learn/chunking-strategies/
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    // const chunkedDocs = await textSplitter.splitDocuments(docs);

    const chunkedDocs = await textSplitter.createDocuments([JSON.stringify(docs)]);

    return chunkedDocs;
  } catch (e) {
    console.error(e);
    throw new Error("PDF docs chunking failed !");
  }

}
