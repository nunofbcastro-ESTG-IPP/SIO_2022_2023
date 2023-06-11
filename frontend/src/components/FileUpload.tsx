import { useDropzone } from 'react-dropzone';
import React, { useCallback } from 'react';

interface props {
  setSelectedFile: (file: File) => void;
}

export default function FileUpload(props: props) {
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      acceptedFiles.forEach((file: any) => {
        props.setSelectedFile(file);
      });
    },
    [props]
  );

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        'text/xml': [],
      },
      onDrop,
    });

  const acceptedFileItems = acceptedFiles.map((file: any) => (
    <li key={file.path} className="text-black">
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }: any) => (
    <li key={file.path} className="text-black">
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e: any) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
      >
        <input {...getInputProps()} />
        <span className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span className="font-medium text-gray-600">
            Drop files to Attach, or{' '}
            <span className="text-blue-500 underline">browse</span>
          </span>
        </span>
      </div>
      <ul className="mt-4">{acceptedFileItems}</ul>
      <ul className="mt-4">{fileRejectionItems}</ul>
    </div>
  );
}
