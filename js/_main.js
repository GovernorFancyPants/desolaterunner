$(document).ready(function() {
    smoothScroll.init({
        speed: 500, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInOutCubic', // Easing pattern to use
        updateURL: false, // Boolean. Whether or not to update the URL with the anchor hash on scroll
        offset: 0 // Integer. How far to offset the scrolling anchor location in pixels
    });
});

$(document).ready(function() {
    var iframes = document.getElementsByTagName('iframe');
    for (var i = 0; i != iframes.length; ++i) {
        if (iframes[i].src.substr(0, 22) === 'https://www.strava.com') {
            $(iframes[i]).wrap("<div class='strava-container'></div>");

            var stravaLink = $('<a/>', {
                class: "stravatest",
                href: iframes[i].src.substr(0, 43),
                text: " Strava Activity"
            });

            var fa = $('<i/>', {
                class: 'fab fa-strava'
            });

            stravaLink.prepend(fa);

            $(iframes[i]).parent().append(stravaLink);
        }
    }
});

// Off Canvas Sliding
$(document).ready(function() {
    // Menu button click
    $('#js-menu-trigger,#js-menu-screen').on('click touchstart', function(e) {
        // $('#js-body').toggleClass('no-scroll');
        $('#js-menu, #js-menu-screen').toggleClass('is-visible');
        $('#js-menu-trigger').toggleClass('slide close');
        // $('#masthead, #page-wrapper').toggleClass('slide');
        e.preventDefault();
    });
});

// FitVids
$(document).ready(function() {
    // Target your .container, .wrapper, .post, etc.
    $("#main").fitVids();
});

// Table of Contents title. Change text to localize
$("#markdown-toc").prepend("<li><h6>{{ site.data.messages.locales[site.locale].overview }}</h6></li>");
