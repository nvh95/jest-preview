# Vite Migration for Jest Preview Server

## Overview

This document describes the migration of the Jest Preview server from using a custom HTTP server with WebSockets to using Vite's JavaScript API. The migration enhances the development experience with improved hot module replacement (HMR) and better asset handling.

## Key Changes

1. **Replaced custom HTTP server with Vite's dev server**
   - Removed manual WebSocket implementation in favor of Vite's built-in HMR
   - Switched from `connect` middleware to Express (compatible with Vite)

2. **Improved file watching**
   - Leveraged Vite's file watching capabilities
   - Added a custom plugin to watch the Jest Preview cache folder

3. **Enhanced HTML processing**
   - Using Vite's `transformIndexHtml` to process the HTML
   - Better asset path resolution and module handling

## Benefits

- **Better Development Experience**: Faster refresh times and more reliable hot reloading
- **Simplified Codebase**: Removed custom WebSocket handling code
- **Improved Asset Handling**: Leveraging Vite's built-in asset processing
- **Better Error Handling**: Vite provides improved error messages and stack traces

## Implementation

The implementation follows a similar approach to Vitest Preview, which already uses Vite's JavaScript API. The new server:

1. Creates a Vite dev server in middleware mode
2. Configures file watching for the Jest Preview cache directory
3. Sets up Express routes to handle serving the preview HTML
4. Uses Vite's HMR capabilities for automatic browser refreshing

## Migration Steps

1. Install new dependencies: `express` and `vite`
2. Replace the existing `previewServer.ts` with the new implementation
3. Test to ensure all functionality works as before

## Future Improvements

- Further optimize the file watching for better performance
- Add support for Vite plugins to extend Jest Preview's functionality
- Improve error overlays in the browser with Vite's error handling
