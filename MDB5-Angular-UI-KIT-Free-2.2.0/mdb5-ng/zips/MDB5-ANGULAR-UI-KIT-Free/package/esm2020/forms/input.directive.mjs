import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, HostBinding, HostListener, Input, Optional, Self, } from '@angular/core';
import { Subject } from 'rxjs';
import { MdbAbstractFormControl } from './form-control';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MdbInputDirective {
    constructor(_elementRef, _renderer, _ngControl) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngControl = _ngControl;
        this.stateChanges = new Subject();
        this._focused = false;
        this._color = '';
        this._disabled = false;
        this._readonly = false;
    }
    ngAfterViewInit() {
        this._color = getComputedStyle(this._elementRef.nativeElement).color;
        if (this._elementRef.nativeElement.type === 'date') {
            this._updateTextColorForDateType();
        }
    }
    get disabled() {
        if (this._ngControl && this._ngControl.disabled !== null) {
            return this._ngControl.disabled;
        }
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    get readonly() {
        return this._readonly;
    }
    set readonly(value) {
        if (value) {
            this._renderer.setAttribute(this._elementRef.nativeElement, 'readonly', '');
        }
        else {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'readonly');
        }
        this._readonly = coerceBooleanProperty(value);
    }
    get value() {
        return this._elementRef.nativeElement.value;
    }
    set value(value) {
        if (value !== this.value) {
            this._elementRef.nativeElement.value = value;
            this._value = value;
            this.stateChanges.next();
        }
    }
    _updateTextColorForDateType() {
        const actualColor = getComputedStyle(this._elementRef.nativeElement).color;
        this._color = actualColor !== 'rgba(0, 0, 0, 0)' ? actualColor : this._color;
        const color = this.labelActive ? this._color : `transparent`;
        this._renderer.setStyle(this._elementRef.nativeElement, 'color', color);
    }
    _onFocus() {
        this._focused = true;
        if (this._elementRef.nativeElement.type === 'date') {
            this._updateTextColorForDateType();
        }
        this.stateChanges.next();
    }
    _onBlur() {
        this._focused = false;
        if (this._elementRef.nativeElement.type === 'date') {
            this._updateTextColorForDateType();
        }
        this.stateChanges.next();
    }
    ngDoCheck() {
        const value = this._elementRef.nativeElement.value;
        if (this._currentNativeValue !== value) {
            this._currentNativeValue = value;
            this.stateChanges.next();
        }
    }
    get hasValue() {
        return this._elementRef.nativeElement.value !== '';
    }
    get focused() {
        return this._focused;
    }
    get input() {
        return this._elementRef.nativeElement;
    }
    get labelActive() {
        return this.focused || this.hasValue;
    }
}
MdbInputDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbInputDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.NgControl, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Directive });
MdbInputDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.4", type: MdbInputDirective, selector: "[mdbInput]", inputs: { disabled: "disabled", readonly: "readonly", value: "value" }, host: { listeners: { "focus": "_onFocus()", "blur": "_onBlur()" }, properties: { "disabled": "this.disabled" } }, providers: [{ provide: MdbAbstractFormControl, useExisting: MdbInputDirective }], exportAs: ["mdbInput"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbInputDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbInput]',
                    exportAs: 'mdbInput',
                    providers: [{ provide: MdbAbstractFormControl, useExisting: MdbInputDirective }],
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }]; }, propDecorators: { disabled: [{
                type: HostBinding,
                args: ['disabled']
            }, {
                type: Input,
                args: ['disabled']
            }], readonly: [{
                type: Input,
                args: ['readonly']
            }], value: [{
                type: Input
            }], _onFocus: [{
                type: HostListener,
                args: ['focus']
            }], _onBlur: [{
                type: HostListener,
                args: ['blur']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2Zvcm1zL2lucHV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUVMLFNBQVMsRUFHVCxXQUFXLEVBQ1gsWUFBWSxFQUNaLEtBQUssRUFDTCxRQUFRLEVBRVIsSUFBSSxHQUNMLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQVF4RCxrRUFBa0U7QUFDbEUsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUNVLFdBQXVCLEVBQ3ZCLFNBQW9CLEVBQ0EsVUFBcUI7UUFGekMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNBLGVBQVUsR0FBVixVQUFVLENBQVc7UUFHMUMsaUJBQVksR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUVuRCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFzQlosY0FBUyxHQUFHLEtBQUssQ0FBQztRQWNsQixjQUFTLEdBQUcsS0FBSyxDQUFDO0lBekN2QixDQUFDO0lBT0osZUFBZTtRQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDckUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1lBQ2xELElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQztJQUlELElB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bSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRG9DaGVjayxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9wdGlvbmFsLFxuICBSZW5kZXJlcjIsXG4gIFNlbGYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWRiQWJzdHJhY3RGb3JtQ29udHJvbCB9IGZyb20gJy4vZm9ybS1jb250cm9sJztcblxuQERpcmVjdGl2ZSh7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW21kYklucHV0XScsXG4gIGV4cG9ydEFzOiAnbWRiSW5wdXQnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE1kYkFic3RyYWN0Rm9ybUNvbnRyb2wsIHVzZUV4aXN0aW5nOiBNZGJJbnB1dERpcmVjdGl2ZSB9XSxcbn0pXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2NvbXBvbmVudC1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBNZGJJbnB1dERpcmVjdGl2ZSBpbXBsZW1lbnRzIE1kYkFic3RyYWN0Rm9ybUNvbnRyb2w8YW55PiwgRG9DaGVjaywgQWZ0ZXJWaWV3SW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHByaXZhdGUgX25nQ29udHJvbDogTmdDb250cm9sXG4gICkge31cblxuICByZWFkb25seSBzdGF0ZUNoYW5nZXM6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIHByaXZhdGUgX2ZvY3VzZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY29sb3IgPSAnJztcblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fY29sb3IgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkuY29sb3I7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC50eXBlID09PSAnZGF0ZScpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZVRleHRDb2xvckZvckRhdGVUeXBlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY3VycmVudE5hdGl2ZVZhbHVlOiBhbnk7XG5cbiAgQEhvc3RCaW5kaW5nKCdkaXNhYmxlZCcpXG4gIEBJbnB1dCgnZGlzYWJsZWQnKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX25nQ29udHJvbCAmJiB0aGlzLl9uZ0NvbnRyb2wuZGlzYWJsZWQgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLl9uZ0NvbnRyb2wuZGlzYWJsZWQ7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICBASW5wdXQoJ3JlYWRvbmx5JylcbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZWFkb25seTtcbiAgfVxuICBzZXQgcmVhZG9ubHkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdyZWFkb25seScsICcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3JlYWRvbmx5Jyk7XG4gICAgfVxuICAgIHRoaXMuX3JlYWRvbmx5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9yZWFkb25seSA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfdmFsdWU6IGFueTtcblxuICBwcml2YXRlIF91cGRhdGVUZXh0Q29sb3JGb3JEYXRlVHlwZSgpIHtcbiAgICBjb25zdCBhY3R1YWxDb2xvciA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5jb2xvcjtcbiAgICB0aGlzLl9jb2xvciA9IGFjdHVhbENvbG9yICE9PSAncmdiYSgwLCAwLCAwLCAwKScgPyBhY3R1YWxDb2xvciA6IHRoaXMuX2NvbG9yO1xuXG4gICAgY29uc3QgY29sb3IgPSB0aGlzLmxhYmVsQWN0aXZlID8gdGhpcy5fY29sb3IgOiBgdHJhbnNwYXJlbnRgO1xuXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnY29sb3InLCBjb2xvcik7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1cycpXG4gIF9vbkZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuX2ZvY3VzZWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgICB0aGlzLl91cGRhdGVUZXh0Q29sb3JGb3JEYXRlVHlwZSgpO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgX29uQmx1cigpOiB2b2lkIHtcbiAgICB0aGlzLl9mb2N1c2VkID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC50eXBlID09PSAnZGF0ZScpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZVRleHRDb2xvckZvckRhdGVUeXBlKCk7XG4gICAgfVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICBpZiAodGhpcy5fY3VycmVudE5hdGl2ZVZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fY3VycmVudE5hdGl2ZVZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGhhc1ZhbHVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgIT09ICcnO1xuICB9XG5cbiAgZ2V0IGZvY3VzZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvY3VzZWQ7XG4gIH1cblxuICBnZXQgaW5wdXQoKTogSFRNTElucHV0RWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIGdldCBsYWJlbEFjdGl2ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5mb2N1c2VkIHx8IHRoaXMuaGFzVmFsdWU7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3JlYWRvbmx5OiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=