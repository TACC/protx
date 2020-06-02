import { all } from 'redux-saga/effects';
import { watchJobs } from './jobs.sagas';
import watchApps from './apps.sagas';
import watchSystems from './systems.sagas';
import {
  watchFetchSystems,
  watchFetchFiles,
  watchFetchFilesModal,
  watchPushKeys,
  watchScrollFiles,
  watchRename,
  watchMove,
  watchCopy,
  watchUpload,
  watchPreview,
  watchMkdir,
  watchDownload,
  watchTrash
} from './datafiles.sagas';
import watchAllocations from './allocations.sagas';
import watchSystemMonitor from './systemMonitor.sagas';
import watchProfile from './profile.sagas';
import {
  watchTicketListFetch,
  watchTicketDetailedView,
  watchTicketDetailedViewFetchHistory,
  watchTicketDetailedViewFetchSubject,
  watchPostTicketReply,
  watchPostTicketCreate
} from './tickets.sagas';
import { watchAuthenticatedUser } from './authenticated_user.sagas';

export default function* rootSaga() {
  yield all([
    watchJobs(),
    watchFetchSystems(),
    watchPushKeys(),
    watchFetchFiles(),
    watchFetchFilesModal(),
    watchScrollFiles(),
    watchRename(),
    watchMove(),
    watchCopy(),
    watchUpload(),
    watchPreview(),
    watchMkdir(),
    watchDownload(),
    watchTrash(),
    ...watchAllocations,
    watchApps(),
    watchSystems(),
    watchSystemMonitor(),
    watchPostTicketReply(),
    ...watchProfile,
    watchTicketListFetch(),
    watchTicketDetailedView(),
    watchTicketDetailedViewFetchHistory(),
    watchTicketDetailedViewFetchSubject(),
    watchPostTicketReply(),
    watchPostTicketCreate(),
    watchAuthenticatedUser()
  ]);
}