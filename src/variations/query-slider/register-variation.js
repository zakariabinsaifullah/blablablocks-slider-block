/**
 * WordPress dependencies
 */
import { registerBlockVariation } from '@wordpress/blocks';

/** 
 * Register block variation for Query Loop Slider
 */
registerBlockVariation('core/query', {
    name: 'blablablocks/query-slider',
    title: 'Query Loop Slider',
    icon: 'images-alt2',
    description: 'A Query Loop preconfigured to work as a Swiper slider.',
    attributes: {
        namespace: 'blablablocks/query-slider',
        className: 'is-blablablocks-query-slider',
    },
    isActive: ['namespace'],
    innerBlocks: [
        [
            'core/post-template',
            {},
            [['core/post-title'], ['core/post-excerpt']],
        ],
        ['core/query-no-results'],
    ],
    variations: [],
    templateLock: 'all',
    scope: ['inserter'],
});


