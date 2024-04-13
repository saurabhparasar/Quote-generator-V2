const qouteContainer = document.getElementById("quote-container");
const qouteText = document.getElementById("quote");
const autherText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
loader.hidden = true;
let apiQuotes = [];

// get Quotes from API
const loaderFunc = () => {
  qouteContainer.hidden = !qouteContainer.hidden;
  loader.hidden = !loader.hidden;
};

const getQuotes = async () => {
  loaderFunc();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    generatequotes();
    loaderFunc();
  } catch (error) {
    // catch error here
    console.log(error.message);
  }
};

getQuotes();

// generate random number and manupulate the DOM

const generatequotes = () => {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  qouteText.textContent = quote?.text;
  quote?.text.length > 120
    ? qouteText.classList.add("long-quote")
    : qouteText.classList.remove("long-quote");

  autherText.textContent = quote?.author
    ? quote.author.split(",")[0]
    : "Unknown";
};

const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${qouteText.textContent} - ${autherText.textContent}`;
  console.log(twitterUrl);
  window.open(twitterUrl, "_blank");
};

twitterBtn.addEventListener("click", tweetQuote);

newQuoteBtn.addEventListener("click", generatequotes);
