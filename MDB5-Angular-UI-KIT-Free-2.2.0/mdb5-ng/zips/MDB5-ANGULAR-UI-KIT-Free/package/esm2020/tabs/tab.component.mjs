import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, ContentChild, Input, TemplateRef, ViewChild, } from '@angular/core';
import { Subject } from 'rxjs';
import { MDB_TAB_CONTENT } from './tab-content.directive';
import { MDB_TAB_TITLE } from './tab-title.directive';
import * as i0 from "@angular/core";
export class MdbTabComponent {
    constructor(_elementRef, _renderer, _vcr) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._vcr = _vcr;
        this.activeStateChange$ = new Subject();
        this._disabled = false;
        this._contentPortal = null;
        this._titlePortal = null;
        this._active = false;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    get active() {
        return this._active;
    }
    get content() {
        return this._contentPortal;
    }
    get titleContent() {
        return this._titlePortal;
    }
    get shouldAttach() {
        return this._lazyContent === undefined;
    }
    // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
    set active(value) {
        if (value) {
            this._renderer.addClass(this._elementRef.nativeElement, 'show');
            this._renderer.addClass(this._elementRef.nativeElement, 'active');
        }
        else {
            this._renderer.removeClass(this._elementRef.nativeElement, 'show');
            this._renderer.removeClass(this._elementRef.nativeElement, 'active');
        }
        this._active = value;
        this.activeStateChange$.next(value);
    }
    ngOnInit() {
        this._createContentPortal();
        if (this._titleContent) {
            this._createTitlePortal();
        }
    }
    _createContentPortal() {
        const content = this._lazyContent || this._content;
        this._contentPortal = new TemplatePortal(content, this._vcr);
    }
    _createTitlePortal() {
        this._titlePortal = new TemplatePortal(this._titleContent, this._vcr);
    }
}
MdbTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbTabComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
MdbTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.4", type: MdbTabComponent, selector: "mdb-tab", inputs: { disabled: "disabled", title: "title" }, queries: [{ propertyName: "_lazyContent", first: true, predicate: MDB_TAB_CONTENT, descendants: true, read: TemplateRef, static: true }, { propertyName: "_titleContent", first: true, predicate: MDB_TAB_TITLE, descendants: true, read: TemplateRef, static: true }], viewQueries: [{ propertyName: "_content", first: true, predicate: TemplateRef, descendants: true, static: true }], ngImport: i0, template: "<ng-template><ng-content></ng-content></ng-template>\n" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbTabComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-tab', template: "<ng-template><ng-content></ng-content></ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }]; }, propDecorators: { _lazyContent: [{
                type: ContentChild,
                args: [MDB_TAB_CONTENT, { read: TemplateRef, static: true }]
            }], _titleContent: [{
                type: ContentChild,
                args: [MDB_TAB_TITLE, { read: TemplateRef, static: true }]
            }], _content: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }], disabled: [{
                type: Input
            }], title: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC90YWJzL3RhYi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvdGFicy90YWIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnQixxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFFWixLQUFLLEVBR0wsV0FBVyxFQUNYLFNBQVMsR0FFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBTXRELE1BQU0sT0FBTyxlQUFlO0lBd0QxQixZQUNVLFdBQXVCLEVBQ3ZCLFNBQW9CLEVBQ3BCLElBQXNCO1FBRnRCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsU0FBSSxHQUFKLElBQUksQ0FBa0I7UUFsRHZCLHVCQUFrQixHQUFxQixJQUFJLE9BQU8sRUFBVyxDQUFDO1FBUy9ELGNBQVMsR0FBRyxLQUFLLENBQUM7UUFvQmxCLG1CQUFjLEdBQTBCLElBQUksQ0FBQztRQUM3QyxpQkFBWSxHQUEwQixJQUFJLENBQUM7UUFlM0MsWUFBTyxHQUFHLEtBQUssQ0FBQztJQU1yQixDQUFDO0lBakRKLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFLRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxZQUFZLEtBQUssU0FBUyxDQUFDO0lBQ3pDLENBQUM7SUFLRCwyRUFBMkU7SUFDM0UsSUFBSSxNQUFNLENBQUMsS0FBYztRQUN2QixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ25FO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNuRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUN0RTtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQVNELFFBQVE7UUFDTixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUU1QixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRU8sb0JBQW9CO1FBQzFCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNuRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksY0FBYyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVPLGtCQUFrQjtRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hFLENBQUM7OzRHQTdFVSxlQUFlO2dHQUFmLGVBQWUsMklBQ1osZUFBZSwyQkFBVSxXQUFXLDJFQUdwQyxhQUFhLDJCQUFVLFdBQVcscUZBR3JDLFdBQVcsOERDNUJ4Qix3REFDQTsyRkRvQmEsZUFBZTtrQkFKM0IsU0FBUzsrQkFDRSxTQUFTO3dKQUtuQixZQUFZO3NCQURYLFlBQVk7dUJBQUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUlsRSxhQUFhO3NCQURaLFlBQVk7dUJBQUMsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUd0QixRQUFRO3NCQUFqRCxTQUFTO3VCQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBS3BDLFFBQVE7c0JBRFgsS0FBSztnQkFTRyxLQUFLO3NCQUFiLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNREJfVEFCX0NPTlRFTlQgfSBmcm9tICcuL3RhYi1jb250ZW50LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNREJfVEFCX1RJVExFIH0gZnJvbSAnLi90YWItdGl0bGUuZGlyZWN0aXZlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLXRhYicsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWIuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJUYWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAQ29udGVudENoaWxkKE1EQl9UQUJfQ09OVEVOVCwgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pXG4gIF9sYXp5Q29udGVudDogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAQ29udGVudENoaWxkKE1EQl9UQUJfVElUTEUsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBfdGl0bGVDb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYsIHsgc3RhdGljOiB0cnVlIH0pIF9jb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIHJlYWRvbmx5IGFjdGl2ZVN0YXRlQ2hhbmdlJDogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xuXG4gIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbiAgfVxuXG4gIGdldCBjb250ZW50KCk6IFRlbXBsYXRlUG9ydGFsIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRQb3J0YWw7XG4gIH1cblxuICBnZXQgdGl0bGVDb250ZW50KCk6IFRlbXBsYXRlUG9ydGFsIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX3RpdGxlUG9ydGFsO1xuICB9XG5cbiAgZ2V0IHNob3VsZEF0dGFjaCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbGF6eUNvbnRlbnQgPT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRlbnRQb3J0YWw6IFRlbXBsYXRlUG9ydGFsIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX3RpdGxlUG9ydGFsOiBUZW1wbGF0ZVBvcnRhbCB8IG51bGwgPSBudWxsO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYWRqYWNlbnQtb3ZlcmxvYWQtc2lnbmF0dXJlc1xuICBzZXQgYWN0aXZlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdzaG93Jyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhY3RpdmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnc2hvdycpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fYWN0aXZlID0gdmFsdWU7XG4gICAgdGhpcy5hY3RpdmVTdGF0ZUNoYW5nZSQubmV4dCh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfYWN0aXZlID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgX3ZjcjogVmlld0NvbnRhaW5lclJlZlxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fY3JlYXRlQ29udGVudFBvcnRhbCgpO1xuXG4gICAgaWYgKHRoaXMuX3RpdGxlQ29udGVudCkge1xuICAgICAgdGhpcy5fY3JlYXRlVGl0bGVQb3J0YWwoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVDb250ZW50UG9ydGFsKCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLl9sYXp5Q29udGVudCB8fCB0aGlzLl9jb250ZW50O1xuICAgIHRoaXMuX2NvbnRlbnRQb3J0YWwgPSBuZXcgVGVtcGxhdGVQb3J0YWwoY29udGVudCwgdGhpcy5fdmNyKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZVRpdGxlUG9ydGFsKCk6IHZvaWQge1xuICAgIHRoaXMuX3RpdGxlUG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMuX3RpdGxlQ29udGVudCwgdGhpcy5fdmNyKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xufVxuIiwiPG5nLXRlbXBsYXRlPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L25nLXRlbXBsYXRlPlxuIl19