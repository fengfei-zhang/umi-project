export const isSmall = process.env.project === 'small';

export const development = process.env.NODE_ENV === 'development';

export const production = process.env.NODE_ENV === 'production';

const { mock } = process.env;

export const env_mock = mock;
