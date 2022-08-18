import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormControlComponent } from './form-control.component';
import { MdbInputDirective } from './input.directive';
import { MdbLabelDirective } from './label.directive';
import * as i0 from "@angular/core";
export class MdbFormsModule {
}
MdbFormsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbFormsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbFormsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbFormsModule, declarations: [MdbFormControlComponent, MdbInputDirective, MdbLabelDirective], imports: [CommonModule, FormsModule], exports: [MdbFormControlComponent, MdbInputDirective, MdbLabelDirective] });
MdbFormsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbFormsModule, imports: [[CommonModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbFormsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MdbFormControlComponent, MdbInputDirective, MdbLabelDirective],
                    exports: [MdbFormControlComponent, MdbInputDirective, MdbLabelDirective],
                    imports: [CommonModule, FormsModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2Zvcm1zL2Zvcm1zLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBT3RELE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOzRHQUFkLGNBQWMsaUJBSlYsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLGFBRWxFLFlBQVksRUFBRSxXQUFXLGFBRHpCLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLGlCQUFpQjs0R0FHNUQsY0FBYyxZQUZoQixDQUFDLFlBQVksRUFBRSxXQUFXLENBQUM7MkZBRXpCLGNBQWM7a0JBTDFCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUM7b0JBQzdFLE9BQU8sRUFBRSxDQUFDLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDO29CQUN4RSxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDO2lCQUNyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE1kYkZvcm1Db250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtLWNvbnRyb2wuY29tcG9uZW50JztcbmltcG9ydCB7IE1kYklucHV0RGlyZWN0aXZlIH0gZnJvbSAnLi9pbnB1dC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWRiTGFiZWxEaXJlY3RpdmUgfSBmcm9tICcuL2xhYmVsLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW01kYkZvcm1Db250cm9sQ29tcG9uZW50LCBNZGJJbnB1dERpcmVjdGl2ZSwgTWRiTGFiZWxEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbTWRiRm9ybUNvbnRyb2xDb21wb25lbnQsIE1kYklucHV0RGlyZWN0aXZlLCBNZGJMYWJlbERpcmVjdGl2ZV0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTWRiRm9ybXNNb2R1bGUge31cbiJdfQ==