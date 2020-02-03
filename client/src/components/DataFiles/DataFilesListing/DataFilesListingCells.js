import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckSquare,
  faSquare as filledSquare
} from '@fortawesome/free-solid-svg-icons';
import {
  faSquare,
  faFolder,
  faFile
} from '@fortawesome/free-regular-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import './DataFilesListingCells.scss';

export const CheckboxCell = React.memo(({ index }) => {
  const selected = useSelector(state =>
    state.files.selected.FilesListing.includes(index)
  );
  return (
    <>
      <span className="fa-layers fa-fw">
        <FontAwesomeIcon icon={filledSquare} size="lg" color="white" />
        <FontAwesomeIcon
          icon={selected ? faCheckSquare : faSquare}
          size="lg"
          color="#9D85EF"
        />
      </span>
    </>
  );
});
CheckboxCell.propTypes = {
  index: PropTypes.number.isRequired
};

export const FileNavCell = React.memo(
  ({ system, path, name, format, api, scheme, href }) => {
    const dispatch = useDispatch();
    const previewCallback = e => {
      e.stopPropagation();
      e.preventDefault();
      dispatch({
        type: 'DATA_FILES_TOGGLE_MODAL',
        payload: {
          operation: 'preview',
          props: { api, scheme, system, path, name, href }
        }
      });
    };

    return (
      <>
        <span className="data-files-name">
          <Link
            className="data-files-nav-link"
            to={`/workbench/data/${api}/${scheme}/${system}${path}/`}
            onClick={format !== 'folder' ? previewCallback : null}
          >
            {name}
          </Link>
        </span>
      </>
    );
  }
);
FileNavCell.propTypes = {
  system: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
  api: PropTypes.string.isRequired,
  scheme: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};

export const FileLengthCell = ({ cell }) => {
  const bytes = cell.value;
  const units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
  const number = bytes === 0 ? 0 : Math.floor(Math.log(bytes) / Math.log(1024));
  const bytesString = (bytes / 1024 ** Math.floor(number)).toFixed(1);

  return (
    <span>
      {bytesString} {units[number]}
    </span>
  );
};
FileLengthCell.propTypes = {
  cell: PropTypes.shape({ value: PropTypes.number }).isRequired
};

export const LastModifiedCell = ({ cell }) => {
  const date = new Date(cell.value);
  const dateString = date.toLocaleDateString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const timeString = date.toLocaleTimeString(undefined, {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });
  return (
    <span>
      {dateString} {timeString}
    </span>
  );
};
LastModifiedCell.propTypes = {
  cell: PropTypes.shape({ value: PropTypes.string }).isRequired
};

export const FileIconCell = ({ cell }) => {
  if (cell.value === 'folder') {
    return <FontAwesomeIcon icon={faFolder} />;
  }
  return <FontAwesomeIcon icon={faFile} />;
};
FileIconCell.propTypes = {
  cell: PropTypes.shape({ value: PropTypes.string }).isRequired
};
