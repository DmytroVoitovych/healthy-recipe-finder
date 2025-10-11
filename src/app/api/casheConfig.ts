const ONE_HOUR = 60 * 60;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_WEEK = 7 * ONE_DAY;

export const CACHE_MAX_AGE = ONE_DAY;
export const CACHE_STALE_WHILE_REVALIDATE = ONE_WEEK - ONE_DAY;

export const CACHE_CONTROL_HEADER = `public, max-age=${CACHE_MAX_AGE}, stale-while-revalidate=${CACHE_STALE_WHILE_REVALIDATE}`;
