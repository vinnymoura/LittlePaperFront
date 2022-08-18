import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { OverlayConfig, } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ContentChild } from '@angular/core';
import { MdbDropdownToggleDirective } from './dropdown-toggle.directive';
import { MdbDropdownMenuDirective } from './dropdown-menu.directive';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "@angular/cdk/layout";
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MdbDropdownDirective {
    constructor(_overlay, _overlayPositionBuilder, _elementRef, _vcr, _breakpointObserver, _cdRef) {
        this._overlay = _overlay;
        this._overlayPositionBuilder = _overlayPositionBuilder;
        this._elementRef = _elementRef;
        this._vcr = _vcr;
        this._breakpointObserver = _breakpointObserver;
        this._cdRef = _cdRef;
        this._animation = true;
        this.offset = 0;
        this.closeOnOutsideClick = true;
        this.closeOnItemClick = true;
        this.closeOnEsc = true;
        this.dropdownShow = new EventEmitter();
        this.dropdownShown = new EventEmitter();
        this.dropdownHide = new EventEmitter();
        this.dropdownHidden = new EventEmitter();
        this._open = false;
        this._breakpoints = {
            isSm: this._breakpointObserver.isMatched('(min-width: 576px)'),
            isMd: this._breakpointObserver.isMatched('(min-width: 768px)'),
            isLg: this._breakpointObserver.isMatched('(min-width: 992px)'),
            isXl: this._breakpointObserver.isMatched('(min-width: 1200px)'),
            isXxl: this._breakpointObserver.isMatched('(min-width: 1400px)'),
        };
        this._destroy$ = new Subject();
        this._animationState = 'hidden';
    }
    get animation() {
        return this._animation;
    }
    set animation(value) {
        this._animation = coerceBooleanProperty(value);
    }
    ngAfterContentInit() {
        this._bindDropdownToggleClick();
    }
    ngOnDestroy() {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this._overlayRef.dispose();
        }
        this._destroy$.next();
        this._destroy$.complete();
    }
    _bindDropdownToggleClick() {
        fromEvent(this._dropdownToggle.nativeElement, 'click')
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => this.toggle());
    }
    _createOverlayConfig() {
        return new OverlayConfig({
            hasBackdrop: false,
            scrollStrategy: this._overlay.scrollStrategies.reposition(),
            positionStrategy: this._createPositionStrategy(),
        });
    }
    _createOverlay() {
        this._overlayRef = this._overlay.create(this._createOverlayConfig());
    }
    _createPositionStrategy() {
        const positionStrategy = this._overlayPositionBuilder
            .flexibleConnectedTo(this._dropdownToggle)
            .withPositions(this._getPosition())
            .withFlexibleDimensions(false);
        return positionStrategy;
    }
    _getPosition() {
        this._isDropUp = this._elementRef.nativeElement.classList.contains('dropup');
        this._isDropStart = this._elementRef.nativeElement.classList.contains('dropstart');
        this._isDropEnd = this._elementRef.nativeElement.classList.contains('dropend');
        this._isDropdownMenuEnd =
            this._dropdownMenu.nativeElement.classList.contains('dropdown-menu-end');
        this._xPosition = this._isDropdownMenuEnd ? 'end' : 'start';
        const regex = new RegExp(/dropdown-menu-(sm|md|lg|xl|xxl)-(start|end)/, 'g');
        const responsiveClass = this._dropdownMenu.nativeElement.className.match(regex);
        if (responsiveClass) {
            this._subscribeBrakpoints();
            const positionRegex = new RegExp(/start|end/, 'g');
            const breakpointRegex = new RegExp(/(sm|md|lg|xl|xxl)/, 'g');
            const dropdownPosition = positionRegex.exec(responsiveClass)[0];
            const breakpoint = breakpointRegex.exec(responsiveClass)[0];
            switch (true) {
                case breakpoint === 'xxl' && this._breakpoints.isXxl:
                    this._xPosition = dropdownPosition;
                    break;
                case breakpoint === 'xl' && this._breakpoints.isXl:
                    this._xPosition = dropdownPosition;
                    break;
                case breakpoint === 'lg' && this._breakpoints.isLg:
                    this._xPosition = dropdownPosition;
                    break;
                case breakpoint === 'md' && this._breakpoints.isMd:
                    this._xPosition = dropdownPosition;
                    break;
                case breakpoint === 'sm' && this._breakpoints.isSm:
                    this._xPosition = dropdownPosition;
                    break;
                default:
                    break;
            }
        }
        let position;
        const positionDropup = {
            originX: this._xPosition,
            originY: 'top',
            overlayX: this._xPosition,
            overlayY: 'bottom',
            offsetY: -this.offset,
        };
        const positionDropdown = {
            originX: this._xPosition,
            originY: 'bottom',
            overlayX: this._xPosition,
            overlayY: 'top',
            offsetY: this.offset,
        };
        const positionDropstart = {
            originX: 'start',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'top',
            offsetX: this.offset,
        };
        const positionDropend = {
            originX: 'end',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top',
            offsetX: -this.offset,
        };
        switch (true) {
            case this._isDropEnd:
                position = [positionDropend, positionDropstart];
                break;
            case this._isDropStart:
                position = [positionDropstart, positionDropend];
                break;
            case this._isDropUp:
                position = [positionDropup, positionDropdown];
                break;
            default:
                position = [positionDropdown, positionDropup];
                break;
        }
        return position;
    }
    _listenToEscKeyup(overlayRef) {
        return fromEvent(document, 'keyup').pipe(filter((event) => event.key === 'Escape'), takeUntil(overlayRef.detachments()));
    }
    _listenToClick(overlayRef, origin) {
        return fromEvent(document, 'click').pipe(filter((event) => {
            const target = event.target;
            const isInsideMenu = this._dropdownMenu.nativeElement.contains(target);
            const notTogglerIcon = !this._dropdownToggle.nativeElement.contains(target);
            const notCustomContent = !isInsideMenu || (target.classList && target.classList.contains('dropdown-item'));
            const notOrigin = target !== origin;
            return notOrigin && notTogglerIcon && notCustomContent;
        }), takeUntil(overlayRef.detachments()));
    }
    onAnimationEnd(event) {
        if (event.fromState === 'visible' && event.toState === 'hidden') {
            this._overlayRef.detach();
            this._open = false;
            this.dropdownHidden.emit(this);
        }
        if (event.fromState === 'hidden' && event.toState === 'visible') {
            this.dropdownShown.emit(this);
        }
    }
    _subscribeBrakpoints() {
        const brakpoints = [
            '(min-width: 576px)',
            '(min-width: 768px)',
            '(min-width: 992px)',
            '(min-width: 1200px)',
            '(min-width: 1400px)',
        ];
        this._breakpointSubscription = this._breakpointObserver
            .observe(brakpoints)
            .pipe(takeUntil(this._destroy$))
            .subscribe((result) => {
            Object.keys(this._breakpoints).forEach((key, index) => {
                const brakpointValue = brakpoints[index];
                const newBreakpoint = result.breakpoints[brakpointValue];
                const isBreakpointChanged = newBreakpoint !== this._breakpoints[key];
                if (!isBreakpointChanged) {
                    return;
                }
                this._breakpoints[key] = newBreakpoint;
                if (this._open) {
                    this._overlayRef.updatePositionStrategy(this._createPositionStrategy());
                }
            });
        });
    }
    show() {
        this._cdRef.markForCheck();
        if (this._open) {
            return;
        }
        if (!this._overlayRef) {
            this._createOverlay();
        }
        this._portal = new TemplatePortal(this._template, this._vcr);
        this.dropdownShow.emit(this);
        this._open = true;
        this._overlayRef.attach(this._portal);
        this._listenToEscKeyup(this._overlayRef).subscribe((isEsc) => {
            if (isEsc && this.closeOnEsc) {
                this.hide();
            }
        });
        this._overlayRef
            .keydownEvents()
            .pipe(takeUntil(this._overlayRef.detachments()))
            .subscribe((event) => {
            this._handleKeyboardNavigation(event);
        });
        this._listenToClick(this._overlayRef, this._dropdownToggle.nativeElement).subscribe((event) => {
            const target = event.target;
            const isDropdownItem = target.classList && target.classList.contains('dropdown-item');
            if (this.closeOnItemClick && isDropdownItem) {
                this.hide();
                return;
            }
            if (this.closeOnOutsideClick && !isDropdownItem) {
                this.hide();
                return;
            }
        });
        this._animationState = 'visible';
    }
    _handleKeyboardNavigation(event) {
        const items = Array.from(this._dropdownMenu.nativeElement.querySelectorAll('.dropdown-item'));
        const key = event.key;
        const activeElement = this._dropdownMenu.nativeElement.ownerDocument.activeElement;
        if (items.length === 0) {
            return;
        }
        let index = items.indexOf(activeElement);
        switch (key) {
            case 'ArrowDown':
                event.preventDefault();
                index = Math.min(index + 1, items.length - 1);
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (index === -1) {
                    index = items.length - 1;
                    break;
                }
                index = Math.max(index - 1, 0);
                break;
        }
        const nextActiveElement = items[index];
        if (nextActiveElement) {
            nextActiveElement.focus();
        }
    }
    hide() {
        this._cdRef.markForCheck();
        if (!this._open) {
            return;
        }
        this.dropdownHide.emit(this);
        this._animationState = 'hidden';
    }
    toggle() {
        this._cdRef.markForCheck();
        if (this._open) {
            this.hide();
        }
        else {
            this.show();
        }
    }
}
MdbDropdownDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbDropdownDirective, deps: [{ token: i1.Overlay }, { token: i1.OverlayPositionBuilder }, { token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i2.BreakpointObserver }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbDropdownDirective.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.4", type: MdbDropdownDirective, selector: "[mdbDropdown]", inputs: { animation: "animation", offset: "offset", closeOnOutsideClick: "closeOnOutsideClick", closeOnItemClick: "closeOnItemClick", closeOnEsc: "closeOnEsc" }, outputs: { dropdownShow: "dropdownShow", dropdownShown: "dropdownShown", dropdownHide: "dropdownHide", dropdownHidden: "dropdownHidden" }, queries: [{ propertyName: "_dropdownToggle", first: true, predicate: MdbDropdownToggleDirective, descendants: true, read: ElementRef }, { propertyName: "_dropdownMenu", first: true, predicate: MdbDropdownMenuDirective, descendants: true, read: ElementRef }], viewQueries: [{ propertyName: "_template", first: true, predicate: ["dropdownTemplate"], descendants: true }], ngImport: i0, template: "<ng-content></ng-content>\n<ng-content select=\".dropdown-toggle\"></ng-content>\n<ng-template #dropdownTemplate>\n  <div [@fade]=\"_animationState\" (@fade.done)=\"onAnimationEnd($event)\" [@.disabled]=\"!animation\">\n    <ng-content select=\".dropdown-menu\"></ng-content>\n  </div>\n</ng-template>\n", animations: [
        trigger('fade', [
            state('visible', style({ opacity: 1 })),
            state('hidden', style({ opacity: 0 })),
            transition('visible => hidden', animate('150ms linear')),
            transition('hidden => visible', [style({ opacity: 0 }), animate('150ms linear')]),
        ]),
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbDropdownDirective, decorators: [{
            type: Component,
            args: [{ selector: '[mdbDropdown]', changeDetection: ChangeDetectionStrategy.OnPush, animations: [
                        trigger('fade', [
                            state('visible', style({ opacity: 1 })),
                            state('hidden', style({ opacity: 0 })),
                            transition('visible => hidden', animate('150ms linear')),
                            transition('hidden => visible', [style({ opacity: 0 }), animate('150ms linear')]),
                        ]),
                    ], template: "<ng-content></ng-content>\n<ng-content select=\".dropdown-toggle\"></ng-content>\n<ng-template #dropdownTemplate>\n  <div [@fade]=\"_animationState\" (@fade.done)=\"onAnimationEnd($event)\" [@.disabled]=\"!animation\">\n    <ng-content select=\".dropdown-menu\"></ng-content>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i1.OverlayPositionBuilder }, { type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i2.BreakpointObserver }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { _template: [{
                type: ViewChild,
                args: ['dropdownTemplate']
            }], _dropdownToggle: [{
                type: ContentChild,
                args: [MdbDropdownToggleDirective, { read: ElementRef }]
            }], _dropdownMenu: [{
                type: ContentChild,
                args: [MdbDropdownMenuDirective, { read: ElementRef }]
            }], animation: [{
                type: Input
            }], offset: [{
                type: Input
            }], closeOnOutsideClick: [{
                type: Input
            }], closeOnItemClick: [{
                type: Input
            }], closeOnEsc: [{
                type: Input
            }], dropdownShow: [{
                type: Output
            }], dropdownShown: [{
                type: Output
            }], dropdownHide: [{
                type: Output
            }], dropdownHidden: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2Ryb3Bkb3duL2Ryb3Bkb3duLmRpcmVjdGl2ZS50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9kcm9wZG93bi9kcm9wZG93bi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBRU4sU0FBUyxHQUVWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFJTCxhQUFhLEdBR2QsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFFLFNBQVMsRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFrQixNQUFNLHFCQUFxQixDQUFDO0FBRWpHLE9BQU8sRUFBZ0IscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQWdCNUUsa0VBQWtFO0FBQ2xFLE1BQU0sT0FBTyxvQkFBb0I7SUE4Qy9CLFlBQ1UsUUFBaUIsRUFDakIsdUJBQStDLEVBQy9DLFdBQXVCLEVBQ3ZCLElBQXNCLEVBQ3RCLG1C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LFNBQVM7dUJBQUMsa0JBQWtCO2dCQUNtQyxlQUFlO3NCQUE5RSxZQUFZO3VCQUFDLDBCQUEwQixFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtnQkFDQSxhQUFhO3NCQUExRSxZQUFZO3VCQUFDLHdCQUF3QixFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtnQkFHeEQsU0FBUztzQkFEWixLQUFLO2dCQVNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxtQkFBbUI7c0JBQTNCLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUksWUFBWTtzQkFBckIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNO2dCQUNHLFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0csY0FBYztzQkFBdkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb25uZWN0ZWRQb3NpdGlvbixcbiAgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LFxuICBPdmVybGF5LFxuICBPdmVybGF5Q29uZmlnLFxuICBPdmVybGF5UG9zaXRpb25CdWlsZGVyLFxuICBPdmVybGF5UmVmLFxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWRiRHJvcGRvd25Ub2dnbGVEaXJlY3RpdmUgfSBmcm9tICcuL2Ryb3Bkb3duLXRvZ2dsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWRiRHJvcGRvd25NZW51RGlyZWN0aXZlIH0gZnJvbSAnLi9kcm9wZG93bi1tZW51LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIsIEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBCcmVha3BvaW50T2JzZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvbGF5b3V0JztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuQENvbXBvbmVudCh7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvY29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW21kYkRyb3Bkb3duXScsXG4gIHRlbXBsYXRlVXJsOiAnZHJvcGRvd24uY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2ZhZGUnLCBbXG4gICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSksXG4gICAgICBzdGF0ZSgnaGlkZGVuJywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPT4gaGlkZGVuJywgYW5pbWF0ZSgnMTUwbXMgbGluZWFyJykpLFxuICAgICAgdHJhbnNpdGlvbignaGlkZGVuID0+IHZpc2libGUnLCBbc3R5bGUoeyBvcGFjaXR5OiAwIH0pLCBhbmltYXRlKCcxNTBtcyBsaW5lYXInKV0pLFxuICAgIF0pLFxuICBdLFxufSlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvY29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIE1kYkRyb3Bkb3duRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0IHtcbiAgQFZpZXdDaGlsZCgnZHJvcGRvd25UZW1wbGF0ZScpIF90ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZChNZGJEcm9wZG93blRvZ2dsZURpcmVjdGl2ZSwgeyByZWFkOiBFbGVtZW50UmVmIH0pIF9kcm9wZG93blRvZ2dsZTogRWxlbWVudFJlZjtcbiAgQENvbnRlbnRDaGlsZChNZGJEcm9wZG93bk1lbnVEaXJlY3RpdmUsIHsgcmVhZDogRWxlbWVudFJlZiB9KSBfZHJvcGRvd25NZW51OiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBhbmltYXRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2FuaW1hdGlvbjtcbiAgfVxuICBzZXQgYW5pbWF0aW9uKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYW5pbWF0aW9uID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9hbmltYXRpb24gPSB0cnVlO1xuXG4gIEBJbnB1dCgpIG9mZnNldCA9IDA7XG4gIEBJbnB1dCgpIGNsb3NlT25PdXRzaWRlQ2xpY2sgPSB0cnVlO1xuICBASW5wdXQoKSBjbG9zZU9uSXRlbUNsaWNrID0gdHJ1ZTtcbiAgQElucHV0KCkgY2xvc2VPbkVzYyA9IHRydWU7XG5cbiAgQE91dHB1dCgpIGRyb3Bkb3duU2hvdzogRXZlbnRFbWl0dGVyPE1kYkRyb3Bkb3duRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRyb3Bkb3duU2hvd246IEV2ZW50RW1pdHRlcjxNZGJEcm9wZG93bkRpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkcm9wZG93bkhpZGU6IEV2ZW50RW1pdHRlcjxNZGJEcm9wZG93bkRpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkcm9wZG93bkhpZGRlbjogRXZlbnRFbWl0dGVyPE1kYkRyb3Bkb3duRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIF9vdmVybGF5UmVmOiBPdmVybGF5UmVmO1xuICBwcml2YXRlIF9wb3J0YWw6IFRlbXBsYXRlUG9ydGFsO1xuICBwcml2YXRlIF9vcGVuID0gZmFsc2U7XG4gIHByaXZhdGUgX2lzRHJvcFVwOiBib29sZWFuO1xuICBwcml2YXRlIF9pc0Ryb3BTdGFydDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaXNEcm9wRW5kOiBib29sZWFuO1xuICBwcml2YXRlIF9pc0Ryb3Bkb3duTWVudUVuZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfeFBvc2l0aW9uOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfYnJlYWtwb2ludHMgPSB7XG4gICAgaXNTbTogdGhpcy5fYnJlYWtwb2ludE9ic2VydmVyLmlzTWF0Y2hlZCgnKG1pbi13aWR0aDogNTc2cHgpJyksXG4gICAgaXNNZDogdGhpcy5fYnJlYWtwb2ludE9ic2VydmVyLmlzTWF0Y2hlZCgnKG1pbi13aWR0aDogNzY4cHgpJyksXG4gICAgaXNMZzogdGhpcy5fYnJlYWtwb2ludE9ic2VydmVyLmlzTWF0Y2hlZCgnKG1pbi13aWR0aDogOTkycHgpJyksXG4gICAgaXNYbDogdGhpcy5fYnJlYWtwb2ludE9ic2VydmVyLmlzTWF0Y2hlZCgnKG1pbi13aWR0aDogMTIwMHB4KScpLFxuICAgIGlzWHhsOiB0aGlzLl9icmVha3BvaW50T2JzZXJ2ZXIuaXNNYXRjaGVkKCcobWluLXdpZHRoOiAxNDAwcHgpJyksXG4gIH07XG5cbiAgcmVhZG9ubHkgX2Rlc3Ryb3kkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBfYnJlYWtwb2ludFN1YnNjcmlwdGlvbjogYW55O1xuICBfYW5pbWF0aW9uU3RhdGUgPSAnaGlkZGVuJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxuICAgIHByaXZhdGUgX292ZXJsYXlQb3NpdGlvbkJ1aWxkZXI6IE92ZXJsYXlQb3NpdGlvbkJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF92Y3I6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBfYnJlYWtwb2ludE9ic2VydmVyOiBCcmVha3BvaW50T2JzZXJ2ZXIsXG4gICAgcHJpdmF0ZSBfY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fYmluZERyb3Bkb3duVG9nZ2xlQ2xpY2soKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLl9vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIF9iaW5kRHJvcGRvd25Ub2dnbGVDbGljaygpOiB2b2lkIHtcbiAgICBmcm9tRXZlbnQodGhpcy5fZHJvcGRvd25Ub2dnbGUubmF0aXZlRWxlbWVudCwgJ2NsaWNrJylcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMudG9nZ2xlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlT3ZlcmxheUNvbmZpZygpOiBPdmVybGF5Q29uZmlnIHtcbiAgICByZXR1cm4gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgaGFzQmFja2Ryb3A6IGZhbHNlLFxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuX292ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKCksXG4gICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLl9jcmVhdGVQb3NpdGlvblN0cmF0ZWd5KCksXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVPdmVybGF5KCk6IHZvaWQge1xuICAgIHRoaXMuX292ZXJsYXlSZWYgPSB0aGlzLl9vdmVybGF5LmNyZWF0ZSh0aGlzLl9jcmVhdGVPdmVybGF5Q29uZmlnKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlUG9zaXRpb25TdHJhdGVneSgpOiBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgIGNvbnN0IHBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLl9vdmVybGF5UG9zaXRpb25CdWlsZGVyXG4gICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLl9kcm9wZG93blRvZ2dsZSlcbiAgICAgIC53aXRoUG9zaXRpb25zKHRoaXMuX2dldFBvc2l0aW9uKCkpXG4gICAgICAud2l0aEZsZXhpYmxlRGltZW5zaW9ucyhmYWxzZSk7XG5cbiAgICByZXR1cm4gcG9zaXRpb25TdHJhdGVneTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFBvc2l0aW9uKCk6IENvbm5lY3RlZFBvc2l0aW9uW10ge1xuICAgIHRoaXMuX2lzRHJvcFVwID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZHJvcHVwJyk7XG4gICAgdGhpcy5faXNEcm9wU3RhcnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wc3RhcnQnKTtcbiAgICB0aGlzLl9pc0Ryb3BFbmQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wZW5kJyk7XG4gICAgdGhpcy5faXNEcm9wZG93bk1lbnVFbmQgPVxuICAgICAgdGhpcy5fZHJvcGRvd25NZW51Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wZG93bi1tZW51LWVuZCcpO1xuICAgIHRoaXMuX3hQb3NpdGlvbiA9IHRoaXMuX2lzRHJvcGRvd25NZW51RW5kID8gJ2VuZCcgOiAnc3RhcnQnO1xuXG4gICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKC9kcm9wZG93bi1tZW51LShzbXxtZHxsZ3x4bHx4eGwpLShzdGFydHxlbmQpLywgJ2cnKTtcblxuICAgIGNvbnN0IHJlc3BvbnNpdmVDbGFzcyA9IHRoaXMuX2Ryb3Bkb3duTWVudS5uYXRpdmVFbGVtZW50LmNsYXNzTmFtZS5tYXRjaChyZWdleCk7XG5cbiAgICBpZiAocmVzcG9uc2l2ZUNsYXNzKSB7XG4gICAgICB0aGlzLl9zdWJzY3JpYmVCcmFrcG9pbnRzKCk7XG5cbiAgICAgIGNvbnN0IHBvc2l0aW9uUmVnZXggPSBuZXcgUmVnRXhwKC9zdGFydHxlbmQvLCAnZycpO1xuICAgICAgY29uc3QgYnJlYWtwb2ludFJlZ2V4ID0gbmV3IFJlZ0V4cCgvKHNtfG1kfGxnfHhsfHh4bCkvLCAnZycpO1xuXG4gICAgICBjb25zdCBkcm9wZG93blBvc2l0aW9uID0gcG9zaXRpb25SZWdleC5leGVjKHJlc3BvbnNpdmVDbGFzcylbMF07XG4gICAgICBjb25zdCBicmVha3BvaW50ID0gYnJlYWtwb2ludFJlZ2V4LmV4ZWMocmVzcG9uc2l2ZUNsYXNzKVswXTtcblxuICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgIGNhc2UgYnJlYWtwb2ludCA9PT0gJ3h4bCcgJiYgdGhpcy5fYnJlYWtwb2ludHMuaXNYeGw6XG4gICAgICAgICAgdGhpcy5feFBvc2l0aW9uID0gZHJvcGRvd25Qb3NpdGlvbjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBicmVha3BvaW50ID09PSAneGwnICYmIHRoaXMuX2JyZWFrcG9pbnRzLmlzWGw6XG4gICAgICAgICAgdGhpcy5feFBvc2l0aW9uID0gZHJvcGRvd25Qb3NpdGlvbjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBicmVha3BvaW50ID09PSAnbGcnICYmIHRoaXMuX2JyZWFrcG9pbnRzLmlzTGc6XG4gICAgICAgICAgdGhpcy5feFBvc2l0aW9uID0gZHJvcGRvd25Qb3NpdGlvbjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBicmVha3BvaW50ID09PSAnbWQnICYmIHRoaXMuX2JyZWFrcG9pbnRzLmlzTWQ6XG4gICAgICAgICAgdGhpcy5feFBvc2l0aW9uID0gZHJvcGRvd25Qb3NpdGlvbjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBicmVha3BvaW50ID09PSAnc20nICYmIHRoaXMuX2JyZWFrcG9pbnRzLmlzU206XG4gICAgICAgICAgdGhpcy5feFBvc2l0aW9uID0gZHJvcGRvd25Qb3NpdGlvbjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcG9zaXRpb247XG5cbiAgICBjb25zdCBwb3NpdGlvbkRyb3B1cCA9IHtcbiAgICAgIG9yaWdpblg6IHRoaXMuX3hQb3NpdGlvbixcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgb3ZlcmxheVg6IHRoaXMuX3hQb3NpdGlvbixcbiAgICAgIG92ZXJsYXlZOiAnYm90dG9tJyxcbiAgICAgIG9mZnNldFk6IC10aGlzLm9mZnNldCxcbiAgICB9O1xuXG4gICAgY29uc3QgcG9zaXRpb25Ecm9wZG93biA9IHtcbiAgICAgIG9yaWdpblg6IHRoaXMuX3hQb3NpdGlvbixcbiAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgb3ZlcmxheVg6IHRoaXMuX3hQb3NpdGlvbixcbiAgICAgIG92ZXJsYXlZOiAndG9wJyxcbiAgICAgIG9mZnNldFk6IHRoaXMub2Zmc2V0LFxuICAgIH07XG5cbiAgICBjb25zdCBwb3NpdGlvbkRyb3BzdGFydCA9IHtcbiAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgIG92ZXJsYXlYOiAnZW5kJyxcbiAgICAgIG92ZXJsYXlZOiAndG9wJyxcbiAgICAgIG9mZnNldFg6IHRoaXMub2Zmc2V0LFxuICAgIH07XG5cbiAgICBjb25zdCBwb3NpdGlvbkRyb3BlbmQgPSB7XG4gICAgICBvcmlnaW5YOiAnZW5kJyxcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICBvdmVybGF5WTogJ3RvcCcsXG4gICAgICBvZmZzZXRYOiAtdGhpcy5vZmZzZXQsXG4gICAgfTtcblxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSB0aGlzLl9pc0Ryb3BFbmQ6XG4gICAgICAgIHBvc2l0aW9uID0gW3Bvc2l0aW9uRHJvcGVuZCwgcG9zaXRpb25Ecm9wc3RhcnRdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5faXNEcm9wU3RhcnQ6XG4gICAgICAgIHBvc2l0aW9uID0gW3Bvc2l0aW9uRHJvcHN0YXJ0LCBwb3NpdGlvbkRyb3BlbmRdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5faXNEcm9wVXA6XG4gICAgICAgIHBvc2l0aW9uID0gW3Bvc2l0aW9uRHJvcHVwLCBwb3NpdGlvbkRyb3Bkb3duXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBwb3NpdGlvbiA9IFtwb3NpdGlvbkRyb3Bkb3duLCBwb3NpdGlvbkRyb3B1cF07XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBwb3NpdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgX2xpc3RlblRvRXNjS2V5dXAob3ZlcmxheVJlZjogT3ZlcmxheVJlZik6IE9ic2VydmFibGU8S2V5Ym9hcmRFdmVudD4ge1xuICAgIHJldHVybiBmcm9tRXZlbnQoZG9jdW1lbnQsICdrZXl1cCcpLnBpcGUoXG4gICAgICBmaWx0ZXIoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiBldmVudC5rZXkgPT09ICdFc2NhcGUnKSxcbiAgICAgIHRha2VVbnRpbChvdmVybGF5UmVmLmRldGFjaG1lbnRzKCkpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xpc3RlblRvQ2xpY2sob3ZlcmxheVJlZjogT3ZlcmxheVJlZiwgb3JpZ2luOiBIVE1MRWxlbWVudCk6IE9ic2VydmFibGU8TW91c2VFdmVudD4ge1xuICAgIHJldHVybiBmcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpLnBpcGUoXG4gICAgICBmaWx0ZXIoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgY29uc3QgaXNJbnNpZGVNZW51ID0gdGhpcy5fZHJvcGRvd25NZW51Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnModGFyZ2V0KTtcbiAgICAgICAgY29uc3Qgbm90VG9nZ2xlckljb24gPSAhdGhpcy5fZHJvcGRvd25Ub2dnbGUubmF0aXZlRWxlbWVudC5jb250YWlucyh0YXJnZXQpO1xuICAgICAgICBjb25zdCBub3RDdXN0b21Db250ZW50ID1cbiAgICAgICAgICAhaXNJbnNpZGVNZW51IHx8ICh0YXJnZXQuY2xhc3NMaXN0ICYmIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3Bkb3duLWl0ZW0nKSk7XG4gICAgICAgIGNvbnN0IG5vdE9yaWdpbiA9IHRhcmdldCAhPT0gb3JpZ2luO1xuICAgICAgICByZXR1cm4gbm90T3JpZ2luICYmIG5vdFRvZ2dsZXJJY29uICYmIG5vdEN1c3RvbUNvbnRlbnQ7XG4gICAgICB9KSxcbiAgICAgIHRha2VVbnRpbChvdmVybGF5UmVmLmRldGFjaG1lbnRzKCkpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkFuaW1hdGlvbkVuZChldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQuZnJvbVN0YXRlID09PSAndmlzaWJsZScgJiYgZXZlbnQudG9TdGF0ZSA9PT0gJ2hpZGRlbicpIHtcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICB0aGlzLl9vcGVuID0gZmFsc2U7XG4gICAgICB0aGlzLmRyb3Bkb3duSGlkZGVuLmVtaXQodGhpcyk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmZyb21TdGF0ZSA9PT0gJ2hpZGRlbicgJiYgZXZlbnQudG9TdGF0ZSA9PT0gJ3Zpc2libGUnKSB7XG4gICAgICB0aGlzLmRyb3Bkb3duU2hvd24uZW1pdCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zdWJzY3JpYmVCcmFrcG9pbnRzKCk6IHZvaWQge1xuICAgIGNvbnN0IGJyYWtwb2ludHMgPSBbXG4gICAgICAnKG1pbi13aWR0aDogNTc2cHgpJyxcbiAgICAgICcobWluLXdpZHRoOiA3NjhweCknLFxuICAgICAgJyhtaW4td2lkdGg6IDk5MnB4KScsXG4gICAgICAnKG1pbi13aWR0aDogMTIwMHB4KScsXG4gICAgICAnKG1pbi13aWR0aDogMTQwMHB4KScsXG4gICAgXTtcblxuICAgIHRoaXMuX2JyZWFrcG9pbnRTdWJzY3JpcHRpb24gPSB0aGlzLl9icmVha3BvaW50T2JzZXJ2ZXJcbiAgICAgIC5vYnNlcnZlKGJyYWtwb2ludHMpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuX2JyZWFrcG9pbnRzKS5mb3JFYWNoKChrZXksIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgYnJha3BvaW50VmFsdWUgPSBicmFrcG9pbnRzW2luZGV4XTtcbiAgICAgICAgICBjb25zdCBuZXdCcmVha3BvaW50ID0gcmVzdWx0LmJyZWFrcG9pbnRzW2JyYWtwb2ludFZhbHVlXTtcbiAgICAgICAgICBjb25zdCBpc0JyZWFrcG9pbnRDaGFuZ2VkID0gbmV3QnJlYWtwb2ludCAhPT0gdGhpcy5fYnJlYWtwb2ludHNba2V5XTtcblxuICAgICAgICAgIGlmICghaXNCcmVha3BvaW50Q2hhbmdlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2JyZWFrcG9pbnRzW2tleV0gPSBuZXdCcmVha3BvaW50O1xuXG4gICAgICAgICAgaWYgKHRoaXMuX29wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX292ZXJsYXlSZWYudXBkYXRlUG9zaXRpb25TdHJhdGVneSh0aGlzLl9jcmVhdGVQb3NpdGlvblN0cmF0ZWd5KCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHNob3coKTogdm9pZCB7XG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG5cbiAgICBpZiAodGhpcy5fb3Blbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5fY3JlYXRlT3ZlcmxheSgpO1xuICAgIH1cblxuICAgIHRoaXMuX3BvcnRhbCA9IG5ldyBUZW1wbGF0ZVBvcnRhbCh0aGlzLl90ZW1wbGF0ZSwgdGhpcy5fdmNyKTtcblxuICAgIHRoaXMuZHJvcGRvd25TaG93LmVtaXQodGhpcyk7XG5cbiAgICB0aGlzLl9vcGVuID0gdHJ1ZTtcbiAgICB0aGlzLl9vdmVybGF5UmVmLmF0dGFjaCh0aGlzLl9wb3J0YWwpO1xuXG4gICAgdGhpcy5fbGlzdGVuVG9Fc2NLZXl1cCh0aGlzLl9vdmVybGF5UmVmKS5zdWJzY3JpYmUoKGlzRXNjKSA9PiB7XG4gICAgICBpZiAoaXNFc2MgJiYgdGhpcy5jbG9zZU9uRXNjKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5fb3ZlcmxheVJlZlxuICAgICAgLmtleWRvd25FdmVudHMoKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX292ZXJsYXlSZWYuZGV0YWNobWVudHMoKSkpXG4gICAgICAuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLl9oYW5kbGVLZXlib2FyZE5hdmlnYXRpb24oZXZlbnQpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLl9saXN0ZW5Ub0NsaWNrKHRoaXMuX292ZXJsYXlSZWYsIHRoaXMuX2Ryb3Bkb3duVG9nZ2xlLm5hdGl2ZUVsZW1lbnQpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgIGNvbnN0IGlzRHJvcGRvd25JdGVtID0gdGFyZ2V0LmNsYXNzTGlzdCAmJiB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wZG93bi1pdGVtJyk7XG5cbiAgICAgIGlmICh0aGlzLmNsb3NlT25JdGVtQ2xpY2sgJiYgaXNEcm9wZG93bkl0ZW0pIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmNsb3NlT25PdXRzaWRlQ2xpY2sgJiYgIWlzRHJvcGRvd25JdGVtKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLl9hbmltYXRpb25TdGF0ZSA9ICd2aXNpYmxlJztcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUtleWJvYXJkTmF2aWdhdGlvbihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnN0IGl0ZW1zOiBIVE1MRWxlbWVudFtdID0gQXJyYXkuZnJvbShcbiAgICAgIHRoaXMuX2Ryb3Bkb3duTWVudS5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wZG93bi1pdGVtJylcbiAgICApO1xuICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcbiAgICBjb25zdCBhY3RpdmVFbGVtZW50ID0gdGhpcy5fZHJvcGRvd25NZW51Lm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBpbmRleCA9IGl0ZW1zLmluZGV4T2YoYWN0aXZlRWxlbWVudCk7XG5cbiAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpbmRleCA9IE1hdGgubWluKGluZGV4ICsgMSwgaXRlbXMubGVuZ3RoIC0gMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgIGluZGV4ID0gaXRlbXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpbmRleCA9IE1hdGgubWF4KGluZGV4IC0gMSwgMCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRBY3RpdmVFbGVtZW50OiBIVE1MRWxlbWVudCA9IGl0ZW1zW2luZGV4XTtcblxuICAgIGlmIChuZXh0QWN0aXZlRWxlbWVudCkge1xuICAgICAgbmV4dEFjdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBoaWRlKCk6IHZvaWQge1xuICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgaWYgKCF0aGlzLl9vcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5kcm9wZG93bkhpZGUuZW1pdCh0aGlzKTtcblxuICAgIHRoaXMuX2FuaW1hdGlvblN0YXRlID0gJ2hpZGRlbic7XG4gIH1cblxuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG5cbiAgICBpZiAodGhpcy5fb3Blbikge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9hbmltYXRpb246IEJvb2xlYW5JbnB1dDtcbn1cbiIsIjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjxuZy1jb250ZW50IHNlbGVjdD1cIi5kcm9wZG93bi10b2dnbGVcIj48L25nLWNvbnRlbnQ+XG48bmctdGVtcGxhdGUgI2Ryb3Bkb3duVGVtcGxhdGU+XG4gIDxkaXYgW0BmYWRlXT1cIl9hbmltYXRpb25TdGF0ZVwiIChAZmFkZS5kb25lKT1cIm9uQW5pbWF0aW9uRW5kKCRldmVudClcIiBbQC5kaXNhYmxlZF09XCIhYW5pbWF0aW9uXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiLmRyb3Bkb3duLW1lbnVcIj48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==