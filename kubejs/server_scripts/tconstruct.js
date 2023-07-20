// priority: 1

let TC = (id) => `tconstruct:${id}`

// #region const
const deleteItems = [
	TC(`earth_slime_sling`),
	TC(`ender_slime_sling`),
	TC(`ichor_slime_sling`),
	TC(`sky_slime_sling`),
	TC(`plate_cast`),
	TC(`plate_sand_cast`),
	TC(`plate_red_sand_cast`),
	TC(`wire_cast`),
	TC(`wire_sand_cast`),
	TC(`wire_red_sand_cast`)
]
const MetalMaterials = [
	`aluminum`,
	`amethyst_bronze`,
	`brass`,
	`bronze`,
	`cobalt`,
	`constantan`,
	`copper`,
	`electrum`,
	`emerald`,
	`enderium`,
	`gold`,
	`hepatizon`,
	`inlet`,
	`iron`,
	`knightslime`,
	`lead`,
	`lumium`,
	`manyullyn`,
	`molten_debris`,
	`netherite`,
	`nickel`,
	`osmium`,
	`pewter`,
	`pig_iron`,
	`platinum`,
	`queens_slime`,
	`refined_glowstone`,
	`refined_obsidian`,
	`rose_gold`,
	`signalum`,
	`silver`,
	`slimesteel`,
	`soulsteel`,
	`steel`,
	`tin`,
	`tungsten`,
	`uranium`,
	`zinc`
]
// #endregion

onEvent(`recipes`, event => {
	deleteItems.forEach(item => {
		event.remove([{ output: `${item}` }, { input: `${item}` }])
	})

	// 一部のキャストレシピを削除
	MetalMaterials.forEach(material => {
		event.remove({ type: TC(`casting_table`), output: `#forge:plates/${material}` })
		event.remove({ type: TC(`casting_table`), output: `#forge:wire/${material}` })
	})

	// 燃え盛る血液のレシピを追加
	event.recipes.create.mixing(Fluid.of(`tconstruct:blazing_blood`, 200), `kubejs:blaze_core`).superheated().id(`kubejs:tconstruct/mixing/blazing_blood_from_blaze_core`)

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
	).heated()

	// smeltery_controller
	event.remove({ id: `tconstruct:smeltery/casting/seared/smeltery_controller` })
	event.recipes.create.mechanicalCrafting(`tconstruct:smeltery_controller`,
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
	})

	// compat
	event.remove({ id: /tconstruct:compat\/.+/ })
})

onEvent(`item.tags`, event => {
})

onEvent("lootjs", event => {
	deleteItems.forEach(item => {
		event.addLootTypeModifier(LootType.CHEST)
			.removeLoot(`${item}`)
	})
})

onEvent(`entity.loot_tables`, event => {
})