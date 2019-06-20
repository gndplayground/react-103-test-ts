import React, { Fragment, useRef, useState } from "react";
import xss from "xss";
// @ts-ignore
import { Document, Page, pdfjs } from "react-pdf";
import "./app.scss";
import logo from "./images/logo_sm_white.png";
import Sidebar from "./components/Sidebar";
import DocumentTitleIcon from "./components/Icons/DocumentTitle";
import { FileItem } from "./components/Sidebar/Sidebar";
import SnackbarContainer, {
  SnackbarVariant,
  SnackItem
} from "./components/Snackbars/Snackbars";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface FileUploaded {
  id: number;
  name: string;
  desc: string;
  content: string;
  file: File;
}

interface UploadStates {
  selected: null | number;
  fileUploaded: Array<FileUploaded>;
}

const MIMETextPlain = "text/plain";
const MIMEPDF = "application/pdf";

const App = () => {
  const [snacks, setSnacks] = useState<Array<SnackItem>>([]);

  const snacksRef = useRef(snacks);

  snacksRef.current = snacks;

  const [uploadStates, setUploadStates] = useState<UploadStates>({
    selected: null,
    fileUploaded: []
  });

  const [PDFPages, setPDFPages] = useState<{
    total: number;
  }>({
    total: 0
  });

  function removeSnack(id: number) {
    setSnacks(snacksRef.current.filter(s => s.id !== id));
  }

  function handleChangeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    e.persist();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === MIMETextPlain || file.type === MIMEPDF) {
        const newId = new Date().getTime();

        if (file.type === MIMETextPlain) {
          const reader = new FileReader();

          reader.readAsText(file);

          reader.onload = function() {
            setUploadStates({
              selected: newId,
              fileUploaded: [
                ...uploadStates.fileUploaded,
                {
                  content: reader.result as any,
                  desc: file.name,
                  name: file.name,
                  id: newId,
                  file
                }
              ]
            });
            setSnacks([
              ...snacks,
              {
                id: new Date().getTime(),
                message: "Upload success!",
                variant: SnackbarVariant.Success
              }
            ]);
          };
          reader.onerror = function() {
            setSnacks([
              ...snacks,
              {
                id: new Date().getTime(),
                message: `Error when parsing text file. ${
                  reader.error ? reader.error.toString() : ""
                }`,
                variant: SnackbarVariant.Success
              }
            ]);
          };
        } else {
          setUploadStates({
            selected: newId,
            fileUploaded: [
              ...uploadStates.fileUploaded,
              { content: "", desc: file.name, name: file.name, id: newId, file }
            ]
          });
        }
      } else {
        setSnacks([
          ...snacks,
          {
            id: new Date().getTime(),
            message: "Please select a text file or pdf file only!",
            variant: SnackbarVariant.Error
          }
        ]);
      }
    }
  }

  function handleDisplayText(text: string) {
    return {
      __html: xss.escapeHtml(text).replace(/(?:\r\n|\r|\n)/g, "<br>")
    };
  }

  function handleSelectFile(id: number) {
    setUploadStates({
      ...uploadStates,
      selected: id
    });
  }

  function onDocumentLoadError(err: Error) {
    setSnacks([
      ...snacks,
      {
        id: new Date().getTime(),
        message: `Load document failed. Cause: ${err.message}`,
        variant: SnackbarVariant.Error
      }
    ]);
  }

  function onDocumentLoadSuccess(pages: any) {
    setPDFPages({
      total: pages.numPages
    });
    setSnacks([
      ...snacks,
      {
        id: new Date().getTime(),
        message: "Load document success!",
        variant: SnackbarVariant.Success
      }
    ]);
  }

  const listFiles: Array<FileItem> | undefined = uploadStates.fileUploaded
    ? uploadStates.fileUploaded.reduce(
        (cur, f) => {
          cur.push({
            id: f.id,
            name: f.name,
            desc: f.desc
          });
          return cur;
        },
        [] as Array<FileItem>
      )
    : undefined;

  const selectedFile: FileUploaded | undefined =
    uploadStates.selected && uploadStates.fileUploaded.length > 0
      ? uploadStates.fileUploaded.find(f => f.id === uploadStates.selected)
      : undefined;

  return (
    <div className="app">
      <div className="app__sidebar">
        <Sidebar
          onSelectFile={handleSelectFile}
          selectedFile={uploadStates.selected || undefined}
          listFiles={listFiles}
          onUploadTextFile={handleChangeUpload}
          logo={logo}
        />
      </div>
      <main className="content">
        {!selectedFile && (
          <div className="content__head">
            <h1 className="content__title">
              Please upload a text or PDF file.
            </h1>
          </div>
        )}
        {selectedFile && (
          <Fragment>
            <div className="content__head">
              <span>
                <DocumentTitleIcon />
              </span>
              <h1 className="content__title">{selectedFile.name}</h1>
            </div>
            {selectedFile.file.type === MIMETextPlain && (
              <article
                dangerouslySetInnerHTML={handleDisplayText(
                  selectedFile.content
                )}
                className="content__article"
              />
            )}
            {selectedFile.file.type === MIMEPDF && (
              <div>
                <Document
                  onLoadError={onDocumentLoadError}
                  onLoadSuccess={onDocumentLoadSuccess}
                  file={selectedFile.file}
                >
                  {Array.from(new Array(PDFPages.total), (el, index) => (
                    <Page
                      className="page-pdf"
                      scale={1}
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                    />
                  ))}
                </Document>
              </div>
            )}
          </Fragment>
        )}
      </main>
      <SnackbarContainer snacks={snacks} onSnackRemove={removeSnack} />
    </div>
  );
};

export default App;
