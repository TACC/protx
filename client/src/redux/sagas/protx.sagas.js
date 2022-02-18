import { all, call, put, takeLeading } from 'redux-saga/effects';
import { fetchUtil } from '../../utils/fetchUtil';

// REDUCERS.

export function* fetchProtx(action) {
  yield put({ type: 'PROTX_INIT' });
  try {
    const {
      maltreatment,
      demographics,
      texasBoundary,
      display,
      resources
    } = yield all({
      maltreatment: call(fetchUtil, {
        url: `/api/protx/maltreatment/`
      }),
      demographics: call(fetchUtil, {
        url: `/api/protx/demographics/`
      }),
      texasBoundary: call(fetchUtil, {
        url: `/data-static/Texas_State_Boundary.geojson`
      }),
      display: call(fetchUtil, {
        url: `/api/protx/display/`
      }),
      resources: call(fetchUtil, {
        url: `/api/protx/resources/`
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
        resources: resources.resources,
        resourcesMeta: resources.display
      }
    });
  } catch (error) {
    yield put({
      type: 'PROTX_FAILURE'
    });
  }
}

// export function* fetchProtxAnalyticsDistribution(action) {
//   yield put({ type: 'PROTX_MALTREATMENT_DISTRIBUTION_INIT' });
//   try {
//     const data = yield call(fetchUtil, {
//       url: `/api/protx/analytics-plot-distribution/${action.payload.area}/${action.payload.selectedArea}/${action.payload.variable}/${action.payload.unit}/`
//     });
//     yield put({
//       type: 'PROTX_ANALYITCS_DISTRIBUTION_SUCCESS',
//       payload: {
//         data: data.result
//       }
//     });
//   } catch (error) {
//     yield put({
//       type: 'PROTX_ANALYITCS_DISTRIBUTION_FAILURE'
//     });
//   }
// }

export function* fetchProtxDemographicsDistribution(action) {
  yield put({ type: 'PROTX_DEMOGRAPHICS_DISTRIBUTION_INIT' });
  try {
    const data = yield call(fetchUtil, {
      url: `/api/protx/demographics-plot-distribution/${action.payload.area}/${action.payload.selectedArea}/${action.payload.variable}/${action.payload.unit}/`
    });
    yield put({
      type: 'PROTX_DEMOGRAPHICS_DISTRIBUTION_SUCCESS',
      payload: {
        data: data.result
      }
    });
  } catch (error) {
    yield put({
      type: 'PROTX_DEMOGRAPHICS_DISTRIBUTION_FAILURE'
    });
  }
}

// export function* fetchProtxMaltreatmentDistribution(action) {
//   yield put({ type: 'PROTX_MALTREATMENT_DISTRIBUTION_INIT' });
//   try {
//     const data = yield call(fetchUtil, {
//       url: `/api/protx/maltreatment-plot-distribution/${action.payload.area}/${action.payload.selectedArea}/${action.payload.variable}/${action.payload.unit}/`
//     });
//     yield put({
//       type: 'PROTX_MALTREATMENT_DISTRIBUTION_SUCCESS',
//       payload: {
//         data: data.result
//       }
//     });
//   } catch (error) {
//     yield put({
//       type: 'PROTX_MALTREATMENT_DISTRIBUTION_FAILURE'
//     });
//   }
// }

// DISPATCH EVENT WATCHES.

export function* watchProtx() {
  yield takeLeading('FETCH_PROTX', fetchProtx);
}

// export function* watchProtxAnalyticsDistribution() {
//   yield takeLeading(
//     'FETCH_PROTX_ANALYTICS_DISTRIBUTION',
//     fetchProtxAnalyticsDistribution
//   );
// }

export function* watchProtxDemographicsDistribution() {
  yield takeLeading(
    'FETCH_PROTX_DEMOGRAPHICS_DISTRIBUTION',
    fetchProtxDemographicsDistribution
  );
}

// export function* watchProtxMaltreatmentDistribution() {
//   yield takeLeading(
//     'FETCH_PROTX_MALTREATMENT_DISTRIBUTION',
//     fetchProtxMaltreatmentDistribution
//   );
// }
