import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, HostBinding, Input, Output, TemplateRef, ViewChild, } from '@angular/core';
import { MdbCollapseDirective } from 'mdb-angular-ui-kit/collapse';
import { Subject } from 'rxjs';
import { MDB_ACCORDION_ITEM_BODY } from './accordion-item-content.directive';
import { MDB_ACCORDION_ITEM_HEADER } from './accordion-item-header.directive';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "mdb-angular-ui-kit/collapse";
let uniqueHeaderId = 0;
let uniqueId = 0;
export class MdbAccordionItemComponent {
    constructor(_cdRef) {
        this._cdRef = _cdRef;
        this.id = `mdb-accordion-item-${uniqueId++}`;
        this._headerId = `mdb-accordion-item-header-${uniqueHeaderId++}`;
        this._isInitialized = false;
        this._shouldOpenOnInit = false;
        this.itemShow = new EventEmitter();
        this.itemShown = new EventEmitter();
        this.itemHide = new EventEmitter();
        this.itemHidden = new EventEmitter();
        this.accordionItem = true;
        this.show$ = new Subject();
        this._collapsed = true;
        this._addCollapsedClass = true;
    }
    set collapsed(value) {
        if (!this._isInitialized) {
            if (!value) {
                this._shouldOpenOnInit = true;
            }
            return;
        }
        if (value) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    ngOnInit() {
        this._isInitialized = true;
        if (this._shouldOpenOnInit) {
            this.show();
        }
    }
    toggle() {
        this.collapse.toggle();
    }
    show() {
        this.collapse.show();
        this._cdRef.markForCheck();
    }
    hide() {
        this.collapse.hide();
        this._cdRef.markForCheck();
    }
    onShow() {
        this._addCollapsedClass = false;
        this.itemShow.emit(this);
        this.show$.next(this);
    }
    onHide() {
        this._addCollapsedClass = true;
        this.itemHide.emit(this);
    }
    onShown() {
        this._collapsed = false;
        this.itemShown.emit(this);
    }
    onHidden() {
        this._collapsed = true;
        this.itemHidden.emit(this);
    }
}
MdbAccordionItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbAccordionItemComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbAccordionItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.4", type: MdbAccordionItemComponent, selector: "mdb-accordion-item", inputs: { header: "header", collapsed: "collapsed", id: "id" }, outputs: { itemShow: "itemShow", itemShown: "itemShown", itemHide: "itemHide", itemHidden: "itemHidden" }, host: { properties: { "class.accordion-item": "this.accordionItem" } }, queries: [{ propertyName: "_headerTemplate", first: true, predicate: MDB_ACCORDION_ITEM_HEADER, descendants: true, read: TemplateRef, static: true }, { propertyName: "_bodyTemplate", first: true, predicate: MDB_ACCORDION_ITEM_BODY, descendants: true, read: TemplateRef, static: true }], viewQueries: [{ propertyName: "collapse", first: true, predicate: MdbCollapseDirective, descendants: true, static: true }], ngImport: i0, template: "<h2 class=\"accordion-header\" [id]=\"_headerId\">\n  <button\n    class=\"accordion-button\"\n    type=\"button\"\n    [attr.aria-expanded]=\"!_collapsed\"\n    [attr.aria-controls]=\"id\"\n    [class.collapsed]=\"_addCollapsedClass\"\n    (click)=\"toggle()\"\n  >\n    {{ header }}\n    <ng-template *ngIf=\"_headerTemplate\" [ngTemplateOutlet]=\"_headerTemplate\"></ng-template>\n  </button>\n</h2>\n<div\n  mdbCollapse\n  (collapseShow)=\"onShow()\"\n  (collapseHide)=\"onHide()\"\n  (collapseShow)=\"onShown()\"\n  (collapseHide)=\"onHidden()\"\n  [attr.id]=\"id\"\n  [attr.aria-labelledby]=\"_headerId\"\n>\n  <div class=\"accordion-body\">\n    <ng-template *ngIf=\"_bodyTemplate\" [ngTemplateOutlet]=\"_bodyTemplate\"></ng-template>\n  </div>\n</div>\n", directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.MdbCollapseDirective, selector: "[mdbCollapse]", inputs: ["collapsed"], outputs: ["collapseShow", "collapseShown", "collapseHide", "collapseHidden"], exportAs: ["mdbCollapse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbAccordionItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-accordion-item', changeDetection: ChangeDetectionStrategy.OnPush, template: "<h2 class=\"accordion-header\" [id]=\"_headerId\">\n  <button\n    class=\"accordion-button\"\n    type=\"button\"\n    [attr.aria-expanded]=\"!_collapsed\"\n    [attr.aria-controls]=\"id\"\n    [class.collapsed]=\"_addCollapsedClass\"\n    (click)=\"toggle()\"\n  >\n    {{ header }}\n    <ng-template *ngIf=\"_headerTemplate\" [ngTemplateOutlet]=\"_headerTemplate\"></ng-template>\n  </button>\n</h2>\n<div\n  mdbCollapse\n  (collapseShow)=\"onShow()\"\n  (collapseHide)=\"onHide()\"\n  (collapseShow)=\"onShown()\"\n  (collapseHide)=\"onHidden()\"\n  [attr.id]=\"id\"\n  [attr.aria-labelledby]=\"_headerId\"\n>\n  <div class=\"accordion-body\">\n    <ng-template *ngIf=\"_bodyTemplate\" [ngTemplateOutlet]=\"_bodyTemplate\"></ng-template>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { _headerTemplate: [{
                type: ContentChild,
                args: [MDB_ACCORDION_ITEM_HEADER, { read: TemplateRef, static: true }]
            }], _bodyTemplate: [{
                type: ContentChild,
                args: [MDB_ACCORDION_ITEM_BODY, { read: TemplateRef, static: true }]
            }], collapse: [{
                type: ViewChild,
                args: [MdbCollapseDirective, { static: true }]
            }], header: [{
                type: Input
            }], collapsed: [{
                type: Input
            }], id: [{
                type: Input
            }], itemShow: [{
                type: Output
            }], itemShown: [{
                type: Output
            }], itemHide: [{
                type: Output
            }], itemHidden: [{
                type: Output
            }], accordionItem: [{
                type: HostBinding,
                args: ['class.accordion-item']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2FjY29yZGlvbi9hY2NvcmRpb24taXRlbS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvYWNjb3JkaW9uL2FjY29yZGlvbi1pdGVtLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ1osV0FBVyxFQUNYLEtBQUssRUFFTCxNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7O0FBRTlFLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQztBQUN2QixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFPakIsTUFBTSxPQUFPLHlCQUF5QjtJQXFEcEMsWUFBb0IsTUFBeUI7UUFBekIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUEzQnBDLE9BQUUsR0FBRyxzQkFBc0IsUUFBUSxFQUFFLEVBQUUsQ0FBQztRQUVqRCxjQUFTLEdBQUcsNkJBQTZCLGNBQWMsRUFBRSxFQUFFLENBQUM7UUFFcEQsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBRXhCLGFBQVEsR0FBNEMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2RSxjQUFTLEdBQTRDLElBQUksWUFB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RyxFQUFFO3NCQUFWLEtBQUs7Z0JBT0ksUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxTQUFTO3NCQUFsQixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csVUFBVTtzQkFBbkIsTUFBTTtnQkFFOEIsYUFBYTtzQkFBakQsV0FBVzt1QkFBQyxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWRiQ29sbGFwc2VEaXJlY3RpdmUgfSBmcm9tICdtZGItYW5ndWxhci11aS1raXQvY29sbGFwc2UnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTURCX0FDQ09SRElPTl9JVEVNX0JPRFkgfSBmcm9tICcuL2FjY29yZGlvbi1pdGVtLWNvbnRlbnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1EQl9BQ0NPUkRJT05fSVRFTV9IRUFERVIgfSBmcm9tICcuL2FjY29yZGlvbi1pdGVtLWhlYWRlci5kaXJlY3RpdmUnO1xuXG5sZXQgdW5pcXVlSGVhZGVySWQgPSAwO1xubGV0IHVuaXF1ZUlkID0gMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLWFjY29yZGlvbi1pdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FjY29yZGlvbi1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1kYkFjY29yZGlvbkl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAQ29udGVudENoaWxkKE1EQl9BQ0NPUkRJT05fSVRFTV9IRUFERVIsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBfaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQENvbnRlbnRDaGlsZChNREJfQUNDT1JESU9OX0lURU1fQk9EWSwgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pXG4gIF9ib2R5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQFZpZXdDaGlsZChNZGJDb2xsYXBzZURpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUgfSkgY29sbGFwc2U6IE1kYkNvbGxhcHNlRGlyZWN0aXZlO1xuXG4gIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBzZXQgY29sbGFwc2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKCF0aGlzLl9pc0luaXRpYWxpemVkKSB7XG4gICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3Nob3VsZE9wZW5PbkluaXQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIGlkID0gYG1kYi1hY2NvcmRpb24taXRlbS0ke3VuaXF1ZUlkKyt9YDtcblxuICBfaGVhZGVySWQgPSBgbWRiLWFjY29yZGlvbi1pdGVtLWhlYWRlci0ke3VuaXF1ZUhlYWRlcklkKyt9YDtcblxuICBwcml2YXRlIF9pc0luaXRpYWxpemVkID0gZmFsc2U7XG4gIHByaXZhdGUgX3Nob3VsZE9wZW5PbkluaXQgPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgaXRlbVNob3c6IEV2ZW50RW1pdHRlcjxNZGJBY2NvcmRpb25JdGVtQ29tcG9uZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGl0ZW1TaG93bjogRXZlbnRFbWl0dGVyPE1kYkFjY29yZGlvbkl0ZW1Db21wb25lbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgaXRlbUhpZGU6IEV2ZW50RW1pdHRlcjxNZGJBY2NvcmRpb25JdGVtQ29tcG9uZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGl0ZW1IaWRkZW46IEV2ZW50RW1pdHRlcjxNZGJBY2NvcmRpb25JdGVtQ29tcG9uZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjY29yZGlvbi1pdGVtJykgYWNjb3JkaW9uSXRlbSA9IHRydWU7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5faXNJbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5fc2hvdWxkT3Blbk9uSW5pdCkge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICB9XG5cbiAgc2hvdyQgPSBuZXcgU3ViamVjdDxNZGJBY2NvcmRpb25JdGVtQ29tcG9uZW50PigpO1xuXG4gIF9jb2xsYXBzZWQgPSB0cnVlO1xuICBfYWRkQ29sbGFwc2VkQ2xhc3MgPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5jb2xsYXBzZS50b2dnbGUoKTtcbiAgfVxuXG4gIHNob3coKTogdm9pZCB7XG4gICAgdGhpcy5jb2xsYXBzZS5zaG93KCk7XG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBoaWRlKCk6IHZvaWQge1xuICAgIHRoaXMuY29sbGFwc2UuaGlkZSgpO1xuICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgb25TaG93KCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbGxhcHNlZENsYXNzID0gZmFsc2U7XG4gICAgdGhpcy5pdGVtU2hvdy5lbWl0KHRoaXMpO1xuXG4gICAgdGhpcy5zaG93JC5uZXh0KHRoaXMpO1xuICB9XG5cbiAgb25IaWRlKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbGxhcHNlZENsYXNzID0gdHJ1ZTtcbiAgICB0aGlzLml0ZW1IaWRlLmVtaXQodGhpcyk7XG4gIH1cblxuICBvblNob3duKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbGxhcHNlZCA9IGZhbHNlO1xuICAgIHRoaXMuaXRlbVNob3duLmVtaXQodGhpcyk7XG4gIH1cblxuICBvbkhpZGRlbigpOiB2b2lkIHtcbiAgICB0aGlzLl9jb2xsYXBzZWQgPSB0cnVlO1xuICAgIHRoaXMuaXRlbUhpZGRlbi5lbWl0KHRoaXMpO1xuICB9XG59XG4iLCI8aDIgY2xhc3M9XCJhY2NvcmRpb24taGVhZGVyXCIgW2lkXT1cIl9oZWFkZXJJZFwiPlxuICA8YnV0dG9uXG4gICAgY2xhc3M9XCJhY2NvcmRpb24tYnV0dG9uXCJcbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cIiFfY29sbGFwc2VkXCJcbiAgICBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cImlkXCJcbiAgICBbY2xhc3MuY29sbGFwc2VkXT1cIl9hZGRDb2xsYXBzZWRDbGFzc1wiXG4gICAgKGNsaWNrKT1cInRvZ2dsZSgpXCJcbiAgPlxuICAgIHt7IGhlYWRlciB9fVxuICAgIDxuZy10ZW1wbGF0ZSAqbmdJZj1cIl9oZWFkZXJUZW1wbGF0ZVwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIl9oZWFkZXJUZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gIDwvYnV0dG9uPlxuPC9oMj5cbjxkaXZcbiAgbWRiQ29sbGFwc2VcbiAgKGNvbGxhcHNlU2hvdyk9XCJvblNob3coKVwiXG4gIChjb2xsYXBzZUhpZGUpPVwib25IaWRlKClcIlxuICAoY29sbGFwc2VTaG93KT1cIm9uU2hvd24oKVwiXG4gIChjb2xsYXBzZUhpZGUpPVwib25IaWRkZW4oKVwiXG4gIFthdHRyLmlkXT1cImlkXCJcbiAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cIl9oZWFkZXJJZFwiXG4+XG4gIDxkaXYgY2xhc3M9XCJhY2NvcmRpb24tYm9keVwiPlxuICAgIDxuZy10ZW1wbGF0ZSAqbmdJZj1cIl9ib2R5VGVtcGxhdGVcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJfYm9keVRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==