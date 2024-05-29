$(document).ready(function(){
    $(".owl-carousel").each(function() {
      var itemsToShow = $(this).data('items');
      $(this).owlCarousel({
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 2000,
        loop: true,
        items: itemsToShow,
        margin: 0,
        padding: 0,
        stagePadding: 0,
        lazyLoad: true,
        nav: false,
        responsive: {
          0: { 
            items: 1},
          450: { 
            items: 1 },
          850: { 
            items: (itemsToShow > 1) ? 2 : 1 },
          1000: { 
            items: (itemsToShow > 1) ? 3 : 1 },
          1400: { 
            items: (itemsToShow > 1) ? 4 : 1 }
        }
      });
    });
  });
  