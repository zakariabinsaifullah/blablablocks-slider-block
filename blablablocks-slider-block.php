<?php

/**
 * Plugin Name:       BlaBlaBlocks Slider Block
 * Description:       Slider Block is a WordPress plugin built specifically for the Block Editor, allowing you to create responsive sliders effortlessly.
 * Requires at least: 6.6
 * Requires PHP:      7.4
 * Version:           1.1.0
 * Author:            Lubus
 * License:           MIT
 * License URI:       https://www.gnu.org/licenses/MIT
 * Text Domain:       blablablocks-slider-block
 *
 * @package blablablocks-slider-block
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

require_once plugin_dir_path(__FILE__) . 'helpers.php';

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 */
function bbb_slider_block_init()
{
	register_block_type(__DIR__ . '/build/slider');
	register_block_type(__DIR__ . '/build/slide');
}

/**
 * Enqueues the script for the slider variation in the block editor.
 */
function enqueue_query_slider_variation_script()
{
	$assetFile = get_asset_file();

	// Enqueue the script for the slider variation.
	wp_enqueue_script(
		'query-slider-variation',
		plugins_url('build/variations/query-slider/index.js', __FILE__),
		$assetFile['dependencies'],
		$assetFile['version'],
		true
	);
}

/**
 * Retrieves the asset file containing dependencies and version information.
 *
 * @return array|false The asset file array or false on failure.
 */
function get_asset_file()
{
	$assetFilePath = plugin_dir_path(__FILE__) . 'build/variations/query-slider/index.asset.php';

	if (file_exists($assetFilePath)) {
		return require $assetFilePath;
	}

	return false;
}

add_action('init', 'bbb_slider_block_init');
add_action('enqueue_block_editor_assets', 'enqueue_query_slider_variation_script');

/**
 * Retrieves the asset file containing dependencies and version information.
 *
 * @return array|false The asset file array or false on failure.
 */
function get_view_asset_file()
{
	$assetFilePath = plugin_dir_path(__FILE__) . 'build/slider/view.asset.php';

	if (file_exists($assetFilePath)) {
		return require $assetFilePath;
	}

	return false;
}

function blablablocks_register_slider_script()
{
	$assetFilePath = get_view_asset_file();

	wp_register_script(
		'blablablocks-slider-view',
		plugins_url('build/slider/view.js', __FILE__),
		$assetFilePath['dependencies'],
		$assetFilePath['version'],
		true
	);

	$handle = 'blablablocks-slider-frontend';
	$src    = plugins_url('build/slider/style-index.css', __FILE__);
	$ver    = filemtime(plugin_dir_path(__FILE__) . 'build/slider/style-index.css');
	wp_register_style($handle, $src, [], $ver);
}
add_action('init', 'blablablocks_register_slider_script');

/**
 * Add Swiper classes to our Query Loop Slider variation
 */
function blablablocks_query_slider_swiper_classes(string $block_content, array $block): string
{
	// only target the core/query block…
	if ($block['blockName'] !== 'core/query') {
		return $block_content;
	}

	// …and only when our variation is active
	$attrs = $block['attrs'] ?? [];
	if (empty($attrs['namespace']) || $attrs['namespace'] !== 'blablablocks/query-slider') {
		return $block_content;
	}

	wp_enqueue_script('blablablocks-slider-view');
	wp_enqueue_style('blablablocks-slider-frontend');

	// Generate wrapper attributes
	$wrapper_attrs = bbb_get_slider_wrapper_attributes($attrs, $block);

	// Prepare the JSON‐encoded settings
	$swiper_data = esc_attr(wp_json_encode($attrs));

	// 1) Add .swiper to the wrapper div
	$block_content = preg_replace(
		'/<div([^>]*?)class="([^"]*?)wp-block-query([^"]*?)"/',
		'<div$1class="$2wp-block-query$3 swiper ' . esc_attr($wrapper_attrs['class']) . '" style="' . esc_attr($wrapper_attrs['style']) . '" data-swiper="' . $swiper_data . '"',
		$block_content
	);

	// 2) Add .swiper-wrapper to the UL
	$block_content = preg_replace(
		'/<ul([^>]*?)class="([^"]*?)wp-block-post-template([^"]*?)"/',
		'<ul$1class="$2wp-block-post-template$3 swiper-wrapper"',
		$block_content
	);

	// 3) Add .swiper-slide to each LI
	$block_content = preg_replace(
		'/<li([^>]*?)class="([^"]*?)wp-block-post([^"]*?)"/',
		'<li$1class="$2wp-block-post$3 swiper-slide"',
		$block_content
	);

	// 4) Inject nav buttons via helper
	$block_content = bbb_insert_slider_nav_after_wrapper($block_content);

	return $block_content;
}
add_filter('render_block_core/query', 'blablablocks_query_slider_swiper_classes', 10, 2);

