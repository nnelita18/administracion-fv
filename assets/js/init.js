(function($) {
  var sidebar = $('.wrapper');
  var colorSelected = '#8ac440';
  var sidebarOptionSel = $('.sidebar li.active > a'),
      btnToggle        = $('#navbar-head .sidebar-toggler'),
      buttons          = $('.btn.btn-primary'),
      dropdowns        = $('.navbar .dropdown-item:hover, .navbar .dropdown-item:focus'),
      modal            = $('.modal-header'),
      modalTitle       = $('.modal-title'),
      cardHeader       = $('.card-header-primary');

  if($('.sidebar').length) {
    var drawer = document.querySelector('.sidebar');
    // toggler icon click function
    document.querySelector('.sidebar-toggler').addEventListener('click', function () {
      // drawer.open = !drawer.open;
      if (sidebar.hasClass('drawer--open')) {
        sidebar.removeClass('drawer--open');
      } else {
        sidebar.addClass('drawer--open');
      }
    });
  }

  $('body').on('hover', '.dropdown-menu .dropdown-item',function () {
    $(this).css('backgroundColor', colorSelected);
  });

  $(document).on('click','.color-picker-wrap ul li', function() {
      let nameTheme = $(this).attr('title');

      var el = document.querySelector('body');
          el.setAttribute('data-bgcolor', nameTheme);
  });

  $(document).ready(function() {
      $().ready(function() {
        $sidebar = $('.sidebar');

        $sidebar_img_container = $sidebar.find('.sidebar-background');

        $full_page = $('.full-page');

        $sidebar_responsive = $('body > .navbar-collapse');

        window_width = $(window).width();

        fixed_plugin_open = $('.sidebar .sidebar-wrapper .nav li.active a p').html();

        if (window_width > 767 && fixed_plugin_open == 'Dashboard') {
          if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
            $('.fixed-plugin .dropdown').addClass('open');
          }

        }

        $('.switch-sidebar-mini input').change(function() {
          $body = $('body');

          $input = $(this);

          if (md.misc.sidebar_mini_active == true) {
            $('body').removeClass('sidebar-mini');
            md.misc.sidebar_mini_active = false;

            $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();

          } else {

            $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar('destroy');

            setTimeout(function() {
              $('body').addClass('sidebar-mini');

              md.misc.sidebar_mini_active = true;
            }, 300);
          }

          // we simulate the window Resize so the charts will get updated in realtime.
          var simulateWindowResize = setInterval(function() {
            window.dispatchEvent(new Event('resize'));
          }, 180);

          // we stop the simulation of Window Resize after the animations are completed
          setTimeout(function() {
            clearInterval(simulateWindowResize);
          }, 1000);

        });
      });
    });
  /* ----------------------------------------------
 * Menu active selection
 *
 * ---------------------------------------------- */
  // $('#sidebar .nav-item > .nav-link').on('click', function (ev) {
  //   // ev.preventDefault();
  //   var  $itemMenu = $(this).parent(),
  //        $listMenu = $('#sidebar .nav-item');

  //   $listMenu.removeClass('active');
  //   $itemMenu.addClass('active');

  // });

  $(document).on('click', '.pageto', function( e ) {
    e.preventDefault();
    let contentReplace = $('#content-replace'),
        $localpage = $(this).attr('href'),
        pageRedir = $localpage;

        console.log(pageRedir);

    if ( pageRedir !== '' && pageRedir ) {
      loadContent(pageRedir, contentReplace);
    }
  });

})(jQuery);

function loadContent(part, contentReplace) {
  $.get(part, function (data, textStatus, jqXHR) {
    $(".loader").css('display','block');
        // $("#preloder").removeClass('d-none');
        // $("#preloder").removeClass('d-none');
        $("#preloder").css('display','block');
    // $('html, body').animate( {scrollTop : 0}, 800 )
  })
  .done(function(data, textStatus, jqXHR) {

    $(".loader").fadeOut();
        // $("#preloder").removeClass('d-none');
        // $("#preloder").removeClass('d-none');
        $("#preloder").delay(200).fadeOut("slow");
  })
  .fail(function(data, textStatus, jqXHR) {
    swal({
      icon: 'error',
      title: 'Oops...',
      text: 'Ha ocurrido un error al obtener los datos!'
    }).then(
      function () {
        location.reload();
      }
    )
  })
  .always(function(data, textStatus, jqXHR) {
    contentReplace.html(data);
  });
}