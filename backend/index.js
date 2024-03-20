const express = require('express');
const app = express();
const PORT = 5000;

const PDFDocument = require('pdfkit');
const fs = require('fs');


//code for generate-pdf
app.get("/generate-pdf", (req,res)=>{

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="example.pdf"');

    doc.pipe(res);
    doc.fontSize(24).text('Dynamic PDF Generated with Node.js', { align: 'center' });
    doc.end();
})

app.listen(PORT, ()=>{
    console.log(`App is running at ${PORT}`)
})