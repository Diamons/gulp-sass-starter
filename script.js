$(function() {
  var $module = $('.js-bloomsbury-shop');
  var $landing = $('.js-bloomsbury-shop-landing', $module);
  var $nav = $('.js-bloomsbury-shop-nav', $module);
  var $pages = $('.js-bloomsbury-shop-page', $module);

  $pages.each(function() {
    var title = $(this).data('title');
    var key = '#/' + $(this).data('key');
    $nav.append('<a href="' + key + '">' + title + '</a>');
  });

  var routeActions = {
    init: function() {
      $landing.slideUp();
      $pages.slideUp();
    },
    story: function() {
      this.init();
      $pages.filter('[data-key="story"]').slideDown();
    },
    scents: function() {
      this.init();
    },
    gallery: function() {
      this.init();
    },
  };

  var routes = {
    '/story': function() {
      routeActions.story();
    },
    '/scents': function() {
      routeActions.scents();
    },
    '/gallery/:num': function() {
      routeActions.gallery();
    }
  };

  var router = Router(routes);

  router.init();

})