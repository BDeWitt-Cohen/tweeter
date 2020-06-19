/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  //Hides compose tweet box on page ready
  $(".new-tweet").hide();

  //Toggles compose tweet box between show and hide, gives focus if shown, with animation between show/close
  $("#tweet-button").click(function(){
    $(".new-tweet").animate({
      height: 'toggle'
    });

    let $input = $('#tweet-text');
    $input.focus();
  }); 


  //Takes a JSON object and formats it into the proper format to add a new tweet
  const createTweetElement = function(tweetData) {

    let userName = tweetData.user.name;
    let avatar = tweetData.user.avatars;
    let handle = tweetData.user.handle;
    let tweetBody = escape(tweetData.content.text);
    let timeStamp = tweetData["created_at"];
    let currentDay = new Date();
    let newFull = currentDay.getTime();
    let millisecondsAgo = newFull - timeStamp;
    let daysAgo = Math.round(millisecondsAgo / (1000 * 60 * 60 * 24));

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
          <p class="icons"><i class="fa fa-flag"><i class="fas fa-heart"></i></i> <i class="fa fa-retweet"></i></p>
        </footer>
      </article> `;

    return $tweet;
  };

  //Loops through database of tweets then renders new tweets using createTweetElement function then appends them to the tweet-container
  const renderTweets = function(tweets) {

    for (const singleTweet of tweets) {

      $(`#tweet-container`).prepend(createTweetElement(singleTweet));
    }
  };

  //Escape function for invalid characters and malicious code
  const escape = function(str) {
    let div = document.createElement('div');

    div.appendChild(document.createTextNode(str));

    return div.innerHTML;
  };

  //Error message function
  const validateTweet = function(str) {

    if ((str === "") || (str === null)) {
      $('.form-error-message').text('Hey, if you\'re serious about this, enter some text, mkay?!').slideDown();
      return true;

    } else if (str.length > 145) {
      $('.form-error-message').text('Gear down, big rig. You gotta keep the characters limited to 140, hence the fancy counter that changes colour.').slideDown();
      return true;

    }
  };

  //Form submissiong using AJAX to avoid refreshing the page
  $('.tweet-form').on('submit', function(event) {
    event.preventDefault();

    const text = $('#tweet-text').val().trim();
    const validate = validateTweet(text);

    if (validate) {
      return;
    } else {
      $('.form-error-message').slideUp();
    }

    const data = $(this).serialize();

    $.post('/tweets', data)
      .then(function() {

        let $input = $('#tweet-text');

        $input.val('');
        $input.focus();

        loadTweets();
        
      });
  });

  //Fetches tweets and receives them as an array
  const loadTweets = () => {
    $.getJSON('/tweets')
      .then(function(data) {
        $('#tweet-container').empty();
        renderTweets(data);
      });
  };

  loadTweets();

});

