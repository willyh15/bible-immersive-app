module.exports = {
  ci: {
    collect: {
      // Use your deployed production URL
      url: ['https://bible-immersive-app.vercel.app/'],
      numberOfRuns: 1,
      settings: {
        chromeFlags: '--no-sandbox', // Required for CI environments
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-results',
    },
  },
};