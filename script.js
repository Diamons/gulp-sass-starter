//@TODO - REMOVE
var Drupal = {
  behaviors: {

  }
};


(function($) {

  Drupal.behaviors.bloomsburyExperiencev1 = {
    attach: function(context) {
      var animationTime = 600;
      var $module = $('.js-bloomsbury-shop', context);
      var $landing = $('.js-bloomsbury-shop-landing', $module);
      var $nav = $('.js-bloomsbury-shop-nav', $module);
      var $pages = $('.bloomsbury-shop__pages-wrap', $module);
      var $singlePages = $('.js-bloomsbury-shop-page', $module);

      function updateResponsive() {
        // $module.height(window.innerHeight - $('#top').outerHeight());
      }


      updateResponsive();
      $(window).on('resize.bloomsbury', updateResponsive);

      $singlePages.each(function() {
        var title = $(this).data('title');
        var key = $(this).data('key');
        $nav.append('<a class="' + key + '" href="#/' + key + '" data-key="' + key + '"><span>' + title + '</span></a>');
      });

      var routeActions = {
        init: function(cb) {
          $module.removeClass('landing');
          $landing.fadeOut(animationTime);
          $pages.fadeOut(animationTime, function() {
            $singlePages.hide();
            $singlePages.filter('[data-key="'+ router.getRoute() +'"]').show();
            $nav.find('a').removeClass('active');
            $nav.find('a[data-key="'+ router.getRoute() +'"]').addClass('active');
            setTimeout(function() {
              $pages.fadeIn(animationTime);
              if (cb) {
                cb();
              }
            }, 200);
          });
        }
      };

      var routes = {
        '/story': function() {
          routeActions.init();
        },
        '/scents': function() {
          routeActions.init();
          $('.bloomsbury-shop__page--scents .js-bloomsbury-slider.slick-initialized', $module).slick('unslick');
        },
        '/inspiration': function() {
          routeActions.init(function() {
            setTimeout(function() {
              $('.bloomsbury-shop__page--inspiration .js-bloomsbury-slider', $module).slick({
                speed: animationTime
              });
            }, 100);
          });
        }
      };

      var router = Router(routes);

      router.init();

      $(document).on('click', '.js-bloomsbury-shop-open', function(event) {
        event.preventDefault();
        var index = $(this).parents('.bloomsbury-shop__products-item').index();
        $('.bloomsbury-shop__products-item:not(:eq('+index+'))', $module).fadeOut(animationTime, function() {
          $('.bloomsbury-shop__products-item', $module).attr('style', '');
          // $module.find('.bloomsbury-shop__page--scents .js-bloomsbury-slider').css({opacity: 0}).animate({
          //   opacity: 1,
          // }, animationTime, function() {
            setTimeout(function() {
              $module.find('.bloomsbury-shop__page--scents .js-bloomsbury-slider:not(.slick-initialized)').slick({
                speed: animationTime
              });
              $module.find('.bloomsbury-shop__page--scents .js-bloomsbury-slider').slick('slickGoTo', index, true);
            }, 100);
          // });
        });
      });
    }
  };
})(jQuery);


(function($) {
  $(document).ready(function() {
    Drupal.behaviors.bloomsburyExperiencev1.attach($(document));
  });
})(jQuery);
