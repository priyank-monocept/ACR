import React,{useState} from 'react'
import '../App.css'
import axios from 'axios'

function ACRForm() {


  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [receipt,setRecipt] = useState('')
  const [price1,setPrice1] = useState('')
  const [price2,setPrice2] = useState('')
  const [price3,setPrice3] = useState('')

  const data = {name,receipt,email,price1,price2,price3}


  const SubmitForm= async(e)=>{
    e.preventDefault()
    axios({
        method: 'get',
        url: '/generate-pdf', // Route on your Node.js server
        responseType: 'blob', // Important
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


  return (
    <div className="main-block">
      <form onSubmit={SubmitForm}>
        <div className="info">
          <input type="text" placeholder="Proposal No" name="name" value={name} onChange={(e)=>setName(e.target.value)} autoComplete="off"/>
          <br/>
            <input type="text" placeholder="Product Name" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="off"/>
            <input type="text" placeholder="Proposer Name" name="recipt" value={receipt} onChange={(e)=>setRecipt(e.target.value)} autoComplete="off"/>
            <input type="text" placeholder="Occupation of proposer" name="price1" value={price1} onChange={(e)=>setPrice1(e.target.value)} autoComplete="off"/>
            <input type="text" placeholder="SP Name" name="price2" value={price2}onChange={(e)=>setPrice2(e.target.value)} autoComplete="off"/>
           <input type="text" placeholder="SP Code" name="price3" value={price3}onChange={(e)=>setPrice3(e.target.value)} autoComplete="off"/>
        </div>
        <button type="submit">Download Pdf</button>
      </form>
      
    </div>
  );
}

export default ACRForm;