import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdbTabComponent } from './tab.component';
import { MdbTabsComponent } from './tabs.component';
import { PortalModule } from '@angular/cdk/portal';
import { MdbTabContentDirective } from './tab-content.directive';
import { MdbTabPortalOutlet } from './tab-outlet.directive';
import { MdbTabTitleDirective } from './tab-title.directive';
import * as i0 from "@angular/core";
export class MdbTabsModule {
}
MdbTabsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbTabsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbTabsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbTabsModule, declarations: [MdbTabComponent,
        MdbTabContentDirective,
        MdbTabTitleDirective,
        MdbTabPortalOutlet,
        MdbTabsComponent], imports: [CommonModule, PortalModule], exports: [MdbTabComponent,
        MdbTabContentDirective,
        MdbTabTitleDirective,
        MdbTabPortalOutlet,
        MdbTabsComponent] });
MdbTabsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbTabsModule, imports: [[CommonModule, PortalModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MdbTabsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        MdbTabComponent,
                        MdbTabContentDirective,
                        MdbTabTitleDirective,
                        MdbTabPortalOutlet,
                        MdbTabsComponent,
                    ],
                    imports: [CommonModule, PortalModule],
                    exports: [
                        MdbTabComponent,
                        MdbTabContentDirective,
                        MdbTabTitleDirective,
                        MdbTabPortalOutlet,
                        MdbTabsComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvdGFicy90YWJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQW1CN0QsTUFBTSxPQUFPLGFBQWE7OzBHQUFiLGFBQWE7MkdBQWIsYUFBYSxpQkFmdEIsZUFBZTtRQUNmLHNCQUFzQjtRQUN0QixvQkFBb0I7UUFDcEIsa0JBQWtCO1FBQ2xCLGdCQUFnQixhQUVSLFlBQVksRUFBRSxZQUFZLGFBRWxDLGVBQWU7UUFDZixzQkFBc0I7UUFDdEIsb0JBQW9CO1FBQ3BCLGtCQUFrQjtRQUNsQixnQkFBZ0I7MkdBR1AsYUFBYSxZQVRmLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQzsyRkFTMUIsYUFBYTtrQkFqQnpCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLGVBQWU7d0JBQ2Ysc0JBQXNCO3dCQUN0QixvQkFBb0I7d0JBQ3BCLGtCQUFrQjt3QkFDbEIsZ0JBQWdCO3FCQUNqQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO29CQUNyQyxPQUFPLEVBQUU7d0JBQ1AsZUFBZTt3QkFDZixzQkFBc0I7d0JBQ3RCLG9CQUFvQjt3QkFDcEIsa0JBQWtCO3dCQUNsQixnQkFBZ0I7cUJBQ2pCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNZGJUYWJDb21wb25lbnQgfSBmcm9tICcuL3RhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWRiVGFic0NvbXBvbmVudCB9IGZyb20gJy4vdGFicy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBNZGJUYWJDb250ZW50RGlyZWN0aXZlIH0gZnJvbSAnLi90YWItY29udGVudC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWRiVGFiUG9ydGFsT3V0bGV0IH0gZnJvbSAnLi90YWItb3V0bGV0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZGJUYWJUaXRsZURpcmVjdGl2ZSB9IGZyb20gJy4vdGFiLXRpdGxlLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1kYlRhYkNvbXBvbmVudCxcbiAgICBNZGJUYWJDb250ZW50RGlyZWN0aXZlLFxuICAgIE1kYlRhYlRpdGxlRGlyZWN0aXZlLFxuICAgIE1kYlRhYlBvcnRhbE91dGxldCxcbiAgICBNZGJUYWJzQ29tcG9uZW50LFxuICBdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBQb3J0YWxNb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgTWRiVGFiQ29tcG9uZW50LFxuICAgIE1kYlRhYkNvbnRlbnREaXJlY3RpdmUsXG4gICAgTWRiVGFiVGl0bGVEaXJlY3RpdmUsXG4gICAgTWRiVGFiUG9ydGFsT3V0bGV0LFxuICAgIE1kYlRhYnNDb21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1kYlRhYnNNb2R1bGUge31cbiJdfQ==