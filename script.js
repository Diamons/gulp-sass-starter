$(function() {
  var $module = $('.js-bloomsbury-shop');
  var $landing = $('.js-bloomsbury-shop-landing', $module);
  var $nav = $('.js-bloomsbury-shop-nav', $module);
  var $pages = $('.js-bloomsbury-shop-page', $module);

  $pages.each(function() {
    var title = $(this).data('title');
    var key = $(this).data('key');
    $nav.append('<a href="#/' + key + '" data-key="' + key + '"><span>' + title + '</span></a>');
  });

  var routeActions = {
    init: function() {
      $landing.fadeOut();
      $pages.fadeOut();
      $pages.filter('[data-key="'+ router.getRoute() +'"]').fadeIn();
      $nav.find('a').removeClass('active');
      $nav.find('a[data-key="'+ router.getRoute() +'"]').addClass('active');
    }
  };

  var routes = {
    '/story': function() {
      routeActions.init();
    },
    '/scents': function() {
      routeActions.init();
    },
    '/inspiration': function() {
      routeActions.init();
    }
  };

  var router = Router(routes);

  router.init();

  $('.slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    dots: true,
    infinite: true,
    cssEase: 'linear'
  });

  $('.js-bloomsbury-shop-open').on('click', function(event) {
    event.preventDefault();
    $(this).parents('.js-bloomsbury-slider').slick();
  });
})