/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    FontSizePicker,
    __experimentalSpacingSizesControl as SpacingSizesControl, // eslint-disable-line
} from '@wordpress/block-editor';
import {
    AlignmentMatrixControl,
    __experimentalText as Text, // eslint-disable-line
    __experimentalVStack as VStack, // eslint-disable-line
    __experimentalHeading as Heading, // eslint-disable-line
    __experimentalToolsPanel as ToolsPanel, // eslint-disable-line
    __experimentalToolsPanelItem as ToolsPanelItem, // eslint-disable-line
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ColorControlDropdown } from '../../components';

/**
 * PaginationStyleControl Component
 * This component provides controls for customizing the pagination style of the slider block.
 *
 * @param {Object}   props               Component props.
 * @param {Object}   props.attributes    The block attributes.
 * @param {Function} props.setAttributes Function to update block attributes.
 */
export default function PaginationStyleControl({ attributes, setAttributes }) {

    return (
        <InspectorControls group="styles">
            <ToolsPanel
                label={__('Pagination', 'blablablocks-slider-block')}
                resetAll={() =>
                    setAttributes({
                        paginationSize: undefined,
                        paginationColor: {
                            activeColor: undefined,
                            inactiveColor: undefined,
                        },
                        paginationOffset: undefined,
                        paginationPosition: undefined,
                    })
                }
            >
                <ToolsPanelItem
                    label={__('Size', 'blablablocks-slider-block')}
                    isShownByDefault
                    hasValue={() => !!attributes.paginationSize}
                    onDeselect={() =>
                        setAttributes({ paginationSize: undefined })
                    }
                >
                    <FontSizePicker
                        __next40pxDefaultSize
                        withSlider
                        withReset={false}
                        onChange={(size) =>
                            setAttributes({ paginationSize: size })
                        }
                        value={attributes.paginationSize}
                    />
                </ToolsPanelItem>
                <ToolsPanelItem
                    label={__('Color', 'blablablocks-slider-block')}
                    isShownByDefault
                    hasValue={() =>
                        !!attributes?.paginationColor?.activeColor ||
                        !!attributes?.paginationColor?.inactiveColor
                    }
                    onDeselect={() =>
                        setAttributes({
                            paginationColor: {
                                activeColor: undefined,
                                inactiveColor: undefined,
                            },
                        })
                    }
                >
                    <VStack spacing={0}>
                        <Heading
                            lineHeight={1}
                            level={3}
                            weight={500}
                            upperCase
                        >
                            Color
                        </Heading>
                        <VStack
                            className="slider_color-support-panel"
                            spacing={0}
                        >
                            <ColorControlDropdown
                                label={__(
                                    'Active',
                                    'blablablocks-slider-block'
                                )}
                                colorValue={
                                    attributes?.paginationColor
                                        ?.activeColor || {}
                                }
                                onChangeColor={(newColor) =>
                                    setAttributes({
                                        paginationColor: {
                                            ...attributes.paginationColor,
                                            activeColor: newColor,
                                        },
                                    })
                                }
                            />
                            <ColorControlDropdown
                                label={__(
                                    'Inactive',
                                    'blablablocks-slider-block'
                                )}
                                colorValue={
                                    attributes?.paginationColor
                                        ?.inactiveColor || {}
                                }
                                onChangeColor={(newColor) =>
                                    setAttributes({
                                        paginationColor: {
                                            ...attributes?.paginationColor,
                                            inactiveColor: newColor,
                                        },
                                    })
                                }
                            />
                        </VStack>
                    </VStack>
                </ToolsPanelItem>
                <ToolsPanelItem
                    label={__('Position', 'blablablocks-slider-block')}
                    hasValue={() => !!attributes.paginationPosition}
                    onDeselect={() =>
                        setAttributes({ paginationPosition: undefined })
                    }
                >
                    <VStack>
                        <Text size={'11px'} weight={500} upperCase>
                            Position
                        </Text>
                        <AlignmentMatrixControl
                            className="bbb-slider-pagination-position"
                            width={60}
                            value={attributes.paginationPosition}
                            defaultValue="bottom center"
                            label={__(
                                'Position',
                                'blablablocks-slider-block'
                            )}
                            onChange={(value) => {
                                setAttributes({
                                    paginationPosition: value,
                                });
                            }}
                        />
                    </VStack>
                </ToolsPanelItem>
                <ToolsPanelItem
                    label={__('Offset', 'blablablocks-slider-block')}
                    hasValue={() => !!attributes.paginationOffset}
                    onDeselect={() =>
                        setAttributes({ paginationOffset: undefined })
                    }
                >
                    <SpacingSizesControl
                        values={attributes.paginationOffset}
                        onChange={(value) =>
                            setAttributes({ paginationOffset: value })
                        }
                        label={__(
                            'Offset',
                            'blablablocks-slider-block'
                        )}
                        minimumCustomValue={-Infinity}
                        allowReset={false}
                        splitOnAxis={true}
                    />
                </ToolsPanelItem>
            </ToolsPanel>
        </InspectorControls>
    );
}
