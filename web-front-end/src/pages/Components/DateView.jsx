import React from 'react';
import moment from 'moment';

function DateView({date}) {
  
  const formattedDate = moment(date).utcOffset('+07:00').format('DD-MM-YYYY HH:mm:ss');

  return <>{formattedDate}</>;
}

export default DateView;