const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const fs= require('fs');
const ejs = require("ejs");
const path = require("path");

const PORT = 5000;
app.use(express.json());


//Set ejs as view engine
app.set('view engine', 'ejs');

app.post("/generate-pdf", async (req, res) => {
    // Access posted data from req.body
    const data = req.body;
    console.log(data);
     // Render the EJS template with dynamic data
    // const htmlContent = await ejs.renderFile(__dirname+'/views/htmlTemplate.ejs', { data });
    const htmlContent = await ejs.renderFile('views/htmlTemplate.ejs', { data });
    // Launch a headless browser instance
    const browser = await puppeteer.launch();
    // Open a new page
    const page = await browser.newPage();
    // Set the HTML content of the page
    await page.setContent(htmlContent);
    // Generate PDF from the HTML content
    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true
    });
    // Close the browser
    await browser.close();
    // Send the PDF buffer as response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="example.pdf"');
    res.send(pdfBuffer);
});

 
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});