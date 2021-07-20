import { all, call, put, takeLeading } from 'redux-saga/effects';
import { fetchUtil } from '../../utils/fetchUtil';

export function* fetchProtx(action) {
  yield put({ type: 'PROTX_INIT' });
  try {
    const {
      observedFeatures,
      observedFeaturesMeta,
      maltreatment,
      maltreatmentMeta,
      texasBoundary
    } = yield all({
      observedFeatures: call(fetchUtil, {
        url: `/static/data/2019_observed_features.json`
      }),
      observedFeaturesMeta: call(fetchUtil, {
        url: `/static/data/2019_observed_features.meta.json`
      }),
      maltreatment: call(fetchUtil, {
        url: `/static/data/public_county_maltreatment_table_grouped.json`
      }),
      maltreatmentMeta: call(fetchUtil, {
        url: `/static/data/public_county_maltreatment_table_grouped.meta.json`
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
