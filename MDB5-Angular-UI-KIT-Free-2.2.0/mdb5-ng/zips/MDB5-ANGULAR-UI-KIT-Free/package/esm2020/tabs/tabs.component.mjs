import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChildren, EventEmitter, HostBinding, Input, Output, } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MdbTabComponent } from './tab.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/portal";
import * as i3 from "./tab-outlet.directive";
export class MdbTabChange {
}
export class MdbTabsComponent {
    constructor() {
        this._destroy$ = new Subject();
        this._fill = false;
        this._justified = false;
        this._pills = false;
        this._vertical = false;
        this.navColumnClass = 'col-3';
        this.contentColumnClass = 'col-9';
        this.activeTabChange = new EventEmitter();
    }
    get fill() {
        return this._fill;
    }
    set fill(value) {
        this._fill = coerceBooleanProperty(value);
    }
    get justified() {
        return this._justified;
    }
    set justified(value) {
        this._justified = coerceBooleanProperty(value);
    }
    get pills() {
        return this._pills;
    }
    set pills(value) {
        this._pills = coerceBooleanProperty(value);
    }
    get vertical() {
        return this._vertical;
    }
    set vertical(value) {
        this._vertical = coerceBooleanProperty(value);
    }
    get navColClass() {
        return this.vertical ? this.navColumnClass : '';
    }
    get contentColClass() {
        return this.vertical ? this.contentColumnClass : '';
    }
    ngAfterContentInit() {
        const firstActiveTabIndex = this.tabs.toArray().findIndex((tab) => !tab.disabled);
        this.setActiveTab(firstActiveTabIndex);
        this.tabs.changes.pipe(takeUntil(this._destroy$)).subscribe(() => {
            const hasActiveTab = this.tabs.find((tab) => tab.active);
            if (!hasActiveTab) {
                const closestTabIndex = this._getClosestTabIndex(this._selectedIndex);
                if (closestTabIndex !== -1) {
                    this.setActiveTab(closestTabIndex);
                }
            }
        });
    }
    setActiveTab(index) {
        const activeTab = this.tabs.toArray()[index];
        if (!activeTab || (activeTab && activeTab.disabled)) {
            return;
        }
        this.tabs.forEach((tab) => (tab.active = tab === activeTab));
        this._selectedIndex = index;
        const tabChangeEvent = this._getTabChangeEvent(index, activeTab);
        this.activeTabChange.emit(tabChangeEvent);
    }
    _getTabChangeEvent(index, tab) {
        const event = new MdbTabChange();
        event.index = index;
        event.tab = tab;
        return event;
    }
    _getClosestTabIndex(index) {
        const tabs = this.tabs.toArray();
        const tabsLength = tabs.length;
        if (!tabsLength) {
            return -1;
        }
        for (let i = 1; i <= tabsLength; i += 1) {
            const prevIndex = index - i;
            const nextIndex = index + i;
            if (tabs[prevIndex] && !tabs[prevIndex].disabled) {
                return prevIndex;
            }
            if (tabs[nextIndex] && !tabs[nextIndex].disabled) {
                return nextIndex;
            }
        }
        return -1;
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
MdbTabsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbTabsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MdbTabsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.4", type: MdbTabsComponent, selector: "mdb-tabs", inputs: { fill: "fill", justified: "justified", pills: "pills", vertical: "vertical", navColumnClass: "navColumnClass", contentColumnClass: "contentColumnClass" }, outputs: { activeTabChange: "activeTabChange" }, host: { properties: { "class.row": "this.vertical" } }, queries: [{ propertyName: "tabs", predicate: MdbTabComponent }], ngImport: i0, template: "<ul\n  class=\"nav mb-3 flex-column {{ navColClass }}\"\n  [ngClass]=\"{\n    'nav-pills': pills,\n    'nav-tabs': !pills,\n    'nav-fill': fill,\n    'nav-justified': justified,\n    'flex-column': vertical,\n    'text-center': vertical\n  }\"\n  role=\"tablist\"\n>\n  <li\n    *ngFor=\"let tab of tabs; let i = index\"\n    (click)=\"setActiveTab(i)\"\n    class=\"nav-item\"\n    role=\"presentation\"\n  >\n    <a\n      href=\"javascript:void(0)\"\n      class=\"nav-link\"\n      [class.active]=\"tab.active\"\n      [class.disabled]=\"tab.disabled\"\n      role=\"tab\"\n    >\n      <ng-template [ngIf]=\"tab.titleContent\">\n        <ng-template [cdkPortalOutlet]=\"tab.titleContent\"></ng-template>\n      </ng-template>\n\n      <ng-template [ngIf]=\"!tab.titleContent\">{{ tab.title }}</ng-template>\n    </a>\n  </li>\n</ul>\n\n<div\n  class=\"tab-content {{ contentColClass }}\"\n>\n  <!-- <ng-content select=\"mdb-tab\"></ng-content> -->\n  <ng-container *ngFor=\"let tab of tabs\">\n    <div\n      class=\"tab-pane fade\"\n      [ngClass]=\"{\n        show: tab.active,\n        active: tab.active\n      }\"\n    >\n      <ng-template mdbTabPortalOutlet [tab]=\"tab\"></ng-template>\n    </div>\n  </ng-container>\n</div>\n", directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }, { type: i3.MdbTabPortalOutlet, selector: "[mdbTabPortalOutlet]", inputs: ["tab"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbTabsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-tabs', template: "<ul\n  class=\"nav mb-3 flex-column {{ navColClass }}\"\n  [ngClass]=\"{\n    'nav-pills': pills,\n    'nav-tabs': !pills,\n    'nav-fill': fill,\n    'nav-justified': justified,\n    'flex-column': vertical,\n    'text-center': vertical\n  }\"\n  role=\"tablist\"\n>\n  <li\n    *ngFor=\"let tab of tabs; let i = index\"\n    (click)=\"setActiveTab(i)\"\n    class=\"nav-item\"\n    role=\"presentation\"\n  >\n    <a\n      href=\"javascript:void(0)\"\n      class=\"nav-link\"\n      [class.active]=\"tab.active\"\n      [class.disabled]=\"tab.disabled\"\n      role=\"tab\"\n    >\n      <ng-template [ngIf]=\"tab.titleContent\">\n        <ng-template [cdkPortalOutlet]=\"tab.titleContent\"></ng-template>\n      </ng-template>\n\n      <ng-template [ngIf]=\"!tab.titleContent\">{{ tab.title }}</ng-template>\n    </a>\n  </li>\n</ul>\n\n<div\n  class=\"tab-content {{ contentColClass }}\"\n>\n  <!-- <ng-content select=\"mdb-tab\"></ng-content> -->\n  <ng-container *ngFor=\"let tab of tabs\">\n    <div\n      class=\"tab-pane fade\"\n      [ngClass]=\"{\n        show: tab.active,\n        active: tab.active\n      }\"\n    >\n      <ng-template mdbTabPortalOutlet [tab]=\"tab\"></ng-template>\n    </div>\n  </ng-container>\n</div>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { tabs: [{
                type: ContentChildren,
                args: [MdbTabComponent]
            }], fill: [{
                type: Input
            }], justified: [{
                type: Input
            }], pills: [{
                type: Input
            }], vertical: [{
                type: HostBinding,
                args: ['class.row']
            }, {
                type: Input
            }], navColumnClass: [{
                type: Input
            }], contentColumnClass: [{
                type: Input
            }], activeTabChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvdGFicy90YWJzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC90YWJzL3RhYnMuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnQixxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVFLE9BQU8sRUFFTCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUVMLE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7O0FBRWxELE1BQU0sT0FBTyxZQUFZO0NBR3hCO0FBTUQsTUFBTSxPQUFPLGdCQUFnQjtJQXlEM0I7UUF0RFMsY0FBUyxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO1FBU2hELFVBQUssR0FBRyxLQUFLLENBQUM7UUFTZCxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBU25CLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFVZixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWpCLG1CQUFjLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLHVCQUFrQixHQUFHLE9BQU8sQ0FBQztRQVk1QixvQkFBZSxHQUErQixJQUFJLFlBQVksRUFBZ0IsQ0FBQztJQUUxRSxDQUFDO0lBcERoQixJQUNJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQUksSUFBSSxDQUFDLEtBQWM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxx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QUFJO3NCQUFyQyxlQUFlO3VCQUFDLGVBQWU7Z0JBSzVCLElBQUk7c0JBRFAsS0FBSztnQkFVRixTQUFTO3NCQURaLEtBQUs7Z0JBVUYsS0FBSztzQkFEUixLQUFLO2dCQVdGLFFBQVE7c0JBRlgsV0FBVzt1QkFBQyxXQUFXOztzQkFDdkIsS0FBSztnQkFTRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFZSSxlQUFlO3NCQUF4QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1kYlRhYkNvbXBvbmVudCB9IGZyb20gJy4vdGFiLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBjbGFzcyBNZGJUYWJDaGFuZ2Uge1xuICBpbmRleDogbnVtYmVyO1xuICB0YWI6IE1kYlRhYkNvbXBvbmVudDtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLXRhYnMnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGFicy5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIE1kYlRhYnNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBAQ29udGVudENoaWxkcmVuKE1kYlRhYkNvbXBvbmVudCkgdGFiczogUXVlcnlMaXN0PE1kYlRhYkNvbXBvbmVudD47XG5cbiAgcmVhZG9ubHkgX2Rlc3Ryb3kkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBASW5wdXQoKVxuICBnZXQgZmlsbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsbDtcbiAgfVxuICBzZXQgZmlsbCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2ZpbGwgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2ZpbGwgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBnZXQganVzdGlmaWVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9qdXN0aWZpZWQ7XG4gIH1cbiAgc2V0IGp1c3RpZmllZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2p1c3RpZmllZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfanVzdGlmaWVkID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgZ2V0IHBpbGxzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9waWxscztcbiAgfVxuICBzZXQgcGlsbHModmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9waWxscyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfcGlsbHMgPSBmYWxzZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnJvdycpXG4gIEBJbnB1dCgpXG4gIGdldCB2ZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdmVydGljYWw7XG4gIH1cbiAgc2V0IHZlcnRpY2FsKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fdmVydGljYWwgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3ZlcnRpY2FsID0gZmFsc2U7XG5cbiAgQElucHV0KCkgbmF2Q29sdW1uQ2xhc3MgPSAnY29sLTMnO1xuICBASW5wdXQoKSBjb250ZW50Q29sdW1uQ2xhc3MgPSAnY29sLTknO1xuXG4gIGdldCBuYXZDb2xDbGFzcygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnZlcnRpY2FsID8gdGhpcy5uYXZDb2x1bW5DbGFzcyA6ICcnO1xuICB9XG5cbiAgZ2V0IGNvbnRlbnRDb2xDbGFzcygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnZlcnRpY2FsID8gdGhpcy5jb250ZW50Q29sdW1uQ2xhc3MgOiAnJztcbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdGVkSW5kZXg6IG51bWJlcjtcblxuICBAT3V0cHV0KCkgYWN0aXZlVGFiQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TWRiVGFiQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWRiVGFiQ2hhbmdlPigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgZmlyc3RBY3RpdmVUYWJJbmRleCA9IHRoaXMudGFicy50b0FycmF5KCkuZmluZEluZGV4KCh0YWIpID0+ICF0YWIuZGlzYWJsZWQpO1xuXG4gICAgdGhpcy5zZXRBY3RpdmVUYWIoZmlyc3RBY3RpdmVUYWJJbmRleCk7XG4gICAgdGhpcy50YWJzLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3QgaGFzQWN0aXZlVGFiID0gdGhpcy50YWJzLmZpbmQoKHRhYikgPT4gdGFiLmFjdGl2ZSk7XG5cbiAgICAgIGlmICghaGFzQWN0aXZlVGFiKSB7XG4gICAgICAgIGNvbnN0IGNsb3Nlc3RUYWJJbmRleCA9IHRoaXMuX2dldENsb3Nlc3RUYWJJbmRleCh0aGlzLl9zZWxlY3RlZEluZGV4KTtcblxuICAgICAgICBpZiAoY2xvc2VzdFRhYkluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIHRoaXMuc2V0QWN0aXZlVGFiKGNsb3Nlc3RUYWJJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldEFjdGl2ZVRhYihpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgYWN0aXZlVGFiID0gdGhpcy50YWJzLnRvQXJyYXkoKVtpbmRleF07XG5cbiAgICBpZiAoIWFjdGl2ZVRhYiB8fCAoYWN0aXZlVGFiICYmIGFjdGl2ZVRhYi5kaXNhYmxlZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnRhYnMuZm9yRWFjaCgodGFiKSA9PiAodGFiLmFjdGl2ZSA9IHRhYiA9PT0gYWN0aXZlVGFiKSk7XG4gICAgdGhpcy5fc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuXG4gICAgY29uc3QgdGFiQ2hhbmdlRXZlbnQgPSB0aGlzLl9nZXRUYWJDaGFuZ2VFdmVudChpbmRleCwgYWN0aXZlVGFiKTtcbiAgICB0aGlzLmFjdGl2ZVRhYkNoYW5nZS5lbWl0KHRhYkNoYW5nZUV2ZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFRhYkNoYW5nZUV2ZW50KGluZGV4OiBudW1iZXIsIHRhYjogTWRiVGFiQ29tcG9uZW50KTogTWRiVGFiQ2hhbmdlIHtcbiAgICBjb25zdCBldmVudCA9IG5ldyBNZGJUYWJDaGFuZ2UoKTtcbiAgICBldmVudC5pbmRleCA9IGluZGV4O1xuICAgIGV2ZW50LnRhYiA9IHRhYjtcblxuICAgIHJldHVybiBldmVudDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldENsb3Nlc3RUYWJJbmRleChpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCB0YWJzID0gdGhpcy50YWJzLnRvQXJyYXkoKTtcbiAgICBjb25zdCB0YWJzTGVuZ3RoID0gdGFicy5sZW5ndGg7XG4gICAgaWYgKCF0YWJzTGVuZ3RoKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdGFic0xlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBwcmV2SW5kZXggPSBpbmRleCAtIGk7XG4gICAgICBjb25zdCBuZXh0SW5kZXggPSBpbmRleCArIGk7XG4gICAgICBpZiAodGFic1twcmV2SW5kZXhdICYmICF0YWJzW3ByZXZJbmRleF0uZGlzYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIHByZXZJbmRleDtcbiAgICAgIH1cbiAgICAgIGlmICh0YWJzW25leHRJbmRleF0gJiYgIXRhYnNbbmV4dEluZGV4XS5kaXNhYmxlZCkge1xuICAgICAgICByZXR1cm4gbmV4dEluZGV4O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9maWxsOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9qdXN0aWZpZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3BpbGxzOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV92ZXJ0aWNhbDogQm9vbGVhbklucHV0O1xufVxuIiwiPHVsXG4gIGNsYXNzPVwibmF2IG1iLTMgZmxleC1jb2x1bW4ge3sgbmF2Q29sQ2xhc3MgfX1cIlxuICBbbmdDbGFzc109XCJ7XG4gICAgJ25hdi1waWxscyc6IHBpbGxzLFxuICAgICduYXYtdGFicyc6ICFwaWxscyxcbiAgICAnbmF2LWZpbGwnOiBmaWxsLFxuICAgICduYXYtanVzdGlmaWVkJzoganVzdGlmaWVkLFxuICAgICdmbGV4LWNvbHVtbic6IHZlcnRpY2FsLFxuICAgICd0ZXh0LWNlbnRlcic6IHZlcnRpY2FsXG4gIH1cIlxuICByb2xlPVwidGFibGlzdFwiXG4+XG4gIDxsaVxuICAgICpuZ0Zvcj1cImxldCB0YWIgb2YgdGFiczsgbGV0IGkgPSBpbmRleFwiXG4gICAgKGNsaWNrKT1cInNldEFjdGl2ZVRhYihpKVwiXG4gICAgY2xhc3M9XCJuYXYtaXRlbVwiXG4gICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gID5cbiAgICA8YVxuICAgICAgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiXG4gICAgICBjbGFzcz1cIm5hdi1saW5rXCJcbiAgICAgIFtjbGFzcy5hY3RpdmVdPVwidGFiLmFjdGl2ZVwiXG4gICAgICBbY2xhc3MuZGlzYWJsZWRdPVwidGFiLmRpc2FibGVkXCJcbiAgICAgIHJvbGU9XCJ0YWJcIlxuICAgID5cbiAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJ0YWIudGl0bGVDb250ZW50XCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbY2RrUG9ydGFsT3V0bGV0XT1cInRhYi50aXRsZUNvbnRlbnRcIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiF0YWIudGl0bGVDb250ZW50XCI+e3sgdGFiLnRpdGxlIH19PC9uZy10ZW1wbGF0ZT5cbiAgICA8L2E+XG4gIDwvbGk+XG48L3VsPlxuXG48ZGl2XG4gIGNsYXNzPVwidGFiLWNvbnRlbnQge3sgY29udGVudENvbENsYXNzIH19XCJcbj5cbiAgPCEtLSA8bmctY29udGVudCBzZWxlY3Q9XCJtZGItdGFiXCI+PC9uZy1jb250ZW50PiAtLT5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgdGFiIG9mIHRhYnNcIj5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cInRhYi1wYW5lIGZhZGVcIlxuICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICBzaG93OiB0YWIuYWN0aXZlLFxuICAgICAgICBhY3RpdmU6IHRhYi5hY3RpdmVcbiAgICAgIH1cIlxuICAgID5cbiAgICAgIDxuZy10ZW1wbGF0ZSBtZGJUYWJQb3J0YWxPdXRsZXQgW3RhYl09XCJ0YWJcIj48L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cbjwvZGl2PlxuIl19