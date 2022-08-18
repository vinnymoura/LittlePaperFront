import { ChangeDetectionStrategy, Component, ContentChildren, HostBinding, Input, } from '@angular/core';
import { startWith, switchMap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { MdbAccordionItemComponent } from './accordion-item.component';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
export class MdbAccordionComponent {
    constructor() {
        this._flush = false;
        this._multiple = false;
        this.accordion = true;
    }
    get flush() {
        return this._flush;
    }
    set flush(value) {
        this._flush = coerceBooleanProperty(value);
    }
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
    }
    get addFlushClass() {
        return this.flush;
    }
    ngAfterContentInit() {
        this.items.changes
            .pipe(startWith(this.items), switchMap((items) => {
            return merge(...items.map((item) => item.show$));
        }))
            .subscribe((clickedItem) => this._handleMultipleItems(clickedItem));
    }
    _handleMultipleItems(clickedItem) {
        if (!this.multiple) {
            const itemsToClose = this.items.filter((item) => item !== clickedItem && !item._collapsed);
            itemsToClose.forEach((item) => item.hide());
        }
    }
}
MdbAccordionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbAccordionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MdbAccordionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.4", type: MdbAccordionComponent, selector: "mdb-accordion", inputs: { flush: "flush", multiple: "multiple" }, host: { properties: { "class.accordion": "this.accordion", "class.accordion-flush": "this.addFlushClass" } }, queries: [{ propertyName: "items", predicate: MdbAccordionItemComponent }], ngImport: i0, template: "<ng-content></ng-content>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbAccordionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-accordion', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { items: [{
                type: ContentChildren,
                args: [MdbAccordionItemComponent]
            }], flush: [{
                type: Input
            }], multiple: [{
                type: Input
            }], accordion: [{
                type: HostBinding,
                args: ['class.accordion']
            }], addFlushClass: [{
                type: HostBinding,
                args: ['class.accordion-flush']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9hY2NvcmRpb24vYWNjb3JkaW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9hY2NvcmRpb24vYWNjb3JkaW9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULGVBQWUsRUFDZixXQUFXLEVBQ1gsS0FBSyxHQUVOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RSxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBTzVFLE1BQU0sT0FBTyxxQkFBcUI7SUEyQmhDO1FBakJRLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFTZixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRU0sY0FBUyxHQUFHLElBQUksQ0FBQztJQU1sQyxDQUFDO0lBeEJoQixJQUNJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNELElBQUksS0FBSyxDQUFDLEtBQWM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBR0QsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUlELElBQ0ksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBSUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTzthQUNmLElBQUksQ0FDSCxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUNyQixTQUFTLENBQUMsQ0FBQyxLQUEyQyxFQUFFLEVBQUU7WUFDeEQsT0FBTyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBK0IsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDOUUsQ0FBQyxDQUFDLENBQ0g7YUFDQSxTQUFTLENBQUMsQ0FBQyxXQUFzQyxFQUFFLEVBQUUsQ0FDcEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUN2QyxDQUFDO0lBQ04sQ0FBQztJQUVPLG9CQUFvQixDQUFDLFdBQXNDO1FBQ2pFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUNwQyxDQUFDLElBQStCLEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUM5RSxDQUFDO1lBRUYsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQStCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ3hFO0lBQ0gsQ0FBQzs7a0hBbERVLHFCQUFxQjtzR0FBckIscUJBQXFCLDJPQUNmLHlCQUF5Qiw2QkNwQjVDLDZCQUNBOzJGRGtCYSxxQkFBcUI7a0JBTGpDLFNBQVM7K0JBQ0UsZUFBZSxtQkFFUix1QkFBdUIsQ0FBQyxNQUFNOzBFQUdILEtBQUs7c0JBQWhELGVBQWU7dUJBQUMseUJBQXlCO2dCQUd0QyxLQUFLO3NCQURSLEtBQUs7Z0JBVUYsUUFBUTtzQkFEWCxLQUFLO2dCQVMwQixTQUFTO3NCQUF4QyxXQUFXO3VCQUFDLGlCQUFpQjtnQkFFMUIsYUFBYTtzQkFEaEIsV0FBVzt1QkFBQyx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgUXVlcnlMaXN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1kYkFjY29yZGlvbkl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2FjY29yZGlvbi1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1hY2NvcmRpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vYWNjb3JkaW9uLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1kYkFjY29yZGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICBAQ29udGVudENoaWxkcmVuKE1kYkFjY29yZGlvbkl0ZW1Db21wb25lbnQpIGl0ZW1zOiBRdWVyeUxpc3Q8TWRiQWNjb3JkaW9uSXRlbUNvbXBvbmVudD47XG5cbiAgQElucHV0KClcbiAgZ2V0IGZsdXNoKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9mbHVzaDtcbiAgfVxuICBzZXQgZmx1c2godmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9mbHVzaCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZmx1c2ggPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBnZXQgbXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX211bHRpcGxlO1xuICB9XG4gIHNldCBtdWx0aXBsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX211bHRpcGxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9tdWx0aXBsZSA9IGZhbHNlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWNjb3JkaW9uJykgYWNjb3JkaW9uID0gdHJ1ZTtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY2NvcmRpb24tZmx1c2gnKVxuICBnZXQgYWRkRmx1c2hDbGFzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5mbHVzaDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pdGVtcy5jaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKHRoaXMuaXRlbXMpLFxuICAgICAgICBzd2l0Y2hNYXAoKGl0ZW1zOiBRdWVyeUxpc3Q8TWRiQWNjb3JkaW9uSXRlbUNvbXBvbmVudD4pID0+IHtcbiAgICAgICAgICByZXR1cm4gbWVyZ2UoLi4uaXRlbXMubWFwKChpdGVtOiBNZGJBY2NvcmRpb25JdGVtQ29tcG9uZW50KSA9PiBpdGVtLnNob3ckKSk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChjbGlja2VkSXRlbTogTWRiQWNjb3JkaW9uSXRlbUNvbXBvbmVudCkgPT5cbiAgICAgICAgdGhpcy5faGFuZGxlTXVsdGlwbGVJdGVtcyhjbGlja2VkSXRlbSlcbiAgICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVNdWx0aXBsZUl0ZW1zKGNsaWNrZWRJdGVtOiBNZGJBY2NvcmRpb25JdGVtQ29tcG9uZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICBjb25zdCBpdGVtc1RvQ2xvc2UgPSB0aGlzLml0ZW1zLmZpbHRlcihcbiAgICAgICAgKGl0ZW06IE1kYkFjY29yZGlvbkl0ZW1Db21wb25lbnQpID0+IGl0ZW0gIT09IGNsaWNrZWRJdGVtICYmICFpdGVtLl9jb2xsYXBzZWRcbiAgICAgICk7XG5cbiAgICAgIGl0ZW1zVG9DbG9zZS5mb3JFYWNoKChpdGVtOiBNZGJBY2NvcmRpb25JdGVtQ29tcG9uZW50KSA9PiBpdGVtLmhpZGUoKSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZsdXNoOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9tdWx0aXBsZTogQm9vbGVhbklucHV0O1xufVxuIiwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuIl19