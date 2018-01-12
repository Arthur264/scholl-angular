import { Directive, ElementRef, HostListener, Input, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { AppService } from '../app.service';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
@Directive({
  selector: '[appScrollBottom]'
})
export class ScrollBottomDirective implements OnInit, AfterViewInit, OnChanges {

  constructor(
    private el: ElementRef,
    private appService: AppService
  ) {}
  private preload: any;

  ngOnInit() {
    // this.loadData();
    console.log("directive init")
    this.preload = this.el.nativeElement.querySelector("#preload");
  }
  ngAfterViewInit() {
    this.preload.style.opacity = "0";
  }
  ngOnChanges() {
    console.log("directive chang")
    this.loadData();
  }
  @Input() url: string = "";
  @Input() count: number;
  @Input() end: boolean = false;
  @Input() push: boolean = true;
  @Input() id: string;
  @Input() items = [];
  @Input() page: number;
  @HostListener('scroll') onScroll() {
    let self = this.el.nativeElement;
    let inBottom = self.scrollHeight - self.scrollTop === self.clientHeight;
    if (inBottom && !this.end) {
      this.preload.style.opacity = "1";
      this.loadData();
    }
  }
  private loadData() {
    let params = new URLSearchParams();
    if (this.count) {
      params.append('count', String(this.count));
    }
    if (this.page) {
      params.append('page', String(this.page));
    }

    if (this.id) {
      console.log(this.id)
      params.append('id', String(this.id));
    }
    this.appService.get(this.url, params).subscribe(res => {
      console.log(res, this.push);
      if (res.length) {
        this.page++;
        if (this.push) {
          for (let i = 0; i < res.length; i++) {
            this.items.push(res[i]);
          }
        }
        else {
          this.items.splice(0, this.items.length);
          console.log(res, this.push, this.items);
          for (let i = 0; i < res.length; i++) {
            this.items.push(res[i]);
          }
        }
      }
      else {
        this.end = true;
      }
      this.preload.style.opacity = "0";
    })
  }
}
