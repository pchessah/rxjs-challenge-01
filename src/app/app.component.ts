import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private _elRef: ElementRef) {}

  private _focusObservableSrc$$ = new Subject<any>();
  focussedArea$ = this._focusObservableSrc$$.asObservable();

  ngOnInit() {
    this._elRef.nativeElement.querySelectorAll('*').forEach((element) => {
      element.addEventListener('focus', () => {
        console.log(`Element focused: ${element.tagName}`);
        this._focusObservableSrc$$.next(element.tagName);
      });
    });
  }

  @HostListener('focus', ['$event.target'])
  onFocus(target: HTMLElement) {
    console.log(`Element focused: ${target.tagName}`);
  }

  trackFocus(event: Event) {
    console.log(event.target);
  }
}
