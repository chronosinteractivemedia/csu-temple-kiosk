module.exports = {
  images: {
    loader: 'custom',
    domains: ['localhost', 'csu-tg-cms.onrender.com'],
    deviceSizes: [1080]
  },
  webpack: (config) => Object.assign(config, {
    target: 'electron-renderer',
  }),
};
