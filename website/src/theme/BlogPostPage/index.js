import React from 'react';
import BlogPostPage from '@theme-original/BlogPostPage';
import Carbon from '@site/src/components/Carbon';

export default function BlogPostPageWrapper(props) {
  return (
    <>
      <Carbon querySelector="header" />
      <BlogPostPage {...props} />
    </>
  );
}
