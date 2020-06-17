/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {


//Takes a JSON object and formats it into the proper format to add a new tweet
  const createTweetElement = function(tweetData) {

    let userName = tweetData.user.name
    let avatar = tweetData.user.avatars
    let handle = tweetData.user.handle
    let tweetBody = tweetData.content.text
    let timeStamp = tweetData["created_at"]
    let currentDay = new Date()
    let newFull = currentDay.getTime();
    let millisecondsAgo = newFull - timeStamp
    let daysAgo = Math.round(millisecondsAgo / (1000 * 60 * 60 * 24))

    const $tweet =
      `<article id="posted-tweets">
        <header class="posted-header">
          <div class="name-avatar">
          <img class="avatar" src="${avatar}" alt="">
          <p class="username"> ${userName}</p>
        </div>
          <p class="handle"> ${handle} </p>
        </header>
        <p class="posted-content">
          ${tweetBody}
        </p>
        <footer class="posted-footer">
          <p class="date-posted">${daysAgo} days ago</p>
          <p class="icons"><i class="fa fa-flag"><i class="fas fa-heart"></i></i> <i class="fa fa-retweet"></i>     </p>
        </footer>
      </article> `

    return $tweet
  }

  //Loops through database of tweets then renders new tweets using createTweetElement function then appends them to the tweet-container
  const renderTweets = function(tweets) {

    for (const singleTweet of tweets) {

      $(`#tweet-container`).append(createTweetElement(singleTweet))
    }



  }


  //Form submissiong using AJAX to avoid refreshing the page
  $('.tweet-form').on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    $('#tweet-container').empty()
    $.post('/tweets', data)
      .then(function() {
console.log(data);
        loadTweets();
      })
  })


  //Fetches tweets and receives them as an array
  const loadTweets = () => {
    $.getJSON('/tweets')
      .then(function(data) {
        console.log('data PROMISE :>> ', data);
        // We needed to this emptying of the container to avoid duplicate posts in the container since we are continuously appending to it.
        // $('#tweet-container').empty()

        renderTweets(data)
      });
  }

  loadTweets()

})

