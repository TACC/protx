import React from 'react';
import DataFilesPreviewModal from './DataFilesPreviewModal';
import DataFilesMoveModal from './DataFilesMoveModal';
import DataFilesUploadModal from './DataFilesUploadModal';
import DataFilesMkdirModal from './DataFilesMkdirModal';
import DataFilesRenameModal from './DataFilesRenameModal';
import DataFilesPushKeysModal from './DataFilesPushKeysModal';
import DataFilesCopyModal from './DataFilesCopyModal';

export default function DataFilesModals() {
  return (
    <>
      <DataFilesPreviewModal />
      <DataFilesMoveModal />
      <DataFilesCopyModal />
      <DataFilesUploadModal />
      <DataFilesMkdirModal />
      <DataFilesRenameModal />
      <DataFilesPushKeysModal />
    </>
  );
}
