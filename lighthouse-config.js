module.exports = {
  ci: {
    collect: {
      // URLs to test
      url: ['https://your-deployed-app-url.vercel.app'],
      numberOfRuns: 1,
    },
    assert: {
      // Performance thresholds
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      // Specify where to store results (e.g., GitHub Actions artifacts)
      target: 'filesystem',
      outputDir: './lighthouse-results',
    },
  },
};