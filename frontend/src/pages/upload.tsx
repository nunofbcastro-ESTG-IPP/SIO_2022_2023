import { useState } from 'react';
import { Button } from '@tremor/react';
import FileUpload from '../components/FileUpload';
import toast from 'react-hot-toast';
import Head from 'next/head';
import { upload } from '@/services/api/MyAPI';

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast('FILE NOT SELECTED!');
      return;
    }

    const myPromise = upload(selectedFile);

    toast.promise(myPromise, {
      loading: 'Loading',
      success: 'File uploaded successfully!',
      error: (error) => `Error uploading file:${error.message}`,
    });
  };

  return (
    <>
      <Head>
        <title>Upload - TechHub</title>
      </Head>
      <main>
        <FileUpload setSelectedFile={setSelectedFile} />
        <Button color="gray" size="md" onClick={handleSubmit}>
          Submeter
        </Button>
      </main>
    </>
  );
}
