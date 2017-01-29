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

      var slickSettings = {
        speed: animationTime,
        fade: true,
        cssEase: 'linear'
      };

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
          $landing.stop(true, true).fadeOut(animationTime, function() {
            $module.removeClass('landing');
            $pages.stop(true, true).fadeOut(animationTime, function() {
              $singlePages.hide();
              $singlePages.filter('[data-key="'+ router.getRoute() +'"]').show();
              $nav.find('a').removeClass('active');
              $nav.find('a[data-key="'+ router.getRoute()[0] +'"]').addClass('active');
              setTimeout(function() {
                $pages.stop(true, true).fadeIn(animationTime);
                if (cb) {
                  cb();
                }
              }, 200);
            });
          });
        }
      };

      var routes = {
        '/story': function() {
          routeActions.init();
        },
        '/scents': function() {
          $('.bloomsbury-shop__page--scents .js-bloomsbury-slider.slick-initialized', $module).slick('unslick');
          $('.bloomsbury-shop__products-item', $module).show();
          routeActions.init();
        },
        '/scents/:number': function(number) {
          routeActions.init(function() {
            transitionToScent(number);
          });
        },
        '/inspiration': function() {
          routeActions.init(function() {
            setTimeout(function() {
              $('.bloomsbury-shop__page--inspiration .js-bloomsbury-slider', $module).slick(slickSettings);
            }, 100);
          });
        }
      };

      var router = Router(routes);

      router.init();

      $(document).on('click', '.js-bloomsbury-shop-open', function(event) {
        event.preventDefault();
        var index = $(this).parents('.bloomsbury-shop__products-item').index();
        if (index < 0) {
          index = 0;
        }
        $('.bloomsbury-shop__products-item:not(:eq('+index+'))', $module).stop(true, true).fadeOut(animationTime, function() {
          transitionToScent(index);
        });
      });

      function transitionToScent(index) {
          setTimeout(function() {
            var $scentsCarousel = $module.find('.bloomsbury-shop__page--scents .js-bloomsbury-slider:not(.slick-initialized)');
            $scentsCarousel.slick(slickSettings);
            // Arrow themes
            $scentsCarousel.on('beforeChange', function(event, slick, currentSlide, nextSlide){
              var currentClass = $scentsCarousel.find('.slick-slide:not(.slick-cloned)').eq(currentSlide).data('theme');
              var nextClass = $scentsCarousel.find('.slick-slide:not(.slick-cloned)').eq(nextSlide).data('theme');
              $scentsCarousel.removeClass(currentClass).addClass(nextClass);
            });
            $('.bloomsbury-shop__products-item', $module).stop(true, true).fadeIn(animationTime, function() {
              $module.find('.bloomsbury-shop__page--scents .js-bloomsbury-slider').slick('slickGoTo', index, true);
              $('.bloomsbury-shop__page--scents', $module).stop(true, true).fadeIn(animationTime);
            });
          // }, 1);
        });
      }
    }
  };
})(jQuery);


(function($) {
  $(document).ready(function() {
    Drupal.behaviors.bloomsburyExperiencev1.attach($(document));
  });
})(jQuery);
