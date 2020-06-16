

$(() => {
  console.log("this page has loaded and is good to go");

  //need to identify what element we want to target
  const $tweetBox = $("#tweet-text")
  //need to identify the remaining char value
  let $counter = $(".counter")
  let $charLeft = $counter.val()
  //make something happen on another element when that event happens
  //will be onkeystroke or something
  //will want to decrement from the counter class

  $tweetBox.keyup(() => {

    let keyPresses = $tweetBox.val().length;
    $counter.val($charLeft - keyPresses);

    $counter.val() < 0 ? $counter.css('color', 'red') : $counter.css('color', 'dark-grey');

  })



});