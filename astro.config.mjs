// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.techwemate.com',
  integrations: [mdx(), sitemap()],
  redirects: {
    '/go/superfiliate': 'https://superfiliate.com/votre-lien-affilie',
    '/go/outil-2': 'https://partnerstack.com/g/votre-lien-unique',
    '/blog/2026-07-14-affiliate-marketing-vs-digital-products-which-makes-more-money/': '/blog/affiliate-marketing-vs-digital-products/',
    '/blog/2026-07-15-common-mistakes-beginners-make-when-trying-to-make-money-online/': '/blog/common-mistakes-making-money-online/',
    '/blog/2026-07-15-from-side-hustle-to-full-time-online-income-a-realistic-roadmap/': '/blog/side-hustle-to-full-time-income/',
    '/blog/2026-07-15-how-automation-tools-help-you-earn-while-you-sleep/': '/blog/automation-tools-earn-while-you-sleep/',
    '/blog/2026-07-16-how-digital-marketing-creates-financial-freedom-in-2026/': '/blog/digital-marketing-financial-freedom/',
    '/blog/2026-07-16-how-to-build-an-email-list-that-makes-money-on-autopilot/': '/blog/build-email-list-that-makes-money/',
    '/blog/2026-07-16-how-to-turn-content-into-daily-income-a-complete-guide/': '/blog/turn-content-into-daily-income/',
    '/blog/2026-07-17-selling-without-inventory/': '/blog/selling-without-inventory/',
    '/blog/2026-07-17-step-by-step-creating-your-first-digital-product-that-sells/': '/blog/creating-your-first-digital-product/',
    '/blog/2026-07-17-the-best-traffic-sources-for-passive-online-income-free-paid/': '/blog/best-traffic-sources-passive-income/',
    '/blog/2026-07-18-Best Platforms to Sell Digital Products in 2026/': '/blog/best-platforms-sell-digital-products/',
    '/blog/2026-07-18-digital-products-vs-physical-products-pros-cons-and-profit/': '/blog/digital-vs-physical-products/',
    '/blog/2026-07-18-how-to-create-high-converting-product-pages-that-sell/': '/blog/high-converting-product-pages/',
    '/blog/2026-07-19-Find Winning Products Without Paid Tools/': '/blog/find-winning-products-free-tools/',
    '/blog/2026-07-19-how-to-price-digital-products-for-maximum-profit/': '/blog/pricing-digital-products/',
    '/blog/2026-07-19-how-to-start-dropshipping-with-0-inventory/': '/blog/start-dropshipping-0-inventory/',
    '/blog/2026-07-20-8-costly-dropshipping-mistakes-&-how to-fix-them/': '/blog/dropshipping-mistakes-to-avoid/',
    '/blog/2026-07-20-what-is-dropshipping/': '/blog/what-is-dropshipping/',
    '/blog/2026-07-20-why-digital-products-are-the-fastest-way-to-financial-freedom/': '/blog/digital-products-financial-freedom/',
    '/blog/2026-07-21-free-vs-paid-learning-what-actually-gets-results/': '/blog/free-vs-paid-learning/',
    '/blog/2026-07-21-high-income-digital-skills-you-can-learn-in-90-days/': '/blog/high-income-skills-90-days/',
    '/blog/2026-07-21-how-personal-branding-helps-you-make-money-online/': '/blog/personal-branding-make-money-online/',
    '/blog/2026-07-22-7-online-income-systems-you-can-start-for-free/': '/blog/7-free-online-income-systems/',
    '/blog/2026-07-22-how-to-overcome-fear-of-starting-an-online-business/': '/blog/overcome-fear-starting-online-business/',
    '/blog/2026-07-22-how-to-stay-consistent-when-results-are-slow/': '/blog/stay-consistent-slow-results/',
    '/blog/2026-07-22-scaling-your-online-income-without-burning-out/': '/blog/scaling-income-without-burnout/',
    '/blog/2026-07-23-Efficient Time Management with Low Resources/': '/blog/time-management-low-resources/',
    '/blog/2026-07-23-online-entrepreneurs-financial-mindset/': '/blog/entrepreneurs-financial-mindset/',
    '/blog/2026-07-23-the-role-of-discipline-in-building-online-income/': '/blog/discipline-in-online-income/',
    '/blog/2026-07-24-Why People Fail Online And How to Be the Exception/': '/blog/why-people-fail-online/',
    '/blog/2026-07-19-how-to-find-winning-products-without-paid-tools-a-complete-guide-for-aspiring-en/': '/blog/2026-07-19-find-winning-products-without-paid-tools/',
'/blog/2026-07-24-why-most-people-fail-online-and-how-you-can-avoid-it/': '/blog/2026-07-24-why-people-fail-online-and-how-to-be-the-exception/',
  },
  
  
 fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-atkinson',
      fallbacks: ['sans-serif'],
    },
  ],
});
