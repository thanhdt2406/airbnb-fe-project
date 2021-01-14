import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(() => {
      var Page = (() => {
        var $nav = $('#nav-dots > span'),
          slitslider = $('#slider').slitslider({
            onBeforeChange: (slide : any, pos : any) => {
              $nav.removeClass('nav-dot-current');
              $nav.eq(pos).addClass('nav-dot-current');
            }
          }),
          init = () => {
            initEvents();
          },
          initEvents = () => {
            $nav.each(function(i: any) {
              // @ts-ignore
              $(this).on('click', function(event: any) {
                // @ts-ignore
                var $dot = $(this);
                if (!slitslider.isActive()) {
                  $nav.removeClass('nav-dot-current');
                  $dot.addClass('nav-dot-current');
                }
                slitslider.jump(i + 1);
                return false;
              });
            });
          };
        return {init: init};
      })();

      Page.init();

    });

    $("#testimonial-slider").owlCarousel({
      navigation: false, // Show next and prev buttons
      slideSpeed: 100,
      pagination: true,
      paginationSpeed: 100,
      items: 3
    });
  }


}
