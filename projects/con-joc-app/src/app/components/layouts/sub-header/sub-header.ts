import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { TabsConfig, Breadcrumb } from '@eh-library/common';

import { BreadcrumbsComponent, TabsComponent } from '@eh-library/common';
import { NavTab } from '@eh-library/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabsModule } from '@angular/material/tabs';

export interface SubHeaderConfig {
  breadcrumb?: boolean;
  showtabs?: boolean;
  tabs?: NavTab[];
  activeTab?: string;
  parentRoute?: ActivatedRoute;
}

@Component({
  selector: 'app-sub-header',
  standalone:true,
  imports: [BreadcrumbsComponent, TranslateModule, MatTabsModule, RouterModule],
  templateUrl: './sub-header.html',
  styleUrl: './sub-header.scss',
})
export class SubHeader {

  @Input() config: SubHeaderConfig = { breadcrumb: true, showtabs: true, tabs: [] };
  @Input() breadcrumbs: Breadcrumb[] = [];
  

  activeTab: string = '';

  @Output() tabChange = new EventEmitter<number>();

  isTemplate(value: any): value is TemplateRef<any> {
    return value instanceof TemplateRef;
  }

  onTabChange(index: number) {
    this.tabChange.emit(index);
  }

  ngOnChanges() {
    console.log(" SubHeader tabsConfig received:", this.config);
    this.activeTab = this.config.activeTab ?? '';

  }

}
