// ==UserScript==
// @name         DJMAX Crew Score Counter & exporter
// @namespace    http://tampermonkey/net/
// @version      2.7
// @description  Count the number of specific images on the DJMAX Crew Scores page and calculate a total score based on their values.
// @author       ChatGPT & 6745
// @match        https://djmaxcrew.com/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    // Select the email field using its class name
    var emailField = document.querySelector('.email.white-text');

    // Check if the email field exists
    if (emailField !== null) {

        // Apply the blur filter to the email field
        emailField.style.filter = 'blur(3px)';

    }

})();


(function() {
    'use strict';

    const IMAGES = {
        "/img/rank/nm_1.png": 1,
        "/img/rank/nm_2.png": 2,
        "/img/rank/nm_3.png": 3,
        "/img/rank/nm_4.png": 4,
        "/img/rank/hd_1.png": 2,
        "/img/rank/hd_2.png": 4,
        "/img/rank/hd_3.png": 6,
        "/img/rank/hd_4.png": 8,
        "/img/rank/mx_1.png": 4,
        "/img/rank/mx_2.png": 6,
        "/img/rank/mx_3.png": 12,
        "/img/rank/mx_4.png": 16,
        "/img/rank/ex_1.png": 4, //change me if not true
        "/img/rank/ex_2.png": 6, //change me if not true
        "/img/rank/ex_3.png": 12, //change me if not true
        "/img/rank/ex_4.png": 16, //change me if not true
    };

    let totalScore = 0;

    // Find all images on the page and count the number of occurrences of each one
    const imageElements = document.querySelectorAll("img");
    const imageCounts = {};
    imageElements.forEach((img) => {
        const src = img.getAttribute("src");
        if (src in IMAGES) {
            const value = IMAGES[src];
            imageCounts[src] = (imageCounts[src] || 0) + 1;
            totalScore += value;
        }
    });

    // Append the total score to the specified div element
    const progressWrapper = document.querySelector("div.progress-wrapper.section");
    const totalScoreElement = document.createElement("span");
    totalScoreElement.textContent = `Leadboard score: ${totalScore}  `;
    progressWrapper.appendChild(totalScoreElement);
})();

(function() {
  'use strict';


  // Select the table body element
  const tableBody = document.querySelector('tbody');

  // Create an array to hold the table rows
  const rows = [];

  // Loop through each row in the table
  tableBody.querySelectorAll('tr').forEach((row) => {
    // Get the DJMAX and song name cells
    const artist = row.querySelector('td:first-child').textContent.replace(/,/g, ' ');
    const song = row.querySelector('td:nth-child(2)').textContent.replace(/,/g, ' ');

   // Get the score and max combo cells
      const rankImages = {
  "/img/rank/none.png":"",
  "/img/rank/nm_1.png": "[Bronze]",
  "/img/rank/nm_2.png": "[Silver]",
  "/img/rank/nm_3.png": "[Gold]",
  "/img/rank/nm_4.png": "[Max Combo]",
  "/img/rank/hd_1.png": "[Bronze]",
  "/img/rank/hd_2.png": "[Silver]",
  "/img/rank/hd_3.png": "[Gold]",
  "/img/rank/hd_4.png": "[Max Combo]",
  "/img/rank/mx_1.png": "[Bronze]",
  "/img/rank/mx_2.png": "[Silver]",
  "/img/rank/mx_3.png": "[Gold]",
  "/img/rank/mx_4.png": "[Max Combo]",
  "/img/rank/ex_1.png": "[Bronze]",
  "/img/rank/ex_2.png": "[Silver]",
  "/img/rank/ex_3.png": "[Gold]",
  "/img/rank/ex_4.png": "[Max Combo]"
};


      const scoreCell = row.querySelector('td:nth-child(3)');
      const scoreCell2 = row.querySelector('td:nth-child(4)');
      const scoreCell3 = row.querySelector('td:nth-child(5)');
      const scoreCell4 = row.querySelector('td:nth-child(6)');
      const nmImg = scoreCell.querySelector('img[title^="Score"]');
      const hdImg = row.querySelector('td:nth-child(4) img[title^="Score"]');
      const mxImg = row.querySelector('td:nth-child(5) img[title^="Score"]');
      const exImg = row.querySelector('td:nth-child(6) img[title^="Score"]');
      const nm = nmImg ? `"${nmImg.getAttribute('title').replace(/Score: ([\d,]+).*/, '$1').replace(/,/g, '')}"` : '';
      const hd = hdImg ? `"${hdImg.getAttribute('title').replace(/Score: ([\d,]+).*/, '$1').replace(/,/g, '')}"` : '';
      const mx = mxImg ? `"${hdImg.getAttribute('title').replace(/Score: ([\d,]+).*/, '$1').replace(/,/g, '')}"` : '';
      const ex = exImg ? `"${exImg.getAttribute('title').replace(/Score: ([\d,]+).*/, '$1').replace(/,/g, '')}"` : '';
      const nmRankImg = scoreCell.querySelector('img');
      const hdRankImg = scoreCell2.querySelector('img');
      const mxRankImg = scoreCell3.querySelector('img');
      const exRankImg = scoreCell4.querySelector('img');
      const nmRank = nmRankImg ? rankImages[nmRankImg.getAttribute('src')] : '';
      const hdRank = hdRankImg ? rankImages[hdRankImg.getAttribute('src')] : '';
      const mxRank = mxRankImg ? rankImages[mxRankImg.getAttribute('src')] : '';
      const exRank = exRankImg ? rankImages[exRankImg.getAttribute('src')] : '';


    // Create an array with the row data
    const rowData = [artist, song, nm + nmRank, hd + hdRank, mx + mxRank + ex + exRank];

    // Add the row to the rows array
    rows.push(rowData);
  });

  // Convert the rows array to a CSV string
  const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");

  // Create a button to download the CSV file
  const downloadButton = document.createElement("button");
  downloadButton.textContent = "Export Scores";
  downloadButton.onclick = function() {
    // Create a download link for the CSV file
    const downloadLink = document.createElement("a");
    downloadLink.href = encodeURI(csvContent);
    var url = window.location.href;
    var lastSegment = url.substring(url.lastIndexOf("/") + 1);
    var downloadFilename = (lastSegment === "pop") ? "POP MIXING Scores.csv" : "STAR MIXING Scores.csv";
    downloadLink.download = downloadFilename;

    // Click the download link to download the CSV file
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Add the button to the progress-wrapper section
  const progressWrapper = document.querySelector('div.progress-wrapper.section');
  progressWrapper.appendChild(downloadButton);
})();

