/**
 * Default list of fields
 */
export const DEFAULT_LIST_CONFIG = {
    firstLine: [
        'ContactName',
        'JobTitle',
        'Email',
        'Phone',
        'VersionCreated',
    ],
    secondLine: [
        'OrgName',
        'ContactLocation',
        'SocialInfo',

    ],
    singleLine: [
        'ContactName',
        'JobTitle',
        'OrgName',
        'ContactLocation',
        'Email',
        'Phone',
        'SocialInfo',
        'VersionCreated',
    ],
};


export const KEYCODES = {
    BACKSPACE: 8,
    ENTER: 13,
    ESCAPE: 27,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
};

/**
 * Lookup fields for at least one of them should be provided
 */
export const LOOKUP_FIELDS = [
    'mobile',
    'contact_phone',
    'contact_email',
    'twitter',
    'facebook',
    'instagram',
];

export const FB_URL = 'https://www.facebook.com/';
export const IG_URL = 'https://www.instagram.com/';

export const TWITTER_URL = 'https://twitter.com/';
export const MAP_URL = 'https://maps.google.com/maps?q=';
export const MAILTO_URL = 'mailto://';
