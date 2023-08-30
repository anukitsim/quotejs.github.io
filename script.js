const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Get Quotes from API

let apiQuotes = [];

// function to show loading spinner when fetching

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// after loading is complete

const removeLoadingSpinner = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

const newQuote = () => {
  showLoadingSpinner();
  // pick a random quote from api quotes array

  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // check if author field is blank, and if so, replace it with "unknown"

  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // check quote length for styling

  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
 
};

const getQuotes = async () => {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();

    newQuote();
    
  } catch (error) {
    console.error("Error fetching quotes:", error);
    
    authorText.textContent = "";
    quoteText.textContent = "Error occured, sorry for the inconvenience"
    removeLoadingSpinner();
  }
};

// On Load

// Tweet quotes

const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

// event listeners

newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

// On Load

getQuotes();
