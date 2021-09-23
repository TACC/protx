import { all, call, put, takeLeading } from 'redux-saga/effects';
import { fetchUtil } from '../../utils/fetchUtil';

export function* fetchProtx(action) {
  yield put({ type: 'PROTX_INIT' });
  try {
    const {
      observedFeatures,
      observedFeaturesMeta,
      maltreatment,
      texasBoundary
    } = yield all({
      maltreatment: call(fetchUtil, {
        url: `/api/protx/maltreatment`
      }),
      observedFeatures: call(fetchUtil, {
        url: `/static/data/2019_observed_features.json`
      }),
      observedFeaturesMeta: call(fetchUtil, {
        url: `/static/data/2019_observed_features.meta.json`
      }),
      texasBoundary: call(fetchUtil, {
        url: `/static/data/Texas_State_Boundary.geojson`
      })
    });
    yield put({
      type: 'PROTX_SUCCESS',
      payload: {
        observedFeatures,
        observedFeaturesMeta,
        maltreatment: maltreatment.maltreatment,
        texasBoundary
      }
    });
  } catch (error) {
    yield put({
      type: 'PROTX_FAILURE'
    });
  }
}

export function* watchProtx() {
  yield takeLeading('FETCH_PROTX', fetchProtx);
}
