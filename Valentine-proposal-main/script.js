// Load YouTube IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var isYouTubeReady = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-player', {
    height: '100%',
    width: '100%',
    videoId: '09R8_2nJtjg', // Maroon 5 - Sugar
    playerVars: {
      'start': 40,
      'controls': 0,
      'autoplay': 1,
      'mute': 1, // Start muted to allow autoplay
      'rel': 0
    },
    events: {
      'onReady': onPlayerReady,
      'onError': onPlayerError,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  isYouTubeReady = true;
}

function onPlayerStateChange(event) {
  // If unmuted and playing, great. 
}

function onPlayerError(event) {
  console.log("YouTube Player Error: ", event.data);
}

function showMessage(response) {
  let videoPlayed = false;
  if (response === "No") {
    const noButton = document.getElementById("no-button");
    const maxWidth = window.innerWidth - noButton.offsetWidth;
    const maxHeight = window.innerHeight - noButton.offsetHeight;

    // Set the button position to absolute
    noButton.style.position = "absolute";

    // Change the image source to "gun.gif"
    document.getElementsByClassName("image")[0].src = "images/gun.gif";

    // Generate random coordinates within the visible container
    const randomX = Math.max(0, Math.floor(Math.random() * maxWidth));
    const randomY = Math.max(0, Math.floor(Math.random() * maxHeight));

    // Apply the new coordinates to the button
    noButton.style.left = randomX + "px";
    noButton.style.top = randomY + "px";

    // Update text content and hide the name message
    document.getElementById("question").textContent =
      "Choose wisely";
    document.getElementById("name").style.display = "none";

    // Add a mouseover event listener to the "No" button
    noButton.addEventListener("mouseover", () => {
      if (!videoPlayed) {
        if (isYouTubeReady && player) {
          document.getElementById('youtube-player-container').style.display = 'block';
          try {
            player.unMute();
            player.playVideo();
          } catch (e) {
            console.log("Autoplay blocked, user interaction needed");
          }
        }

        // Set the flag to true after playing the video
        videoPlayed = true;
      }

      // Generate new random coordinates when the button is hovered
      const randomX = Math.max(0, Math.floor(Math.random() * maxWidth));
      const randomY = Math.max(0, Math.floor(Math.random() * maxHeight));

      noButton.style.zIndex = "100";
      // Apply new coordinates to the button, causing it to move
      noButton.style.left = randomX + "px";
      noButton.style.top = randomY + "px";
    });
  }

  if (response === "Yes") {
    // Remove the name message and the "No" button
    document.getElementById("name").remove();
    document.getElementById("no-button").remove();

    // Stop and remove video player (YouTube or Local)
    const playerContainer = document.getElementById('youtube-player-container');
    if (playerContainer) {
      playerContainer.remove();
    }
    if (player && player.stopVideo) {
      player.stopVideo();
      player.destroy();
    }

    // Create an audio element to play the sound
    const audioElement = document.createElement("audio");
    audioElement.src = "./Minions Cheering.mp4"; // Source of the sound
    audioElement.preload = "auto"; // Preloading the audio
    audioElement.play() // Play the sound
      .catch(e => console.error("Audio playback failed:", e)); // Catch and log playback errors

    // Update the text content, display the message, and change the image to "dance.gif"
    const yesMessage = document.getElementById("question");
    yesMessage.textContent = "See you on the 14th my princess";
    yesMessage.style.display = "block";
    yesMessage.style.fontStyle = "normal";
    document.getElementsByClassName("image")[0].src = "images/dance.gif";

    // Remove the "Yes" button
    document.getElementById("yesButton").remove();
  }

}
