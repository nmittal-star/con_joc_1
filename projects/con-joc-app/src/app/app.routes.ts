import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./components/layouts/layout/layout').then(m => m.Layout),
        children: [
            { path: '', redirectTo: 'accounts', pathMatch: 'full' },


            // omni

            {
                path: 'accounts',
                loadComponent: () =>
                    import('./pages/omni/accounts/accounts').then(m => m.Accounts),
                data: { breadcrumb: 'Accounts' }
            },
            {
                path: 'account-group',
                loadComponent: () =>
                    import('./pages/omni/account-groups/account-groups').then(m => m.AccountGroups),
                data: { breadcrumb: 'Accounts Group' }
            },
            {
                path: 'settings/:id',
                loadComponent: () => import('./pages/omni/account-groups/accountgroup-settings/accountgroup-settings').then(m => m.AccountgroupSettings),
                data: { breadcrumb: 'Inbound Settings' }
            },
            {
                path: 'users',
                loadComponent: () =>
                    import('./pages/omni/users/users').then(m => m.Users),
                data: { breadcrumb: 'Users' }
            },
            {
                path: 'transactions',
                loadComponent: () =>
                    import('./pages/omni/transactions/transactions').then(m => m.Transactions),
                data: { breadcrumb: 'Transactions' }
            },
            {
                path: 'did-orders',
                loadComponent: () =>
                    import('./pages/omni/did-orders/did-orders').then(m => m.DidOrders),
                data: { breadcrumb: 'DID Orders' }
            },
            {
                path: 'state-call-time',
                loadComponent: () =>
                    import('./pages/omni/statecall-times/statecall-times').then(m => m.StatecallTimes),
                data: { breadcrumb: 'State Call Times' }
            },

            // Logs

            {
                path: 'member-logs',
                loadComponent: () =>
                    import('./pages/logs/member-logs/member-logs').then(m => m.MemberLogs),
                data: { breadcrumb: 'Member Logs' }
            },
            {
                path: 'release-logs',
                loadComponent: () =>
                    import('./pages/logs/release-logs/release-logs').then(m => m.ReleaseLogs),
                data: { breadcrumb: 'Release Logs' }
            },
            {
                path: 'system-status-log',
                loadComponent: () =>
                    import('./pages/logs/system-status-logs/system-status-logs').then(m => m.SystemStatusLogs),
                data: { breadcrumb: 'System Status Logs' }
            },
            {
                path: 'did-logs',
                loadComponent: () =>
                    import('./pages/logs/did-logs/did-logs').then(m => m.DidLogs),
                data: { breadcrumb: 'DID Logs' }
            },

            //Products

            {
                path: 'products',
                loadComponent: () =>
                    import('./pages/product/products/products').then(m => m.Products),
                data: { breadcrumb: 'Products' }
            },

            {
                path: 'features',
                loadComponent: () =>
                    import('./pages/product/features/features').then(m => m.Features),
                data: { breadcrumb: 'Features' }
            },
            {
                path: 'component',
                loadComponent: () =>
                    import('./pages/product/product-component/product-component').then(m => m.ProductComponent),
                data: { breadcrumb: 'Product Component' }
            },

            {
                path: 'add-ons',
                loadComponent: () =>
                    import('./pages/product/add-ons/add-ons').then(m => m.AddOns),
                data: { breadcrumb: 'Add-ons' }
            },

            //Tools


            {
                path: 'active-defense-accounts',
                loadComponent: () =>
                    import('./pages/tools/active-defense/active-defense').then(m => m.ActiveDefense),
                data: { breadcrumb: 'Active Defense Accounts' }
            },

            {
                path: 'emergency-transfer',
                loadComponent: () =>
                    import('./pages/tools/emergency-transfer/emergency-transfer').then(m => m.EmergencyTransfer),
                data: { breadcrumb: 'Emergency Transfer' }
            },

            {
                path: 'extension',
                loadComponent: () =>
                    import('./pages/tools/extension-search/extension-search').then(m => m.ExtensionSearch),
                data: { breadcrumb: 'Extension Search' }
            },
            {
                path: 'redis-search',
                loadComponent: () =>
                    import('./pages/tools/redis-search/redis-search').then(m => m.RedisSearch),
                data: { breadcrumb: 'Redis Logs' }
            },
            {
                path: 'cron-manager',
                loadComponent: () =>
                    import('./pages/tools/cron-manager/cron-manager').then(m => m.CronManager),
                data: { breadcrumb: 'Cron Manager' }
            },
            {
                path: 'sms-rates',
                loadComponent: () =>
                    import('./pages/tools/provider-rates/provider-rates').then(m => m.ProviderRates),
                data: { breadcrumb: 'Provider Rates' }
            },

            {
                path: 'component-description',
                loadComponent: () =>
                    import('./pages/tools//billing-component/billing-component').then(m => m.BillingComponent),
                data: { breadcrumb: 'Billing Product Component' }
            },

            {
                path: 'acl',
                loadComponent: () =>
                    import('./pages/tools/omni-acl/omni-acl').then(m => m.OmniAcl),
                data: { breadcrumb: 'ACL Rules' }
            },

            {
                path: 'field-description',
                loadComponent: () =>
                    import('./pages/tools/omni-field/omni-field').then(m => m.OmniField),
                data: { breadcrumb: 'Field Descriptions' }
            },

            {
                path: 'cdr-compare',
                loadComponent: () =>
                    import('./pages/tools/cdr-compare/cdr-compare').then(m => m.CdrCompare),
                data: { breadcrumb: 'CDR Compare' }
            },

            {
                path: 'database-statuses',
                data: {
                    breadcrumb: 'Database Statuses',
                    tabs: [
                        { title: 'Database Statuses', path: 'database-statuses' },
                        { title: 'Locked Queries', path: 'queries' }
                    ]
                },
                children: [
                    {
                        path: 'database-statuses',
                        loadComponent: () =>
                            import('./pages/tools/database-statuses/database-statuses/database-statuses')
                                .then(m => m.DatabaseStatuses),
                        // data: { breadcrumb: '' }
                    },
                    {
                        path: 'queries',
                        loadComponent: () =>
                            import('./pages/tools/database-statuses/locked-queries/locked-queries')
                                .then(m => m.LockedQueries),
                        data: { breadcrumb: 'Locked Queries' }
                    },
                    { path: '', pathMatch: 'full', redirectTo: 'database-statuses' }
                ]
            },
            {
                path: 'email-lists',
                loadComponent: () =>
                    import('./pages/tools/email-lists/email-lists').then(m => m.EmailLists),
                data: { breadcrumb: 'Email Lists' }
            },
            {
                path: 'clusters-odometer',
                loadComponent: () =>
                    import('./pages/tools/clusters-odometer/clusters-odometer').then(m => m.ClustersOdometer),
                data: { breadcrumb: 'Clusters Odometer' }
            },
            {
                path: 'va-project-pool',
                loadComponent: () =>
                    import('./pages/tools/va-project/va-project').then(m => m.VaProject),
                data: { breadcrumb: 'VA Project' }
            },
            {
                path: 'vendors',
                loadComponent: () =>
                    import('./pages/tools/vendors/vendors').then(m => m.Vendors),
                data: { breadcrumb: 'Vendors' }
            },

            {
                path: 'statetracker',
                loadComponent: () =>
                    import('./pages/tools/state-tracker/state-tracker').then(m => m.StateTracker),
                data: { breadcrumb: 'Global StateTracker Rules' }
            },

            {
                path: 'tools',
                data: {
                    breadcrumb: 'Tools',
                    tabs: [
                        { title: 'Main', path: 'main' },
                        { title: 'Lerg ', path: 'lerg' },
                        { title: 'NPANXX ', path: 'NPANXX' },
                        { title: 'ZipCodes', path: 'zipCodes' }
                    ]
                },
                children: [
                    {
                        path: 'main',
                        loadComponent: () =>
                            import('./pages/tools/main/main')
                                .then(m => m.Main),
                        data: { breadcrumb: 'Main' }
                    },
                    {
                        path: 'lerg',
                        loadComponent: () =>
                            import('./pages/tools/main/lerg-update/lerg-update')
                                .then(m => m.LergUpdate),
                        data: { breadcrumb: 'Lerg Update' }
                    },
                    {
                        path: 'NPANXX',
                        loadComponent: () =>
                            import('./pages/tools/main/npanxx-update/npanxx-update')
                                .then(m => m.NpanxxUpdate),
                        data: { breadcrumb: 'NPANXX Update' }
                    },
                    {
                        path: 'zipCodes',
                        loadComponent: () =>
                            import('./pages/tools/main/zipcodes-update/zipcodes-update')
                                .then(m => m.ZipcodesUpdate),
                        data: { breadcrumb: 'ZipCodes Update ' }
                    },
                    { path: '', pathMatch: 'full', redirectTo: 'main' }
                ]
            },
            {
                path: 'feature-flags',
                loadComponent: () =>
                    import('./pages/tools/feature-flags/feature-flags').then(m => m.FeatureFlags),
                data: { breadcrumb: 'Feature Flags' }
            },
            {
                path: 'blacklist-dids',
                loadComponent: () =>
                    import('./pages/tools/blacklist-management/blacklist-management').then(m => m.BlacklistManagement),
                data: { breadcrumb: 'Blacklist' }
            },

            {
                path: 'did_next_gen_ai',
                data: {
                    breadcrumb: 'DID Next Gen AI',
                    tabs: [
                        { title: 'Versions', path: 'versions' },
                        { title: 'Features ', path: 'features' },
                    ]
                },
                children: [
                    {
                        path: 'versions',
                        loadComponent: () =>
                            import('./pages/tools/did-nextgen/versions/versions')
                                .then(m => m.Versions),
                        data: { breadcrumb: 'Versions' }
                    },
                    {
                        path: 'features',
                        loadComponent: () =>
                            import('./pages/tools/did-nextgen/features/features')
                                .then(m => m.Features),
                        data: { breadcrumb: 'Features' }
                    },
                    { path: '', pathMatch: 'full', redirectTo: 'versions' }
                ]
            },
            {
                path: 'oauth_client',
                loadComponent: () =>
                    import('./pages/tools/oauth-client/oauth-client').then(m => m.OauthClient),
                data: { breadcrumb: 'OAuth Clients' }
            },
            {
                path: 'dno-tools',
                loadComponent: () =>
                    import('./pages/tools/dno-tool/dno-tool').then(m => m.DnoTool),
                data: { breadcrumb: 'DNO List' }
            },
            {
                path: 'purpose',
                loadComponent: () =>
                    import('./pages/tools/purpose/purpose').then(m => m.Purpose),
                data: { breadcrumb: 'Purpose' }
            },
            {
                path: 'sinch-order-queue',
                loadComponent: () =>
                    import('./pages/tools/sinch-order/sinch-order').then(m => m.SinchOrder),
                data: { breadcrumb: 'Sinch Order Queue' }
            },
            {
                path: 'reputation-check-csv-file',
                loadComponent: () =>
                    import('./pages/tools/repcheck-csvfile/repcheck-csvfile').then(m => m.RepcheckCsvfile),
                data: { breadcrumb: 'Reputation Check CSV upload' }
            },
            {
                path: 'reputation-check',
                loadComponent: () =>
                    import('./pages/tools/reputation-check/reputation-check').then(m => m.ReputationCheck),
                data: { breadcrumb: 'Reputation Check' }
            },
            {
                path: 'billing-invoice-verification-report',
                loadComponent: () =>
                    import('./pages/tools/billing-invoice/billing-invoice').then(m => m.BillingInvoice),
                data: { breadcrumb: 'Billing Invoice Verification Report' }
            },
            {
                path: 'billing-tax-report',
                loadComponent: () =>
                    import('./pages/tools/billing-tax/billing-tax').then(m => m.BillingTax),
                data: { breadcrumb: 'Billing Tax Report' }
            },

            {
                path: 'disposition-delays',
                loadComponent: () =>
                    import('./pages/tools/disposition-delays/disposition-delays').then(m => m.DispositionDelays),
                data: { breadcrumb: 'Disposition Delays' }
            },

            {
                path: 'npanxx-upload',
                loadComponent: () =>
                    import('./pages/tools/npanxx-upload/npanxx-upload').then(m => m.NpanxxUpload),
                data: { breadcrumb: 'NPANXX Upload' }
            },

            {
                path: 'split-tables',
                loadComponent: () =>
                    import('./pages/tools/split-tables/split-tables').then(m => m.SplitTables),
                data: { breadcrumb: 'Split Tables' }
            },
            {
                path: 'omni-dids',
                loadComponent: () =>
                    import('./pages/tools/omni-dids/omni-dids').then(m => m.OmniDids),
                data: { breadcrumb: 'Omni DIDs' }
            },

            {
                path: 'mfa-tools',
                loadComponent: () =>
                    import('./pages/tools/mfa-tools/mfa-tools').then(m => m.MfaTools),
                data: { breadcrumb: 'MFA Tools' }
            },


            //Reports

            {
                path: 'report-management',
                loadComponent: () =>
                    import('./pages/reports/metabase-reports/metabase-reports').then(m => m.MetabaseReports),
                data: { breadcrumb: 'Metabase Report Settings' }
            },









        ]
    }
];
