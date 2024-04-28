"use client"

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfTextExtractor({cb}) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfText, setPdfText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  async function getTextFromPage(pageIndex) {
    try {
      if (!selectedFile) {
        console.error('No file selected');
        return;
      }

      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const arrayBuffer = fileReader.result;
        const pdf = await pdfjs.getDocument(arrayBuffer).promise;
        const page = await pdf.getPage(pageIndex);
        const textContent = await page.getTextContent();
        const textItems = textContent.items.map(item => item.str);
        const text = textItems.join('\n');
        setPdfText(text);
        cb(text, true)
      };

      fileReader.readAsArrayBuffer(selectedFile);
    } catch (error) {
      console.error('Error extracting text:', error);
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    getTextFromPage(pageNumber)
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".pdf" />
      {/* <Document
        file={selectedFile}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document> */}
      <p>Page {pageNumber} of {numPages}</p>
      <button onClick={() => getTextFromPage(pageNumber)}>
        Extract Text from Page
      </button>
      <div>
        <pre>{pdfText}</pre>
      </div>
    </div>
  );
}

export default PdfTextExtractor;
