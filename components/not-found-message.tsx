'use client';

import { useQueryState, parseAsString } from 'nuqs';
import React from 'react';

const NotFoundMessage = ({ message }: { message: string }) => {
  const [error] = useQueryState('error', parseAsString);

  return <p>{error ? error : message}</p>;
};

export default NotFoundMessage;
