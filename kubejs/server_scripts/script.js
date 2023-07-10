// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

let TC = (id) => `tconstruct:${id}`
let TS = (id) => `toms_storage:${id}`
let IE = (id) => `immersiveengineering:${id}`

// #region const
const deleteItems = [
	`oldguns:iron_with_coal`,
	TC(`earth_slime_sling`),
	TC(`ender_slime_sling`),
	TC(`ichor_slime_sling`),
	TC(`sky_slime_sling`),
	TC(`plate_cast`),
	TC(`plate_sand_cast`),
	TC(`plate_red_sand_cast`),
	TC(`wire_cast`),
	TC(`wire_sand_cast`),
	TC(`wire_red_sand_cast`),
	IE(`blastbrick`),
	IE(`alloybrick`)
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
	// common
	deleteItems.forEach(item => {
		event.remove([{ output: `${item}` }, { input: `${item}` }])
	})

	// #region バニラ型のツールのレシピを変更
	let removeTool = (material, removeInput) => {
		event.remove({ output: `${material}_pickaxe` })
		event.remove({ output: `${material}_axe` })
		event.remove({ output: `${material}_shovel` })
		event.remove({ output: `${material}_hoe` })
		event.remove({ output: `${material}_sword` })
		if (removeInput) {
			event.remove({ input: `${material}_pickaxe` })
			event.remove({ input: `${material}_axe` })
			event.remove({ input: `${material}_shovel` })
			event.remove({ input: `${material}_hoe` })
			event.remove({ input: `${material}_sword` })
		}
	}
	removeTool(`wooden`, true)
	removeTool(`stone`, true)
	removeTool(`iron`, false)
	removeTool(`diamond`, false)
	removeTool(IE(`steel`), true)
	event.smithing(`iron_pickaxe`, `golden_pickaxe`, `iron_ingot`)
	event.smithing(`iron_axe`, `golden_axe`, `iron_ingot`)
	event.smithing(`iron_shovel`, `golden_shovel`, `iron_ingot`)
	event.smithing(`iron_hoe`, `golden_hoe`, `iron_ingot`)
	event.smithing(`iron_sword`, `golden_sword`, `iron_ingot`)
	event.smithing(`diamond_pickaxe`, `iron_pickaxe`, `diamond`)
	event.smithing(`diamond_axe`, `iron_axe`, `diamond`)
	event.smithing(`diamond_shovel`, `iron_shovel`, `diamond`)
	event.smithing(`diamond_hoe`, `iron_hoe`, `diamond`)
	event.smithing(`diamond_sword`, `iron_sword`, `diamond`)
	event.recipes.create.filling(`diamond_pickaxe`, [`iron_pickaxe`, Fluid.of(TC(`molten_diamond`), 100)])
	event.recipes.create.filling(`diamond_axe`, [`iron_axe`, Fluid.of(TC(`molten_diamond`), 100)])
	event.recipes.create.filling(`diamond_shovel`, [`iron_shovel`, Fluid.of(TC(`molten_diamond`), 100)])
	event.recipes.create.filling(`diamond_hoe`, [`iron_hoe`, Fluid.of(TC(`molten_diamond`), 100)])
	event.recipes.create.filling(`diamond_sword`, [`iron_sword`, Fluid.of(TC(`molten_diamond`), 100)])
	// #endregion


	// #region 防具のレシピを変更
	let removeArmor = (material, removeInput) => {
		event.remove({ output: `${material}_helmet` })
		event.remove({ output: `${material}_chestplate` })
		event.remove({ output: `${material}_leggings` })
		event.remove({ output: `${material}_boots` })
		if (removeInput) {
			event.remove({ input: `${material}_helmet` })
			event.remove({ input: `${material}_chestplate` })
			event.remove({ input: `${material}_leggings` })
			event.remove({ input: `${material}_boots` })
		}
	}
	removeArmor(`iron`, false)
	removeArmor(`golden`, false)
	removeArmor(`diamond`, false)
	let addPlateArmor = (material, plate) => {
		event.shaped(`${material}_helmet`,
			[
				`PPP`,
				`PLP`
			], {
			P: `#forge:plates/${plate}`,
			L: `leather_helmet`
		})
		event.shaped(`${material}_chestplate`,
			[
				`PLP`,
				`PPP`,
				`PPP`
			], {
			P: `#forge:plates/${plate}`,
			L: `leather_chestplate`
		})
		event.shaped(`${material}_leggings`,
			[
				`PPP`,
				`PLP`,
				`P P`
			], {
			P: `#forge:plates/${plate}`,
			L: `leather_leggings`
		})
		event.shaped(`${material}_boots`,
			[
				`P P`,
				`PLP`
			], {
			P: `#forge:plates/${plate}`,
			L: `leather_boots`
		})
	}
	addPlateArmor(`iron`, `iron`)
	addPlateArmor(`golden`, `gold`)
	event.recipes.create.filling(`diamond_helmet`, [`iron_helmet`, Fluid.of(TC(`molten_diamond`), 500)])
	event.recipes.create.filling(`diamond_chestplate`, [`iron_chestplate`, Fluid.of(TC(`molten_diamond`), 800)])
	event.recipes.create.filling(`diamond_leggings`, [`iron_leggings`, Fluid.of(TC(`molten_diamond`), 700)])
	event.recipes.create.filling(`diamond_boots`, [`iron_boots`, Fluid.of(TC(`molten_diamond`), 400)])
	// #endregion

	// oldguns
	// #region 銃器用鋼鉄のレシピを変更
	event.remove({ output: `oldguns:steel_ingot` })
	let inter = `kubejs:unprocessed_steel_ingot`
	event.recipes.create.sequencedAssembly(`oldguns:steel_ingot`, `#forge:ingots/steel`, [
		event.recipes.create.filling(inter, [inter, Fluid.of(`lava`, 500)]),
		event.recipes.create.pressing(inter, inter),
		event.recipes.create.pressing(inter, inter),
		event.recipes.create.filling(inter, [inter, Fluid.of(`water`, 500)]),
	]).transitionalItem(inter).loops(1)
	// #endregion

	// tconstruct
	// #region 一部のキャストレシピを削除
	MetalMaterials.forEach(material => {
		event.remove({ type: TC(`casting_table`), output: `#forge:plates/${material}` })
		event.remove({ type: TC(`casting_table`), output: `#forge:wire/${material}` })
	})
	// #endregion

	// 燃え盛る血液
	event.recipes.create.mixing(Fluid.of(`tconstruct:blazing_blood`, 200), `kubejs:blaze_core`).superheated()

	// #region グラウトのレシピを変更
	event.remove({ id: `tconstruct:smeltery/seared/grout_multiple` })
	event.remove({ id: `tconstruct:smeltery/seared/grout` })
	event.recipes.create.mixing(
		[`2x tconstruct:grout`, Item.of(`tconstruct:grout`).withChance(0.5)],
		[`clay_ball`, `#sand`, `gravel`]
	)
	// #endregion

	// #region ネザーグラウトのレシピを変更
	event.remove({ id: `tconstruct:smeltery/scorched/nether_grout` })
	event.recipes.create.mixing(
		[`2x tconstruct:nether_grout`, Item.of(`tconstruct:nether_grout`).withChance(0.5)],
		[`magma_cream`, `#minecraft:soul_fire_base_blocks`, `gravel`]
	).heated()
	// #endregion

	// delight
	// #region 一部を除いたナイフのレシピを削除
		event.remove({id:`delightful:knives/silver_knife`})
		event.remove({id:`delightful:knives/copper_knife`})
		event.remove({id:`farmersdelight:golden_knife`})
		event.remove({id:`farmersdelight:diamond_knife`})
		event.remove({id:`farmersdelight:iron_knife`})
		event.remove({id:`farmersdelight:flint_knife`})
	// #endregion

	// #region ナイフのレシピを変更
	event.shaped(
		Item.of(`farmersdelight:iron_knife`),
		[
			` H`,
			`S `
		], {
		H: Item.of(`tconstruct:small_blade`, `{Material:"tconstruct:iron"}`),
		S: `#forge:rods/wooden`
	})
	event.shaped(
		Item.of(`farmersdelight:golden_knife`),
		[
			` H`,
			`S `
		], {
		H: `gold_ingot`,
		S: `#forge:rods/wooden`
	})
	event.shaped(
		Item.of(`farmersdelight:flint_knife`),
		[
			` H`,
			`S `
		], {
		H: Item.of(`tconstruct:small_blade`, `{Material:"tconstruct:flint"}`),
		S: `#forge:rods/wooden`
	})
	event.shaped(
		Item.of(`delightful:silver_knife`),
		[
			` H`,
			`S `
		], {
		H: Item.of(`tconstruct:small_blade`, `{Material:"tconstruct:silver"}`),
		S: `#forge:rods/wooden`
	})
	event.shaped(
		Item.of(`delightful:copper_knife`),
		[
			` H`,
			`S `
		], {
		H: Item.of(`tconstruct:small_blade`, `{Material:"tconstruct:copper"}`),
		S: `#forge:rods/wooden`
	})
	event.recipes.create.filling(Item.of(`farmersdelight:diamond_knife`), [`#farmersdelight:tools/knives`, Fluid.of(TC(`molten_diamond`), 100)])
	// #endregion

})

onEvent(`item.tags`, event => {

})

onEvent("lootjs", event => {
	event.addLootTableModifier(`minecraft:blocks/grass`)
		.removeLoot(`wheat_seeds`)
	event.addLootTableModifier(`minecraft:blocks/tall_grass`)
		.removeLoot(`wheat_seeds`)
})

onEvent(`entity.loot_tables`, event => {
	event.modifyEntity(`minecraft:blaze`, table => {
		table.addPool(pool => {
			pool.addItem(`kubejs:blaze_core`).randomChance(0.1)
		})
	})
})