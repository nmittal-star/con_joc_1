import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { accounts } from './omni/accounts/mocks/accounts.mock';
import { accountgroups } from './omni/account-groups/mocks/account-groups.mocks';
import { users } from './omni/users/mocks/users.mock';
import { statecall } from './omni/statecall-times/mocks/statecall-times.mock';
import { transactions } from './omni/transactions/mocks/transactions.mock';
import { memberlogs } from './logs/member-logs/mocks/member-logs.mock';
import { releaselogs } from './logs/release-logs/mocks/release-logs.mock';
import { didorders } from './omni/did-orders/mocks/did-orders.mock';
import { systemstatuslogs } from './logs/system-status-logs/mocks/system-status-logs.mock';
import { didlogs } from './logs/did-logs/mocks/did-logs.mock';
import { products } from './product/products/mocks/products.mocks';
import { features } from './product/features/mocks/features.mock';
import { productcomponent } from './product/product-component/mocks/product-component.mock';
import { addons } from './product/add-ons/mocks/add-ons.mock';
import { extensionsearch } from './tools/extension-search/mocks/extension-search.mock';
import { redissearch } from './tools/redis-search/mocks/redis-search.mock';
import { cronmanager } from './tools/cron-manager/mocks/cron-manager.mock';
import { providerrates } from './tools/provider-rates/mocks/provider-rates.mock';
import { omnifield } from './tools/omni-field/mocks/omni-field.mock';
import { omniacl } from './tools/omni-acl/mocks/omni-acl.mock';
import { billingcomponent } from './tools/billing-component/mocks/billing-component.mock';
import { emaillists } from './tools/email-lists/mocks/email-lists.mock';
import { vaproject } from './tools/va-project/mocks/va-project.mock';
import { clusters } from './tools/clusters-odometer/mocks/clusters-odometer.mock';
import { vendors } from './tools/vendors/mocks/vendors.mock';
import { statetracker } from './tools/state-tracker/mocks/state-tracker.mock';
import { featureflags } from './tools/feature-flags/mocks/feature-flags.mock';
import { blacklist } from './tools/blacklist-management/mocks/blacklist-management.mock';
import { versions } from './tools/did-nextgen/versions/mocks/versions.mock';
import { featuresettings } from './tools/did-nextgen/features/mocks/features.mock';
import { oauthclient } from './tools/oauth-clients/mocks/oauth-clients.mock';
import { activedefense } from './tools/active-defense/mocks/active-defense.mock';
import { dnotools } from './tools/dno-tools/mocks/dno-tools.mock';
import { purpose } from './tools/purpose/mocks/purpose.mock';
import { sinchorder } from './tools/sinch-order/mocks/sinch-order.mock';
import { repcheckcsvfile } from './tools/repcheck-csvfile/mocks/repcheck-csvfile.mock';
import { metabasereports } from './reports/metabase-reports/mocks/metabas-reports.mock';
import { databasestatuses } from './tools/database-statuses/database-statuses/mocks/database-statuses.mock';
import { dispositiondelays } from './tools/disposition-delays/mocks/disposition-delays.mock';
import { npanxxupload } from './tools/npanxx-upload/mock/npanxx-upload.mock';
import { omnidids } from './tools/omni-dids/mocks/omni-dids.mock';

@Injectable({
  providedIn: 'root'
})

export class MockDataService implements InMemoryDbService {
    // createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    //     throw new Error('Method not implemented.');
    // }

    createDb() {
    return {accounts,accountgroups,users,transactions,didorders,statecall,memberlogs,releaselogs,systemstatuslogs,didlogs,products,features,productcomponent,addons,extensionsearch,redissearch,cronmanager,providerrates,omnifield,omniacl,billingcomponent,emaillists,vaproject,clusters,vendors,statetracker,featureflags,blacklist,versions,featuresettings,oauthclient,activedefense,dnotools,purpose,sinchorder,repcheckcsvfile,metabasereports,databasestatuses,dispositiondelays,npanxxupload,omnidids}
    }
}