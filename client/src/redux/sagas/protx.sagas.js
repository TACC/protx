import { call, put, takeLeading } from 'redux-saga/effects';
import { fetchUtil } from '../../utils/fetchUtil';

export function* fetchProtx(action) {
  yield put({ type: 'PROTX_INIT' });
  try {
    const observedFeatures = yield call(fetchUtil, {
      url: `/static/data/2019_observed_features.json`
    });
    const observedFeaturesMeta = yield call(fetchUtil, {
      url: `/static/data/2019_observed_features.meta.json`
    });
    const maltreatment = yield call(fetchUtil, {
      url: `/static/data/public_county_maltreatment_table_grouped.json`
    });
    const maltreatmentMeta = yield call(fetchUtil, {
      url: `/static/data/public_county_maltreatment_table_grouped.meta.json`
    });
    const texasBoundary = yield call(fetchUtil, {
      url: `/static/data/Texas_State_Boundary.geojson`
    });
    yield put({
      type: 'PROTX_SUCCESS',
      payload: {
        observedFeatures,
        observedFeaturesMeta,
        maltreatment,
        maltreatmentMeta,
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
