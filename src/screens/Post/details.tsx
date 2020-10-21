import React from 'react';
import { DetailedTwitt } from '../../components/Post/detailedTwitt';

export const Details = (props) => {
  return <DetailedTwitt {...props.route.params} />;
};
