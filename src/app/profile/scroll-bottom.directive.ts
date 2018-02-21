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
    let params = this.buildParams({ "count": this.count }, { "id": this.id }, { "page": this.page });
    this.appService.get(this.url, params).subscribe(res => {
      if (res.length) {
        this.page++;
        if (!this.push) {
          this.items.splice(0, this.items.length);
        }
        for (let i = 0; i < res.length; i++) {
          this.items.push(res[i]);
        }
      }
      else {
        this.end = true;
      }
      this.preload.style.opacity = "0";
    })
  }
  private buildParams(...argument) {
    let params = new URLSearchParams();
    console.log("params", params)
    for (let i = 0; i < argument.length; i++) {
      if (Object.values(argument[i])[0] && Object.values(argument[i])[0].length) {
        params.append(argument[i], String(argument[i]));
      }
    }
    return params
  }
}
