/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import {
	useInnerBlocksProps,
	BlockControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import Slider from './slider';
import Placeholder from './placeholder';
import { SettingsControl, NavigationStyleControl, PaginationStyleControl } from './controls';
import './editor.scss';

const DEFAULT_BLOCK = {
	name: 'blablablocks/slide',
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   props               Component props.
 * @param {string}   props.clientId      The client ID for this block instance.
 * @param {Object}   props.attributes    The block attributes.
 * @param {Function} props.setAttributes Function to update block attributes.
 *
 * @return {JSX.Element} The component rendering for the block editor.
 */
export default function Edit({ clientId, attributes, setAttributes }) {
	const { allowedBlocks } = attributes;
	const { insertBlock, selectBlock } = useDispatch(blockEditorStore);

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'swiper-wrapper' },
		{
			defaultBlock: DEFAULT_BLOCK,
			directInsert: true,
			orientation: 'horizontal',
			allowedBlocks,
		}
	);

	// Check if inner blocks exist using useSelect
	const innerBlocks = useSelect(
		(select) => select(blockEditorStore).getBlocks(clientId),
		[clientId]
	);

	const hasInnerBlocks = innerBlocks.length > 0;

	const addSlide = () => {
		const block = createBlock('blablablocks/slide');
		insertBlock(block, innerBlocks.length, clientId, false);
		selectBlock(block.clientId);
	};

	return hasInnerBlocks ? (
		<>
			<Slider
				clientId={clientId}
				attributes={attributes}
				innerBlocksProps={innerBlocksProps}
				innerBlocks={innerBlocks}
				setAttributes={setAttributes}
			/>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton onClick={addSlide}>
						{__('Add Slide', 'blablablocks-slider-block')}
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
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
	) : (
		<Placeholder clientId={clientId} setAttributes={setAttributes} />
	);
}
