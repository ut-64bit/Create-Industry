// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

let TC = (id) => `tconstruct:${id}`
let IE = (id) => `immersiveengineering:${id}`

const deleteItems = [
	`oldguns:iron_with_coal`,
	`tconstruct:earth_slime_sling`,
	`tconstruct:ender_slime_sling`,
	`tconstruct:ichor_slime_sling`,
	`tconstruct:sky_slime_sling`,
	`davebuildingmod:steel_ingot`,
	`davebuildingmod:steel_block`,
	TC(`plate_cast`),
	TC(`plate_sand_cast`),
	TC(`plate_red_sand_cast`),
	TC(`wire_cast`),
	TC(`wire_sand_cast`),
	TC(`wire_red_sand_cast`),
	TC(`gear_cast`),
	TC(`gear_sand_cast`),
	TC(`gear_red_sand_cast`)
]

onEvent(`recipes`, event => {
	const MetalMaterials = [`aluminum`, `amethyst_bronze`, `brass`, `bronze`, `cobalt`, `constantan`, `copper`, `electrum`, `emerald`, `enderium`, `gold`, `hepatizon`, `invar`, `iron`, `knightslime`, `lead`, `lumium`, `manyullyn`, `molten_debris`, `netherite`, `nickel`, `osmium`, `pewter`, `pig_iron`, `platinum`, `queens_slime`, `refined_glowstone`, `refined_obsidian`, `rose_gold`, `signalum`, `silver`, `slimesteel`, `soulsteel`, `steel`, `tin`, `tungsten`, `uranium`, `zinc`]

	// common
	deleteItems.forEach(item => {
		event.remove([{ output: `${item}` }, { input: `${item}` }])
	})

	/* 金属の圧縮レシピを変更 */
	MetalMaterials.forEach(material => {
		event.remove({ type: `minecraft:craft_shaped`, output: `#forge:ingots/${material}`, input: `#forge:nuggets/${material}` })
		event.remove({ type: `minecraft:craft_shaped`, output: `#forge:storage_blocks/${material}`, input: `#forge:ingots/${material}` })
	})
	/**
	 * event.remove({id:`alloyed:crafting/bronze_ingot_from_compacting`})
	 * event.remove({id:`alloyed:crafting/bronze/bronze_block`})
	 * event.remove({id:`alloyed:crafting/steel_block_from_compacting`})
	 * event.remove({id:`alloyed:crafting/steel_ingot_from_compacting`})
	 */
	MetalMaterials.forEach(material => {
		let input = `#forge:nuggets/${material}`
		event.recipes.create.compacting(`#forge:ingots/${material}`, [
			input, input, input,
			input, input, input,
			input, input, input
		]).heated()
		let input = `#forge:ingots/${material}`
		event.recipes.create.compacting(`#forge:storage_blocks/${material}`, [
			input, input, input,
			input, input, input,
			input, input, input
		]).heated()
	})

	/* バニラ型のツールを削除 */
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
	removeTool(`golden`, true)
	removeTool(`iron`, true)
	removeTool(`diamond`, true)
	removeTool(`netherite`, true)
	removeTool(`immersiveengineering:steel`, true)
	removeTool(`create_sa:copper`, true)
	removeTool(`create_sa:brass`, true)
	removeTool(`create_sa:zinc`, true)

	/* 防具のレシピを削除 */
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
	removeArmor(`create_sa:brass`, false)
	removeArmor(`create_sa:copper`, false)
	removeArmor(`create_sa:zinc`, true)

	/* 防具のレシピを変更 */
	let addPlateArmor = (material, plate) => {
		event.shaped(`${material}_helmet`,
			[
				`PPP`,
				`PLP`
			], {
			P: `#forge:plates/${plate}`,
			L: `minecraft:leather_helmet`
		})
		event.shaped(`${material}_chestplate`,
			[
				`PLP`,
				`PPP`,
				`PPP`
			], {
			P: `#forge:plates/${plate}`,
			L: `minecraft:leather_chestplate`
		})
		event.shaped(`${material}_leggings`,
			[
				`PPP`,
				`PLP`,
				`P P`
			], {
			P: `#forge:plates/${plate}`,
			L: `minecraft:leather_leggings`
		})
		event.shaped(`${material}_boots`,
			[
				`P P`,
				`PLP`
			], {
			P: `#forge:plates/${plate}`,
			L: `minecraft:leather_boots`
		})
	}
	addPlateArmor(`iron`, `iron`)
	addPlateArmor(`golden`, `gold`)
	addPlateArmor(`create_sa:brass`, `brass`)
	addPlateArmor(`create_sa:copper`, `copper`)
	event.recipes.create.filling(`diamond_helmet`, [`iron_helmet`, Fluid.of(`tconstruct:molten_diamond`, 500)])
	event.recipes.create.filling(`diamond_chestplate`, [`iron_chestplate`, Fluid.of(`tconstruct:molten_diamond`, 800)])
	event.recipes.create.filling(`diamond_leggings`, [`iron_leggings`, Fluid.of(`tconstruct:molten_diamond`, 700)])
	event.recipes.create.filling(`diamond_boots`, [`iron_boots`, Fluid.of(`tconstruct:molten_diamond`, 400)])

	// minecraft
	/* 鋼鉄の変換レシピ */
	event.shapeless(`alloyed:steel_ingot`, `#forge:ingots/steel`)
	event.shapeless(`immersiveengineering:ingot_steel`, `#forge:ingots/steel`)
	event.shapeless(`thermal:steel_ingot`, `#forge:ingots/steel`)

	/* かまど製錬レシピを変更 */
	event.replaceOutput({ id: `minecraft:iron_ingot_from_smelting_raw_iron` }, `iron_ingot`, `9x iron_nugget`)
	event.replaceOutput({ id: `minecraft:gold_ingot_from_smelting_raw_gold` }, `gold_ingot`, `9x gold_nugget`)
	event.replaceOutput({ id: `minecraft:copper_ingot_from_smelting_raw_copper` }, `iron_ingot`, `9x copper_nugget`)

	// oldguns
	/* 銃器用鋼鉄のレシピを変更 */
	event.remove({ output: `oldguns:steel_ingot` })
	let inter = `kubejs:unprocessed_steel_ingot`
	event.recipes.create.sequencedAssembly(`oldguns:steel_ingot`, `#forge:ingots/steel`, [
		event.recipes.create.filling(inter, [inter, Fluid.of(`minecraft:lava`, 500)]),
		event.recipes.create.pressing(inter, inter),
		event.recipes.create.pressing(inter, inter),
		event.recipes.create.filling(inter, [inter, Fluid.of(`minecraft:water`, 500)]),
	]).transitionalItem(inter).loops(1)

	// tconstruct
	/* 一部のキャストレシピを削除 */
	event.remove({ type: `tconstruct:casting_table`, output: /#forge:plates\/.*/ })
	event.remove({ type: `tconstruct:casting_table`, output: /#forge:wires\/.*/ })
	event.remove({ type: `tconstruct:casting_table`, output: /#forge:gears\/.*/ })

	/* グラウトのレシピを変更 */
	event.remove({ id: `tconstruct:smeltery/seared/grout_multiple` })
	event.remove({ id: `tconstruct:smeltery/seared/grout` })
	event.recipes.create.mixing(
		[`2x tconstruct:grout`, Item.of(`tconstruct:grout`).withChance(0.5)],
		[`minecraft:clay_ball`, `#minecraft:sand`, `minecraft:gravel`]
	)

	// create
	/* 合金をつくった時の出力を液体に変更 */
	event.replaceOutput({ id: `alloyed:mixing/bronze_ingot` }, `alloyed:bronze_ingot`, Fluid.of(`tconstruct:molten_bronze`, 90))
	event.replaceOutput({ id: `alloyed:mixing/bronze_ingot_x3` }, `alloyed:bronze_ingot`, Fluid.of(`tconstruct:molten_bronze`, 270))
	event.replaceOutput({ id: `alloyed:mixing/steel_ingot` }, `alloyed:steel_ingot`, Fluid.of(`tconstruct:molten_steel`, 270))
	event.replaceOutput({ id: `create:mixing/brass_ingot` }, `create:brass_ingot`, Fluid.of(`tconstruct:molten_brass`, 180))

	/* 液体⇄インゴット */
	let melt = (output, item, gem) => {
		if (gem) {
			event.recipes.create.compacting(`${output}`, Fluid.of(TC(`molten_${item}`), 100))
			event.recipes.create.mixing(Fluid.of(TC(`molten_${item}`), 100), `#forge:gems/${item}`).superheated()
		} else {
			event.recipes.create.compacting(`${output}`, Fluid.of(TC(`molten_${item}`), 90))
			event.recipes.create.mixing(Fluid.of(TC(`molten_${item}`), 90), `#forge:ingots/${item}`).heated()
		}
	}
	melt(`iron_ingot`, `iron`, false)
	melt(`gold_ingot`, `gold`, false)
	melt(`create:brass_ingot`, `brass`, false)
	melt(`alloyed:bronze_ingot`, `bronze`, false)
	melt(`aloyed:steel_ingot`, `steel`, false)
	melt(`diamond`, `diamond`, true)

	/* 雑多なレシピを追加 */
	event.recipes.create.crushing([`create:copper_nugget`, `red_sand`], `terracotta`).processingTime(150)
	event.recipes.create.filling(`magma_block`, [`netherrack`, Fluid.of(`lava`, 500)])
	event.recipes.create.emptying([`obsidian`, Fluid.of(`lava`, 250)], `magma_block`)
	event.recipes.create.haunting(`netherrack`, `clay`)

	// immersiveengineering
	event.replaceInput({ id: IE(`crafting/hammer`) }, `#forge:ingots/iron`, `#forge:ingots/steel`)

	/* component_iron */
	event.remove({ id: IE(`crafting/component_iron`) })
	let inter = `kubejs:incomplete_component_iron`
	event.recipes.create.sequencedAssembly(IE(`component_iron`), `#forge:rods/iron`, [
		event.recipes.create.deploying(inter, [inter, `immersiveengineering:wirecoil_copper`]),
		event.recipes.create.deploying(inter, [inter, `#forge:plates/iron`]),
		event.recipes.create.deploying(inter, [inter, `#forge:plates/iron`]),
		event.recipes.create.deploying(inter, [inter, `#forge:plates/iron`])
	]).transitionalItem(inter).loops(1)

	/* component_steel */
	event.remove({ id: `immersiveengineering:crafting/component_steel` })
	let inter = `kubejs:incomplete_component_steel`
	event.recipes.create.sequencedAssembly(`immersiveengineering:component_steel`, `#forge:rods/iron`, [
		event.recipes.create.deploying(inter, [inter, `immersiveengineering:wirecoil_copper`]),
		event.recipes.create.deploying(inter, [inter, `#forge:plates/steel`]),
		event.recipes.create.deploying(inter, [inter, `#forge:plates/steel`]),
		event.recipes.create.deploying(inter, [inter, `#forge:plates/steel`])
	]).transitionalItem(inter).loops(1)

	// armor_trims
	/* 強化と装飾 */
	let inter = `kubejs:incomplete_netherite_upgrade_smithing_template`
	event.recipes.create.sequencedAssembly(`armor_trims:netherite_upgrade_smithing_template`, `minecraft:netherrack`, [
		event.recipes.create.deploying(inter, [inter, `armor_trims:netherite_upgrade_smithing_template`]).keepHeldItem(),
		event.recipes.create.pressing(inter, inter),
		event.recipes.create.filling(inter, [inter, Fluid.of(`tconstruct:molten_diamond`, 300)]),
		event.recipes.create.pressing(inter, inter)
	]).transitionalItem(inter).loops(1)
	let inter = `kubejs:incomplete_coast_armor_trim_smithing_template`
	event.recipes.create.sequencedAssembly(`armor_trims:coast_armor_trim_smithing_template`, `#forge:cobblestone/normal`, [
		event.recipes.create.deploying(inter, [inter, `armor_trims:coast_armor_trim_smithing_template`]).keepHeldItem(),
		event.recipes.create.pressing(inter, inter),
		event.recipes.create.filling(inter, [inter, Fluid.of(`tconstruct:molten_diamond`, 300)]),
		event.recipes.create.pressing(inter, inter)
	]).transitionalItem(inter).loops(1)
	let inter = `kubejs:incomplete_dune_armor_trim_smithing_template`
	event.recipes.create.sequencedAssembly(`armor_trims:dune_armor_trim_smithing_template`, `forge:sandstone`, [
		event.recipes.create.deploying(inter, [inter, `armor_trims:dune_armor_trim_smithing_template`]).keepHeldItem(),
		event.recipes.create.pressing(inter, inter),
		event.recipes.create.filling(inter, [inter, Fluid.of(`tconstruct:molten_diamond`, 300)]),
		event.recipes.create.pressing(inter, inter)
	]).transitionalItem(inter).loops(1)
	let inter = `kubejs:incomplete_eye_armor_trim_smithing_template`
	event.recipes.create.sequencedAssembly(`armor_trims:eye_armor_trim_smithing_template`, `forge:end_stones`, [
		event.recipes.create.deploying(inter, [inter, `armor_trims:eye_armor_trim_smithing_template`]).keepHeldItem(),
		event.recipes.create.pressing(inter, inter),
		event.recipes.create.filling(inter, [inter, Fluid.of(`tconstruct:molten_diamond`, 300)]),
		event.recipes.create.pressing(inter, inter)
	]).transitionalItem(inter).loops(1)
	let inter = `kubejs:incomplete_host_armor_trim_smithing_template`
	event.recipes.create.sequencedAssembly(`armor_trims:host_armor_trim_smithing_template`, `minecraft:terracotta`, [
		event.recipes.create.deploying(inter, [inter, `armor_trims:host_armor_trim_smithing_template`]).keepHeldItem(),
		event.recipes.create.pressing(inter, inter),
		event.recipes.create.filling(inter, [inter, Fluid.of(`tconstruct:molten_diamond`, 300)]),
		event.recipes.create.pressing(inter, inter)
	]).transitionalItem(inter).loops(1)
	let inter = `kubejs:incomplete_raiser_armor_trim_smithing_template`
	event.recipes.create.sequencedAssembly(`armor_trims:raiser_armor_trim_smithing_template`, `minecraft:terracotta`, [
		event.recipes.create.deploying(inter, [inter, `armor_trims:raiser_armor_trim_smithing_template`]).keepHeldItem(),
		event.recipes.create.pressing(inter, inter),
		event.recipes.create.filling(inter, [inter, Fluid.of(`tconstruct:molten_diamond`, 300)]),
		event.recipes.create.pressing(inter, inter)
	]).transitionalItem(inter).loops(1)

	// delight
	/* 一部を除いたナイフのレシピを削除 */
	event.remove({ output: `#farmersdelight:tools/knives`, not: [{ output: `allyed:steel_knife` }, { output: `delightful:experience_knife` }, { output: `delightful:gilded_quartz_knife` }, { output: `farmersdelight:netherite_knife` }] })

	/* ナイフのレシピを変更 */
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
		Item.of(`delightful:bronze_knife`),
		[
			` H`,
			`S `
		], {
		H: Item.of(`tconstruct:small_blade`, `{Material:"tconstruct:bronze"}`),
		S: `#forge:rods/wooden`
	})
	event.recipes.create.filling(Item.of(`farmersdelight:diamond_knife`), [`#farmersdelight:tools/knives`, Fluid.of(`tconstruct:molten_diamond`, 100)])
	event.recipes.create.filling(Item.of(`farmersdelight:golden_knife`), [`#farmersdelight:tools/knives`, Fluid.of(`tconstruct:molten_gold`, 90)])
	event.recipes.create.filling(Item.of(`delightful:brass_knife`), [`#farmersdelight:tools/knives`, Fluid.of(`tconstruct:molten_brass`, 90)])
	event.recipes.create.filling(Item.of(`delightful:nickel_knife`), [`#farmersdelight:tools/knives`, Fluid.of(`tconstruct:molten_nickel`, 90)])
})

onEvent(`item.tags`, event => {
	// item tag
	/**
	 * deleteItems.forEach(item => {
	 * 	event.removeAllTagsFrom(`${item}`)
	 * })
	 */
})

onEvent("lootjs", (event) => {
	event.addLootTableModifier(`minecraft:blocks/grass`)
		.removeLoot(`minecraft:wheat_seeds`);
	event.addLootTableModifier(`minecraft:blocks/tall_grass`)
		.removeLoot(`minecraft:wheat_seeds`);
});