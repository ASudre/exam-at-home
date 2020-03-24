import React from 'react';

const FileInput = React.forwardRef(({ setFile, fileType = 'image/png' }, ref) => (
  <input
    hidden
    ref={ref}
    type="file" accept={fileType}
    onChange={(e) => { setFile(e.target.files[0]); }}
  />
));

export default FileInput;
