/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * External dependencies
 */
import { customAttributes } from './custom-attributes';
import { select } from '@wordpress/data';

function addQueryLoopAttributes(settings, name) {
    if (name !== 'core/query') {
        return settings;
    }

    return {
        ...settings,
        attributes: {
            ...settings.attributes,
            ...customAttributes,
        },
    };
}

addFilter(
    'blocks.registerBlockType',
    'blablablocks/query-attrs',
    addQueryLoopAttributes
);


/**
 * Disable any spacing-related setting for core/post-template
 * when it’s inside our blablablocks/query-slider variation.
 *
 * @param {any}    settingValue Current setting value (e.g. array of units, or true/false).
 * @param {string} settingName  The name of the setting, e.g. 'spacing.units', 'spacing.padding', 'spacing.margin'.
 * @param {string} clientId     The block’s clientId.
 * @param {string} blockName    The block’s name, e.g. 'core/post-template'.
 * @return {any|false}          New settingValue or false to disable the control.
 */
function disablePostTemplateSpacingSettings(settingValue, settingName, clientId, blockName) {
    // only target core/post-template
    if (blockName !== 'core/post-template') {
        return settingValue;
    }

    // only care about spacing.* or layout.* settings
    if (!(
        settingName.startsWith('spacing') ||
        settingName === 'layout' ||
        settingName.startsWith('layout.')
    )) {
        return settingValue;
    }

    // find the top-level block
    const { getBlockHierarchyRootClientId, getBlock } = select('core/block-editor');
    const rootId = getBlockHierarchyRootClientId(clientId);
    const rootBlock = getBlock(rootId);

    // if that root is our Query Slider variation, disable this control
    if (
        rootBlock?.name === 'core/query' &&
        rootBlock.attributes?.namespace === 'blablablocks/query-slider'
    ) {
        return false;
    }

    return settingValue;
}

addFilter(
    'blockEditor.useSetting.before',
    'blablablocks/disable-post-template-spacing',
    disablePostTemplateSpacingSettings
);


