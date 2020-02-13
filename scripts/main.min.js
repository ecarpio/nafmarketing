$(function() {
  // Homepage Splash Background
  var options = {
    mobileFallbackImage: "/images/home-bg.png",
    playOnlyIfVisible: false,
    //coverImage: "/images/home-bg.png",
    fadeOnStartTime: 100
  };

  // Initialize Youtube Background
  myPlayer = $(".player").YTPlayer(options);

  // Initialize Animation on Scroll
  AOS.init();

  // Get Image Max width from data values
  var maxWidthVal = "";
  function maxWidthImg() {
    $(".full-width").each(function(i) {
      maxWidthVal = $(this).data("max-width");
      console.log(maxWidthVal, i);

      $(this).css("max-width", maxWidthVal);
    });
  }

  maxWidthImg();

  // Set Hero ViewPort
  setTimeout(function() {
    //$("#hero").addClass("active");
  }, 2000);

  // Scroll from Top Function
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
      $("#hero").addClass("active");
      $(".aos-init").addClass("init");
    } else {
      $("#hero").removeClass("active");
      $(".aos-init").removeClass("init");
    }
  });

  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 200) {
      $("header").addClass("sticky");
    } else {
      $("header").removeClass("sticky");
    }
  });

  // Get Current Screen Size
  var screenSize = $(window).width();
  function getScreenSize() {
    if (screenSize <= 991) {
      maxWidthImg();
    } else {
      $(".full-width").css("max-width", "100%");
    }
  }
  getScreenSize();

  // Detect Window Resize
  $(window).resize(function() {
    screenSize = $(window).width();
    getScreenSize();
  });

  $(".product-detail-toggle").on("click", function() {
    $(".collapse").collapse("hide");
  });

  // Dynamic iFrame Modal Content
  $(".roadmapButton").each(function() {
    $(this).on("click", function() {
      var raodMapName = $(this).attr("data-roadmap-name");
      var roarMapURL = $(this).attr("data-roadmap-url");
      var roadMapHeight = $(this).attr("data-roadmap-height");

      $("#roadmapModalLabel").html(raodMapName);
      $("#roadMapIframe").attr("src", roarMapURL);
      $("#roadMapIframe").height(roadMapHeight);
    });
  });

  $("#roadmapModal").on("hidden.bs.modal", function(e) {
    $("#roadMapIframe").attr("src", "");
  });

  function closeNav() {
    $(".navbar-collapse").collapse("hide");
  }

  $(".close-nav").on("click", function() {
    closeNav();
  });

  $(".nav-link").on("click", function() {
    closeNav();
  });

  $("#signup").on("submit", function(event) {
    event.preventDefault();
    betaSignup();
  });

  // AJAX Form
  function betaSignup() {
    var obj = $("#signup")
      .serializeArray()
      .reduce(function(m, o) {
        m[o.name] = o.value;
        return m;
      }, {});

    $.ajax({
      type: "POST",
      url:
        "https://qa.thebrokernetwork.com/bankerviewservices/v1/NafTechnology/CreateRegistration",
      dataType: "json",
      data: obj,
      success: function() {
        $("#formModal").modal("show");
        $("#formModal .form-status").addClass("success");
      },
      error: function() {
        $("#fomrModal").modal("show");
        $("#formModal.form-status").addClass("error");
      }
    });
  }
});
