import React from 'react';
import { useForm } from 'react-hook-form';

function ACRCsvUpload() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('file', data.file[0]); // Assuming you only allow single file upload

    // Send formData to your backend API using fetch or axios
    fetch('your-upload-endpoint', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('File uploaded successfully:', result);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="file"
        accept=".csv"
        {...register('file', {
          required: 'File is required',
          validate: (value) =>
            (value[0] && /csv/.test(value[0].type)) || 'Only CSV files are allowed',
        })}
      />
      {errors.file && <span className='error'>{errors.file.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default ACRCsvUpload;
