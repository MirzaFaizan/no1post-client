import React from 'react';
import PropTypes from 'prop-types';

const FileUpload = ({
  name,
  label,
  accept,
  onUpload,
  className,
}) => {
  const handleUpload = (event) => {
    const [file] = event.target.files;

    if (onUpload) {
      onUpload(file);
    }
  };

  return (
    <>
      <label
        htmlFor={name}
        className="cursor-pointer"
      >
        {label}
        <input
          id={name}
          type="file"
          name={name}
          accept={accept}
          className={className}
          onChange={handleUpload}
        />
      </label>
    </>
  );
};

FileUpload.defaultProps = {
  name: '',
  accept: '',
  label: null,
  className: '',
  onUpload: null,
};

FileUpload.propTypes = {
  label: PropTypes.node,
  name: PropTypes.string,
  accept: PropTypes.string,
  onUpload: PropTypes.func,
  className: PropTypes.string,
};

export default FileUpload;
