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
        700 : {
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
