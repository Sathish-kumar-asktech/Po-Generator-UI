import React from 'react';
// import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import CardHeader from '@material-ui/core/CardHeader';

const ComapnyProfile = (Customer, honame) => {
  // const styles = useContainedCardHeaderStyles();
  return (
    <CardHeader
      // classes={styles}
      title={Customer}
      subheader={honame}
    />
  );
};

export default ComapnyProfile;
