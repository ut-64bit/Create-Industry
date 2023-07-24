// priority: 1

let TC = (id) => `tconstruct:${id}`

// const

onEvent(`recipes`, event => {
	// 一部のキャストレシピを削除
	MetalMaterials.forEach(material => {
		event.remove({ type: TC(`casting_table`), output: `#forge:plates/${material}` })
		event.remove({ type: TC(`casting_table`), output: `#forge:wire/${material}` })
	})

	// 燃え盛る血液のレシピを追加
	event.recipes.create.mixing(Fluid.of(`tconstruct:blazing_blood`, 200), `kubejs:blaze_core`)
		.superheated()
		.id(`kubejs:tconstruct/mixing/blazing_blood_from_blaze_core`)

	// グラウトのレシピを変更
	event.remove({ id: `tconstruct:smeltery/seared/grout_multiple` })
	event.remove({ id: `tconstruct:smeltery/seared/grout` })
	event.recipes.create.mixing(
		[`2x tconstruct:grout`, Item.of(`tconstruct:grout`).withChance(0.5)],
		[`clay_ball`, `#sand`, `gravel`]
	).id(`kubejs:tconstruct/mixing/grout`)

	// ネザーグラウトのレシピを変更
	event.remove({ id: `tconstruct:smeltery/scorched/nether_grout` })
	event.recipes.create.mixing(
		[`2x tconstruct:nether_grout`, Item.of(`tconstruct:nether_grout`).withChance(0.5)],
		[`magma_cream`, `#minecraft:soul_fire_base_blocks`, `gravel`]
	).heated().id(`kubejs:tconstruct/mixing/nether_grout`)

	// smeltery_controller
	event.remove({ id: `tconstruct:smeltery/casting/seared/smeltery_controller` })
	event.recipes.create.mechanicalCrafting(`tconstruct:smeltery_controller`,
		[
			`bsb`,
			`sBs`,
			`bcb`
		], {
		b: `tconstruct:seared_brick`,
		s: `#forge:plates/steel`,
		B: `kubejs:blaze_core`,
		c: `#forge:ingots/copper`
	}).id(`kubejs:tconstruct/mechanical_crafting/smeltery_controller`)

	// foundry_controller
	/*
	event.remove({ id: `tconstruct:smeltery/casting/scorched/foundry_controller` })
	event.recipes.create.mechanicalCrafting(`tconstruct:foundry_controller`,
		[
			`bbbbb`,
			`bsssb`,
			`bsBsb`,
			`bcccb`,
			`bbbbb`
		], {
		b: `tconstruct:scorched_brick`,
		s: `#forge:plates/steel`,
		B: `kubejs:blaze_core`,
		c: `#forge:ingots/copper`
	}).id(`kubejs:tconstruct/mechanical_crafting/foundry_controller`)
	*/

	// compat
	event.remove({ id: /tconstruct:compat\/.+/ })
})

onEvent(`item.tags`, event => {
})

onEvent("lootjs", event => {
})

onEvent(`entity.loot_tables`, event => {

})