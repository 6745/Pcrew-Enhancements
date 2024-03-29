// ==UserScript==
// @name         Pcrew-Enhancer
// @namespace    http://tampermonkey/net/
// @version      3.8
// @description  Enhancements for Pcrew
// @author       ChatGPT & 6745
// @match        https://djmaxcrew.com/*
// @match        https://programmedcrew.net/*
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
        "/img/rank/nm_1.png": {points: 1, type: "Bronze",Difficulty:"NM"},
        "/img/rank/nm_2.png": {points: 2, type: "Silver",Difficulty:"NM"},
        "/img/rank/nm_3.png": {points: 3, type: "Gold",Difficulty:"NM"},
        "/img/rank/nm_4.png": {points: 4, type: "Max",Difficulty:"NM"},
        "/img/rank/hd_1.png": {points: 2, type: "Bronze",Difficulty:"HD"},
        "/img/rank/hd_2.png": {points: 4, type: "Silver",Difficulty:"HD"},
        "/img/rank/hd_3.png": {points: 6, type: "Gold",Difficulty:"HD"},
        "/img/rank/hd_4.png": {points: 8, type: "Max",Difficulty:"HD"},
        "/img/rank/mx_1.png": {points: 4, type: "Bronze",Difficulty:"MX"},
        "/img/rank/mx_2.png": {points: 6, type: "Silver",Difficulty:"MX"},
        "/img/rank/mx_3.png": {points: 12, type: "Gold",Difficulty:"MX"},
        "/img/rank/mx_4.png": {points: 16, type: "Max",Difficulty:"MX"},
        "/img/rank/ex_1.png": {points: 0, type: "Bronze",Difficulty:"EX"},
        "/img/rank/ex_2.png": {points: 0, type: "Silver",Difficulty:"EX"},
        "/img/rank/ex_3.png": {points: 0, type: "Gold",Difficulty:"EX"},
        "/img/rank/ex_4.png": {points: 0, type: "Max",Difficulty:"EX"},
        "/img/rank/pp.png": {points:0, type: "PP"},
    };

    let excludedSongs;
