const siteUrl = process.env.URL || 'https://your-domain.com';
const generateRobotsTxt = true;
const changefreq = 'weekly';
const priority = 0.7;
const sitemapSize = 5000;

module.exports = {
  siteUrl,
  generateRobotsTxt,
  changefreq,
  priority,
  sitemapSize,
};
