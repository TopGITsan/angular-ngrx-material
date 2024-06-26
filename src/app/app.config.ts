import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { routes } from './app.routes';
import { InMemoryDataService } from './shared/services/in-memory-data/in-memory-data-service';
import { BookmarksEffects } from './store/bookmarks/bookmarks.effects';
import * as bookmarksStore from './store/bookmarks/bookmarks.facade';
import * as globalStore from './store/global.store.facade';
import { CustomRouterStateSerializer } from './store/router/custom-router-state.serializer';
import * as routerEffects from './store/router/router.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
        dataEncapsulation: false,
        passThruUnknownUrl: true,
        put204: false,
      }),
    ),
    provideStore(globalStore.reducers, {
      metaReducers: globalStore.metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideState(bookmarksStore.bookmarksFeatureKey, bookmarksStore.reducers, {
      metaReducers: bookmarksStore.metaReducers,
    }),
    provideEffects(BookmarksEffects, routerEffects),
    provideRouterStore({ serializer: CustomRouterStateSerializer }),
  ],
};
