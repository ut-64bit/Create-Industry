// priority: 1

// const

onEvent('recipes', event => {
	// #region func
	const { create, immersiveengineering } = event.recipes;

	let item_application = (output, inputBlock, inputItem) => {
		event.custom({
			type: 'create:item_application',
			ingredients: [
				Ingredient.of(inputBlock).toJson(),
				Ingredient.of(inputItem).toJson()
			],
			results: [
				Item.of(output).toResultJson()
			]
		})
	}
	// #endregion

	// 一部のキャストレシピを削除
	MetalMaterials.forEach(material => {
		event.remove({ type: TC('casting_table'), output: `#forge:plates/${material}` })
		event.remove({ type: TC('casting_table'), output: `#forge:wire/${material}` })
	})

	// crafting_station
	item_application('tconstruct:crafting_station', 'minecraft:crafting_table', 'tconstruct:pattern')

	// 燃え盛る血液のレシピを追加
	create.mixing(Fluid.of('tconstruct:blazing_blood', 200), 'kubejs:blaze_core')
		.superheated()
		.id('kubejs:tconstruct/mixing/blazing_blood_from_blaze_core')

	// グラウトのレシピを変更
	event.remove({ id: 'tconstruct:smeltery/seared/grout_multiple' })
	event.remove({ id: 'tconstruct:smeltery/seared/grout' })
	create.mixing(
		['2x tconstruct:grout', Item.of('tconstruct:grout').withChance(0.5)],
		['clay_ball', '#sand', 'gravel']
	).id('kubejs:tconstruct/mixing/grout')

	// ネザーグラウトのレシピを変更
	event.remove({ id: 'tconstruct:smeltery/scorched/nether_grout' })
	create.mixing(
		['2x tconstruct:nether_grout', Item.of('tconstruct:nether_grout').withChance(0.5)],
		['magma_cream', '#minecraft:soul_fire_base_blocks', 'gravel']
	).heated().id('kubejs:tconstruct/mixing/nether_grout')

	// smeltery_controller
	event.remove({ id: 'tconstruct:smeltery/casting/seared/smeltery_controller' })
	create.mechanicalCrafting('tconstruct:smeltery_controller',
		[
			'bsb',
			'sBs',
			'bcb'
		], {
		b: 'tconstruct:seared_brick',
		s: '#forge:plates/steel',
		B: 'kubejs:blaze_core',
		c: '#forge:ingots/copper'
	}).id('kubejs:tconstruct/mechanical_crafting/smeltery_controller')

	// foundry_controller
	/*
	event.remove({ id: 'tconstruct:smeltery/casting/scorched/foundry_controller' })
	create.mechanicalCrafting('tconstruct:foundry_controller',
		[
			'bbbbb',
			'bsssb',
			'bsBsb',
			'bcccb',
			'bbbbb'
		], {
		b: 'tconstruct:scorched_brick',
		s: '#forge:plates/steel',
		B: 'kubejs:blaze_core',
		c: '#forge:ingots/copper'
	}).id('kubejs:tconstruct/mechanical_crafting/foundry_controller')
	*/

	// compat
	event.remove({ id: /tconstruct:compat\/.+/ })
})