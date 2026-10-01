import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:3100', browserName: 'chromium' },
  webServer: process.env.ULSAN_TEST_EXTERNAL ? undefined : {
    command: process.env.ULSAN_TEST_DEV ? 'npm.cmd run dev -- --port 3100' : 'npm.cmd run start -- --port 3100',
    url: 'http://127.0.0.1:3100',
    reuseExistingServer: false,
    timeout: 60_000,
    env: { NEXT_PUBLIC_SCROLL_DEBUG: process.env.ULSAN_TEST_DEV ? '1' : '0' },
  },
});
