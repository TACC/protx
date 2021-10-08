import { all, call, put, takeLeading } from 'redux-saga/effects';
import { fetchUtil } from '../../utils/fetchUtil';

export function* fetchProtx(action) {
  yield put({ type: 'PROTX_INIT' });
  try {
    const { maltreatment, demographics, texasBoundary, display } = yield all({
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
        display
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
