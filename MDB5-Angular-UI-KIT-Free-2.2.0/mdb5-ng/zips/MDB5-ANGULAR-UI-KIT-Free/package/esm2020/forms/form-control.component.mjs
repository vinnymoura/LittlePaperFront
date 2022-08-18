import { Component, ChangeDetectionStrategy, HostBinding, ViewChild, ContentChild, ElementRef, } from '@angular/core';
import { MdbAbstractFormControl } from './form-control';
import { MdbLabelDirective } from './label.directive';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/observers";
export class MdbFormControlComponent {
    constructor(_renderer, _contentObserver, _elementRef, _ngZone) {
        this._renderer = _renderer;
        this._contentObserver = _contentObserver;
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this.outline = true;
        this._destroy$ = new Subject();
        this._notchLeadingLength = 9;
        this._labelMarginLeft = 0;
        this._labelGapPadding = 8;
        this._labelScale = 0.8;
        this._recalculateGapWhenVisible = false;
    }
    get input() {
        return this._formControl.input;
    }
    ngAfterContentInit() {
        if (this._label) {
            this._updateBorderGap();
        }
        else {
            this._renderer.addClass(this.input, 'placeholder-active');
        }
        this._updateLabelActiveState();
        if (this._label) {
            this._contentObserver
                .observe(this._label.nativeElement)
                .pipe(takeUntil(this._destroy$))
                .subscribe(() => {
                this._updateBorderGap();
            });
        }
        this._formControl.stateChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._updateLabelActiveState();
            if (this._label) {
                this._updateBorderGap();
            }
        });
        this._ngZone.runOutsideAngular(() => {
            this._ngZone.onStable.pipe(takeUntil(this._destroy$)).subscribe(() => {
                if (this._label && this._recalculateGapWhenVisible) {
                    this._updateBorderGap();
                }
            });
        });
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.unsubscribe();
    }
    _getLabelWidth() {
        return this._label.nativeElement.clientWidth * this._labelScale + this._labelGapPadding;
    }
    _updateBorderGap() {
        // Element is in DOM but is not visible, we need to recalculate the gap when element
        // is displayed. This problem may occur in components such as tabs where content of
        // inactive tabs has display:none styles
        if (this._isHidden()) {
            this._recalculateGapWhenVisible = true;
            return;
        }
        const notchLeadingWidth = `${this._labelMarginLeft + this._notchLeadingLength}px`;
        const notchMiddleWidth = `${this._getLabelWidth()}px`;
        this._notchLeading.nativeElement.style.width = notchLeadingWidth;
        this._notchMiddle.nativeElement.style.width = notchMiddleWidth;
        this._label.nativeElement.style.marginLeft = `${this._labelMarginLeft}px`;
        this._recalculateGapWhenVisible = false;
    }
    _updateLabelActiveState() {
        if (this._isLabelActive()) {
            this._renderer.addClass(this.input, 'active');
        }
        else {
            this._renderer.removeClass(this.input, 'active');
        }
    }
    _isLabelActive() {
        return this._formControl && this._formControl.labelActive;
    }
    _isHidden() {
        const el = this._elementRef.nativeElement;
        return !el.offsetHeight && !el.offsetWidth;
    }
}
MdbFormControlComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbFormControlComponent, deps: [{ token: i0.Renderer2 }, { token: i1.ContentObserver }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
MdbFormControlComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.4", type: MdbFormControlComponent, selector: "mdb-form-control", host: { properties: { "class.form-outline": "this.outline" } }, queries: [{ propertyName: "_formControl", first: true, predicate: MdbAbstractFormControl, descendants: true, static: true }, { propertyName: "_label", first: true, predicate: MdbLabelDirective, descendants: true, read: ElementRef, static: true }], viewQueries: [{ propertyName: "_notchLeading", first: true, predicate: ["notchLeading"], descendants: true, static: true }, { propertyName: "_notchMiddle", first: true, predicate: ["notchMiddle"], descendants: true, static: true }], ngImport: i0, template: "<ng-content></ng-content>\n<div class=\"form-notch\">\n  <div #notchLeading class=\"form-notch-leading\"></div>\n  <div #notchMiddle class=\"form-notch-middle\"></div>\n  <div class=\"form-notch-trailing\"></div>\n</div>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbFormControlComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-form-control', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>\n<div class=\"form-notch\">\n  <div #notchLeading class=\"form-notch-leading\"></div>\n  <div #notchMiddle class=\"form-notch-middle\"></div>\n  <div class=\"form-notch-trailing\"></div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i1.ContentObserver }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { _notchLeading: [{
                type: ViewChild,
                args: ['notchLeading', { static: true }]
            }], _notchMiddle: [{
                type: ViewChild,
                args: ['notchMiddle', { static: true }]
            }], _formControl: [{
                type: ContentChild,
                args: [MdbAbstractFormControl, { static: true }]
            }], _label: [{
                type: ContentChild,
                args: [MdbLabelDirective, { static: true, read: ElementRef }]
            }], outline: [{
                type: HostBinding,
                args: ['class.form-outline']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9mb3Jtcy9mb3JtLWNvbnRyb2wuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2Zvcm1zL2Zvcm0tY29udHJvbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixFQUN2QixXQUFXLEVBQ1gsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEdBS1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQU8zQyxNQUFNLE9BQU8sdUJBQXVCO0lBWWxDLFlBQ1UsU0FBb0IsRUFDcEIsZ0JBQWlDLEVBQ2pDLFdBQXVCLEVBQ3ZCLE9BQWU7UUFIZixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFDakMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQVZVLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFhekMsY0FBUyxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO1FBRWhELHdCQUFtQixHQUFHLENBQUMsQ0FBQztRQUN4QixxQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDckIscUJBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLGdCQUFXLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLCtCQUEwQixHQUFHLEtBQUss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InNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIEhvc3RCaW5kaW5nLFxuICBWaWV3Q2hpbGQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgUmVuZGVyZXIyLFxuICBPbkRlc3Ryb3ksXG4gIE5nWm9uZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZGJBYnN0cmFjdEZvcm1Db250cm9sIH0gZnJvbSAnLi9mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHsgTWRiTGFiZWxEaXJlY3RpdmUgfSBmcm9tICcuL2xhYmVsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb250ZW50T2JzZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvb2JzZXJ2ZXJzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLWZvcm0tY29udHJvbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9mb3JtLWNvbnRyb2wuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWRiRm9ybUNvbnRyb2xDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdub3RjaExlYWRpbmcnLCB7IHN0YXRpYzogdHJ1ZSB9KSBfbm90Y2hMZWFkaW5nOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdub3RjaE1pZGRsZScsIHsgc3RhdGljOiB0cnVlIH0pIF9ub3RjaE1pZGRsZTogRWxlbWVudFJlZjtcbiAgQENvbnRlbnRDaGlsZChNZGJBYnN0cmFjdEZvcm1Db250cm9sLCB7IHN0YXRpYzogdHJ1ZSB9KSBfZm9ybUNvbnRyb2w6IE1kYkFic3RyYWN0Rm9ybUNvbnRyb2w8YW55PjtcbiAgQENvbnRlbnRDaGlsZChNZGJMYWJlbERpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUsIHJlYWQ6IEVsZW1lbnRSZWYgfSkgX2xhYmVsOiBFbGVtZW50UmVmO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZm9ybS1vdXRsaW5lJykgb3V0bGluZSA9IHRydWU7XG5cbiAgZ2V0IGlucHV0KCk6IEhUTUxJbnB1dEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9mb3JtQ29udHJvbC5pbnB1dDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBfY29udGVudE9ic2VydmVyOiBDb250ZW50T2JzZXJ2ZXIsXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZVxuICApIHt9XG5cbiAgcmVhZG9ubHkgX2Rlc3Ryb3kkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBwcml2YXRlIF9ub3RjaExlYWRpbmdMZW5ndGggPSA5O1xuICBwcml2YXRlIF9sYWJlbE1hcmdpbkxlZnQgPSAwO1xuICBwcml2YXRlIF9sYWJlbEdhcFBhZGRpbmcgPSA4O1xuICBwcml2YXRlIF9sYWJlbFNjYWxlID0gMC44O1xuICBwcml2YXRlIF9yZWNhbGN1bGF0ZUdhcFdoZW5WaXNpYmxlID0gZmFsc2U7XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9sYWJlbCkge1xuICAgICAgdGhpcy5fdXBkYXRlQm9yZGVyR2FwKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuaW5wdXQsICdwbGFjZWhvbGRlci1hY3RpdmUnKTtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlTGFiZWxBY3RpdmVTdGF0ZSgpO1xuXG4gICAgaWYgKHRoaXMuX2xhYmVsKSB7XG4gICAgICB0aGlzLl9jb250ZW50T2JzZXJ2ZXJcbiAgICAgICAgLm9ic2VydmUodGhpcy5fbGFiZWwubmF0aXZlRWxlbWVudClcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fdXBkYXRlQm9yZGVyR2FwKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuX2Zvcm1Db250cm9sLnN0YXRlQ2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl91cGRhdGVMYWJlbEFjdGl2ZVN0YXRlKCk7XG4gICAgICBpZiAodGhpcy5fbGFiZWwpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlQm9yZGVyR2FwKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5fbmdab25lLm9uU3RhYmxlLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2xhYmVsICYmIHRoaXMuX3JlY2FsY3VsYXRlR2FwV2hlblZpc2libGUpIHtcbiAgICAgICAgICB0aGlzLl91cGRhdGVCb3JkZXJHYXAoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveSQudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldExhYmVsV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbGFiZWwubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aCAqIHRoaXMuX2xhYmVsU2NhbGUgKyB0aGlzLl9sYWJlbEdhcFBhZGRpbmc7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVCb3JkZXJHYXAoKTogdm9pZCB7XG4gICAgLy8gRWxlbWVudCBpcyBpbiBET00gYnV0IGlzIG5vdCB2aXNpYmxlLCB3ZSBuZWVkIHRvIHJlY2FsY3VsYXRlIHRoZSBnYXAgd2hlbiBlbGVtZW50XG4gICAgLy8gaXMgZGlzcGxheWVkLiBUaGlzIHByb2JsZW0gbWF5IG9jY3VyIGluIGNvbXBvbmVudHMgc3VjaCBhcyB0YWJzIHdoZXJlIGNvbnRlbnQgb2ZcbiAgICAvLyBpbmFjdGl2ZSB0YWJzIGhhcyBkaXNwbGF5Om5vbmUgc3R5bGVzXG5cbiAgICBpZiAodGhpcy5faXNIaWRkZW4oKSkge1xuICAgICAgdGhpcy5fcmVjYWxjdWxhdGVHYXBXaGVuVmlzaWJsZSA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgbm90Y2hMZWFkaW5nV2lkdGggPSBgJHt0aGlzLl9sYWJlbE1hcmdpbkxlZnQgKyB0aGlzLl9ub3RjaExlYWRpbmdMZW5ndGh9cHhgO1xuICAgIGNvbnN0IG5vdGNoTWlkZGxlV2lkdGggPSBgJHt0aGlzLl9nZXRMYWJlbFdpZHRoKCl9cHhgO1xuXG4gICAgdGhpcy5fbm90Y2hMZWFkaW5nLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSBub3RjaExlYWRpbmdXaWR0aDtcbiAgICB0aGlzLl9ub3RjaE1pZGRsZS5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gbm90Y2hNaWRkbGVXaWR0aDtcbiAgICB0aGlzLl9sYWJlbC5uYXRpdmVFbGVtZW50LnN0eWxlLm1hcmdpbkxlZnQgPSBgJHt0aGlzLl9sYWJlbE1hcmdpbkxlZnR9cHhgO1xuXG4gICAgdGhpcy5fcmVjYWxjdWxhdGVHYXBXaGVuVmlzaWJsZSA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlTGFiZWxBY3RpdmVTdGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faXNMYWJlbEFjdGl2ZSgpKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmlucHV0LCAnYWN0aXZlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuaW5wdXQsICdhY3RpdmUnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pc0xhYmVsQWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9mb3JtQ29udHJvbCAmJiB0aGlzLl9mb3JtQ29udHJvbC5sYWJlbEFjdGl2ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2lzSGlkZGVuKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGVsID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgcmV0dXJuICFlbC5vZmZzZXRIZWlnaHQgJiYgIWVsLm9mZnNldFdpZHRoO1xuICB9XG59XG4iLCI8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48ZGl2IGNsYXNzPVwiZm9ybS1ub3RjaFwiPlxuICA8ZGl2ICNub3RjaExlYWRpbmcgY2xhc3M9XCJmb3JtLW5vdGNoLWxlYWRpbmdcIj48L2Rpdj5cbiAgPGRpdiAjbm90Y2hNaWRkbGUgY2xhc3M9XCJmb3JtLW5vdGNoLW1pZGRsZVwiPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZm9ybS1ub3RjaC10cmFpbGluZ1wiPjwvZGl2PlxuPC9kaXY+XG4iXX0=