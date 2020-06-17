/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  const data = [
    {
      "user": {
        "name": "Rick Sanchez",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@pickleRick"
      },
      "content": {
        "text": "Can somebody just let me out of here? If I die in a cage, I lose a bet."
      },
      "created_at": 1461116232227
    },
    
    {
      "user": {
        "name": "Morty",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@MortynRick" },
      "content": {
        "text": "My idol ones said: I turned myself into a pickle, Morty! I’m Pickle Ri-i-i-ick!"
      },
      "created_at": 1461113959088
    }
  ]


  const createTweetElement = function(tweetData) {

    let userName = tweetData.user.name
    let avatar = tweetData.user.avatars
    let handle = tweetData.user.handle
    let tweetBody = tweetData.content.text
    let timeStamp = tweetData["created_at"]
    let currentDay = new Date()
    let newFull = currentDay.getTime();
    let millisecondsAgo = newFull - timeStamp
    let daysAgo = Math.round(millisecondsAgo/(1000*60*60*24))

console.log(daysAgo);
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



  const renderTweets = function(tweets) {
    
    for (const singleTweet of tweets){
      
     $(`#tweet-container`).append(createTweetElement(singleTweet))
    }

    

  }

renderTweets(data)
  




})

