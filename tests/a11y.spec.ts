import AxeBuilder from '@axe-core/playwright'; // 1
import { expect, test } from '@playwright/test';
// import { createHtmlReport } from 'axe-html-reporter';
import * as cheerio from 'cheerio';
import pino from 'pino';

const logger = pino();

/**
 * Collects all URLs from the sitemap index and sitemap files
 * @returns
 */
async function getSitemapUrls(): Promise<string[]> {
  // Fetch the sitemap index
  const response = await fetch('http://localhost:3000/sitemap-index.xml');
  const xmlText = await response.text();
  const $ = cheerio.load(xmlText, { xmlMode: true });

  const allUrls: string[] = [];

  // Check if this is a sitemap index file (contains multiple sitemaps)
  const sitemapElements = $('sitemap loc');

  if (sitemapElements.length > 0) {
    logger.info('Found a sitemap index with multiple sitemaps');

    // Process each sitemap file referenced in the sitemap index
    for (const element of sitemapElements.toArray()) {
      const rawSitemapUrl = $(element).text();
      const sitemapUrl = rawSitemapUrl.replace(
        /https:\/\/robmcguinness\.com/g,
        'http://localhost:3000',
      );
      logger.info(`Fetching sitemap: ${sitemapUrl}`);

      // Fetch the individual sitemap
      const sitemapResponse = await fetch(sitemapUrl);
      const sitemapXml = await sitemapResponse.text();
      const sitemapDoc = cheerio.load(sitemapXml, { xmlMode: true });

      // Extract URLs from this sitemap
      sitemapDoc('url loc').each((_, element) => {
        const pageUrl = sitemapDoc(element).text();
        const sitemapUrl = pageUrl.replace(
          /https:\/\/robmcguinness\.com/g,
          'http://localhost:3000',
        );
        allUrls.push(sitemapUrl);
      });
    }
  } else {
    // This is a regular sitemap file, not an index
    logger.info('Processing a regular sitemap file');
    $('url loc').each((_, element) => {
      const pageUrl = $(element).text();
      allUrls.push(pageUrl);
    });
  }

  return allUrls;
}

test('site accessibility check', async ({ page }) => {
  // Get all URLs from sitemap
  const sitemapUrls = await getSitemapUrls();

  // Ensure we found some URLs
  expect(sitemapUrls.length, {
    message: 'No URLs found in sitemap',
  }).toBeGreaterThan(0);
  logger.info(`Found ${sitemapUrls.length} URLs in sitemap`);

  // Define viewports and color schemes
  const viewports = [
    { name: 'desktop', viewport: { width: 1280, height: 800 } },
    { name: 'mobile', viewport: { width: 375, height: 667 } },
  ];
  const colorSchemes: Array<'light' | 'dark'> = ['light', 'dark'];

  for (const url of sitemapUrls) {
    for (const { name: deviceName, viewport } of viewports) {
      for (const colorScheme of colorSchemes) {
        logger.info(`Testing accessibility for: ${url} [${deviceName}, ${colorScheme} mode]`);

        // Set viewport and emulation
        await page.setViewportSize(viewport);
        await page.emulateMedia({ colorScheme });

        await page.goto(url, { waitUntil: 'networkidle' });

        const accessibilityScanResults = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa'])
          .analyze();

        // const _reportHTML = createHtmlReport({
        //   results: accessibilityScanResults,
        //   options: {
        //     projectKey: `A11y Tests - ${deviceName} - ${colorScheme}`,
        //   },
        // });

        if (accessibilityScanResults.violations.length > 0) {
          logger.info(
            `Found ${accessibilityScanResults.violations.length} accessibility violations on ${url} [${deviceName}, ${colorScheme} mode]`,
          );
          logger.info(JSON.stringify(accessibilityScanResults.violations, null, 2));
        }

        expect(accessibilityScanResults.violations, {
          message: `Accessibility violations found on ${url} [${deviceName}, ${colorScheme} mode]`,
        }).toEqual([]);
      }
    }
  }
});
