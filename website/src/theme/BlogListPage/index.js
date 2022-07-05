import React from 'react';
import BlogListPage from '@theme-original/BlogListPage';
import Carbon from '@site/src/components/Carbon';

export default function BlogListPageWrapper(props) {
  return (
    <>
      <Carbon querySelector="ul.clean-list" />
      <BlogListPage {...props} />
    </>
  );
}
