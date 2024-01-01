"use strict";

(function ($) {
  "use strict";

  preloader();

  async function reloadAjax($off, $el = $(document)) {
    await tabs($el);
    await projectSlider().run();
    await menuInit();
    await magnificPopup();
    await justifiedGallery();
    dsnGrid.effectAnimate().allInt();
    AOS.init();
    await initMap();
  }

  function preloader() {
    const preloader = $("#dsn_preloader");

    if (!preloader.length) {
      window.addEventListener("DOMContentLoaded", function () {
        reloadAjax().catch(($err) => {
          console.log($err);
        });
      });
      return false;
    }

    $body.css("overflow", "hidden");
    const progress_number = preloader.find(".loading-count"),
      preloader_progress = preloader.find(".dsn-progress-path"),
      present = {
        value: 0,
      };

    const updateVal = (val, isSetVal) => {
      progress_number.text(val.toFixed(0));
      preloader_progress.css("stroke-dashoffset", 300 - val * 3);
      if (isSetVal) present.value = val;
    };

    const timer = dsnGrid.pageLoad({
      startTime: 0,
      endTime: 100,
      duration: 1000,

      onProgress(val) {
        updateVal(val, true);
      },
    });
    window.addEventListener("DOMContentLoaded", function () {
      clearInterval(timer);
      const tl = gsap.timeline();
      tl.to(present, 1, {
        value: 100,

        onUpdate() {
          updateVal(present.value, true);
        },
      })
        .call(function () {
          reloadAjax().catch(($err) => {
            console.log($err);
          });
        })
        .to(preloader.find("> *:not(.bg-load)"), {
          autoAlpha: 0,
        })
        .to(preloader.find(".bg-load"), {
          yPercent: -100,
          ease: Expo.easeInOut,
          duration: 1.5,
        })
        .to(
          preloader.find(".bg-load .separator__path"),
          {
            attr: {
              d: dsnGrid.getData(
                preloader.find(".bg-load .separator__path").get(0),
                "to"
              ),
            },
            ease: "Power4.easeInOut",
            duration: 1.5,
          },
          "-=1.5"
        )
        .fromTo(
          "#dsn-scrollbar",
          1,
          {
            y: 400,
          },
          {
            y: 0,
            clearProps: "y",
            ease: Expo.easeInOut,
          },
          "-=1.2"
        )
        .call(function () {
          preloader.remove();
          ScrollTrigger.update();
          $body.css("overflow", "");
        });
    });
  }

  function projectSlider() {
    return {
      swiper: function ($id, $obj) {
        $id = dsnGrid.convertToJQuery($id);
        $obj = $.extend(
          true,
          {
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 0,
            grabCursor: true,
            speed: 1000,
            parallax: true,
            loop: true,
            slideToClickedSlide: true,
            pagination: {
              el: $id.find(".swiper-pagination").get(0),
              dynamicBullets: true,
              clickable: true,
            },
            navigation: {
              nextEl: $id.find(".swiper-next").get(0),
              prevEl: $id.find(".swiper-prev").get(0),
            },
          },
          $obj
        );
        if ($id.find(".slider-current-index").length)
          $obj.pagination = {
            el: $id.find(".slider-current-index").get(0),
            type: "custom",

            renderCustom(swiper, current, total) {
              $id
                .find(".slider-current-index")
                .next(".slider-current-total")
                .text("/" + total);
              return current;
            },
          };
        new Swiper($id.find(".swiper-container").get(0), $obj);
      },
      run: function () {
        let $this = this;
        $(".dsn-swiper").each(function () {
          let option = dsnGrid.getData(this, "option", {}) || {};
          let syn = $(this).parent().find(dsnGrid.getData(this, "controller"));

          if (syn.length) {
            option["thumbs"] = {
              swiper: {
                el: syn.find(".swiper-container").get(0),
                allowTouchMove: false,
                slidesPerView: 1,
                speed: option.speed || 1000,
                parallax: true,
                autoHeight: true,
              },
            };
          }

          option["on"] = {
            init() {
              this.touchEventsData.formElements = "*";
            },

            touchStart() {
              gsap.to($(this.$el).find(".swiper-slide"), {
                scale: 0.95,
                ease: "none",
                duration: 0.5,
              });
            },

            touchEnd() {
              gsap.to($(this.$el).find(".swiper-slide"), {
                scale: 1,
                ease: "none",
                duration: 0.5,
              });
            },
          };
          option["breakpoints"] = {
            768: {
              slidesPerView:
                option.slidesPerView > 1
                  ? option.slidesPerView > 2
                    ? 2
                    : 1.3
                  : 1,
              spaceBetween:
                option.slidesPerView > 1
                  ? option.spaceBetween > 21
                    ? 20
                    : option.spaceBetween
                  : 0,
            },
            992: {
              slidesPerView: option.slidesPerView,
              spaceBetween: option.spaceBetween || 0,
            },
            575: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
          };

          if (syn.length) {
            option["thumbs"] = {
              swiper: {
                el: syn.find(".swiper-container").get(0),
                allowTouchMove: false,
                slidesPerView: 1,
                speed: option.speed || 1000,
                parallax: true,
                autoHeight: true,
              },
            };
            option.breakpoints["768"] = {
              slidesPerView: 1,
              spaceBetween: 0,
            };
          }

          option["slidesPerView"] = 1;
          option["spaceBetween"] = 0;
          $this.swiper(this, option);
        });
      },
    };
  }

  function magnificPopup() {
    let option = {
      delegate: "a:not(.effect-ajax)",
      type: "image",
      closeOnContentClick: false,
      closeBtnInside: false,
      mainClass: "mfp-with-zoom",
      // this class is for CSS animation below
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true,
        duration: 400,
        // don't foget to change the duration also in CSS
        easing: "cubic-bezier(0.36, 0, 0.66, -0.56)",
        // CSS transition easing function
        opener: function (element) {
          return element.find("img");
        }
      },
      callbacks: {
        open: function () {
          // Will fire when this exact popup is opened
          // this - is Magnific Popup object
          $("html").css({
            margin: 0
          });
        }
      }
    };
    $(".gallery-portfolio").each(function () {
      $(this).magnificPopup(option);
    });
    if ($(".has-popup .pop-up").length) option.delegate = "a.pop-up";
    $(".has-popup").magnificPopup(option);
  }

  function justifiedGallery() {
    $(".gallery-portfolio").each(function () {
      $(this).justifiedGallery({
        rowHeight: 370,
        margins: 15
      });
    });
  }

  function tabs($el) {
    $el.find(".dsn-tabs").each(function () {
      const $this = $(this);
      $this.on("click", ".link-click", function () {
        $(this).addClass("active").siblings().removeClass("active");
        $this
          .find("#" + $(this).attr("id") + "-content")
          .fadeIn(1000)
          .siblings()
          .hide();
      });
    });
  }

  function menuInit() {
    var _targets$toggle4;

    const menu = document.getElementById("site_menu_header");
    if (!menu) return;
    const targets = {
      toggle: menu.querySelector("#navbar_toggle"),
      backgroundMain: menu.querySelector(".bg-load:not(.dsn-svg-transition)"),
      svg: menu.querySelector("svg.bg-load path"),
      subMenu: $(menu).find("li.nav-item.has-sub-menu > a"),
      back: $(menu).find("li.dsn-back"),
      hamburger: menu.classList.contains("dsn-hamburger"),
      scrDown: 0,
    };
    const reserved = dsnGrid.useState(
      false,
      (newValue, oldValue) => oldValue && removeOpenMenu()
    );
    const typeNav = dsnGrid.useState(targets.hamburger, (newValue) =>
      newValue
        ? menu.classList.add("dsn-hamburger")
        : menu.classList.remove("dsn-hamburger")
    );

    const removeOpenMenu = () =>
      menu
        .querySelectorAll("ul")
        .forEach((item) => item.classList.remove("open"));

    const TransEnd = () => {
      var _menu$querySelector;

      return (
        reserved.getValue() &&
        ((_menu$querySelector = menu.querySelector(".primary-nav")) === null ||
        _menu$querySelector === void 0
          ? void 0
          : _menu$querySelector.classList.add("open"))
      );
    };

    const onCompleteAnimate = (e) => {
      e.classList.toggle("open");
      menu.classList.toggle("dsn-open");
      reserved.setValue(!reserved.getValue());
    };

    const handleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.closest(".open").classList.remove("open");
    };

    const handleClickSubMenu = function (e) {
      var _e$currentTarget, _e$currentTarget$pare, _e$currentTarget$pare2;

      if (!typeNav.getValue()) return;
      handleClick(e);
      (_e$currentTarget = e.currentTarget) === null ||
      _e$currentTarget === void 0
        ? void 0
        : (_e$currentTarget$pare = _e$currentTarget.parentElement) === null ||
          _e$currentTarget$pare === void 0
        ? void 0
        : (_e$currentTarget$pare2 =
            _e$currentTarget$pare.querySelector("ul")) === null ||
          _e$currentTarget$pare2 === void 0
        ? void 0
        : _e$currentTarget$pare2.classList.add("open");
    };

    const handleClickBackMenu = (e) => {
      handleClick(e);
      e.currentTarget
        .closest("ul")
        .closest("li")
        .closest("ul")
        .classList.add("open");
    };

    const toggleClick = function () {
      if (!reserved.getValue()) {
        dsnGrid.svgAnimate
          .up(targets.svg, TransEnd)
          .to(
            "#dsn-scrollbar",
            {
              y: -200,
              duration: 1,
              ease: "power4.in",
            },
            "top"
          )
          .set(
            targets.backgroundMain,
            {
              autoAlpha: 1,
            },
            "center"
          );
        onCompleteAnimate(this);
      } else
        dsnGrid.svgAnimate
          .down(targets.svg, () => onCompleteAnimate(this))
          .to(
            "#dsn-scrollbar",
            {
              y: 0,
              clearProps: "y",
              duration: 1,
              ease: "power4",
            },
            "-=1"
          )
          .set(
            targets.backgroundMain,
            {
              autoAlpha: 0,
            },
            "center"
          );
    };

    const resizeNav = function () {
      if (window.innerWidth > 991 && typeNav.getValue()) {
        typeNav.setValue(false);
      } else if (window.innerWidth <= 991 && !typeNav.getValue()) {
        typeNav.setValue(true);
      } else if (dsnGrid.isMobile()) {
        typeNav.setValue(true);
      }
    };

    if (!targets.hamburger) {
      window.addEventListener("resize", resizeNav);
      resizeNav();
    }

    new Promise((resolve) => setTimeout(() => resolve(), 300))
      .then(() => {
        var _targets$toggle;

        return dsnGrid.spltting.Char(
          (_targets$toggle = targets.toggle) === null ||
            _targets$toggle === void 0
            ? void 0
            : _targets$toggle.querySelector(".text-menu")
        );
      })
      .then(() => {
        var _targets$toggle2;

        return dsnGrid.spltting.Char(
          (_targets$toggle2 = targets.toggle) === null ||
            _targets$toggle2 === void 0
            ? void 0
            : _targets$toggle2.querySelector(".text-open")
        );
      })
      .then(() => {
        var _targets$toggle3;

        return dsnGrid.spltting.Char(
          (_targets$toggle3 = targets.toggle) === null ||
            _targets$toggle3 === void 0
            ? void 0
            : _targets$toggle3.querySelector(".text-close")
        );
      })
      .then(() => {
        targets.back.find(".text-toggle-back").each(function ($index) {
          setTimeout(() => dsnGrid.spltting.Char(this), 10 * $index);
        });
      })
      .then(() => {
        menu.querySelectorAll("ul").forEach((item, index) => {
          item.style.setProperty("--dsn-li-name", "dsn" + index);
          Object.keys(item.children).forEach(($key) => {
            item.children[$key].style.setProperty("--dsn-li-index", $key);
          });
        });
      })
      .then(() => {
        gsap.set(menu, {
          yPercent: -100,
          autoAlpha: 0,
        });
        menu.classList.remove("d-none");
        gsap.to(menu, {
          yPercent: 0,
          autoAlpha: 0,
          delay: 2,
          clearProps: true,
        });
      });
    const scroll = (e) => {
      listener(e, window.scrollX, window.scrollY);
    };

    $wind.on("scroll", (e) => {
      const x = window.scrollX;
      const y = window.scrollY;
      if (y > 170) {
        if (targets.scrDown < y) {
          menu.classList.add("nav-bg", "hide-nav");
        } else {
          menu.classList.remove("hide-nav");
        }
      } else {
        menu.classList.remove("nav-bg", "hide-nav");
      }

      targets.scrDown = y;
    });

    (_targets$toggle4 = targets.toggle) === null || _targets$toggle4 === void 0
      ? void 0
      : _targets$toggle4.addEventListener("click", toggleClick);
    targets.subMenu.on("click", handleClickSubMenu);
    targets.back.on("click", handleClickBackMenu);
  }


  function preloader() {
    const preloader = $("#dsn_preloader");

    if (!preloader.length) {
      window.addEventListener("DOMContentLoaded", function () {
        reloadAjax().catch(($err) => {
          console.log($err);
        });
      });
      return false;
    }

    $body.css("overflow", "hidden");
    const progress_number = preloader.find(".loading-count"),
      preloader_progress = preloader.find(".dsn-progress-path"),
      present = {
        value: 0,
      };

    const updateVal = (val, isSetVal) => {
      progress_number.text(val.toFixed(0));
      preloader_progress.css("stroke-dashoffset", 300 - val * 3);
      if (isSetVal) present.value = val;
    };

    const timer = dsnGrid.pageLoad({
      startTime: 0,
      endTime: 100,
      duration: 1000,

      onProgress(val) {
        updateVal(val, true);
      },
    });
    window.addEventListener("DOMContentLoaded", function () {
      clearInterval(timer);
      const tl = gsap.timeline();
      tl.to(present, 1, {
        value: 100,

        onUpdate() {
          updateVal(present.value, true);
        },
      })
        .call(function () {
          reloadAjax().catch(($err) => {
            console.log($err);
          });
        })
        .to(preloader.find("> *:not(.bg-load)"), {
          autoAlpha: 0,
        })
        .to(preloader.find(".bg-load"), {
          yPercent: -100,
          ease: Expo.easeInOut,
          duration: 1.5,
        })
        .to(
          preloader.find(".bg-load .separator__path"),
          {
            attr: {
              d: dsnGrid.getData(
                preloader.find(".bg-load .separator__path").get(0),
                "to"
              ),
            },
            ease: "Power4.easeInOut",
            duration: 1.5,
          },
          "-=1.5"
        )
        .fromTo(
          "#main_root",
          1,
          {
            y: 400,
          },
          {
            y: 0,
            clearProps: true,
            ease: Expo.easeInOut,
          },
          "-=1.2"
        )
        .call(function () {
          preloader.remove();
          ScrollTrigger.update();
          $body.css("overflow", "");
          ScrollTrigger.getAll().forEach(($item) => {
            $item.refresh();
          });
        });
    });
  }

  function initMap() {
    let map_att = $(".map-custom");
    if (!map_att.length) {
      map_att = null;
      return;
    }
    let mapScriptId = $("#map_api");

    // Styles a map in night mode.
    if (!mapScriptId.length) {
      let GOOGLE_MAP_KEY = "AIzaSyDMyAS2jdzj-vdgBIFaIStYOWJtSlghndg";

      let script = document.createElement("script");
      script.type = "text/javascript";
      script.id = "map_api";
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_MAP_KEY; //& needed
      document.body.appendChild(script);
      GOOGLE_MAP_KEY = script = null;
    }

    setTimeout(function () {
      try {
        let lat = map_att.data("dsn-lat"),
          leg = map_att.data("dsn-len"),
          zoom = map_att.data("dsn-zoom"),
          letLeng = new google.maps.LatLng(lat, leg);
        let map = new google.maps.Map(map_att.get(0), {
          center: {
            lat: lat,
            lng: leg,
          },
          mapTypeControl: false,
          scrollwheel: false,
          draggable: true,
          streetViewControl: false,
          navigationControl: false,
          zoom: zoom,
          styles: [
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [
                {
                  color: "#e9e9e9",
                },
                {
                  lightness: 17,
                },
              ],
            },
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [
                {
                  color: "#f5f5f5",
                },
                {
                  lightness: 20,
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#ffffff",
                },
                {
                  lightness: 17,
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#ffffff",
                },
                {
                  lightness: 29,
                },
                {
                  weight: 0.2,
                },
              ],
            },
            {
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [
                {
                  color: "#ffffff",
                },
                {
                  lightness: 18,
                },
              ],
            },
            {
              featureType: "road.local",
              elementType: "geometry",
              stylers: [
                {
                  color: "#ffffff",
                },
                {
                  lightness: 16,
                },
              ],
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [
                {
                  color: "#f5f5f5",
                },
                {
                  lightness: 21,
                },
              ],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [
                {
                  color: "#dedede",
                },
                {
                  lightness: 21,
                },
              ],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [
                {
                  visibility: "on",
                },
                {
                  color: "#ffffff",
                },
                {
                  lightness: 16,
                },
              ],
            },
            {
              elementType: "labels.text.fill",
              stylers: [
                {
                  saturation: 36,
                },
                {
                  color: "#333333",
                },
                {
                  lightness: 40,
                },
              ],
            },
            {
              elementType: "labels.icon",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [
                {
                  color: "#f2f2f2",
                },
                {
                  lightness: 19,
                },
              ],
            },
            {
              featureType: "administrative",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#fefefe",
                },
                {
                  lightness: 20,
                },
              ],
            },
            {
              featureType: "administrative",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#fefefe",
                },
                {
                  lightness: 17,
                },
                {
                  weight: 1.2,
                },
              ],
            },
          ],
        });
        google.maps.event.addDomListener(window, "resize", function () {
          let center = map.getCenter();
          google.maps.event.trigger(map, "resize");
          map.setCenter(center);
          center = null;
        });
        new google.maps.Marker({
          position: letLeng,
          animation: google.maps.Animation.BOUNCE,
          icon: "assets/img/map-marker.png",
          title: "ASL",
          map: map,
        });

        lat = leg = zoom = letLeng = null;
      } catch (e) {
        console.log(e);
      }
    }, 500);
  }
})(jQuery);
