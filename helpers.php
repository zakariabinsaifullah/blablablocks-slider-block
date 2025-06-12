<?php

/**
 * Helper functions for BlaBlaBlocks Slider Block
 *
 * @package blablablocks-slider-block
 */

if (! function_exists('bbb_resolve_spacing_size_value')) {
    /**
     * Resolves a spacing size value into a usable CSS value.
     *
     * @param mixed $value        The input spacing size value.
     * @param mixed $defaultValue The default value.
     * @return string A valid CSS spacing size value.
     */
    function bbb_resolve_spacing_size_value($value, $defaultValue = '0px')
    {
        if (is_string($value)) {
            if (strpos($value, 'var:') === 0) {
                $css_variable = str_replace('var:', '--wp--', $value);
                $css_variable = str_replace('|', '--', $css_variable);
                return "var($css_variable)";
            }
            return $value;
        }

        if (is_numeric($value)) {
            return "{$value}px";
        }

        return $defaultValue;
    }
}

if (! function_exists('bbb_get_border_radius_styles')) {
    /**
     * Generates a border-radius string from either a string or an array.
     *
     * @param mixed $border_radius The border radius definition.
     * @param mixed $default_value The default value.
     * @return string A valid CSS border-radius value.
     */
    function bbb_get_border_radius_styles($border_radius, $default_value = '0px')
    {
        if (is_string($border_radius)) {
            return $border_radius;
        }

        $tl = $border_radius['topLeft']    ?? $default_value;
        $tr = $border_radius['topRight']   ?? $default_value;
        $br = $border_radius['bottomRight'] ?? $default_value;
        $bl = $border_radius['bottomLeft'] ?? $default_value;
        return "$tl $tr $br $bl";
    }
}

if (! function_exists('bbb_generate_navigation_styles')) {
    /**
     * Generates a set of CSS variable mappings for navigation styles based on provided attributes.
     *
     * @param array $attributes The attributes used to customize navigation styles.
     * @return array An associative array with CSS variable definitions for the navigation.
     */
    function bbb_generate_navigation_styles(array $attributes = [])
    {
        $styles = [];

        // Helper function to add a style with a fallback to default values
        $add_style = function ($key, $value, $default_value = null) use (&$styles) {
            if (isset($value)) {
                $styles[$key] = $value;
            } elseif (isset($default_value)) {
                $styles[$key] = $default_value;
            }
        };

        // Navigation colors
        $navigation_color = $attributes['navigationColor'] ?? [];
        $add_style('--navigation-arrow-color', $navigation_color['arrowColor']['default'] ?? null, '#000');
        $add_style('--navigation-background-color', $navigation_color['backgroundColor']['default'] ?? null, 'transparent');
        $add_style('--navigation-arrow-hover-color', $navigation_color['arrowColor']['hover'] ?? null, '#333');
        $add_style('--navigation-background-hover-color', $navigation_color['backgroundColor']['hover'] ?? null, 'transparent');

        // Navigation sizing
        $add_style('--swiper-navigation-size', $attributes['navigationSize'] ?? null, '40px');
        $add_style('--navigation-border-radius', bbb_get_border_radius_styles($attributes['navigationBorderRadius'] ?? null, '4px'));

        // Navigation padding
        $navigation_padding = $attributes['navigationPadding'] ?? [];
        $add_style('--navigation-padding-top', bbb_resolve_spacing_size_value($navigation_padding['top'] ?? null, '0px'));
        $add_style('--navigation-padding-right', bbb_resolve_spacing_size_value($navigation_padding['right'] ?? null, '0px'));
        $add_style('--navigation-padding-bottom', bbb_resolve_spacing_size_value($navigation_padding['bottom'] ?? null, '0px'));
        $add_style('--navigation-padding-left', bbb_resolve_spacing_size_value($navigation_padding['left'] ?? null, '0px'));

        // Pagination styles
        $pagination_color = $attributes['paginationColor'] ?? [];
        $add_style('--pagination-size', $attributes['paginationSize'] ?? null, '8px');
        $add_style('--pagination-active-color', $pagination_color['activeColor']['default'] ?? null, '#000');
        $add_style('--pagination-inactive-color', $pagination_color['inactiveColor']['default'] ?? null, '#ccc');

        // Pagination offset
        $pagination_offset = $attributes['paginationOffset'] ?? [];
        $add_style('--pagination-offset-top', bbb_resolve_spacing_size_value($pagination_offset['top'] ?? null, '0px'));
        $add_style('--pagination-offset-right', bbb_resolve_spacing_size_value($pagination_offset['right'] ?? null));
        $add_style('--pagination-offset-bottom', bbb_resolve_spacing_size_value($pagination_offset['bottom'] ?? null, '0px'));
        $add_style('--pagination-offset-left', bbb_resolve_spacing_size_value($pagination_offset['left'] ?? null));

        // Navigation offset
        $navigation_offset = $attributes['navigationOffset'] ?? [];
        $navigationSpacing = $attributes['navigationSpacing'] ?? [];
        $add_style('--navigation-offset-top', bbb_resolve_spacing_size_value($navigation_offset['top'] ?? null, '0px'));
        $add_style('--navigation-offset-right', bbb_resolve_spacing_size_value($navigation_offset['right'] ?? null, '0px'));
        $add_style('--navigation-offset-bottom', bbb_resolve_spacing_size_value($navigation_offset['bottom'] ?? null));
        $add_style('--navigation-offset-left', bbb_resolve_spacing_size_value($navigation_offset['left'] ?? null, '0px'));

        $add_style('--navigation-spacing', bbb_resolve_spacing_size_value($navigationSpacing['left'] ?? null, '20px'));

        return $styles;
    }
}

