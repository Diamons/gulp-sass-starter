$(function() {
  var $module = $('.js-bloomsbury-shop');
  var $landing = $('.js-bloomsbury-shop-landing', $module);
  var $nav = $('.js-bloomsbury-shop-nav', $module);
  var $pages = $('.js-bloomsbury-shop-page', $module);

  $pages.each(function() {
    var title = $(this).data('title');
    var key = $(this).data('key');
    $nav.append('<a class="' + key + '" href="#/' + key + '" data-key="' + key + '"><span>' + title + '</span></a>');
  });

  var routeActions = {
    init: function() {
      $('.js-bloomsbury-slider.slick-initialized', $module).slick('destroy');
      $landing.hide();
      $pages.hide();
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
      $('.js-bloomsbury-slider').slick();
    }
  };

  var router = Router(routes);

  router.init();

  $('.js-bloomsbury-shop-open').on('click', function(event) {
    event.preventDefault();
    var index = $(this).parent().index();
    $(this).parents('.js-bloomsbury-slider').slick();
    $(this).parents('.js-bloomsbury-slider').slick('slickGoTo', index);
  });
})