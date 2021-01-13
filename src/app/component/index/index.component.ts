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
    $(function() {

      let Page = (function() {

        let $nav = $('#nav-dots > span'),
          slitslider = $('#slider').slitslider({
            onBeforeChange(slide: any, pos: any) {

              $nav.removeClass('nav-dot-current');
              $nav.eq(pos).addClass('nav-dot-current');

            }
          }),
          init = function() {

            initEvents();

          },
          initEvents = () => {

            $nav.each(function(i: any) {

              $(self).on('click', () => {

                let $dot = $(self);

                if (!slitslider.isActive()) {

                  $nav.removeClass('nav-dot-current');
                  $dot.addClass('nav-dot-current');

                }

                slitslider.jump(i + 1);
                return false;

              });

            });

          };

        return {init};

      })();

      Page.init();
    });
  }

}
