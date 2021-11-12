import { all, call, put, takeLeading } from 'redux-saga/effects';
import { fetchUtil } from '../../utils/fetchUtil';

export function* fetchProtx(action) {
  yield put({ type: 'PROTX_INIT' });
  try {
    const { maltreatment, demographics, texasBoundary, display, resources } = yield all({
      maltreatment: call(fetchUtil, {
        url: `/api/protx/maltreatment`
      }),
      demographics: call(fetchUtil, {
        url: `/api/protx/demographics`
      }),
      texasBoundary: call(fetchUtil, {
        url: `/data-static/Texas_State_Boundary.geojson`
      }),
      display: call(fetchUtil, {
        url: `/api/protx/display`
      }),
      resources: call(fetchUtil, {
        url: `/api/protx/resources`
      })
    });
    yield put({
      type: 'PROTX_SUCCESS',
      payload: {
        observedFeatures: demographics.data,
        observedFeaturesMeta: demographics.meta,
        maltreatment: maltreatment.data,
        maltreatmentMeta: maltreatment.meta,
        texasBoundary,
        display,
        resources
      }
    });
  } catch (error) {
    yield put({
      type: 'PROTX_FAILURE'
    });
  }
}

export function* fetchProtxDemographicDistribution(action) {
  yield put({ type: 'PROTX_DEMOGRAPHIC_DISTRIBUTION_INIT' });
  try {
    const data = yield call(fetchUtil, {
      url: `/api/protx/demographics-plot-distribution/${action.payload.area}/${action.payload.variable}/${action.payload.unit}/`
    });
    yield put({
      type: 'PROTX_DEMOGRAPHIC_DISTRIBUTION_SUCCESS',
      payload: {
        data: data.result
      }
    });
  } catch (error) {
    yield put({
      type: 'PROTX_DEMOGRAPHIC_DISTRIBUTION_FAILURE'
    });
  }
}

export function* watchProtx() {
  yield takeLeading('FETCH_PROTX', fetchProtx);
}

export function* watchProtxDemographicDistribution() {
  yield takeLeading(
    'FETCH_PROTX_DEMOGRAPHIC_DISTRIBUTION',
    fetchProtxDemographicDistribution
  );
}