if (window.location.href.includes("pop")) {
    excludedSongs = [
        {song: "Fermion", difficulties: ["MX"]},
        {song: "Motion", difficulties: ["NM", "HD"]},
        {song: "Hard To Start", difficulties: ["NM", "HD"]},
        {song: "Mutu", difficulties: ["NM", "HD"]},
        {song: "JBG", difficulties: ["NM", "HD"]},
        {song: "CLOSER", difficulties: ["MX"]},
        {song: "Coastal Tempo", difficulties: ["EX"]},
        {song: "DIVINE SERVICE", difficulties: ["EX"]},
        {song: "First Kiss", difficulties: ["EX"]},
        {song: "Ladymade Star", difficulties: ["EX"]},
        {song: "STOP", difficulties: ["EX"]},
        {song: "Love is Beautiful", difficulties: ["EX"]},
        {song: "Dream of Winds", difficulties: ["EX"]},
        {song: "Thor", difficulties: ["MX"]},
        {song: "The Night Stage", difficulties: ["MX"]},
        {song: "DARK ENVY", difficulties: ["MX"]},
        {song: "In my Dream", difficulties: ["EX"]},
        {song: "Cypher Gate", difficulties: ["EX"]},
        {song: "The Rain Maker", difficulties: ["EX"]},
        {song: "Ghost", difficulties: ["EX"]},
        {song: "SigNalize", difficulties: ["EX"]},
        {song: "Dark Prism", difficulties: ["EX"]},
        {song: "Pretty Girl", difficulties: ["EX"]},
        {song: "SuperSonic 2011", difficulties: ["NM", "HD","MX"]},
        {song: "In My Heart (Japanese Ver.)", difficulties: ["NM", "HD","MX"]},
        {song: "The Clear Blue Sky (Japanese Ver.)", difficulties: ["NM", "HD","MX"]},
        {song: "Step", difficulties: ["EX"]},
        {song: "Memory of Wind", difficulties: ["NM", "HD","MX"]},
    ];
} else if (window.location.href.includes("star")) {
    excludedSongs = [
        {song: "Motion", difficulties: ["NM"]},
        {song: "PARA-Q", difficulties: ["NM"]},
        {song: "JBG", difficulties: ["NM"]},
        {song: "Hard To Start", difficulties: ["NM"]},
        {song: "Mutu", difficulties: ["NM"]},
        {song: "SuperSonic 2011", difficulties: ["NM"]},
        {song: "Memory of Wind", difficulties: ["NM"]},
        {song: "The Clear Blue Sky (Japanese Ver.)", difficulties: ["NM"]},
       {song: "In My Heart (Japanese Ver.)", difficulties: ["NM"]},

    ];
} else {
    excludedSongs = [];
}
let removedSongs = [
        {song: "Motion", difficulties: ["NM", "HD","MX","EX"]},
        {song: "PARA-Q", difficulties: ["NM", "HD","MX","EX"]},
        {song: "JBG", difficulties: ["NM", "HD","MX","EX"]},
        {song: "Hard To Start", difficulties: ["NM", "HD","MX","EX"]},
        {song: "Mutu", difficulties: ["NM", "HD","MX","EX"]},
        {song: "Memory of Wind", difficulties: ["NM", "HD","MX","EX"]},


    ];

    let totalPoints = 0;
    let bronzeCount = 0;
    let silverCount = 0;
    let goldCount = 0;
    let maxCount = 0;
    let PPcount = 0;

    // Find all images on the page and count the number of occurrences of each one
    const imageElements = document.querySelectorAll("img");
    const imageCounts = {};
    imageElements.forEach((img) => {
        const src = img.getAttribute("src");
        const tableRow = img.closest("tr");
        if (tableRow) {

            const songName = tableRow.querySelector("td:first-child").textContent.trim(); // get song name from table row
            if (src in IMAGES) {
        const songName = tableRow.querySelector("td:first-child").textContent.trim();
        const type = IMAGES[src].type;
                const difficulty = IMAGES[src].Difficulty;
        const removed = removedSongs.find((removedSong) => removedSong.song === songName)?.difficulties || [];;
        if (!removed.includes(difficulty)) {
        imageCounts[src] = (imageCounts[src] || 0) + 1;
        if (type === "Bronze") {
            bronzeCount += 1;
        } else if (type === "Silver") {
            silverCount += 1;
        } else if (type === "Gold") {
            goldCount += 1;
        } else if (type === "Max") {
            maxCount += 1;
        } else if (type === "PP") {
            PPcount += 1;
            maxCount -=1;
        }
        }
 //   const songName = tableRow.querySelector("td:first-child").textContent.trim(); // get song name from table row
   // const difficulty = IMAGES[src].Difficulty; // get difficulty from image object
    const excludedDifficulties = excludedSongs.find((excludedSong) => excludedSong.song === songName)?.difficulties || []; // find excluded difficulties for current song
    if (!excludedDifficulties.includes(difficulty)) { // check if image is valid and difficulty is not excluded
        const points = IMAGES[src].points;

        totalPoints += points;
    }
}

        }
    });

    // Append the total score and count of each type of rank to the specified div element
    const progressWrapper = document.querySelector("div.progress-wrapper.section");
    const totalScoreElement = document.createElement("span");
    totalScoreElement.style.display = "block";
    totalScoreElement.textContent = `Ranking Points: ${totalPoints} 🛈 `;
    totalScoreElement.setAttribute('title', 'Ranking Points in calcuated by NM, HD, MX difficulties from the base game.');
    progressWrapper.appendChild(totalScoreElement);

    const rankCountsElement = document.createElement("span");
    rankCountsElement.style.display = "block";
    rankCountsElement.textContent = `Bronze: ${bronzeCount}, Silver: ${silverCount}, Gold: ${goldCount}, Max Combos: ${maxCount}, Perfects: ${PPcount}  🛈 `;
    rankCountsElement.setAttribute('title', 'Hard To Start, JBG, Memory of Wind,Motion,Mutu,PARA-Q are excluded');
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
  "/img/rank/nm_4.png": "",
  "/img/rank/hd_1.png": " [Bronze]",
  "/img/rank/hd_2.png": " [Silver]",
  "/img/rank/hd_3.png": " [Gold]",
  "/img/rank/hd_4.png": "",
  "/img/rank/mx_1.png": " [Bronze]",
  "/img/rank/mx_2.png": " [Silver]",
  "/img/rank/mx_3.png": " [Gold]",
  "/img/rank/mx_4.png": "",
  "/img/rank/ex_1.png": " [Bronze]",
  "/img/rank/ex_2.png": " [Silver]",
  "/img/rank/ex_3.png": " [Gold]",
  "/img/rank/ex_4.png": "",


};


      const scoreCell = row.querySelector('td:nth-child(3)');
      const scoreCell2 = row.querySelector('td:nth-child(4)');
      const scoreCell3 = row.querySelector('td:nth-child(5)');
      const scoreCell4 = row.querySelector('td:nth-child(6)');
      const nmImg = row.querySelector('td:nth-child(3) img[title^="Score"]');
      const hdImg = row.querySelector('td:nth-child(4) img[title^="Score"]');
      const mxImg = row.querySelector('td:nth-child(5) img[title^="Score"]');
      const exImg = row.querySelector('td:nth-child(6) img[title^="Score"]');
      const nmPPImg = row.querySelector('td:nth-child(3) img[title^="Unbelievable!"]');
      const hdPPImg = row.querySelector('td:nth-child(4) img[title^="Unbelievable!"]');
      const mxPPImg = row.querySelector('td:nth-child(5) img[title^="Unbelievable!"]');
      const exPPImg = row.querySelector('td:nth-child(6) img[title^="Unbelievable!"]');
      const nmMCImg = row.querySelector('td:nth-child(3) img[title^="Max Combo!"]');
      const hdMCImg = row.querySelector('td:nth-child(4) img[title^="Max Combo!"]');
      const mxMCImg = row.querySelector('td:nth-child(5) img[title^="Max Combo!"]');
      const exMCImg = row.querySelector('td:nth-child(6) img[title^="Max Combo!"]');
      const nm = nmImg ? `"${nmImg.getAttribute('title').replace(/Score: ([\d,]+).*/, '$1')}"` : '';
      const hd = hdImg ? `"${hdImg.getAttribute('title').replace(/Score: ([\d,]+).*/, '$1')}"` : '';
      const mx = mxImg ? `"${hdImg.getAttribute('title').replace(/Score: ([\d,]+).*/, '$1')}"` : '';
      const ex = exImg ? `"${exImg.getAttribute('title').replace(/Score: ([\d,]+).*/, '$1')}"` : '';
      const nmMC = nmMCImg ? `${nmMCImg.getAttribute('title').replace(/Max Combo!/, ' [Max Combo]')}` : '';
      const hdMC = hdMCImg ? `${hdMCImg.getAttribute('title').replace(/Max Combo!/, ' [Max Combo]')}` : '';
      const mxMC = mxMCImg ? `${mxMCImg.getAttribute('title').replace(/Max Combo!/, ' [Max Combo]')}` : '';
      const exMC = exMCImg ? `${exMCImg.getAttribute('title').replace(/Max Combo!/, ' [Max Combo]')}` : '';
      const nmpp = nmPPImg ? `${nmPPImg.getAttribute('title').replace(/Unbelievable!/, ' [PERFECT]')}` : '';
      const hdpp = hdPPImg ? `${hdPPImg.getAttribute('title').replace(/Unbelievable!/, ' [PERFECT]')}` : '';
      const mxpp = mxPPImg ? `${hdPPImg.getAttribute('title').replace(/Unbelievable!/, ' [PERFECT]')}` : '';
      const expp = exPPImg ? `${exPPImg.getAttribute('title').replace(/Unbelievable!/, ' [PERFECT]')}` : '';
      const nmRankImg = scoreCell.querySelector('img');
      const hdRankImg = scoreCell2.querySelector('img');
      const mxRankImg = scoreCell3.querySelector('img');
      const exRankImg = scoreCell4.querySelector('img');
      const nmRank = nmRankImg ? rankImages[nmRankImg.getAttribute('src')] : '';
      const hdRank = hdRankImg ? rankImages[hdRankImg.getAttribute('src')] : '';
      const mxRank = mxRankImg ? rankImages[mxRankImg.getAttribute('src')] : '';
      const exRank = exRankImg ? rankImages[exRankImg.getAttribute('src')] : '';




    // Create an array with the row data
    const rowData = [artist, song, nm + nmRank + nmpp + nmMC, hd + hdRank + hdpp + hdMC, mx + mxRank + mxpp + mxMC, ex + exRank + expp];


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
