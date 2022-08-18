import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdbAccordionComponent } from './accordion.component';
import { MdbAccordionItemComponent } from './accordion-item.component';
import { MdbAccordionItemHeaderDirective } from './accordion-item-header.directive';
import { MdbAccordionItemBodyDirective } from './accordion-item-content.directive';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import * as i0 from "@angular/core";
export class MdbAccordionModule {
}
MdbAccordionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbAccordionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbAccordionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbAccordionModule, declarations: [MdbAccordionComponent,
        MdbAccordionItemComponent,
        MdbAccordionItemHeaderDirective,
        MdbAccordionItemBodyDirective], imports: [CommonModule, MdbCollapseModule], exports: [MdbAccordionComponent,
        MdbAccordionItemComponent,
        MdbAccordionItemHeaderDirective,
        MdbAccordionItemBodyDirective] });
MdbAccordionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbAccordionModule, imports: [[CommonModule, MdbCollapseModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbAccordionModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        MdbAccordionComponent,
                        MdbAccordionItemComponent,
                        MdbAccordionItemHeaderDirective,
                        MdbAccordionItemBodyDirective,
                    ],
                    imports: [CommonModule, MdbCollapseModule],
                    exports: [
                        MdbAccordionComponent,
                        MdbAccordionItemComponent,
                        MdbAccordionItemHeaderDirective,
                        MdbAccordionItemBodyDirective,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9hY2NvcmRpb24vYWNjb3JkaW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7QUFpQmhFLE1BQU0sT0FBTyxrQkFBa0I7OytHQUFsQixrQkFBa0I7Z0hBQWxCLGtCQUFrQixpQkFiM0IscUJBQXFCO1FBQ3JCLHlCQUF5QjtRQUN6QiwrQkFBK0I7UUFDL0IsNkJBQTZCLGFBRXJCLFlBQVksRUFBRSxpQkFBaUIsYUFFdkMscUJBQXFCO1FBQ3JCLHlCQUF5QjtRQUN6QiwrQkFBK0I7UUFDL0IsNkJBQTZCO2dIQUdwQixrQkFBa0IsWUFScEIsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUM7MkZBUS9CLGtCQUFrQjtrQkFmOUIsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUU7d0JBQ1oscUJBQXFCO3dCQUNyQix5QkFBeUI7d0JBQ3pCLCtCQUErQjt3QkFDL0IsNkJBQTZCO3FCQUM5QjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUM7b0JBQzFDLE9BQU8sRUFBRTt3QkFDUCxxQkFBcUI7d0JBQ3JCLHlCQUF5Qjt3QkFDekIsK0JBQStCO3dCQUMvQiw2QkFBNkI7cUJBQzlCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNZGJBY2NvcmRpb25Db21wb25lbnQgfSBmcm9tICcuL2FjY29yZGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWRiQWNjb3JkaW9uSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vYWNjb3JkaW9uLWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IE1kYkFjY29yZGlvbkl0ZW1IZWFkZXJEaXJlY3RpdmUgfSBmcm9tICcuL2FjY29yZGlvbi1pdGVtLWhlYWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWRiQWNjb3JkaW9uSXRlbUJvZHlEaXJlY3RpdmUgfSBmcm9tICcuL2FjY29yZGlvbi1pdGVtLWNvbnRlbnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1kYkNvbGxhcHNlTW9kdWxlIH0gZnJvbSAnbWRiLWFuZ3VsYXItdWkta2l0L2NvbGxhcHNlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWRiQWNjb3JkaW9uQ29tcG9uZW50LFxuICAgIE1kYkFjY29yZGlvbkl0ZW1Db21wb25lbnQsXG4gICAgTWRiQWNjb3JkaW9uSXRlbUhlYWRlckRpcmVjdGl2ZSxcbiAgICBNZGJBY2NvcmRpb25JdGVtQm9keURpcmVjdGl2ZSxcbiAgXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTWRiQ29sbGFwc2VNb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgTWRiQWNjb3JkaW9uQ29tcG9uZW50LFxuICAgIE1kYkFjY29yZGlvbkl0ZW1Db21wb25lbnQsXG4gICAgTWRiQWNjb3JkaW9uSXRlbUhlYWRlckRpcmVjdGl2ZSxcbiAgICBNZGJBY2NvcmRpb25JdGVtQm9keURpcmVjdGl2ZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWRiQWNjb3JkaW9uTW9kdWxlIHt9XG4iXX0=