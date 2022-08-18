import { ChangeDetectionStrategy, Component, Input, TemplateRef, } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class MdbPopoverComponent {
    constructor(_cdRef) {
        this._cdRef = _cdRef;
        this._hidden = new Subject();
        this.animationState = 'hidden';
    }
    get isContentTemplate() {
        return this.content instanceof TemplateRef;
    }
    markForCheck() {
        this._cdRef.markForCheck();
    }
    onAnimationEnd(event) {
        if (event.toState === 'hidden') {
            this._hidden.next();
        }
    }
}
MdbPopoverComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbPopoverComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbPopoverComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.4", type: MdbPopoverComponent, selector: "mdb-popover", inputs: { title: "title", content: "content", animation: "animation" }, ngImport: i0, template: "<div\n  class=\"popover\"\n  [@fade]=\"animationState\"\n  (@fade.done)=\"onAnimationEnd($event)\"\n  [@.disabled]=\"!animation\"\n>\n  <div *ngIf=\"title\" class=\"popover-header\">\n    {{ title }}\n  </div>\n  <div *ngIf=\"isContentTemplate\" class=\"popover-body\">\n    <ng-container [ngTemplateOutlet]=\"$any(content)\"></ng-container>\n  </div>\n  <div *ngIf=\"!isContentTemplate\" class=\"popover-body\">\n    {{ content }}\n  </div>\n</div>\n", directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [
        trigger('fade', [
            state('visible', style({ opacity: 1 })),
            state('hidden', style({ opacity: 0 })),
            transition('visible <=> hidden', animate('150ms linear')),
            transition(':enter', animate('150ms linear')),
        ]),
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbPopoverComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-popover', changeDetection: ChangeDetectionStrategy.OnPush, animations: [
                        trigger('fade', [
                            state('visible', style({ opacity: 1 })),
                            state('hidden', style({ opacity: 0 })),
                            transition('visible <=> hidden', animate('150ms linear')),
                            transition(':enter', animate('150ms linear')),
                        ]),
                    ], template: "<div\n  class=\"popover\"\n  [@fade]=\"animationState\"\n  (@fade.done)=\"onAnimationEnd($event)\"\n  [@.disabled]=\"!animation\"\n>\n  <div *ngIf=\"title\" class=\"popover-header\">\n    {{ title }}\n  </div>\n  <div *ngIf=\"isContentTemplate\" class=\"popover-body\">\n    <ng-container [ngTemplateOutlet]=\"$any(content)\"></ng-container>\n  </div>\n  <div *ngIf=\"!isContentTemplate\" class=\"popover-body\">\n    {{ content }}\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { title: [{
                type: Input
            }], content: [{
                type: Input
            }], animation: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvcG9wb3Zlci9wb3BvdmVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9wb3BvdmVyL3BvcG92ZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsS0FBSyxFQUNMLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBa0IsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7QUFjL0IsTUFBTSxPQUFPLG1CQUFtQjtJQWE5QixZQUFvQixNQUF5QjtRQUF6QixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUpwQyxZQUFPLEdBQWtCLElBQUksT0FBTyxFQUFFLENBQUM7UUFFaEQsbUJBQWMsR0FBRyxRQUFRLENBQUM7SUFFc0IsQ0FBQztJQVJqRCxJQUFJLGlCQUFpQjtRQUNuQixPQUFPLElBQUksQ0FBQyxPQUFPLFlBQVksV0FBVyxDQUFDO0lBQzdDLENBQUM7SUFRRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsY0FBYyxDQUFDLEtBQXFCO1FBQ2xDLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7O2dIQXZCVSxtQkFBbUI7b0dBQW5CLG1CQUFtQiwySEN0QmhDLHFjQWdCQSxxT0RIYztRQUNWLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDZCxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMsVUFBVSxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN6RCxVQUFVLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM5QyxDQUFDO0tBQ0g7MkZBRVUsbUJBQW1CO2tCQWIvQixTQUFTOytCQUNFLGFBQWEsbUJBRU4sdUJBQXVCLENBQUMsTUFBTSxjQUNuQzt3QkFDVixPQUFPLENBQUMsTUFBTSxFQUFFOzRCQUNkLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7NEJBQ3ZDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7NEJBQ3RDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7NEJBQ3pELFVBQVUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO3lCQUM5QyxDQUFDO3FCQUNIO3dHQUdRLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdHJpZ2dlciwgc3R5bGUsIGFuaW1hdGUsIHRyYW5zaXRpb24sIHN0YXRlLCBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLXBvcG92ZXInLFxuICB0ZW1wbGF0ZVVybDogJ3BvcG92ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2ZhZGUnLCBbXG4gICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSksXG4gICAgICBzdGF0ZSgnaGlkZGVuJywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPD0+IGhpZGRlbicsIGFuaW1hdGUoJzE1MG1zIGxpbmVhcicpKSxcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIGFuaW1hdGUoJzE1MG1zIGxpbmVhcicpKSxcbiAgICBdKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWRiUG9wb3ZlckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIGFuaW1hdGlvbjogYm9vbGVhbjtcblxuICBnZXQgaXNDb250ZW50VGVtcGxhdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudCBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmO1xuICB9XG5cbiAgcmVhZG9ubHkgX2hpZGRlbjogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgYW5pbWF0aW9uU3RhdGUgPSAnaGlkZGVuJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbWFya0ZvckNoZWNrKCk6IHZvaWQge1xuICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgb25BbmltYXRpb25FbmQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LnRvU3RhdGUgPT09ICdoaWRkZW4nKSB7XG4gICAgICB0aGlzLl9oaWRkZW4ubmV4dCgpO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdlxuICBjbGFzcz1cInBvcG92ZXJcIlxuICBbQGZhZGVdPVwiYW5pbWF0aW9uU3RhdGVcIlxuICAoQGZhZGUuZG9uZSk9XCJvbkFuaW1hdGlvbkVuZCgkZXZlbnQpXCJcbiAgW0AuZGlzYWJsZWRdPVwiIWFuaW1hdGlvblwiXG4+XG4gIDxkaXYgKm5nSWY9XCJ0aXRsZVwiIGNsYXNzPVwicG9wb3Zlci1oZWFkZXJcIj5cbiAgICB7eyB0aXRsZSB9fVxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cImlzQ29udGVudFRlbXBsYXRlXCIgY2xhc3M9XCJwb3BvdmVyLWJvZHlcIj5cbiAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIiRhbnkoY29udGVudClcIj48L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+XG4gIDxkaXYgKm5nSWY9XCIhaXNDb250ZW50VGVtcGxhdGVcIiBjbGFzcz1cInBvcG92ZXItYm9keVwiPlxuICAgIHt7IGNvbnRlbnQgfX1cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==