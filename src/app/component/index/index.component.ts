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
        var $nav = $('#nav-dots > span');
        var slitslider = $('#slider').slitslider({
          onBeforeChange: (slide: any, pos: any) => {
            $nav.removeClass('nav-dot-current');
            $nav.eq(pos).addClass('nav-dot-current');
          }
        });
        var init = () => {
          initEvents();
        };
        var initEvents = () => {
          $nav.each((i: any) => {
            $(this).on('click', function (event: any) {
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
  }


}
