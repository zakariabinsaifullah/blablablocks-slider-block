/**
 * WordPress dependencies
 */
import React from 'react';
import { addFilter } from '@wordpress/hooks';
import { NavigationStyleControl, PaginationStyleControl, SettingsControl } from '../../slider/controls';

const withQueryLoopInspector = (BlockEdit) => (props) => {
    const { name, clientId, attributes, setAttributes } = props;

    if (name !== 'core/query' || attributes.namespace !== 'blablablocks/query-slider') {
        return <BlockEdit {...props} />;
    }

    return (
        <>
            <BlockEdit {...props} />
            <SettingsControl
                clientId={clientId}
                attributes={attributes}
                setAttributes={setAttributes}
            />
            <NavigationStyleControl
                attributes={attributes}
                setAttributes={setAttributes}
            />
            <PaginationStyleControl
                attributes={attributes}
                setAttributes={setAttributes}
            />
        </>
    );
};

addFilter(
    'editor.BlockEdit',
    'core/query',
    withQueryLoopInspector
);