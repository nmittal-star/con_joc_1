import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { TabsConfig, Breadcrumb } from '@eh-library/common';

import { BreadcrumbsComponent, TabsComponent } from '@eh-library/common';
import { NavTab } from '@eh-library/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface NavTabWithIcon extends NavTab {
  icon?: string;
}

export interface SubHeaderConfig {
  breadcrumb?: boolean;
  showtabs?: boolean;
  tabs?: NavTabWithIcon[];
  activeTab?: string;
  parentRoute?: ActivatedRoute;
}

@Component({
  selector: 'app-sub-header',
  standalone:true,
  imports: [BreadcrumbsComponent, TranslateModule, MatTabsModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './sub-header.html',
  styleUrl: './sub-header.scss',
})
export class SubHeader {

  @Input() config: SubHeaderConfig = { breadcrumb: true, showtabs: true, tabs: [] };
  @Input() breadcrumbs: Breadcrumb[] = [];

  @ViewChild('tabScroller') tabScroller!: ElementRef<HTMLElement>;

  activeTab: string = '';
  readonly scrollStep = 200;

  @Output() tabChange = new EventEmitter<number>();

  scrollLeft(): void {
    this.tabScroller.nativeElement.scrollBy({ left: -this.scrollStep, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.tabScroller.nativeElement.scrollBy({ left: this.scrollStep, behavior: 'smooth' });
  }

  isTemplate(value: any): value is TemplateRef<any> {
    return value instanceof TemplateRef;
  }

  onTabChange(index: number) {
    this.tabChange.emit(index);
  }

  ngOnChanges() {
    this.activeTab = this.config.activeTab ?? '';
  }

}
