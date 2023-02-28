// ==UserScript==
// @name         Pcrew-Enhancer
// @namespace    http://tampermonkey/net/
// @version      3.2
// @description  Enhancements for Pcrew
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
        emailField.style.filter = 'blur(5px)';

    }

})();

(function() {
    'use strict';

    const IMAGES = {
        "/img/rank/nm_1.png": {value: 1, type: "Bronze"},
        "/img/rank/nm_2.png": {value: 2, type: "Silver"},
        "/img/rank/nm_3.png": {value: 3, type: "Gold"},
        "/img/rank/nm_4.png": {value: 4, type: "Max"},
        "/img/rank/hd_1.png": {value: 2, type: "Bronze"},
        "/img/rank/hd_2.png": {value: 4, type: "Silver"},
        "/img/rank/hd_3.png": {value: 6, type: "Gold"},
        "/img/rank/hd_4.png": {value: 8, type: "Max"},
        "/img/rank/mx_1.png": {value: 4, type: "Bronze"},
        "/img/rank/mx_2.png": {value: 6, type: "Silver"},
        "/img/rank/mx_3.png": {value: 12, type: "Gold"},
        "/img/rank/mx_4.png": {value: 16, type: "Max"},
        "/img/rank/ex_1.png": {value: 0, type: "Bronze"},
        "/img/rank/ex_2.png": {value: 0, type: "Silver"},
        "/img/rank/ex_3.png": {value: 0, type: "Gold"},
        "/img/rank/ex_4.png": {value: 0, type: "Max"},
    };

    let bronzeCount = 0;
    let silverCount = 0;
    let goldCount = 0;
    let maxCount = 0;


    // Find all images on the page and count the number of occurrences of each one
    const imageElements = document.querySelectorAll("img");
    const imageCounts = {};
    imageElements.forEach((img) => {
        const src = img.getAttribute("src");
        if (src in IMAGES) {
            const value = IMAGES[src].value;
            const type = IMAGES[src].type;
            imageCounts[src] = (imageCounts[src] || 0) + 1;
            if (type === "Bronze") {
                bronzeCount += 1;
            } else if (type === "Silver") {
                silverCount += 1;
            } else if (type === "Gold") {
                goldCount += 1;
            } else if (type === "Max") {
                maxCount += 1;
            }
        }
    });

 // Append the total score and count of each type of rank to the specified div element
const progressWrapper = document.querySelector("div.progress-wrapper.section");
const totalScoreElement = document.createElement("span");
totalScoreElement.style.display = "block"; // Add this line to make it a block-level element
progressWrapper.appendChild(totalScoreElement);
const rankCountsElement = document.createElement("span");
    totalScoreElement.style.display = "block";
rankCountsElement.textContent = `Bronze: ${bronzeCount}, Silver: ${silverCount}, Gold: ${goldCount}, Max Combos: ${maxCount}`;
//rankCountsElement.style.display = "block"; // Add this line to make it a block-level element
rankCountsElement.style.marginTop = "10px"; // Add this line to add a margin between the two elements
progressWrapper.appendChild(rankCountsElement);
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
      const artist = `"${row.querySelector('td:first-child').textContent}"`;
      const song = `"${row.querySelector('td:nth-child(2)').textContent}"`;


   // Get the score and max combo cells
      const rankImages = {
  "/img/rank/none.png":"",
  "/img/rank/nm_1.png": " [Bronze]",
  "/img/rank/nm_2.png": " [Silver]",
  "/img/rank/nm_3.png": " [Gold]",
  "/img/rank/nm_4.png": " [Max Combo]",
  "/img/rank/hd_1.png": " [Bronze]",
  "/img/rank/hd_2.png": " [Silver]",
  "/img/rank/hd_3.png": " [Gold]",
  "/img/rank/hd_4.png": " [Max Combo]",
  "/img/rank/mx_1.png": " [Bronze]",
  "/img/rank/mx_2.png": " [Silver]",
  "/img/rank/mx_3.png": " [Gold]",
  "/img/rank/mx_4.png": " [Max Combo]",
  "/img/rank/ex_1.png": " [Bronze]",
  "/img/rank/ex_2.png": " [Silver]",
  "/img/rank/ex_3.png": " [Gold]",
  "/img/rank/ex_4.png": " [Max Combo]"
};


      const scoreCell = row.querySelector('td:nth-child(3)');
      const scoreCell2 = row.querySelector('td:nth-child(4)');
      const scoreCell3 = row.querySelector('td:nth-child(5)');
      const scoreCell4 = row.querySelector('td:nth-child(6)');
      const nmImg = scoreCell.querySelector('img[title^="Score"]');
      const hdImg = row.querySelector('td:nth-child(4) img[title^="Score"]');
      const mxImg = row.querySelector('td:nth-child(5) img[title^="Score"]');
      const exImg = row.querySelector('td:nth-child(6) img[title^="Score"]');
      const nm = nmImg ? `"${nmImg.getAttribute('title').replace(/Score: ([\d,]+).*/, '$1')}"` : '';
      const hd = hdImg ? `"${hdImg.getAttribute('title').replace(/Score: ([\d,]+).*/, '$1')}"` : '';
      const mx = mxImg ? `"${hdImg.getAttribute('title').replace(/Score: ([\d,]+).*/, '$1')}"` : '';
      const ex = exImg ? `"${exImg.getAttribute('title').replace(/Score: ([\d,]+).*/, '$1')}"` : '';
      const nmRankImg = scoreCell.querySelector('img');
      const hdRankImg = scoreCell2.querySelector('img');
      const mxRankImg = scoreCell3.querySelector('img');
      const exRankImg = scoreCell4.querySelector('img');
      const nmRank = nmRankImg ? rankImages[nmRankImg.getAttribute('src')] : '';
      const hdRank = hdRankImg ? rankImages[hdRankImg.getAttribute('src')] : '';
      const mxRank = mxRankImg ? rankImages[mxRankImg.getAttribute('src')] : '';
      const exRank = exRankImg ? rankImages[exRankImg.getAttribute('src')] : '';


    // Create an array with the row data
    const rowData = [artist, song, nm + nmRank, hd + hdRank, mx + mxRank, ex + exRank];

    // Add the row to the rows array
    rows.push(rowData);
  });

  // Convert the rows array to a CSV string
  const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");

  // Create a button to download the CSV file
  const downloadButton = document.createElement("button");

  downloadButton.textContent = "Export Scores";
  downloadButton.style.display = "block";
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
