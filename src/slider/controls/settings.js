/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import {
    InspectorControls,
    store as blockEditorStore,
} from '@wordpress/block-editor';
import {
    RangeControl,
    ToggleControl,
    __experimentalVStack as VStack, // eslint-disable-line
    __experimentalToolsPanel as ToolsPanel, // eslint-disable-line
    __experimentalToolsPanelItem as ToolsPanelItem, // eslint-disable-line
    __experimentalToggleGroupControl as ToggleGroupControl, // eslint-disable-line
    __experimentalToggleGroupControlOption as ToggleGroupControlOption, // eslint-disable-line
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ResponsiveDropdown } from '../../components';

/**
 * SettingsControl component
 * Provides the settings panel for the slider block in the editor.
 * 
 * @param {Object}   props               Component props.
 * @param {string}   props.clientId      The client ID for this block instance.
 * @param {Object}   props.attributes    The block attributes.
 * @param {Function} props.setAttributes Function to update block attributes.
 */
export default function SettingsControl({ clientId, attributes, setAttributes }) {

    // Check if inner blocks exist using useSelect
    const innerBlocks = useSelect(
        (select) => select(blockEditorStore).getBlocks(clientId),
        [clientId]
    );

    const defaultSettings = {
        slidesPerView: {
            ...attributes.slidesPerView,
            desktop: 1,
            tablet: 1,
            mobile: 1,
        },
        slidesSpacing: {
            ...attributes.slidesSpacing,
            desktop: 30,
            tablet: 20,
            mobile: 10,
        },
        speed: 300,
        effects: 'slide',
        autoplay: false,
        delay: 5000,
        navigation: {
            ...attributes.navigation,
            desktop: true,
            tablet: true,
            mobile: true,
        },
        pagination: {
            ...attributes.pagination,
            desktop: true,
            tablet: true,
            mobile: true,
        },
        loop: false,
    };

    return (
        <InspectorControls>
            <ToolsPanel
                label={__('Settings', 'blablablocks-slider-block')}
                resetAll={() => setAttributes(defaultSettings)}
            >
                <ToolsPanelItem
                    label={__(
                        'Slides Per View',
                        'blablablocks-slider-block'
                    )}
                    isShownByDefault
                    hasValue={() =>
                        JSON.stringify(attributes.slidesPerView) !==
                        JSON.stringify(defaultSettings.slidesPerView)
                    }
                    onDeselect={() =>
                        setAttributes({
                            slidesPerView: {
                                ...defaultSettings.slidesPerView,
                            },
                        })
                    }
                >
                    <VStack>
                        <ResponsiveDropdown
                            label="Slides Per View"
                            attributes={attributes}
                            setAttributes={setAttributes}
                            responsiveKey="slidesPerView"
                        />
                        <RangeControl
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                            help={__(
                                "Number of slides visible at the same time on slider's container.",
                                'blablablocks-slider-block'
                            )}
                            value={
                                attributes.slidesPerView[
                                attributes.slidesPerView.activeDevice
                                ]
                            }
                            min={1}
                            max={Math.max(innerBlocks.length - 1, 1)}
                            onChange={(value) =>
                                setAttributes({
                                    slidesPerView: {
                                        ...attributes.slidesPerView,
                                        [attributes.slidesPerView
                                            .activeDevice]: value,
                                    },
                                })
                            }
                        />
                    </VStack>
                </ToolsPanelItem>
                <ToolsPanelItem
                    label={__(
                        'Slides Spacing',
                        'blablablocks-slider-block'
                    )}
                    isShownByDefault
                    hasValue={() =>
                        JSON.stringify(attributes.slidesSpacing) !==
                        JSON.stringify(defaultSettings.slidesSpacing)
                    }
                    onDeselect={() =>
                        setAttributes({
                            slidesSpacing: {
                                ...defaultSettings.slidesSpacing,
                            },
                        })
                    }
                >
                    <VStack>
                        <ResponsiveDropdown
                            label={__(
                                'Slides Spacing',
                                'blablablocks-slider-block'
                            )}
                            attributes={attributes}
                            setAttributes={setAttributes}
                            responsiveKey="slidesSpacing"
                        />
                        <RangeControl
                            __nextHasNoMarginBottom
                            __next40pxDefaultSize
                            help={__(
                                'Adjust the spacing between slides.',
                                'blablablocks-slider-block'
                            )}
                            initialPosition={30}
                            value={
                                attributes.slidesSpacing[
                                attributes.slidesSpacing.activeDevice
                                ]
                            }
                            min={0}
                            onChange={(value) =>
                                setAttributes({
                                    slidesSpacing: {
                                        ...attributes.slidesSpacing,
                                        [attributes.slidesSpacing
                                            .activeDevice]: value,
                                    },
                                })
                            }
                        />
                    </VStack>
                </ToolsPanelItem>
                <ToolsPanelItem
                    label={__(
                        'Speed (ms)',
                        'blablablocks-slider-block'
                    )}
                    isShownByDefault
                    hasValue={() =>
                        attributes.speed !== defaultSettings.speed
                    }
                    onDeselect={() => setAttributes({ speed: 300 })}
                >
                    <RangeControl
                        __nextHasNoMarginBottom
                        __next40pxDefaultSize
                        help={__(
                            'Set the duration of transition between slides.',
                            'blablablocks-slider-block'
                        )}
                        label={__(
                            'Speed (ms)',
                            'blablablocks-slider-block'
                        )}
                        min={100} // minimum speed in ms
                        max={10000} // maximum speed in ms
                        step={100}
                        value={attributes.speed}
                        onChange={(value) =>
                            setAttributes({ speed: value })
                        }
                    />
                </ToolsPanelItem>
                <ToolsPanelItem
                    label={__('Effects', 'blablablocks-slider-block')}
                    isShownByDefault
                    hasValue={() =>
                        attributes.effects !== defaultSettings.effects
                    }
                    onDeselect={() =>
                        setAttributes({ effects: 'slide' })
                    }
                >
                    <ToggleGroupControl
                        isBlock
                        __nextHasNoMarginBottom
                        __next40pxDefaultSize
                        label={__(
                            'Effects',
                            'blablablocks-slider-block'
                        )}
                        value={attributes.effects}
                        onChange={(value) =>
                            setAttributes({ effects: value })
                        }
                        help={__(
                            'Select how slides transition.',
                            'blablablocks-slider-block'
                        )}
                    >
                        <ToggleGroupControlOption
                            label={__(
                                'Slide',
                                'blablablocks-slider-block'
                            )}
                            value="slide"
                        />
                        <ToggleGroupControlOption
                            label={__(
                                'Fade',
                                'blablablocks-slider-block'
                            )}
                            value="fade"
                        />
                    </ToggleGroupControl>
                </ToolsPanelItem>
                <ToolsPanelItem
                    label={__(
                        'Navigation',
                        'blablablocks-slider-block'
                    )}
                    isShownByDefault
                    hasValue={() =>
                        JSON.stringify(attributes.navigation) !==
                        JSON.stringify(defaultSettings.navigation)
                    }
                    onDeselect={() =>
                        setAttributes({
                            navigation: { ...defaultSettings.navigation },
                        })
                    }
                >
                    <ToggleControl
                        __nextHasNoMarginBottom
                        className="responsive_field_control"
                        help={__(
                            'Enable navigation arrows to manually move between slides.',
                            'blablablocks-slider-block'
                        )}
                        checked={
                            attributes.navigation[
                            attributes.navigation.activeDevice
                            ]
                        }
                        label={
                            <ResponsiveDropdown
                                label={__(
                                    'Navigation',
                                    'blablablocks-slider-block'
                                )}
                                attributes={attributes}
                                setAttributes={setAttributes}
                                responsiveKey="navigation"
                            />
                        }
                        onChange={(value) =>
                            setAttributes({
                                navigation: {
                                    ...attributes.navigation,
                                    [attributes.navigation.activeDevice]:
                                        value,
                                },
                            })
                        }
                    />
                </ToolsPanelItem>
                <ToolsPanelItem
                    label={__(
                        'Pagination',
                        'blablablocks-slider-block'
                    )}
                    isShownByDefault
                    hasValue={() =>
                        JSON.stringify(attributes.pagination) !==
                        JSON.stringify(defaultSettings.pagination)
                    }
                    onDeselect={() =>
                        setAttributes({
                            pagination: { ...defaultSettings.pagination },
                        })
                    }
                >
                    <ToggleControl
                        __nextHasNoMarginBottom
                        className="responsive_field_control"
                        help={__(
                            'Enable pagination indicators to show slide positions.',
                            'blablablocks-slider-block'
                        )}
                        checked={
                            attributes.pagination[
                            attributes.pagination.activeDevice
                            ]
                        }
                        label={
                            <ResponsiveDropdown
                                label={__(
                                    'Pagination',
                                    'blablablocks-slider-block'
                                )}
                                attributes={attributes}
                                setAttributes={setAttributes}
                                responsiveKey="pagination"
                            />
                        }
                        onChange={(value) =>
                            setAttributes({
                                pagination: {
                                    ...attributes.pagination,
                                    [attributes.pagination.activeDevice]:
                                        value,
                                },
                            })
                        }
                    />
                </ToolsPanelItem>
                <ToolsPanelItem
                    label={__('Loop', 'blablablocks-slider-block')}
                    hasValue={() =>
                        attributes.loop !== defaultSettings.loop
                    }
                    onDeselect={() => setAttributes({ loop: false })}
                >
                    <ToggleControl
                        __nextHasNoMarginBottom
                        help={__(
                            'Enable loop to continuously cycle through slides.',
                            'blablablocks-slider-block'
                        )}
                        checked={attributes.loop}
                        label={__('Loop', 'blablablocks-slider-block')}
                        onChange={(value) =>
                            setAttributes({ loop: value })
                        }
                    />
                </ToolsPanelItem>
                <ToolsPanelItem
                    label={__('Autoplay', 'blablablocks-slider-block')}
                    hasValue={() =>
                        attributes.autoplay !== defaultSettings.autoplay
                    }
                    onDeselect={() =>
                        setAttributes({
                            autoplay: false,
                            delay: 5000,
                        })
                    }
                >
                    <VStack spacing={4}>
                        <ToggleControl
                            help={__(
                                'Enable automatic slide transition.',
                                'blablablocks-slider-block'
                            )}
                            checked={attributes.autoplay}
                            label={__(
                                'Autoplay',
                                'blablablocks-slider-block'
                            )}
                            onChange={(value) =>
                                setAttributes({ autoplay: value })
                            }
                        />
                        {attributes.autoplay && (
                            <RangeControl
                                __nextHasNoMarginBottom
                                __next40pxDefaultSize
                                help={__(
                                    'Set the delay between slides in milliseconds.',
                                    'blablablocks-slider-block'
                                )}
                                label={__(
                                    'Delay (ms)',
                                    'blablablocks-slider-block'
                                )}
                                min={100} // minimum delay in ms
                                max={10000} // maximum delay in ms
                                step={100}
                                value={attributes.delay}
                                onChange={(value) =>
                                    setAttributes({ delay: value })
                                }
                            />
                        )}
                    </VStack>
                </ToolsPanelItem>
            </ToolsPanel>
        </InspectorControls>
    );
}
