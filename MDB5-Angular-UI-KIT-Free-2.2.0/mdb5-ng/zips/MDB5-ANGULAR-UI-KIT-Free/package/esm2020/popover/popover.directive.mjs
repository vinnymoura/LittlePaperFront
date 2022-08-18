import { Directive, EventEmitter, Input, Output, } from '@angular/core';
import { OverlayConfig, } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MdbPopoverComponent } from './popover.component';
import { fromEvent, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MdbPopoverDirective {
    constructor(_overlay, _overlayPositionBuilder, _elementRef) {
        this._overlay = _overlay;
        this._overlayPositionBuilder = _overlayPositionBuilder;
        this._elementRef = _elementRef;
        this.mdbPopover = '';
        this.mdbPopoverTitle = '';
        this._popoverDisabled = false;
        this.placement = 'top';
        this._animation = false;
        this.trigger = 'click';
        this.delayShow = 0;
        this.delayHide = 0;
        this.offset = 4;
        this.popoverShow = new EventEmitter();
        this.popoverShown = new EventEmitter();
        this.popoverHide = new EventEmitter();
        this.popoverHidden = new EventEmitter();
        this._open = false;
        this._showTimeout = 0;
        this._hideTimeout = 0;
        this._destroy$ = new Subject();
    }
    get popoverDisabled() {
        return this._popoverDisabled;
    }
    set popoverDisabled(value) {
        this._popoverDisabled = coerceBooleanProperty(value);
    }
    get animation() {
        return this._animation;
    }
    set animation(value) {
        this._animation = coerceBooleanProperty(value);
    }
    ngOnInit() {
        if (this.popoverDisabled) {
            return;
        }
        this._bindTriggerEvents();
    }
    ngOnDestroy() {
        if (this._open) {
            this.hide();
        }
        this._destroy$.next();
        this._destroy$.complete();
    }
    _bindTriggerEvents() {
        const triggers = this.trigger.split(' ');
        triggers.forEach((trigger) => {
            if (trigger === 'click') {
                fromEvent(this._elementRef.nativeElement, trigger)
                    .pipe(takeUntil(this._destroy$))
                    .subscribe(() => this.toggle());
            }
            else if (trigger !== 'manual') {
                const evIn = trigger === 'hover' ? 'mouseenter' : 'focusin';
                const evOut = trigger === 'hover' ? 'mouseleave' : 'focusout';
                fromEvent(this._elementRef.nativeElement, evIn)
                    .pipe(takeUntil(this._destroy$))
                    .subscribe(() => this.show());
                fromEvent(this._elementRef.nativeElement, evOut)
                    .pipe(takeUntil(this._destroy$))
                    .subscribe(() => this.hide());
            }
        });
    }
    _createOverlayConfig() {
        const positionStrategy = this._overlayPositionBuilder
            .flexibleConnectedTo(this._elementRef)
            .withPositions(this._getPosition());
        const overlayConfig = new OverlayConfig({
            hasBackdrop: false,
            scrollStrategy: this._overlay.scrollStrategies.reposition(),
            positionStrategy,
        });
        return overlayConfig;
    }
    _createOverlay() {
        this._overlayRef = this._overlay.create(this._createOverlayConfig());
    }
    _getPosition() {
        let position;
        const positionTop = {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom',
            offsetY: -this.offset,
        };
        const positionBottom = {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top',
            offsetY: this.offset,
        };
        const positionRight = {
            originX: 'end',
            originY: 'center',
            overlayX: 'start',
            overlayY: 'center',
            offsetX: this.offset,
        };
        const positionLeft = {
            originX: 'start',
            originY: 'center',
            overlayX: 'end',
            overlayY: 'center',
            offsetX: -this.offset,
        };
        switch (this.placement) {
            case 'top':
                position = [positionTop, positionBottom];
                break;
            case 'bottom':
                position = [positionBottom, positionTop];
                break;
            case 'left':
                position = [positionLeft, positionRight, positionTop, positionBottom];
                break;
            case 'right':
                position = [positionRight, positionLeft, positionTop, positionBottom];
                break;
            default:
                break;
        }
        return position;
    }
    show() {
        if (this._hideTimeout) {
            this._overlayRef.detach();
            clearTimeout(this._hideTimeout);
            this._hideTimeout = null;
        }
        this._createOverlay();
        if (this._hideTimeout) {
            clearTimeout(this._hideTimeout);
            this._hideTimeout = null;
        }
        this._showTimeout = setTimeout(() => {
            const tooltipPortal = new ComponentPortal(MdbPopoverComponent);
            this.popoverShow.emit(this);
            this._open = true;
            this._tooltipRef = this._overlayRef.attach(tooltipPortal);
            this._tooltipRef.instance.content = this.template || this.mdbPopover;
            this._tooltipRef.instance.title = this.mdbPopoverTitle;
            this._tooltipRef.instance.animation = this.animation;
            this._tooltipRef.instance.animationState = 'visible';
            this._tooltipRef.instance.markForCheck();
            this.popoverShown.emit(this);
        }, this.delayShow);
    }
    hide() {
        if (this._showTimeout) {
            clearTimeout(this._showTimeout);
            this._showTimeout = null;
        }
        else {
            return;
        }
        this._hideTimeout = setTimeout(() => {
            this.popoverHide.emit(this);
            if (!this._tooltipRef) {
                this._overlayRef.detach();
                this._open = false;
                this.popoverHidden.emit(this);
            }
            else {
                this._tooltipRef.instance._hidden.pipe(first()).subscribe(() => {
                    this._overlayRef.detach();
                    this._open = false;
                    this.popoverHidden.emit(this);
                });
                this._tooltipRef.instance.animationState = 'hidden';
                this._tooltipRef.instance.markForCheck();
            }
        }, this.delayHide);
    }
    toggle() {
        if (this._open) {
            this.hide();
        }
        else {
            this.show();
        }
    }
}
MdbPopoverDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbPopoverDirective, deps: [{ token: i1.Overlay }, { token: i1.OverlayPositionBuilder }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MdbPopoverDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.4", type: MdbPopoverDirective, selector: "[mdbPopover]", inputs: { mdbPopover: "mdbPopover", mdbPopoverTitle: "mdbPopoverTitle", popoverDisabled: "popoverDisabled", placement: "placement", template: "template", animation: "animation", trigger: "trigger", delayShow: "delayShow", delayHide: "delayHide", offset: "offset" }, outputs: { popoverShow: "popoverShow", popoverShown: "popoverShown", popoverHide: "popoverHide", popoverHidden: "popoverHidden" }, exportAs: ["mdbPopover"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbPopoverDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbPopover]',
                    exportAs: 'mdbPopover',
                }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i1.OverlayPositionBuilder }, { type: i0.ElementRef }]; }, propDecorators: { mdbPopover: [{
                type: Input
            }], mdbPopoverTitle: [{
                type: Input
            }], popoverDisabled: [{
                type: Input
            }], placement: [{
                type: Input
            }], template: [{
                type: Input
            }], animation: [{
                type: Input
            }], trigger: [{
                type: Input
            }], delayShow: [{
                type: Input
            }], delayHide: [{
                type: Input
            }], offset: [{
                type: Input
            }], popoverShow: [{
                type: Output
            }], popoverShown: [{
                type: Output
            }], popoverHide: [{
                type: Output
            }], popoverHidden: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvcG9wb3Zlci9wb3BvdmVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxHQUdQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHTCxhQUFhLEdBR2QsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsZUFBZSxFQUFrQixNQUFNLHFCQUFxQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEQsT0FBTyxFQUFnQixxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7QUFPNUUsa0VBQWtFO0FBQ2xFLE1BQU0sT0FBTyxtQkFBbUI7SUEyQzlCLFlBQ1UsUUFBaUIsRUFDakIsdUJBQStDLEVBQy9DLFdBQXVCO1FBRnZCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtRQUMvQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQTdDeEIsZUFBVSxHQUE4QixFQUFFLENBQUM7UUFDM0Msb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFTdEIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBRXhCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFVbkIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUVsQixZQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ2xCLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2Qs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QkFBaEIsS0FBSztnQkFHRixTQUFTO3NCQURaLEtBQUs7Z0JBU0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBRUksV0FBVztzQkFBcEIsTUFBTTtnQkFDRyxZQUFZO3NCQUFyQixNQUFNO2dCQUNHLFdBQVc7c0JBQXBCLE1BQU07Z0JBQ0csYUFBYTtzQkFBdEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudFJlZixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb25uZWN0ZWRQb3NpdGlvbixcbiAgT3ZlcmxheSxcbiAgT3ZlcmxheUNvbmZpZyxcbiAgT3ZlcmxheVBvc2l0aW9uQnVpbGRlcixcbiAgT3ZlcmxheVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsLCBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgTWRiUG9wb3ZlckNvbXBvbmVudCB9IGZyb20gJy4vcG9wb3Zlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaXJzdCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbbWRiUG9wb3Zlcl0nLFxuICBleHBvcnRBczogJ21kYlBvcG92ZXInLFxufSlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvY29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIE1kYlBvcG92ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIG1kYlBvcG92ZXI6IFRlbXBsYXRlUmVmPGFueT4gfCBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgbWRiUG9wb3ZlclRpdGxlID0gJyc7XG5cbiAgQElucHV0KClcbiAgZ2V0IHBvcG92ZXJEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcG9wb3ZlckRpc2FibGVkO1xuICB9XG4gIHNldCBwb3BvdmVyRGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9wb3BvdmVyRGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3BvcG92ZXJEaXNhYmxlZCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIHBsYWNlbWVudCA9ICd0b3AnO1xuICBASW5wdXQoKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKVxuICBnZXQgYW5pbWF0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hbmltYXRpb247XG4gIH1cbiAgc2V0IGFuaW1hdGlvbih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2FuaW1hdGlvbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfYW5pbWF0aW9uID0gZmFsc2U7XG5cbiAgQElucHV0KCkgdHJpZ2dlciA9ICdjbGljayc7XG4gIEBJbnB1dCgpIGRlbGF5U2hvdyA9IDA7XG4gIEBJbnB1dCgpIGRlbGF5SGlkZSA9IDA7XG4gIEBJbnB1dCgpIG9mZnNldCA9IDQ7XG5cbiAgQE91dHB1dCgpIHBvcG92ZXJTaG93OiBFdmVudEVtaXR0ZXI8TWRiUG9wb3ZlckRpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwb3BvdmVyU2hvd246IEV2ZW50RW1pdHRlcjxNZGJQb3BvdmVyRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHBvcG92ZXJIaWRlOiBFdmVudEVtaXR0ZXI8TWRiUG9wb3ZlckRpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwb3BvdmVySGlkZGVuOiBFdmVudEVtaXR0ZXI8TWRiUG9wb3ZlckRpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBfb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcbiAgcHJpdmF0ZSBfdG9vbHRpcFJlZjogQ29tcG9uZW50UmVmPE1kYlBvcG92ZXJDb21wb25lbnQ+O1xuICBwcml2YXRlIF9vcGVuID0gZmFsc2U7XG4gIHByaXZhdGUgX3Nob3dUaW1lb3V0OiBhbnkgPSAwO1xuICBwcml2YXRlIF9oaWRlVGltZW91dDogYW55ID0gMDtcblxuICByZWFkb25seSBfZGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBfb3ZlcmxheVBvc2l0aW9uQnVpbGRlcjogT3ZlcmxheVBvc2l0aW9uQnVpbGRlcixcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wb3BvdmVyRGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9iaW5kVHJpZ2dlckV2ZW50cygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX29wZW4pIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIHRoaXMuX2Rlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYmluZFRyaWdnZXJFdmVudHMoKTogdm9pZCB7XG4gICAgY29uc3QgdHJpZ2dlcnMgPSB0aGlzLnRyaWdnZXIuc3BsaXQoJyAnKTtcblxuICAgIHRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXIpID0+IHtcbiAgICAgIGlmICh0cmlnZ2VyID09PSAnY2xpY2snKSB7XG4gICAgICAgIGZyb21FdmVudCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRyaWdnZXIpXG4gICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMudG9nZ2xlKCkpO1xuICAgICAgfSBlbHNlIGlmICh0cmlnZ2VyICE9PSAnbWFudWFsJykge1xuICAgICAgICBjb25zdCBldkluID0gdHJpZ2dlciA9PT0gJ2hvdmVyJyA/ICdtb3VzZWVudGVyJyA6ICdmb2N1c2luJztcbiAgICAgICAgY29uc3QgZXZPdXQgPSB0cmlnZ2VyID09PSAnaG92ZXInID8gJ21vdXNlbGVhdmUnIDogJ2ZvY3Vzb3V0JztcblxuICAgICAgICBmcm9tRXZlbnQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBldkluKVxuICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpXG4gICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNob3coKSk7XG4gICAgICAgIGZyb21FdmVudCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGV2T3V0KVxuICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpXG4gICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmhpZGUoKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVPdmVybGF5Q29uZmlnKCk6IE92ZXJsYXlDb25maWcge1xuICAgIGNvbnN0IHBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLl9vdmVybGF5UG9zaXRpb25CdWlsZGVyXG4gICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLl9lbGVtZW50UmVmKVxuICAgICAgLndpdGhQb3NpdGlvbnModGhpcy5fZ2V0UG9zaXRpb24oKSk7XG4gICAgY29uc3Qgb3ZlcmxheUNvbmZpZyA9IG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgIGhhc0JhY2tkcm9wOiBmYWxzZSxcbiAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLl9vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbigpLFxuICAgICAgcG9zaXRpb25TdHJhdGVneSxcbiAgICB9KTtcblxuICAgIHJldHVybiBvdmVybGF5Q29uZmlnO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlT3ZlcmxheSgpOiB2b2lkIHtcbiAgICB0aGlzLl9vdmVybGF5UmVmID0gdGhpcy5fb3ZlcmxheS5jcmVhdGUodGhpcy5fY3JlYXRlT3ZlcmxheUNvbmZpZygpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFBvc2l0aW9uKCk6IENvbm5lY3RlZFBvc2l0aW9uW10ge1xuICAgIGxldCBwb3NpdGlvbjtcblxuICAgIGNvbnN0IHBvc2l0aW9uVG9wID0ge1xuICAgICAgb3JpZ2luWDogJ2NlbnRlcicsXG4gICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgIG92ZXJsYXlYOiAnY2VudGVyJyxcbiAgICAgIG92ZXJsYXlZOiAnYm90dG9tJyxcbiAgICAgIG9mZnNldFk6IC10aGlzLm9mZnNldCxcbiAgICB9O1xuXG4gICAgY29uc3QgcG9zaXRpb25Cb3R0b20gPSB7XG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcbiAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgb3ZlcmxheVg6ICdjZW50ZXInLFxuICAgICAgb3ZlcmxheVk6ICd0b3AnLFxuICAgICAgb2Zmc2V0WTogdGhpcy5vZmZzZXQsXG4gICAgfTtcblxuICAgIGNvbnN0IHBvc2l0aW9uUmlnaHQgPSB7XG4gICAgICBvcmlnaW5YOiAnZW5kJyxcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxuICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICBvdmVybGF5WTogJ2NlbnRlcicsXG4gICAgICBvZmZzZXRYOiB0aGlzLm9mZnNldCxcbiAgICB9O1xuXG4gICAgY29uc3QgcG9zaXRpb25MZWZ0ID0ge1xuICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxuICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgb3ZlcmxheVk6ICdjZW50ZXInLFxuICAgICAgb2Zmc2V0WDogLXRoaXMub2Zmc2V0LFxuICAgIH07XG5cbiAgICBzd2l0Y2ggKHRoaXMucGxhY2VtZW50KSB7XG4gICAgICBjYXNlICd0b3AnOlxuICAgICAgICBwb3NpdGlvbiA9IFtwb3NpdGlvblRvcCwgcG9zaXRpb25Cb3R0b21dO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgIHBvc2l0aW9uID0gW3Bvc2l0aW9uQm90dG9tLCBwb3NpdGlvblRvcF07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIHBvc2l0aW9uID0gW3Bvc2l0aW9uTGVmdCwgcG9zaXRpb25SaWdodCwgcG9zaXRpb25Ub3AsIHBvc2l0aW9uQm90dG9tXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIHBvc2l0aW9uID0gW3Bvc2l0aW9uUmlnaHQsIHBvc2l0aW9uTGVmdCwgcG9zaXRpb25Ub3AsIHBvc2l0aW9uQm90dG9tXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cblxuICBzaG93KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9oaWRlVGltZW91dCkge1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9oaWRlVGltZW91dCk7XG4gICAgICB0aGlzLl9oaWRlVGltZW91dCA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5fY3JlYXRlT3ZlcmxheSgpO1xuXG4gICAgaWYgKHRoaXMuX2hpZGVUaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5faGlkZVRpbWVvdXQpO1xuICAgICAgdGhpcy5faGlkZVRpbWVvdXQgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuX3Nob3dUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCB0b29sdGlwUG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChNZGJQb3BvdmVyQ29tcG9uZW50KTtcblxuICAgICAgdGhpcy5wb3BvdmVyU2hvdy5lbWl0KHRoaXMpO1xuICAgICAgdGhpcy5fb3BlbiA9IHRydWU7XG5cbiAgICAgIHRoaXMuX3Rvb2x0aXBSZWYgPSB0aGlzLl9vdmVybGF5UmVmLmF0dGFjaCh0b29sdGlwUG9ydGFsKTtcblxuICAgICAgdGhpcy5fdG9vbHRpcFJlZi5pbnN0YW5jZS5jb250ZW50ID0gdGhpcy50ZW1wbGF0ZSB8fCB0aGlzLm1kYlBvcG92ZXI7XG4gICAgICB0aGlzLl90b29sdGlwUmVmLmluc3RhbmNlLnRpdGxlID0gdGhpcy5tZGJQb3BvdmVyVGl0bGU7XG4gICAgICB0aGlzLl90b29sdGlwUmVmLmluc3RhbmNlLmFuaW1hdGlvbiA9IHRoaXMuYW5pbWF0aW9uO1xuICAgICAgdGhpcy5fdG9vbHRpcFJlZi5pbnN0YW5jZS5hbmltYXRpb25TdGF0ZSA9ICd2aXNpYmxlJztcbiAgICAgIHRoaXMuX3Rvb2x0aXBSZWYuaW5zdGFuY2UubWFya0ZvckNoZWNrKCk7XG5cbiAgICAgIHRoaXMucG9wb3ZlclNob3duLmVtaXQodGhpcyk7XG4gICAgfSwgdGhpcy5kZWxheVNob3cpO1xuICB9XG5cbiAgaGlkZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc2hvd1RpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zaG93VGltZW91dCk7XG4gICAgICB0aGlzLl9zaG93VGltZW91dCA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9oaWRlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5wb3BvdmVySGlkZS5lbWl0KHRoaXMpO1xuICAgICAgaWYgKCF0aGlzLl90b29sdGlwUmVmKSB7XG4gICAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICAgIHRoaXMuX29wZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wb3BvdmVySGlkZGVuLmVtaXQodGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl90b29sdGlwUmVmLmluc3RhbmNlLl9oaWRkZW4ucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICAgICAgdGhpcy5fb3BlbiA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMucG9wb3ZlckhpZGRlbi5lbWl0KHRoaXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fdG9vbHRpcFJlZi5pbnN0YW5jZS5hbmltYXRpb25TdGF0ZSA9ICdoaWRkZW4nO1xuICAgICAgICB0aGlzLl90b29sdGlwUmVmLmluc3RhbmNlLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfVxuICAgIH0sIHRoaXMuZGVsYXlIaWRlKTtcbiAgfVxuXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb3Blbikge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9hbmltYXRpb246IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3BvcG92ZXJEaXNhYmxlZDogQm9vbGVhbklucHV0O1xufVxuIl19