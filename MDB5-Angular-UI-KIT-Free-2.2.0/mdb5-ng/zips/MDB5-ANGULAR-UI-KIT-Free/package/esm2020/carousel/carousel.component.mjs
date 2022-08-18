import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, HostListener, Input, Output, } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MdbCarouselItemComponent } from './carousel-item.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export var Direction;
(function (Direction) {
    Direction[Direction["UNKNOWN"] = 0] = "UNKNOWN";
    Direction[Direction["NEXT"] = 1] = "NEXT";
    Direction[Direction["PREV"] = 2] = "PREV";
})(Direction || (Direction = {}));
export class MdbCarouselComponent {
    constructor(_elementRef, _cdRef) {
        this._elementRef = _elementRef;
        this._cdRef = _cdRef;
        this.animation = 'slide';
        this._controls = false;
        this._dark = false;
        this._indicators = false;
        this._ride = true;
        this._interval = 5000;
        this.keyboard = true;
        this.pause = true;
        this.wrap = true;
        this.slide = new EventEmitter();
        this.slideChange = new EventEmitter();
        this._activeSlide = 0;
        this._isPlaying = false;
        this._isSliding = false;
        this._destroy$ = new Subject();
    }
    get items() {
        return this._items && this._items.toArray();
    }
    get controls() {
        return this._controls;
    }
    set controls(value) {
        this._controls = coerceBooleanProperty(value);
    }
    get dark() {
        return this._dark;
    }
    set dark(value) {
        this._dark = coerceBooleanProperty(value);
    }
    get indicators() {
        return this._indicators;
    }
    set indicators(value) {
        this._indicators = coerceBooleanProperty(value);
    }
    get ride() {
        return this._ride;
    }
    set ride(value) {
        this._ride = coerceBooleanProperty(value);
    }
    get interval() {
        return this._interval;
    }
    set interval(value) {
        this._interval = value;
        if (this.items) {
            this._restartInterval();
        }
    }
    get activeSlide() {
        return this._activeSlide;
    }
    set activeSlide(index) {
        if (this.items.length && this._activeSlide !== index) {
            this._activeSlide = index;
            this._restartInterval();
        }
    }
    onMouseEnter() {
        if (this.pause && this._isPlaying) {
            this.stop();
        }
    }
    onMouseLeave() {
        if (this.pause && !this._isPlaying) {
            this.play();
        }
    }
    ngAfterViewInit() {
        Promise.resolve().then(() => {
            this._setActiveSlide(this._activeSlide);
            if (this.interval > 0 && this.ride) {
                this.play();
            }
            this._cdRef.markForCheck();
        });
        if (this.keyboard) {
            fromEvent(this._elementRef.nativeElement, 'keydown')
                .pipe(takeUntil(this._destroy$))
                .subscribe((event) => {
                if (event.key === 'ArrowRight') {
                    this.next();
                }
                else if (event.key === 'ArrowLeft') {
                    this.prev();
                }
            });
        }
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
    _setActiveSlide(index) {
        const currentSlide = this.items[this._activeSlide];
        currentSlide.active = false;
        const newSlide = this.items[index];
        newSlide.active = true;
        this._activeSlide = index;
    }
    _restartInterval() {
        this._resetInterval();
        const activeElement = this.items[this.activeSlide];
        const interval = activeElement.interval ? activeElement.interval : this.interval;
        if (!isNaN(interval) && interval > 0) {
            this._lastInterval = setInterval(() => {
                const nInterval = +interval;
                if (this._isPlaying && !isNaN(nInterval) && nInterval > 0) {
                    this.next();
                }
                else {
                    this.stop();
                }
            }, interval);
        }
    }
    _resetInterval() {
        if (this._lastInterval) {
            clearInterval(this._lastInterval);
            this._lastInterval = null;
        }
    }
    play() {
        if (!this._isPlaying) {
            this._isPlaying = true;
            this._restartInterval();
        }
    }
    stop() {
        if (this._isPlaying) {
            this._isPlaying = false;
            this._resetInterval();
        }
    }
    to(index) {
        if (index > this.items.length - 1 || index < 0) {
            return;
        }
        if (this.activeSlide === index) {
            this.stop();
            this.play();
            return;
        }
        const direction = index > this.activeSlide ? Direction.NEXT : Direction.PREV;
        this._animateSlides(direction, this.activeSlide, index);
        this.activeSlide = index;
    }
    next() {
        if (!this._isSliding) {
            this._slide(Direction.NEXT);
        }
    }
    prev() {
        if (!this._isSliding) {
            this._slide(Direction.PREV);
        }
    }
    _slide(direction) {
        const isFirst = this._activeSlide === 0;
        const isLast = this._activeSlide === this.items.length - 1;
        if (!this.wrap) {
            if ((direction === Direction.NEXT && isLast) || (direction === Direction.PREV && isFirst)) {
                return;
            }
        }
        const newSlideIndex = this._getNewSlideIndex(direction);
        this._animateSlides(direction, this.activeSlide, newSlideIndex);
        this.activeSlide = newSlideIndex;
        this.slide.emit();
    }
    _animateSlides(direction, currentIndex, nextIndex) {
        const currentItem = this.items[currentIndex];
        const nextItem = this.items[nextIndex];
        const currentEl = currentItem.host;
        const nextEl = nextItem.host;
        this._isSliding = true;
        if (this._isPlaying) {
            this.stop();
        }
        if (direction === Direction.NEXT) {
            nextItem.next = true;
            setTimeout(() => {
                this._reflow(nextEl);
                currentItem.start = true;
                nextItem.start = true;
                this._cdRef.markForCheck();
            }, 0);
            const transitionDuration = 600;
            fromEvent(currentEl, 'transitionend')
                .pipe(take(1))
                .subscribe(() => {
                nextItem.next = false;
                nextItem.start = false;
                nextItem.active = true;
                currentItem.active = false;
                currentItem.start = false;
                currentItem.next = false;
                this.slideChange.emit();
                this._isSliding = false;
            });
            this._emulateTransitionEnd(currentEl, transitionDuration);
        }
        else if (direction === Direction.PREV) {
            nextItem.prev = true;
            setTimeout(() => {
                this._reflow(nextEl);
                currentItem.end = true;
                nextItem.end = true;
                this._cdRef.markForCheck();
            }, 0);
            const transitionDuration = 600;
            fromEvent(currentEl, 'transitionend')
                .pipe(take(1))
                .subscribe(() => {
                nextItem.prev = false;
                nextItem.end = false;
                nextItem.active = true;
                currentItem.active = false;
                currentItem.end = false;
                currentItem.prev = false;
                this.slideChange.emit();
                this._isSliding = false;
            });
            this._emulateTransitionEnd(currentEl, transitionDuration);
        }
        if (!this._isPlaying && this.interval > 0) {
            this.play();
        }
    }
    _reflow(element) {
        return element.offsetHeight;
    }
    _emulateTransitionEnd(element, duration) {
        let eventEmitted = false;
        const durationPadding = 5;
        const emulatedDuration = duration + durationPadding;
        fromEvent(element, 'transitionend')
            .pipe(take(1))
            .subscribe(() => {
            eventEmitted = true;
        });
        setTimeout(() => {
            if (!eventEmitted) {
                element.dispatchEvent(new Event('transitionend'));
            }
        }, emulatedDuration);
    }
    _getNewSlideIndex(direction) {
        let newSlideIndex;
        if (direction === Direction.NEXT) {
            newSlideIndex = this._getNextSlideIndex();
        }
        if (direction === Direction.PREV) {
            newSlideIndex = this._getPrevSlideIndex();
        }
        return newSlideIndex;
    }
    _getNextSlideIndex() {
        const isLast = this._activeSlide === this.items.length - 1;
        if (!isLast) {
            return this._activeSlide + 1;
        }
        else if (this.wrap && isLast) {
            return 0;
        }
        else {
            return this._activeSlide;
        }
    }
    _getPrevSlideIndex() {
        const isFirst = this._activeSlide === 0;
        if (!isFirst) {
            return this._activeSlide - 1;
        }
        else if (this.wrap && isFirst) {
            return this.items.length - 1;
        }
        else {
            return this._activeSlide;
        }
    }
}
MdbCarouselComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbCarouselComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbCarouselComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.4", type: MdbCarouselComponent, selector: "mdb-carousel", inputs: { animation: "animation", controls: "controls", dark: "dark", indicators: "indicators", ride: "ride", interval: "interval", keyboard: "keyboard", pause: "pause", wrap: "wrap" }, outputs: { slide: "slide", slideChange: "slideChange" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" } }, queries: [{ propertyName: "_items", predicate: MdbCarouselItemComponent }], ngImport: i0, template: "<div\n  class=\"carousel slide\"\n  [class.carousel-fade]=\"animation === 'fade'\"\n  [class.carousel-dark]=\"dark\"\n>\n  <div class=\"carousel-indicators\" *ngIf=\"indicators\">\n    <button\n      *ngFor=\"let item of items; let i = index\"\n      type=\"button\"\n      [class.active]=\"i === activeSlide\"\n      [attr.aria-current]=\"i === activeSlide\"\n      (click)=\"to(i)\"\n    ></button>\n  </div>\n\n  <div class=\"carousel-inner\">\n    <ng-content></ng-content>\n  </div>\n\n  <button *ngIf=\"controls\" class=\"carousel-control-prev\" type=\"button\" (click)=\"prev()\">\n    <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n    <span class=\"visually-hidden\">Previous</span>\n  </button>\n  <button *ngIf=\"controls\" class=\"carousel-control-next\" type=\"button\" (click)=\"next()\">\n    <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n    <span class=\"visually-hidden\">Next</span>\n  </button>\n</div>\n", directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbCarouselComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-carousel', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"carousel slide\"\n  [class.carousel-fade]=\"animation === 'fade'\"\n  [class.carousel-dark]=\"dark\"\n>\n  <div class=\"carousel-indicators\" *ngIf=\"indicators\">\n    <button\n      *ngFor=\"let item of items; let i = index\"\n      type=\"button\"\n      [class.active]=\"i === activeSlide\"\n      [attr.aria-current]=\"i === activeSlide\"\n      (click)=\"to(i)\"\n    ></button>\n  </div>\n\n  <div class=\"carousel-inner\">\n    <ng-content></ng-content>\n  </div>\n\n  <button *ngIf=\"controls\" class=\"carousel-control-prev\" type=\"button\" (click)=\"prev()\">\n    <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n    <span class=\"visually-hidden\">Previous</span>\n  </button>\n  <button *ngIf=\"controls\" class=\"carousel-control-next\" type=\"button\" (click)=\"next()\">\n    <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n    <span class=\"visually-hidden\">Next</span>\n  </button>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { _items: [{
                type: ContentChildren,
                args: [MdbCarouselItemComponent]
            }], animation: [{
                type: Input
            }], controls: [{
                type: Input
            }], dark: [{
                type: Input
            }], indicators: [{
                type: Input
            }], ride: [{
                type: Input
            }], interval: [{
                type: Input
            }], keyboard: [{
                type: Input
            }], pause: [{
                type: Input
            }], wrap: [{
                type: Input
            }], slide: [{
                type: Output
            }], slideChange: [{
                type: Output
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9jYXJvdXNlbC9jYXJvdXNlbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUVMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsZUFBZSxFQUVmLFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7QUFFckUsTUFBTSxDQUFOLElBQVksU0FJWDtBQUpELFdBQVksU0FBUztJQUNuQiwrQ0FBTyxDQUFBO0lBQ1AseUNBQUksQ0FBQTtJQUNKLHlDQUFJLENBQUE7QUFDTixDQUFDLEVBSlcsU0FBUyxLQUFULFNBQVMsUUFJcEI7QUFPRCxNQUFNLE9BQU8sb0JBQW9CO0lBZ0cvQixZQUFvQixXQUF1QixFQUFVLE1BQXlCO1FBQTFELGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUExRnJFLGNBQVMsR0FBcUIsT0FBTyxDQUFDO1FBU3ZDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFTbEIsVUFBSyxHQUFHLEtBQUssQ0FBQztRQVNkLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBU3BCLFVBQUssR0FBRyxJQUFJLENBQUM7UUFhYixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBRWhCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsVUFBSyxHQUFHLElBQUksQ0FBQztRQUNiLFNBQUksR0FBRyxJQUFJLENBQUM7UUFFWCxVQUFLLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0MsZ0JBQVcsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVl2RCxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUdqQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFFVixjQUFTLEdBQWtCLElBQUksT0FBTyxFQUFRLENBQUM7SUFnQmlCLENBQUM7SUE5RmxGLElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFJRCxJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBR0QsSUFDSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFDRCxJQUFJLElBQUksQ0FBQyxLQUFjO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUdELElBQ0ksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBSSxVQUFVLENBQUMsS0FBYztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFHRCxJQUNJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQUksSUFBSSxDQUFDLEtBQWM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBR0QsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFhO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBRXZCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQVVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBYTtRQUMzQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssS0FBSyxFQUFFO1lBQ3BELElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzFCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQVVELFlBQVk7UUFDVixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjtJQUNILENBQUM7SUFHRCxZQUFZO1FBQ1YsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNsQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjtJQUNILENBQUM7SUFJRCxlQUFlO1FBQ2IsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFeEMsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDYjtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQztpQkFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQy9CLFNBQVMsQ0FBQyxDQUFDLEtBQW9CLEVBQUUsRUFBRTtnQkFDbEMsSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLFlBQVksRUFBRTtvQkFDOUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNiO3FCQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxXQUFXLEVBQUU7b0JBQ3BDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDYjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU8sZUFBZSxDQUFDLEtBQWE7UUFDbkMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkQsWUFBWSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFNUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBRU8sZ0JBQWdCO1FBQ3RCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRCxNQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRWpGLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRTtZQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3BDLE1BQU0sU0FBUyxHQUFHLENBQUMsUUFBUSxDQUFDO2dCQUM1QixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRTtvQkFDekQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNiO3FCQUFNO29CQUNMLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDYjtZQUNILENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNkO0lBQ0gsQ0FBQztJQUVPLGNBQWM7UUFDcEIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVELEVBQUUsQ0FBQyxLQUFhO1FBQ2QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDOUMsT0FBTztTQUNSO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLEtBQUssRUFBRTtZQUM5QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixPQUFPO1NBQ1I7UUFFRCxNQUFNLFNBQVMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUU3RSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVPLE1BQU0sQ0FBQyxTQUFvQjtRQUNqQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxLQUFLLENBQUMsQ0FBQztRQUN4QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNkLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxFQUFFO2dCQUN6RixPQUFPO2FBQ1I7U0FDRjtRQUVELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV4RCxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDO1FBRWpDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVPLGNBQWMsQ0FBQyxTQUFvQixFQUFFLFlBQW9CLEVBQUUsU0FBaUI7UUFDbEYsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDbkMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUU3QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUV2QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2I7UUFFRCxJQUFJLFNBQVMsS0FBSyxTQUFTLENBQUMsSUFBSSxFQUFFO1lBQ2hDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBRXJCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDckIsV0FBVyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ3pCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzdCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVOLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDO1lBRS9CLFNBQVMsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDO2lCQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNiLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUN2QixRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFFdkIsV0FBVyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQzNCLFdBQVcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixXQUFXLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFFekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7WUFFTCxJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLGtCQUFrQixDQUFDLENBQUM7U0FDM0Q7YUFBTSxJQUFJLFNBQVMsS0FBSyxTQUFTLENBQUMsSUFBSSxFQUFFO1lBQ3ZDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBRXJCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDckIsV0FBVyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLFFBQVEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzdCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVOLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDO1lBRS9CLFNBQVMsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDO2lCQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNiLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLFFBQVEsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFFdkIsV0FBVyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQzNCLFdBQVcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixXQUFXLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFFekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7WUFFTCxJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLGtCQUFrQixDQUFDLENBQUM7U0FDM0Q7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRTtZQUN6QyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjtJQUNILENBQUM7SUFFTyxPQUFPLENBQUMsT0FBb0I7UUFDbEMsT0FBTyxPQUFPLENBQUMsWUFBWSxDQUFDO0lBQzlCLENBQUM7SUFFTyxxQkFBcUIsQ0FBQyxPQUFvQixFQUFFLFFBQWdCO1FBQ2xFLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztRQUN6QixNQUFNLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDMUIsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLEdBQUcsZUFBZSxDQUFDO1FBRXBELFNBQVMsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDO2FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDYixTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUVMLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNqQixPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7YUFDbkQ7UUFDSCxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRU8saUJBQWlCLENBQUMsU0FBb0I7UUFDNUMsSUFBSSxhQUFxQixDQUFDO1FBRTFCLElBQUksU0FBUyxLQUFLLFNBQVMsQ0FBQyxJQUFJLEVBQUU7WUFDaEMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNDO1FBRUQsSUFBSSxTQUFTLEtBQUssU0FBUyxDQUFDLElBQUksRUFBRTtZQUNoQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDM0M7UUFFRCxPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDO0lBRU8sa0JBQWtCO1FBQ3hCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1NBQzlCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRTtZQUM5QixPQUFPLENBQUMsQ0FBQztTQUNWO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRU8sa0JBQWtCO1FBQ3hCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLEtBQUssQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1NBQzlCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sRUFBRTtZQUMvQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUM5QjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQzs7aUhBaldVLG9CQUFvQjtxR0FBcEIsb0JBQW9CLHVaQUNkLHdCQUF3Qiw2QkMvQjNDLG05QkE0QkE7MkZERWEsb0JBQW9CO2tCQUxoQyxTQUFTOytCQUNFLGNBQWMsbUJBRVAsdUJBQXVCLENBQUMsTUFBTTtpSUFHSixNQUFNO3NCQUFoRCxlQUFlO3VCQUFDLHdCQUF3QjtnQkFLaEMsU0FBUztzQkFBakIsS0FBSztnQkFHRixRQUFRO3NCQURYLEtBQUs7Z0JBVUYsSUFBSTtzQkFEUCxLQUFLO2dCQVVGLFVBQVU7c0JBRGIsS0FBSztnQkFVRixJQUFJO3NCQURQLEtBQUs7Z0JBVUYsUUFBUTtzQkFEWCxLQUFLO2dCQWFHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFFSSxLQUFLO3NCQUFkLE1BQU07Z0JBQ0csV0FBVztzQkFBcEIsTUFBTTtnQkFxQlAsWUFBWTtzQkFEWCxZQUFZO3VCQUFDLFlBQVk7Z0JBUTFCLFlBQVk7c0JBRFgsWUFBWTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWRiQ2Fyb3VzZWxJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJvdXNlbC1pdGVtLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBlbnVtIERpcmVjdGlvbiB7XG4gIFVOS05PV04sXG4gIE5FWFQsXG4gIFBSRVYsXG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1jYXJvdXNlbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXJvdXNlbC5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJDYXJvdXNlbENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBDb250ZW50Q2hpbGRyZW4oTWRiQ2Fyb3VzZWxJdGVtQ29tcG9uZW50KSBfaXRlbXM6IFF1ZXJ5TGlzdDxNZGJDYXJvdXNlbEl0ZW1Db21wb25lbnQ+O1xuICBnZXQgaXRlbXMoKTogTWRiQ2Fyb3VzZWxJdGVtQ29tcG9uZW50W10ge1xuICAgIHJldHVybiB0aGlzLl9pdGVtcyAmJiB0aGlzLl9pdGVtcy50b0FycmF5KCk7XG4gIH1cblxuICBASW5wdXQoKSBhbmltYXRpb246ICdzbGlkZScgfCAnZmFkZScgPSAnc2xpZGUnO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBjb250cm9scygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY29udHJvbHM7XG4gIH1cbiAgc2V0IGNvbnRyb2xzKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fY29udHJvbHMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2NvbnRyb2xzID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgZ2V0IGRhcmsoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rhcms7XG4gIH1cbiAgc2V0IGRhcmsodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kYXJrID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9kYXJrID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgZ2V0IGluZGljYXRvcnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2luZGljYXRvcnM7XG4gIH1cbiAgc2V0IGluZGljYXRvcnModmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pbmRpY2F0b3JzID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9pbmRpY2F0b3JzID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgZ2V0IHJpZGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JpZGU7XG4gIH1cbiAgc2V0IHJpZGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yaWRlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9yaWRlID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBnZXQgaW50ZXJ2YWwoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5faW50ZXJ2YWw7XG4gIH1cbiAgc2V0IGludGVydmFsKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9pbnRlcnZhbCA9IHZhbHVlO1xuXG4gICAgaWYgKHRoaXMuaXRlbXMpIHtcbiAgICAgIHRoaXMuX3Jlc3RhcnRJbnRlcnZhbCgpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9pbnRlcnZhbCA9IDUwMDA7XG5cbiAgQElucHV0KCkga2V5Ym9hcmQgPSB0cnVlO1xuICBASW5wdXQoKSBwYXVzZSA9IHRydWU7XG4gIEBJbnB1dCgpIHdyYXAgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBzbGlkZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc2xpZGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBnZXQgYWN0aXZlU2xpZGUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlU2xpZGU7XG4gIH1cblxuICBzZXQgYWN0aXZlU2xpZGUoaW5kZXg6IG51bWJlcikge1xuICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aCAmJiB0aGlzLl9hY3RpdmVTbGlkZSAhPT0gaW5kZXgpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZVNsaWRlID0gaW5kZXg7XG4gICAgICB0aGlzLl9yZXN0YXJ0SW50ZXJ2YWwoKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfYWN0aXZlU2xpZGUgPSAwO1xuXG4gIHByaXZhdGUgX2xhc3RJbnRlcnZhbDogYW55O1xuICBwcml2YXRlIF9pc1BsYXlpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaXNTbGlkaW5nID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfZGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICBvbk1vdXNlRW50ZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGF1c2UgJiYgdGhpcy5faXNQbGF5aW5nKSB7XG4gICAgICB0aGlzLnN0b3AoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBhdXNlICYmICF0aGlzLl9pc1BsYXlpbmcpIHtcbiAgICAgIHRoaXMucGxheSgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLl9zZXRBY3RpdmVTbGlkZSh0aGlzLl9hY3RpdmVTbGlkZSk7XG5cbiAgICAgIGlmICh0aGlzLmludGVydmFsID4gMCAmJiB0aGlzLnJpZGUpIHtcbiAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmtleWJvYXJkKSB7XG4gICAgICBmcm9tRXZlbnQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAna2V5ZG93bicpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0Fycm93UmlnaHQnKSB7XG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gJ0Fycm93TGVmdCcpIHtcbiAgICAgICAgICAgIHRoaXMucHJldigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRBY3RpdmVTbGlkZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFNsaWRlID0gdGhpcy5pdGVtc1t0aGlzLl9hY3RpdmVTbGlkZV07XG4gICAgY3VycmVudFNsaWRlLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgY29uc3QgbmV3U2xpZGUgPSB0aGlzLml0ZW1zW2luZGV4XTtcbiAgICBuZXdTbGlkZS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuX2FjdGl2ZVNsaWRlID0gaW5kZXg7XG4gIH1cblxuICBwcml2YXRlIF9yZXN0YXJ0SW50ZXJ2YWwoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVzZXRJbnRlcnZhbCgpO1xuICAgIGNvbnN0IGFjdGl2ZUVsZW1lbnQgPSB0aGlzLml0ZW1zW3RoaXMuYWN0aXZlU2xpZGVdO1xuICAgIGNvbnN0IGludGVydmFsID0gYWN0aXZlRWxlbWVudC5pbnRlcnZhbCA/IGFjdGl2ZUVsZW1lbnQuaW50ZXJ2YWwgOiB0aGlzLmludGVydmFsO1xuXG4gICAgaWYgKCFpc05hTihpbnRlcnZhbCkgJiYgaW50ZXJ2YWwgPiAwKSB7XG4gICAgICB0aGlzLl9sYXN0SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5JbnRlcnZhbCA9ICtpbnRlcnZhbDtcbiAgICAgICAgaWYgKHRoaXMuX2lzUGxheWluZyAmJiAhaXNOYU4obkludGVydmFsKSAmJiBuSW50ZXJ2YWwgPiAwKSB7XG4gICAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgIH1cbiAgICAgIH0sIGludGVydmFsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZXNldEludGVydmFsKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9sYXN0SW50ZXJ2YWwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fbGFzdEludGVydmFsKTtcbiAgICAgIHRoaXMuX2xhc3RJbnRlcnZhbCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcGxheSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2lzUGxheWluZykge1xuICAgICAgdGhpcy5faXNQbGF5aW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3Jlc3RhcnRJbnRlcnZhbCgpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3AoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2lzUGxheWluZykge1xuICAgICAgdGhpcy5faXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLl9yZXNldEludGVydmFsKCk7XG4gICAgfVxuICB9XG5cbiAgdG8oaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpbmRleCA+IHRoaXMuaXRlbXMubGVuZ3RoIC0gMSB8fCBpbmRleCA8IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hY3RpdmVTbGlkZSA9PT0gaW5kZXgpIHtcbiAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZGlyZWN0aW9uID0gaW5kZXggPiB0aGlzLmFjdGl2ZVNsaWRlID8gRGlyZWN0aW9uLk5FWFQgOiBEaXJlY3Rpb24uUFJFVjtcblxuICAgIHRoaXMuX2FuaW1hdGVTbGlkZXMoZGlyZWN0aW9uLCB0aGlzLmFjdGl2ZVNsaWRlLCBpbmRleCk7XG4gICAgdGhpcy5hY3RpdmVTbGlkZSA9IGluZGV4O1xuICB9XG5cbiAgbmV4dCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2lzU2xpZGluZykge1xuICAgICAgdGhpcy5fc2xpZGUoRGlyZWN0aW9uLk5FWFQpO1xuICAgIH1cbiAgfVxuXG4gIHByZXYoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9pc1NsaWRpbmcpIHtcbiAgICAgIHRoaXMuX3NsaWRlKERpcmVjdGlvbi5QUkVWKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zbGlkZShkaXJlY3Rpb246IERpcmVjdGlvbik6IHZvaWQge1xuICAgIGNvbnN0IGlzRmlyc3QgPSB0aGlzLl9hY3RpdmVTbGlkZSA9PT0gMDtcbiAgICBjb25zdCBpc0xhc3QgPSB0aGlzLl9hY3RpdmVTbGlkZSA9PT0gdGhpcy5pdGVtcy5sZW5ndGggLSAxO1xuXG4gICAgaWYgKCF0aGlzLndyYXApIHtcbiAgICAgIGlmICgoZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTkVYVCAmJiBpc0xhc3QpIHx8IChkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5QUkVWICYmIGlzRmlyc3QpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBuZXdTbGlkZUluZGV4ID0gdGhpcy5fZ2V0TmV3U2xpZGVJbmRleChkaXJlY3Rpb24pO1xuXG4gICAgdGhpcy5fYW5pbWF0ZVNsaWRlcyhkaXJlY3Rpb24sIHRoaXMuYWN0aXZlU2xpZGUsIG5ld1NsaWRlSW5kZXgpO1xuICAgIHRoaXMuYWN0aXZlU2xpZGUgPSBuZXdTbGlkZUluZGV4O1xuXG4gICAgdGhpcy5zbGlkZS5lbWl0KCk7XG4gIH1cblxuICBwcml2YXRlIF9hbmltYXRlU2xpZGVzKGRpcmVjdGlvbjogRGlyZWN0aW9uLCBjdXJyZW50SW5kZXg6IG51bWJlciwgbmV4dEluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50SXRlbSA9IHRoaXMuaXRlbXNbY3VycmVudEluZGV4XTtcbiAgICBjb25zdCBuZXh0SXRlbSA9IHRoaXMuaXRlbXNbbmV4dEluZGV4XTtcbiAgICBjb25zdCBjdXJyZW50RWwgPSBjdXJyZW50SXRlbS5ob3N0O1xuICAgIGNvbnN0IG5leHRFbCA9IG5leHRJdGVtLmhvc3Q7XG5cbiAgICB0aGlzLl9pc1NsaWRpbmcgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMuX2lzUGxheWluZykge1xuICAgICAgdGhpcy5zdG9wKCk7XG4gICAgfVxuXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLk5FWFQpIHtcbiAgICAgIG5leHRJdGVtLm5leHQgPSB0cnVlO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5fcmVmbG93KG5leHRFbCk7XG4gICAgICAgIGN1cnJlbnRJdGVtLnN0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgbmV4dEl0ZW0uc3RhcnQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0sIDApO1xuXG4gICAgICBjb25zdCB0cmFuc2l0aW9uRHVyYXRpb24gPSA2MDA7XG5cbiAgICAgIGZyb21FdmVudChjdXJyZW50RWwsICd0cmFuc2l0aW9uZW5kJylcbiAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgbmV4dEl0ZW0ubmV4dCA9IGZhbHNlO1xuICAgICAgICAgIG5leHRJdGVtLnN0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgbmV4dEl0ZW0uYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICAgIGN1cnJlbnRJdGVtLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgIGN1cnJlbnRJdGVtLnN0YXJ0ID0gZmFsc2U7XG4gICAgICAgICAgY3VycmVudEl0ZW0ubmV4dCA9IGZhbHNlO1xuXG4gICAgICAgICAgdGhpcy5zbGlkZUNoYW5nZS5lbWl0KCk7XG4gICAgICAgICAgdGhpcy5faXNTbGlkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9lbXVsYXRlVHJhbnNpdGlvbkVuZChjdXJyZW50RWwsIHRyYW5zaXRpb25EdXJhdGlvbik7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5QUkVWKSB7XG4gICAgICBuZXh0SXRlbS5wcmV2ID0gdHJ1ZTtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3JlZmxvdyhuZXh0RWwpO1xuICAgICAgICBjdXJyZW50SXRlbS5lbmQgPSB0cnVlO1xuICAgICAgICBuZXh0SXRlbS5lbmQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0sIDApO1xuXG4gICAgICBjb25zdCB0cmFuc2l0aW9uRHVyYXRpb24gPSA2MDA7XG5cbiAgICAgIGZyb21FdmVudChjdXJyZW50RWwsICd0cmFuc2l0aW9uZW5kJylcbiAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgbmV4dEl0ZW0ucHJldiA9IGZhbHNlO1xuICAgICAgICAgIG5leHRJdGVtLmVuZCA9IGZhbHNlO1xuICAgICAgICAgIG5leHRJdGVtLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgICBjdXJyZW50SXRlbS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICBjdXJyZW50SXRlbS5lbmQgPSBmYWxzZTtcbiAgICAgICAgICBjdXJyZW50SXRlbS5wcmV2ID0gZmFsc2U7XG5cbiAgICAgICAgICB0aGlzLnNsaWRlQ2hhbmdlLmVtaXQoKTtcbiAgICAgICAgICB0aGlzLl9pc1NsaWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2VtdWxhdGVUcmFuc2l0aW9uRW5kKGN1cnJlbnRFbCwgdHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2lzUGxheWluZyAmJiB0aGlzLmludGVydmFsID4gMCkge1xuICAgICAgdGhpcy5wbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVmbG93KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgICByZXR1cm4gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gIH1cblxuICBwcml2YXRlIF9lbXVsYXRlVHJhbnNpdGlvbkVuZChlbGVtZW50OiBIVE1MRWxlbWVudCwgZHVyYXRpb246IG51bWJlcik6IHZvaWQge1xuICAgIGxldCBldmVudEVtaXR0ZWQgPSBmYWxzZTtcbiAgICBjb25zdCBkdXJhdGlvblBhZGRpbmcgPSA1O1xuICAgIGNvbnN0IGVtdWxhdGVkRHVyYXRpb24gPSBkdXJhdGlvbiArIGR1cmF0aW9uUGFkZGluZztcblxuICAgIGZyb21FdmVudChlbGVtZW50LCAndHJhbnNpdGlvbmVuZCcpXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGV2ZW50RW1pdHRlZCA9IHRydWU7XG4gICAgICB9KTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKCFldmVudEVtaXR0ZWQpIHtcbiAgICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgndHJhbnNpdGlvbmVuZCcpKTtcbiAgICAgIH1cbiAgICB9LCBlbXVsYXRlZER1cmF0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE5ld1NsaWRlSW5kZXgoZGlyZWN0aW9uOiBEaXJlY3Rpb24pOiBudW1iZXIge1xuICAgIGxldCBuZXdTbGlkZUluZGV4OiBudW1iZXI7XG5cbiAgICBpZiAoZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTkVYVCkge1xuICAgICAgbmV3U2xpZGVJbmRleCA9IHRoaXMuX2dldE5leHRTbGlkZUluZGV4KCk7XG4gICAgfVxuXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlBSRVYpIHtcbiAgICAgIG5ld1NsaWRlSW5kZXggPSB0aGlzLl9nZXRQcmV2U2xpZGVJbmRleCgpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdTbGlkZUluZGV4O1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TmV4dFNsaWRlSW5kZXgoKTogbnVtYmVyIHtcbiAgICBjb25zdCBpc0xhc3QgPSB0aGlzLl9hY3RpdmVTbGlkZSA9PT0gdGhpcy5pdGVtcy5sZW5ndGggLSAxO1xuXG4gICAgaWYgKCFpc0xhc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVTbGlkZSArIDE7XG4gICAgfSBlbHNlIGlmICh0aGlzLndyYXAgJiYgaXNMYXN0KSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVNsaWRlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2dldFByZXZTbGlkZUluZGV4KCk6IG51bWJlciB7XG4gICAgY29uc3QgaXNGaXJzdCA9IHRoaXMuX2FjdGl2ZVNsaWRlID09PSAwO1xuXG4gICAgaWYgKCFpc0ZpcnN0KSB7XG4gICAgICByZXR1cm4gdGhpcy5fYWN0aXZlU2xpZGUgLSAxO1xuICAgIH0gZWxzZSBpZiAodGhpcy53cmFwICYmIGlzRmlyc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLml0ZW1zLmxlbmd0aCAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVTbGlkZTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfY29udHJvbHM6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rhcms6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2luZGljYXRvcnM6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3JpZGU6IEJvb2xlYW5JbnB1dDtcbn1cbiIsIjxkaXZcbiAgY2xhc3M9XCJjYXJvdXNlbCBzbGlkZVwiXG4gIFtjbGFzcy5jYXJvdXNlbC1mYWRlXT1cImFuaW1hdGlvbiA9PT0gJ2ZhZGUnXCJcbiAgW2NsYXNzLmNhcm91c2VsLWRhcmtdPVwiZGFya1wiXG4+XG4gIDxkaXYgY2xhc3M9XCJjYXJvdXNlbC1pbmRpY2F0b3JzXCIgKm5nSWY9XCJpbmRpY2F0b3JzXCI+XG4gICAgPGJ1dHRvblxuICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICBbY2xhc3MuYWN0aXZlXT1cImkgPT09IGFjdGl2ZVNsaWRlXCJcbiAgICAgIFthdHRyLmFyaWEtY3VycmVudF09XCJpID09PSBhY3RpdmVTbGlkZVwiXG4gICAgICAoY2xpY2spPVwidG8oaSlcIlxuICAgID48L2J1dHRvbj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImNhcm91c2VsLWlubmVyXCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cblxuICA8YnV0dG9uICpuZ0lmPVwiY29udHJvbHNcIiBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtcHJldlwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwicHJldigpXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLXByZXYtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPlByZXZpb3VzPC9zcGFuPlxuICA8L2J1dHRvbj5cbiAgPGJ1dHRvbiAqbmdJZj1cImNvbnRyb2xzXCIgY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLW5leHRcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cIm5leHQoKVwiPlxuICAgIDxzcGFuIGNsYXNzPVwiY2Fyb3VzZWwtY29udHJvbC1uZXh0LWljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj5OZXh0PC9zcGFuPlxuICA8L2J1dHRvbj5cbjwvZGl2PlxuIl19