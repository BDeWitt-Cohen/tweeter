

$(() => {

  const $tweetBox = $("#tweet-text")
  let $counter = $(".counter")
  let $charLeft = $counter.val()

  $tweetBox.keyup(() => {

    let keyPresses = $tweetBox.val().length;
    $counter.val($charLeft - keyPresses);

    $counter.val() < 0 ? $counter.css('color', 'red') : $counter.css('color', 'grey');

  })
});