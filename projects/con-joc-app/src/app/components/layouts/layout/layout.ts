import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';

import { RouterModule, RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  Breadcrumb,
  BreadcrumbService,
  TabsConfig,
  HeaderComponent,
  RouteService
} from '@eh-library/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { SubHeader, SubHeaderConfig } from '../sub-header/sub-header';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule,
    MatIconModule,
    RouterOutlet,
    HeaderComponent,
    TranslateModule,
    HeaderComponent,
    SubHeader],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

  tabsConfigFromChild: TabsConfig | null = null;
  subHeaderConfig: SubHeaderConfig = { breadcrumb: true, showtabs: false, tabs: [] };
  breadcrumbs: Breadcrumb[] = [];

  private readonly destroy$ = new Subject<void>();

  menuItems = [

    {
      id: 'omni',
      label: 'Omni',
      icon: 'home',
      children: [
        { id: 'accounts', label: 'Accounts', icon: 'chevron_right', route: '/accounts' },
        { id: 'accountGroups', label: 'Account Groups', icon: 'chevron_right', route: '/account-group' },
        { id: 'users', label: 'Users', icon: 'chevron_right', route: '/users' },
        { id: 'transactions', label: 'Transactions', icon: 'chevron_right', route: '/transactions' },
        { id: 'didOrders', label: 'DID Orders', icon: 'chevron_right', route: '/did-orders' },
        { id: 'statecalltimes', label: 'State Call Times', icon: 'chevron_right', route: '/state-call-time' },
      ]
    },
    {
      id: 'logs',
      label: 'Logs',
      icon: 'home',
      children: [
        { id: 'memberLogs', label: 'Member Logs', icon: 'chevron_right', route: '/member-logs' },
        { id: 'releaseLogs', label: 'Release Logs', icon: 'chevron_right', route: '/release-logs' },
        { id: 'statusLogs', label: 'System Status Logs', icon: 'chevron_right', route: '/system-status-log' },
        { id: 'didLogs', label: 'DID Logs', icon: 'chevron_right', route: '/did-logs' }
      ]
    },
    {
      id: 'tools',
      label: 'Tools',
      icon: 'settings',
      children: [
        { id: 'activedefense-accounts', label: 'Active Defense Accounts', route: '/active-defense-accounts' },
        { id: 'billingComponent', label: 'Billing Component Description', route: '/component-description' },
        { id: 'billing-invoice', label: 'Billing Invoice Verification Report', route: '/billing-invoice-verification-report' },
        { id: 'billing-tax', label: 'Billing Tax Report', route: '/billing-tax-report' },
        { id: 'blacklist-management', label: 'Blacklist Management', route: '/blacklist-dids' },
        { id: 'cdrCompare', label: 'CDR Compare', route: '/cdr-compare' },
        { id: 'clustersOdometer', label: 'Clusters Odometer', route: '/clusters-odometer' },
        { id: 'credits-usage', label: 'Credits & Usage Reconciliation', route: '/rtp-engine' },
        { id: 'cronManager', label: 'Cron Manager', route: '/cron-manager' },
        { id: 'databaseStatuses', label: 'Database Statuses', route: '/database-statuses' },
        { id: 'didManagement', label: 'DID Management', route: '/inbound-hostgroup' },
        { id: 'did-next-gen-ai', label: 'DID Next Gen AI', route: '/did_next_gen_ai' },
        { id: 'disposition-delays', label: 'Disposition Delays', route: '/disposition-delays' },
        { id: 'dno-tool', label: 'DNO Tool', route: '/dno-tools' },
        { id: 'emailLists', label: 'Email Lists', route: '/email-lists' },
        { id: 'emergencyTransfer', label: 'Emergency Transfer', route: '/emergency-transfer' },
        { id: 'extensionSearch', label: 'Extension Search', route: '/extension' },
        { id: 'featureFlags', label: 'Feature Flags', route: '/feature-flags' },
        { id: 'keyGenerator', label: 'Key Generator', route: '/dialplan-definition' },
        { id: 'lergUpdate', label: 'LERG Update', route: '/tools/lerg' },
        { id: 'mfa-tools', label: 'MFA Tool', route: '/mfa-tools' },
        { id: 'npanxxupdate', label: 'NPANXX Update', route: '/tools/NPANXX' },
        { id: 'npanxxupload', label: 'NPANXX Upload Tool', route: 'npanxx-upload' },
        { id: ' oauth-clients', label: ' OAuth Clients', route: '/oauth_client' },
        { id: 'omniAcl', label: 'Omni ACL', route: '/acl' },
        { id: 'omni-dids', label: 'Omni DIDs (From Cluster Database)', route: '/omni-dids' },
        { id: 'omniFieldDescription', label: 'Omni Field Description', route: '/field-description' },
        { id: 'providerRates', label: 'Provider Rates', route: '/sms-rates' },
        { id: 'purpose', label: 'Purpose', route: '/purpose' },
        { id: 'redisSearch', label: 'Redis Search', route: '/redis-search' },
        { id: 'repcheck-csv', label: 'RepCheck Data Via CSV File', route: '/reputation-check-csv-file' },
        { id: 'reputation-check', label: 'Reputation Check', route: '/reputation-check' },
        { id: 'resetCongestedCalls', label: 'Reset Congested Calls', route: '/silo-management' },
        { id: 'schemaIntegrity', label: 'Schema Integrity', route: '/rtp-engine' },
        { id: 'serversDashboard', label: 'Servers Dashboard', route: '/routes' },
        { id: 'sinch-order', label: 'Sinch Order Queue', route: '/sinch-order-queue' },
        { id: 'splitTables', label: 'Split Tables', route: '/split-tables' },
        { id: 'stateTracker', label: 'State Tracker Global Rules', route: '/statetracker' },
        { id: 'vaProjectPool', label: 'VA Project Pool', route: '/va-project-pool' },
        { id: 'vendors', label: 'Vendors', route: '/vendors' },
        { id: 'zipcodesUpdate', label: 'Zipcodes Update', route: '/tools/zipCodes' },

      ]
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: 'help',
      children: [

        { id: 'reports', label: "Reports", route: '/reports' },
        { id: 'metabaseReports', label: "Metabase Report Settings", route: '/report-management' },

      ]
    },
    {
      id: 'product',
      label: 'Product',
      icon: 'home',
      children: [
        { id: 'products', label: 'Products', route: '/products' },
        { id: 'features', label: 'Features', route: '/features' },
        { id: 'component', label: 'Component', route: '/component' },
        { id: 'addons', label: 'Add ons', route: '/add-ons' },
      ]
    },

  ];
  profileMenuItems = [
    { label: 'Profile', icon: 'person', route: '/profile' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
    { label: 'Logout', icon: 'logout', callback: () => this.logout() }
  ];

  headerLogo = {
  src: '../assets/images/logo.png',
  alt: 'Convoso Logo'
};

  languagesDropdownItems = [
    { label: 'EN', value: 'en' },
    { label: 'FR', value: 'fr' },
  ];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private routeService: RouteService,
    // private authService: UserDataService,
    // private translationService:TranslationService,
    private translate: TranslateService
  ) {
    this.router.events.subscribe(() => {
      const child = this.activatedRoute.firstChild;
      console.log(" child tabs ", this.routeService.getTabs());
      console.log("active tab ", this.routeService.getTabPath());
      console.log("parent route ", this.routeService.getPageRoute());

      if (child) {
        child.data.subscribe((data: any) => {
          this.subHeaderConfig = {
            breadcrumb: data['breadcrumb'] ?? true,
            showtabs: data['showtabs'] ?? false,
            tabs: data['tabs'] ?? [],
            activeTab: this.routeService.getTabPath(),
            parentRoute: this.routeService.getPageRoute(),
          };
        });
      }
    });
  }

  ngOnInit(): void {

    this.breadcrumbService.breadcrumbs$
      .pipe(takeUntil(this.destroy$))
      .subscribe((crumbs) => this.breadcrumbs = crumbs);


    // this.currentLang = this.translationService.getCurrentLanguage();

    // this.translationService.onLangChange$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(event => {
    //     this.currentLang = event.lang;
    //   });
  }

  onChildActivate(component: any) {
    if ('tabsConfig' in component) {
      this.tabsConfigFromChild = component.tabsConfig;
    } else {
      this.tabsConfigFromChild = null;
    }
  }




  logout(): void {
    console.log('logout from component')
    // this.authService.logout();         
    // this.router.navigate(['/login']);   
  }
}
