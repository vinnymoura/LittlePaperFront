import { CdkPortalOutlet } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, HostBinding, Inject, ViewChild, } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@angular/cdk/portal";
export class MdbModalContainerComponent {
    constructor(_document, _elementRef, _renderer, _focusTrapFactory) {
        this._document = _document;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._focusTrapFactory = _focusTrapFactory;
        this._destroy$ = new Subject();
        this.backdropClick$ = new Subject();
        this.BACKDROP_TRANSITION = 150;
        this.MODAL_TRANSITION = 200;
        this.modal = true;
    }
    get hasAnimation() {
        return this._config.animation;
    }
    ngOnInit() {
        this._updateContainerClass();
        this._renderer.addClass(this._document.body, 'modal-open');
        this._renderer.setStyle(this._document.body, 'padding-right', '15px');
        this._renderer.setStyle(this._elementRef.nativeElement, 'display', 'block');
        this._previouslyFocusedElement = this._document.activeElement;
        this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
        if (this._config.animation) {
            setTimeout(() => {
                this._renderer.addClass(this._elementRef.nativeElement, 'show');
                setTimeout(() => {
                    this._focusTrap.focusInitialElementWhenReady();
                }, this.MODAL_TRANSITION);
            }, this.BACKDROP_TRANSITION);
        }
        else {
            this._focusTrap.focusInitialElementWhenReady();
        }
    }
    ngAfterViewInit() {
        if (!this._config.ignoreBackdropClick) {
            fromEvent(this._elementRef.nativeElement, 'mousedown')
                .pipe(filter((event) => {
                const target = event.target;
                const dialog = this.modalDialog.nativeElement;
                const notDialog = target !== dialog;
                const notDialogContent = !dialog.contains(target);
                return notDialog && notDialogContent;
            }), takeUntil(this._destroy$))
                .subscribe((event) => {
                this.backdropClick$.next(event);
            });
        }
    }
    ngOnDestroy() {
        this._previouslyFocusedElement.focus();
        this._focusTrap.destroy();
        this._destroy$.next();
        this._destroy$.complete();
    }
    _updateContainerClass() {
        if (this._config.containerClass === '' ||
            (this._config.containerClass.length && this._config.containerClass.length === 0)) {
            return;
        }
        const containerClasses = this._config.containerClass.split(' ');
        containerClasses.forEach((containerClass) => {
            this._renderer.addClass(this._elementRef.nativeElement, containerClass);
        });
    }
    _close() {
        if (this._config.animation) {
            this._renderer.removeClass(this._elementRef.nativeElement, 'show');
        }
        // Pause iframe/video when closing modal
        const iframeElements = Array.from(this._elementRef.nativeElement.querySelectorAll('iframe'));
        const videoElements = Array.from(this._elementRef.nativeElement.querySelectorAll('video'));
        iframeElements.forEach((iframe) => {
            const srcAttribute = iframe.getAttribute('src');
            this._renderer.setAttribute(iframe, 'src', srcAttribute);
        });
        videoElements.forEach((video) => {
            video.pause();
        });
    }
    _restoreScrollbar() {
        this._renderer.removeClass(this._document.body, 'modal-open');
        this._renderer.removeStyle(this._document.body, 'padding-right');
    }
    attachComponentPortal(portal) {
        return this._portalOutlet.attachComponentPortal(portal);
    }
    attachTemplatePortal(portal) {
        return this._portalOutlet.attachTemplatePortal(portal);
    }
}
MdbModalContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbModalContainerComponent, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.ConfigurableFocusTrapFactory }], target: i0.ɵɵFactoryTarget.Component });
MdbModalContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.4", type: MdbModalContainerComponent, selector: "mdb-modal-container", host: { properties: { "class.modal": "this.modal", "class.fade": "this.hasAnimation" } }, viewQueries: [{ propertyName: "_portalOutlet", first: true, predicate: CdkPortalOutlet, descendants: true, static: true }, { propertyName: "modalDialog", first: true, predicate: ["dialog"], descendants: true, static: true }], ngImport: i0, template: "<div #dialog [class]=\"'modal-dialog' + (_config.modalClass ? ' ' + _config.modalClass : '')\">\n  <div class=\"modal-content\">\n    <ng-template cdkPortalOutlet></ng-template>\n  </div>\n</div>\n", directives: [{ type: i2.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.Default });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbModalContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-modal-container', changeDetection: ChangeDetectionStrategy.Default, template: "<div #dialog [class]=\"'modal-dialog' + (_config.modalClass ? ' ' + _config.modalClass : '')\">\n  <div class=\"modal-content\">\n    <ng-template cdkPortalOutlet></ng-template>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.ConfigurableFocusTrapFactory }]; }, propDecorators: { _portalOutlet: [{
                type: ViewChild,
                args: [CdkPortalOutlet, { static: true }]
            }], modalDialog: [{
                type: ViewChild,
                args: ['dialog', { static: true }]
            }], modal: [{
                type: HostBinding,
                args: ['class.modal']
            }], hasAnimation: [{
                type: HostBinding,
                args: ['class.fade']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9tb2RhbC9tb2RhbC1jb250YWluZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L21vZGFsL21vZGFsLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFtQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZGLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUlULFdBQVcsRUFDWCxNQUFNLEVBSU4sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBTzNDLE1BQU0sT0FBTywwQkFBMEI7SUFxQnJDLFlBQzRCLFNBQVMsRUFDNUIsV0FBdUIsRUFDdEIsU0FBb0IsRUFDcEIsaUJBQStDO1FBSDdCLGNBQVMsR0FBVCxTQUFTLENBQUE7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQThCO1FBckJoRCxjQUFTLEdBQWtCLElBQUksT0FBTyxFQUFRLENBQUM7UUFDL0MsbUJBQWMsR0FBd0IsSUFBSSxPQUFPLEVBQWMsQ0FBQztRQUl6RSx3QkFBbUIsR0FBRyxHQUFHLENBQUM7UUFDMUIscUJBQWdCLEdBQUcsR0FBRyxDQUFDO1FBS0ssVUFBSyxHQUFHLElBQUksQ0FBQztJQVd0QyxDQUFDO0lBVkosSUFD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aEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELHFCQUFxQixDQUFJLE1BQTBCO1FBQ2pELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsb0JBQW9CLENBQUksTUFBeUI7UUFDL0MsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pELENBQUM7O3VIQXhIVSwwQkFBMEIsa0JBc0IzQixRQUFROzJHQXRCUCwwQkFBMEIsb01BQzFCLGVBQWUsb0tDM0I1Qix1TUFLQTsyRkRxQmEsMEJBQTBCO2tCQUx0QyxTQUFTOytCQUNFLHFCQUFxQixtQkFFZCx1QkFBdUIsQ0FBQyxPQUFPOzswQkF3QjdDLE1BQU07MkJBQUMsUUFBUTt3SUFyQjRCLGFBQWE7c0JBQTFELFNBQVM7dUJBQUMsZUFBZSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFDTCxXQUFXO3NCQUFqRCxTQUFTO3VCQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBYVQsS0FBSztzQkFBaEMsV0FBVzt1QkFBQyxhQUFhO2dCQUV0QixZQUFZO3NCQURmLFdBQVc7dUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka1BvcnRhbE91dGxldCwgQ29tcG9uZW50UG9ydGFsLCBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50UmVmLFxuICBFbGVtZW50UmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3QsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZGJNb2RhbENvbmZpZyB9IGZyb20gJy4vbW9kYWwtY29uZmlnJztcbmltcG9ydCB7IENvbmZpZ3VyYWJsZUZvY3VzVHJhcEZhY3RvcnksIENvbmZpZ3VyYWJsZUZvY3VzVHJhcCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IGZyb21FdmVudCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1tb2RhbC1jb250YWluZXInLFxuICB0ZW1wbGF0ZVVybDogJ21vZGFsLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbn0pXG5leHBvcnQgY2xhc3MgTWRiTW9kYWxDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoQ2RrUG9ydGFsT3V0bGV0LCB7IHN0YXRpYzogdHJ1ZSB9KSBfcG9ydGFsT3V0bGV0OiBDZGtQb3J0YWxPdXRsZXQ7XG4gIEBWaWV3Q2hpbGQoJ2RpYWxvZycsIHsgc3RhdGljOiB0cnVlIH0pIG1vZGFsRGlhbG9nOiBFbGVtZW50UmVmO1xuXG4gIHJlYWRvbmx5IF9kZXN0cm95JDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHJlYWRvbmx5IGJhY2tkcm9wQ2xpY2skOiBTdWJqZWN0PE1vdXNlRXZlbnQ+ID0gbmV3IFN1YmplY3Q8TW91c2VFdmVudD4oKTtcblxuICBfY29uZmlnOiBNZGJNb2RhbENvbmZpZztcblxuICBCQUNLRFJPUF9UUkFOU0lUSU9OID0gMTUwO1xuICBNT0RBTF9UUkFOU0lUSU9OID0gMjAwO1xuXG4gIHByaXZhdGUgX3ByZXZpb3VzbHlGb2N1c2VkRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX2ZvY3VzVHJhcDogQ29uZmlndXJhYmxlRm9jdXNUcmFwO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubW9kYWwnKSBtb2RhbCA9IHRydWU7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuZmFkZScpXG4gIGdldCBoYXNBbmltYXRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5hbmltYXRpb247XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudCxcbiAgICBwdWJsaWMgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF9mb2N1c1RyYXBGYWN0b3J5OiBDb25maWd1cmFibGVGb2N1c1RyYXBGYWN0b3J5XG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVDb250YWluZXJDbGFzcygpO1xuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2RvY3VtZW50LmJvZHksICdtb2RhbC1vcGVuJyk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZG9jdW1lbnQuYm9keSwgJ3BhZGRpbmctcmlnaHQnLCAnMTVweCcpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICB0aGlzLl9wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQgPSB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuICAgIHRoaXMuX2ZvY3VzVHJhcCA9IHRoaXMuX2ZvY3VzVHJhcEZhY3RvcnkuY3JlYXRlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG5cbiAgICBpZiAodGhpcy5fY29uZmlnLmFuaW1hdGlvbikge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3Nob3cnKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9mb2N1c1RyYXAuZm9jdXNJbml0aWFsRWxlbWVudFdoZW5SZWFkeSgpO1xuICAgICAgICB9LCB0aGlzLk1PREFMX1RSQU5TSVRJT04pO1xuICAgICAgfSwgdGhpcy5CQUNLRFJPUF9UUkFOU0lUSU9OKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZm9jdXNUcmFwLmZvY3VzSW5pdGlhbEVsZW1lbnRXaGVuUmVhZHkoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9jb25maWcuaWdub3JlQmFja2Ryb3BDbGljaykge1xuICAgICAgZnJvbUV2ZW50KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21vdXNlZG93bicpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcigoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IGRpYWxvZyA9IHRoaXMubW9kYWxEaWFsb2cubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IG5vdERpYWxvZyA9IHRhcmdldCAhPT0gZGlhbG9nO1xuICAgICAgICAgICAgY29uc3Qgbm90RGlhbG9nQ29udGVudCA9ICFkaWFsb2cuY29udGFpbnModGFyZ2V0KTtcbiAgICAgICAgICAgIHJldHVybiBub3REaWFsb2cgJiYgbm90RGlhbG9nQ29udGVudDtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLmJhY2tkcm9wQ2xpY2skLm5leHQoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQuZm9jdXMoKTtcbiAgICB0aGlzLl9mb2N1c1RyYXAuZGVzdHJveSgpO1xuICAgIHRoaXMuX2Rlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQ29udGFpbmVyQ2xhc3MoKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5fY29uZmlnLmNvbnRhaW5lckNsYXNzID09PSAnJyB8fFxuICAgICAgKHRoaXMuX2NvbmZpZy5jb250YWluZXJDbGFzcy5sZW5ndGggJiYgdGhpcy5fY29uZmlnLmNvbnRhaW5lckNsYXNzLmxlbmd0aCA9PT0gMClcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjb250YWluZXJDbGFzc2VzID0gdGhpcy5fY29uZmlnLmNvbnRhaW5lckNsYXNzLnNwbGl0KCcgJyk7XG5cbiAgICBjb250YWluZXJDbGFzc2VzLmZvckVhY2goKGNvbnRhaW5lckNsYXNzKSA9PiB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGNvbnRhaW5lckNsYXNzKTtcbiAgICB9KTtcbiAgfVxuXG4gIF9jbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY29uZmlnLmFuaW1hdGlvbikge1xuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnc2hvdycpO1xuICAgIH1cblxuICAgIC8vIFBhdXNlIGlmcmFtZS92aWRlbyB3aGVuIGNsb3NpbmcgbW9kYWxcbiAgICBjb25zdCBpZnJhbWVFbGVtZW50cyA9IEFycmF5LmZyb20odGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lmcmFtZScpKTtcbiAgICBjb25zdCB2aWRlb0VsZW1lbnRzID0gQXJyYXkuZnJvbSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgndmlkZW8nKSk7XG5cbiAgICBpZnJhbWVFbGVtZW50cy5mb3JFYWNoKChpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCBzcmNBdHRyaWJ1dGU6IGFueSA9IGlmcmFtZS5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKGlmcmFtZSwgJ3NyYycsIHNyY0F0dHJpYnV0ZSk7XG4gICAgfSk7XG5cbiAgICB2aWRlb0VsZW1lbnRzLmZvckVhY2goKHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50KSA9PiB7XG4gICAgICB2aWRlby5wYXVzZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgX3Jlc3RvcmVTY3JvbGxiYXIoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZG9jdW1lbnQuYm9keSwgJ21vZGFsLW9wZW4nKTtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLl9kb2N1bWVudC5ib2R5LCAncGFkZGluZy1yaWdodCcpO1xuICB9XG5cbiAgYXR0YWNoQ29tcG9uZW50UG9ydGFsPFQ+KHBvcnRhbDogQ29tcG9uZW50UG9ydGFsPFQ+KTogQ29tcG9uZW50UmVmPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5fcG9ydGFsT3V0bGV0LmF0dGFjaENvbXBvbmVudFBvcnRhbChwb3J0YWwpO1xuICB9XG5cbiAgYXR0YWNoVGVtcGxhdGVQb3J0YWw8Qz4ocG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDxDPik6IEVtYmVkZGVkVmlld1JlZjxDPiB7XG4gICAgcmV0dXJuIHRoaXMuX3BvcnRhbE91dGxldC5hdHRhY2hUZW1wbGF0ZVBvcnRhbChwb3J0YWwpO1xuICB9XG59XG4iLCI8ZGl2ICNkaWFsb2cgW2NsYXNzXT1cIidtb2RhbC1kaWFsb2cnICsgKF9jb25maWcubW9kYWxDbGFzcyA/ICcgJyArIF9jb25maWcubW9kYWxDbGFzcyA6ICcnKVwiPlxuICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxuICAgIDxuZy10ZW1wbGF0ZSBjZGtQb3J0YWxPdXRsZXQ+PC9uZy10ZW1wbGF0ZT5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==