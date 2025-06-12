<?php

/**
 * Render the slider block.
 *
 * @param array $attributes Block attributes.
 * @param string $content Block content.
 * @param WP_Block $block Block instance.
 *
 * @package blablablocks-slider-block
 */

 $wrapper_attributes = get_block_wrapper_attributes(
    bbb_get_slider_wrapper_attributes($attributes, $block)
);

?>
<div <?php echo wp_kses_data($wrapper_attributes); ?> role="region" aria-roledescription="carousel" aria-label="Slider block">
    <div class="swiper" <?php echo 'data-swiper="' . esc_attr(wp_json_encode($attributes)) . '"'; ?>>
        <div class="swiper-wrapper">
            <?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped  
            ?>
        </div>
        <?php echo bbb_get_slider_nav_markup(); ?>
    </div>
</div>