import React from 'react';
import { browserHistory } from 'react-router-dom';
const FooterButtons = (props) => {
  const { submitLabel } = props;
  return (
    <div className="right">
      <button type="submit" className="btn btn-primary">{submitLabel || 'Submit'}</button>
    </div>
  );
};

export default FooterButtons;
