import $ from "jquery";

$(function () {
  // Header fixing
  function headerFixing() {
    var HscrollTop = $(window).scrollTop();
    if (HscrollTop >= 100) {
      $("body").addClass("fixed-header");
    } else {
      $("body").removeClass("fixed-header");
    }
  }

  // Header nav link activation
  function headerNavActive() {
    var winTop = $(window).scrollTop();
    var visible = $("[data-scroll-data]").filter(function (ndx, section) {
      return (
        winTop >= $(section).offset().top + -10 &&
        winTop < $(section).offset().top + -10 + $(section).outerHeight()
      );
    });
    var newActive = visible.first().attr("data-scroll-data");
    $("[data-scroll-nav]").removeClass("active");
    $("[data-scroll-nav=" + newActive + "]").addClass("active");
  }

  // Window loading
  $(window).on("load", function () {
    $("#loading").hide();
  });

  // Scrolling
  $(window).on("scroll", function () {
    // call header fixing method
    headerFixing();
    // call header nav link activatation method
    headerNavActive();
  });
});
