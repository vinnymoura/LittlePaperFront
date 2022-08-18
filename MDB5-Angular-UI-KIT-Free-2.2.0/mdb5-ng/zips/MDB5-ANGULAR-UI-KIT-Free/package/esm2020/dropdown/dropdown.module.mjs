import { MdbDropdownDirective } from './dropdown.directive';
import { MdbDropdownToggleDirective } from './dropdown-toggle.directive';
import { MdbDropdownMenuDirective } from './dropdown-menu.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import * as i0 from "@angular/core";
export class MdbDropdownModule {
}
MdbDropdownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbDropdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbDropdownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbDropdownModule, declarations: [MdbDropdownDirective, MdbDropdownToggleDirective, MdbDropdownMenuDirective], imports: [CommonModule, OverlayModule], exports: [MdbDropdownDirective, MdbDropdownToggleDirective, MdbDropdownMenuDirective] });
MdbDropdownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbDropdownModule, imports: [[CommonModule, OverlayModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbDropdownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OverlayModule],
                    declarations: [MdbDropdownDirective, MdbDropdownToggleDirective, MdbDropdownMenuDirective],
                    exports: [MdbDropdownDirective, MdbDropdownToggleDirective, MdbDropdownMenuDirective],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2Ryb3Bkb3duL2Ryb3Bkb3duLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBTXJELE1BQU0sT0FBTyxpQkFBaUI7OzhHQUFqQixpQkFBaUI7K0dBQWpCLGlCQUFpQixpQkFIYixvQkFBb0IsRUFBRSwwQkFBMEIsRUFBRSx3QkFBd0IsYUFEL0UsWUFBWSxFQUFFLGFBQWEsYUFFM0Isb0JBQW9CLEVBQUUsMEJBQTBCLEVBQUUsd0JBQXdCOytHQUV6RSxpQkFBaUIsWUFKbkIsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDOzJGQUkzQixpQkFBaUI7a0JBTDdCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQztvQkFDdEMsWUFBWSxFQUFFLENBQUMsb0JBQW9CLEVBQUUsMEJBQTBCLEVBQUUsd0JBQXdCLENBQUM7b0JBQzFGLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixFQUFFLDBCQUEwQixFQUFFLHdCQUF3QixDQUFDO2lCQUN0RiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1kYkRyb3Bkb3duRGlyZWN0aXZlIH0gZnJvbSAnLi9kcm9wZG93bi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWRiRHJvcGRvd25Ub2dnbGVEaXJlY3RpdmUgfSBmcm9tICcuL2Ryb3Bkb3duLXRvZ2dsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWRiRHJvcGRvd25NZW51RGlyZWN0aXZlIH0gZnJvbSAnLi9kcm9wZG93bi1tZW51LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBPdmVybGF5TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTWRiRHJvcGRvd25EaXJlY3RpdmUsIE1kYkRyb3Bkb3duVG9nZ2xlRGlyZWN0aXZlLCBNZGJEcm9wZG93bk1lbnVEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbTWRiRHJvcGRvd25EaXJlY3RpdmUsIE1kYkRyb3Bkb3duVG9nZ2xlRGlyZWN0aXZlLCBNZGJEcm9wZG93bk1lbnVEaXJlY3RpdmVdLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJEcm9wZG93bk1vZHVsZSB7fVxuIl19