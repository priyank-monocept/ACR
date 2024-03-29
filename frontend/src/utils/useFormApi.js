import axios from 'axios'

const useFormApi = (data) => {
    console.log(data);
    axios({
        method: 'post',
        url: '/generate-pdf', // Route on your Node.js server
        responseType: 'blob', //Important
        data, 
      }).then(response => {
        // Create a blob from the response data
        const blob = new Blob([response.data], { type: 'application/pdf' });
        // Create a link element to download the PDF
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'example.pdf'; // File name
        // Append the link to the body
        document.body.appendChild(link);
        // Trigger the download
        link.click();
        // Clean up
        document.body.removeChild(link);
      }).catch(error => {
        console.error('Error generating PDF:', error);
      });
}

export default useFormApi