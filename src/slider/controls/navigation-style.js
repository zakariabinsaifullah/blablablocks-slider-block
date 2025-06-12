/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    FontSizePicker,
    __experimentalSpacingSizesControl as SpacingSizesControl, // eslint-disable-line
    __experimentalBorderRadiusControl as BorderRadiusControl, // eslint-disable-line
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
 * NavigationStyleControl Component
 * Provides a control panel for configuring the navigation styles of the slider block.
 *
 * @param {Object}   props               Component props.
 * @param {Object}   props.attributes    The block attributes.
 * @param {Function} props.setAttributes Function to update block attributes.
 */
export default function NavigationStyleControl({ attributes, setAttributes }) {

    return (
        <InspectorControls group="styles">
            <ToolsPanel
                label={__('Navigation', 'blablablocks-slider-block')}
                resetAll={() =>
                    setAttributes({
                        navigationSize: undefined,
                        navigationColor: {
                            arrow: { default: undefined, hover: undefined },
                            background: {
                                default: undefined,
                                hover: undefined,
                            },
                        },
                        navigationPadding: undefined,
                        navigationOffset: undefined,
                        navigationPosition: undefined,
                        navigationSpacing: undefined,
                        navigationBorderRadius: undefined,
                    })
                }
            >
                <ToolsPanelItem
                    label={__('Size', 'blablablocks-slider-block')}
                    isShownByDefault
                    hasValue={() => !!attributes.navigationSize}
                    onDeselect={() =>
                        setAttributes({ navigationSize: undefined })
                    }
                >
                    <FontSizePicker
                        __next40pxDefaultSize
                        withSlider
                        withReset={false}
                        onChange={(size) =>
                            setAttributes({ navigationSize: size })
                        }
                        value={attributes.navigationSize}
                    />
                </ToolsPanelItem>
                <ToolsPanelItem
                    label={__('Color', 'blablablocks-slider-block')}
                    isShownByDefault
                    hasValue={() =>
                        !!attributes?.navigationColor?.arrowColor
                            ?.default ||
                        !!attributes?.navigationColor?.arrowColor?.hover ||
                        !!attributes?.navigationColor?.backgroundColor
                            ?.default ||
                        !!attributes?.navigationColor?.backgroundColor
                            ?.hover
                    }
                    onDeselect={() =>
                        setAttributes({
                            navigationColor: {
                                arrow: {
                                    default: undefined,
                                    hover: undefined,
                                },
                                background: {
                                    default: undefined,
                                    hover: undefined,
                                },
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
                                    'Arrow',
                                    'blablablocks-slider-block'
                                )}
                                colorValue={
                                    attributes?.navigationColor
                                        ?.arrowColor || {}
                                }
                                onChangeColor={(newColor) =>
                                    setAttributes({
                                        navigationColor: {
                                            ...attributes.navigationColor,
                                            arrowColor: newColor,
                                        },
                                    })
                                }
                                hasHover={true}
                            />
                            <ColorControlDropdown
                                label={__(
                                    'Background',
                                    'blablablocks-slider-block'
                                )}
                                colorValue={
                                    attributes?.navigationColor
                                        ?.backgroundColor || {}
                                }
                                onChangeColor={(newColor) =>
                                    setAttributes({
                                        navigationColor: {
                                            ...attributes?.navigationColor,
                                            backgroundColor: newColor,
                                        },
                                    })
                                }
                                hasHover={true}
                            />
                        </VStack>
                    </VStack>
                </ToolsPanelItem>
                <ToolsPanelItem
                    label={__('Padding', 'blablablocks-slider-block')}
                    hasValue={() => !!attributes.navigationPadding}
                    onDeselect={() =>
                        setAttributes({ navigationPadding: undefined })
                    }
                >
                    <SpacingSizesControl
                        values={attributes.navigationPadding}
                        onChange={(value) =>
                            setAttributes({ navigationPadding: value })
                        }
                        label={__(
                            'Padding',
                            'blablablocks-slider-block'
                        )}
                        allowReset={false}
                        splitOnAxis={true}
                    />
                </ToolsPanelItem>
                <ToolsPanelItem
                    label={__('Position', 'blablablocks-slider-block')}
                    hasValue={() => !!attributes.navigationPosition}
                    onDeselect={() =>
                        setAttributes({ navigationPosition: undefined })
                    }
                >
                    <VStack>
                        <Text size={'11px'} weight={500} upperCase>
                            Position
                        </Text>
                        <AlignmentMatrixControl
                            className="bbb-slider-navigation-position"
                            width={60}
                            value={attributes.navigationPosition}
                            defaultValue="center"
                            label={__(
                                'Position',
                                'blablablocks-slider-block'
                            )}
                            onChange={(value) => {
                                setAttributes({
                                    navigationPosition: value,
                                });
                            }}
                        />
                    </VStack>
                </ToolsPanelItem>
                <ToolsPanelItem
                    label={__('Spacing', 'blablablocks-slider-block')}
                    hasValue={() => !!attributes.navigationSpacing}
                    onDeselect={() =>
                        setAttributes({ navigationSpacing: undefined })
                    }
                >
                    <SpacingSizesControl
                        values={attributes.navigationSpacing}
                        onChange={(value) =>
                            setAttributes({ navigationSpacing: value })
                        }
                        label={__(
                            'Spacing',
                            'blablablocks-slider-block'
                        )}
                        allowReset={false}
                        sides={['horizontal']}
                    />
                </ToolsPanelItem>
                <ToolsPanelItem
                    label={__('Offset', 'blablablocks-slider-block')}
                    hasValue={() => !!attributes.navigationOffset}
                    onDeselect={() =>
                        setAttributes({ navigationOffset: undefined })
                    }
                >
                    <SpacingSizesControl
                        values={attributes.navigationOffset}
                        onChange={(value) =>
                            setAttributes({ navigationOffset: value })
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
                <ToolsPanelItem
                    label={__('Radius', 'blablablocks-slider-block')}
                    hasValue={() => !!attributes.navigationBorderRadius}
                    onDeselect={() =>
                        setAttributes({
                            navigationBorderRadius: undefined,
                        })
                    }
                >
                    <BorderRadiusControl
                        values={attributes.navigationBorderRadius}
                        onChange={(value) =>
                            setAttributes({
                                navigationBorderRadius: value,
                            })
                        }
                    />
                </ToolsPanelItem>
            </ToolsPanel>
        </InspectorControls>
    );
}