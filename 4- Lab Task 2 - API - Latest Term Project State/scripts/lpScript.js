$(".owl-carousel").owlCarousel({
    autoplay: true,
    autoplayhoverpause: true,
    autoplaytimeout: 2000,
    loop: true,
    items: 3,
    lazyload: true,
    margin: 5,
    padding: 5,
    stagePadding: 5,
    responsive: {
        450 : {
            items: 1,
        },
        850 : {
            items: 2,
        },
        1000 : {
            items: 3,
        },
        1400 : {
            items: 4,
        }
    }
});

window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    var heroHeight = document.getElementById('hero').offsetHeight;
    var latestHeight = document.getElementById('latestSection').offsetHeight;
    var animeOffset = document.getElementById('animeSection').offsetTop - heroHeight + latestHeight; 
    var gamingOffset = document.getElementById('gamingSection').offsetTop - heroHeight + latestHeight;

    if (scrollPosition >= 0 && scrollPosition <= animeOffset) {
        setActiveLink('nav-link-home');
    } else if (scrollPosition >= animeOffset && scrollPosition <= gamingOffset) {
        setActiveLink('nav-link-anime');
    } else if (scrollPosition >= gamingOffset) {
        setActiveLink('nav-link-gaming');
    }
});

function setActiveLink(linkId) {
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(function(link) {
        link.classList.remove('active');
    });

    var activeLink = document.getElementById(linkId);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