if (!function_exists('bbb_get_slider_wrapper_attributes')) {
    /**
     * Generates the wrapper attributes for the slider block.
     *
     * @param array $attributes The block attributes.
     * @param WP_Block $block The block instance.
     * @return array The wrapper attributes.
     */
    function bbb_get_slider_wrapper_attributes($attributes, $block)
    {
        // Generate navigation styles
        $navigation_styles = bbb_generate_navigation_styles($attributes);

        // Convert styles array to inline style string
        $style_string = '';
        foreach ($navigation_styles as $property => $value) {
            $style_string .= "$property:$value;";
        }

        // For query loop slider, we don't have inner_blocks to count
        $is_query_slider = isset($attributes['namespace']) && $attributes['namespace'] === 'blablablocks/query-slider';

        // Only add padding if it's not a query slider and has at least 2 slides
        if (!$is_query_slider) {
            // Handle both WP_Block object and array cases
            $inner_blocks = is_object($block) ? $block->inner_blocks : ($block['innerBlocks'] ?? []);
            $slide_count = is_countable($inner_blocks) ? count($inner_blocks) : 0;

            if ($slide_count >= 2) {
                $style_string .= 'padding:100px;';
            }
        }

        $nav_position = isset($attributes['navigationPosition']) ? str_replace(' ', '-', $attributes['navigationPosition']) : 'center';
        $pag_position = isset($attributes['paginationPosition']) ? str_replace(' ', '-', $attributes['paginationPosition']) : 'bottom-center';

        $wrapper_classes = [
            "bbb-slider-nav-position-$nav_position",
            "bbb-slider-pag-position-$pag_position"
        ];

        return [
            'class' => implode(' ', $wrapper_classes),
            'style' => $style_string,
        ];
    }
}

if (! function_exists('bbb_get_slider_nav_markup')) {
    /**
     * Return the HTML for slider navigation buttons.
     */
    function bbb_get_slider_nav_markup(): string
    {
        return '<div class="bbb-slider-nav-container">'
            . '<div class="swiper-button-prev"></div>'
            . '<div class="swiper-button-next"></div>'
            . '</div>';
    }
}

if (! function_exists('bbb_insert_slider_nav_after_wrapper')) {
    /**
     * Insert navigation markup after the first closing </ul> in the block content.
     */
    function bbb_insert_slider_nav_after_wrapper(string $block_content): string
    {
        return preg_replace(
            '/<\/ul>/',
            '</ul>' . bbb_get_slider_nav_markup(),
            $block_content,
            1
        );
    }
}
