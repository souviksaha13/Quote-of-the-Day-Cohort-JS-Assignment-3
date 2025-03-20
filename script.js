// maintaining an array of gradients to change the background whenever a new quote is being fetched
const gradients = [
    "linear-gradient(135deg, #A0C4FF, #BDB2FF, #FFB86C)",
    "linear-gradient(135deg, #FF9A8B, #FF6A88, #FF99AC)",
    "linear-gradient(135deg, #6A85B6, #BAC8E0, #FFB677)",
    "linear-gradient(135deg, #1E3C72, #2A5298, #FF8C42)",
    "linear-gradient(135deg, #FCE38A, #F38181, #EAFFD0)",
    "linear-gradient(135deg, #3A0CA3, #4361EE, #4CC9F0)",
    "linear-gradient(135deg, #12C2E9, #C471ED, #F64F59)",
    "linear-gradient(135deg, #16A085, #F4D03F, #FF5733)",
    "linear-gradient(135deg, #4B79A1, #283E51, #F7B733)",
    "linear-gradient(135deg, #141E30, #243B55, #FF6600)",
    "linear-gradient(135deg, #FF6B6B, #F06595, #A29BFE)",
    "linear-gradient(135deg, #1F4037, #99F2C8, #D4FC79)",
    "linear-gradient(135deg, #2B5876, #4E4376, #FFD700)",
    "linear-gradient(135deg, #000428, #004E92, #FC466B)",
    "linear-gradient(135deg, #833AB4, #FD1D1D, #Fcb045)",
    "linear-gradient(135deg, #009FFF, #ec2F4B, #EECDA3)",
    "linear-gradient(135deg, #DA4453, #89216B, #3A1C71)",
    "linear-gradient(135deg, #42275A, #734B6D, #FFA500)",
    "linear-gradient(135deg, #FF512F, #DD2476, #005AA7)",
    "linear-gradient(135deg, #E44D26, #F16529, #FFD700)" 
];

const copyBtn = document.getElementById('copy')
const newQuoteBtn = document.getElementById('new-quote')

// function to fetch quotes from the api
async function fetchQuotes () {
    try {
        const res = await fetch('https://api.freeapi.app/api/v1/public/quotes/quote/random');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching quotes:", error);
    }
}

async function addNewQuote() {
    newQuoteBtn.textContent = 'Loading...'
    const quote = await fetchQuotes();
    document.getElementById('quote').textContent = quote.data.content;
    document.getElementById('author').textContent = quote.data.author;
    newQuoteBtn.textContent = 'New Quote'
    changeBackground()
}

document.addEventListener('DOMContentLoaded', () => addNewQuote());

function copyToClipboard() {
    const quote = document.getElementById('quote').textContent;
    navigator.clipboard.writeText(quote).then(() => {
        copyBtn.innerHTML = `<i class="fa-solid fa-clipboard"></i>`
        setTimeout(() => {
            copyBtn.innerHTML = `<i class="fa-regular fa-copy"></i>`
        }, 1000)
    })
}

function exportToComputer() {
    const quoteDiv = document.getElementById('quote-container');
    html2canvas(quoteDiv).then((canvas) => {
        const imageURL = canvas.toDataURL("image/png"); // Convert canvas to image URL
        const link = document.createElement("a");
        link.href = imageURL;
        link.download = "quote.png"; 
        link.click();
    });
}

function shareOnTwitter() {
    const quote = document.getElementById("quote").innerText;
    const author = document.getElementById("author").innerText;
    
    const tweetText = `"${quote}" - ${author}`;
    const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

    window.open(twitterURL, "_blank");
}

// change the background gradient whenever a new quote is fetched
function changeBackground() {
    const randomIndex = Math.floor(Math.random() * gradients.length);
    document.body.style.background = gradients[randomIndex];
}