import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useHistory, useLocation } from 'react-router-dom';
import uuidv4 from 'uuid/v4';

import DataFilesBreadcrumbs from '../DataFilesBreadcrumbs/DataFilesBreadcrumbs';
import DataFilesModalListingTable from './DataFilesModalTables/DataFilesModalListingTable';
import DataFilesModalSelectedTable from './DataFilesModalTables/DataFilesModalSelectedTable';

const DataFilesCopyModal = React.memo(() => {
  const history = useHistory();
  const location = useLocation();
  const reloadPage = () => {
    history.push(location.pathname);
  };

  const dispatch = useDispatch();
  const params = useSelector(
    state => state.files.params.FilesListing,
    shallowEqual
  );
  const modalParams = useSelector(
    state => state.files.params.modal,
    shallowEqual
  );
  const files = useSelector(state => state.files.listing.modal, shallowEqual);
  const isOpen = useSelector(state => state.files.modals.copy);
  const status = useSelector(state => state.files.operationStatus.copy);

  const selectedFiles = useSelector(
    state =>
      state.files.selected.FilesListing.map(i => ({
        ...state.files.listing.FilesListing[i],
        id: uuidv4()
      })),
    () => true
  );
  const selected = useMemo(() => selectedFiles, [isOpen]);

  const toggle = () =>
    dispatch({
      type: 'DATA_FILES_TOGGLE_MODAL',
      payload: { operation: 'copy', props: {} }
    });

  const onOpened = () => {
    dispatch({
      type: 'FETCH_FILES',
      payload: { ...params, section: 'modal' }
    });
  };

  const onClosed = () => {
    dispatch({ type: 'DATA_FILES_MODAL_CLOSE' });
    dispatch({
      type: 'DATA_FILES_SET_OPERATION_STATUS',
      payload: { operation: 'copy', status: {} }
    });
  };

  const copyCallback = useCallback(
    (system, path) => {
      const filteredSelected = selected.filter(f => status[f.id] !== 'SUCCESS');
      dispatch({
        type: 'DATA_FILES_COPY',
        payload: {
          dest: { system, path },
          src: filteredSelected,
          reloadCallback: reloadPage
        }
      });
    },
    [selected, reloadPage]
  );

  return (
    <Modal
      isOpen={isOpen}
      onOpened={onOpened}
      onClosed={onClosed}
      toggle={toggle}
      size="xl"
    >
      <ModalHeader toggle={toggle}>
        Moving {selected.length} File(s)
      </ModalHeader>
      <ModalBody style={{ paddingTop: '0px', height: '70vh' }}>
        <div className="row h-100">
          <div className="col-md-6 d-flex flex-column">
            {/* Table of selected files */}
            <div>
              <DataFilesBreadcrumbs
                api={params.api}
                scheme={params.scheme}
                system={params.system}
                path={params.path || '/'}
                section=""
              />
            </div>
            <div style={{ paddingTop: '0px', flexGrow: '1' }}>
              <DataFilesModalSelectedTable data={selected} operation="copy" />
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column">
            <div>
              <DataFilesBreadcrumbs
                api={modalParams.api}
                scheme={modalParams.scheme}
                system={modalParams.system}
                path={modalParams.path || '/'}
                section="modal"
              />
            </div>
            <div style={{ paddingTop: '0px', flexGrow: '1' }}>
              <DataFilesModalListingTable
                data={files}
                operationName="Copy"
                operationCallback={copyCallback}
              />
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={() => copyCallback(modalParams.system, modalParams.path)}
          className="data-files-btn"
        >
          Copy to {modalParams.path || '/'}
        </Button>
        <Button
          color="secondary"
          className="data-files-btn-cancel"
          onClick={toggle}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
});

export default DataFilesCopyModal;
