import React, { useEffect } from 'react';
import DocItem from '@theme-original/DocItem';
import Carbon from '@site/src/components/Carbon';

export default function DocItemWrapper(props) {
  return (
    <>
      <Carbon />
      <DocItem {...props} />
    </>
  );
}
