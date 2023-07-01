// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

let TC = (id) => `tconstruct:${id}`
let TS = (id) => `toms_storage:${id}`
let IE = (id) => `immersiveengineering:${id}`

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
	TC(`gear_cast`),
	TC(`gear_sand_cast`),
	TC(`gear_red_sand_cast`)
]

const colors = [
	`black`,
	`blue`,
	`brown`,
	`cyan`,
	`gray`,
	`green`,
	`light_blue`,
	`light_gray`,
	`lime`,
	`magenta`,
	`orange`,
	`pink`,
	`purple`,
	`red`,
	`white`,
	`yellow`
]

const woods = [
	`oak`,
	`dark_oak`,
	`spruce`,
	`birch`,
	`jungle`,
	`acacia`,
	`crimson`,
	`warped`
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
	`invar`,
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

onEvent(`recipes`, event => {
	// common
	deleteItems.forEach(item => {
		event.remove([{ output: `${item}` }, { input: `${item}` }])
	})

	/* バニラ型のツールのレシピを変更 */
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
	event.create.filling(`diamond_pickaxe`, [`iron_pickaxe`, Fluid.of(TC(`molten_diamond`), 100)])
	event.create.filling(`diamond_axe`, [`iron_axe`, Fluid.of(TC(`molten_diamond`), 100)])
	event.create.filling(`diamond_shovel`, [`iron_shovel`, Fluid.of(TC(`molten_diamond`), 100)])
	event.create.filling(`diamond_hoe`, [`iron_hoe`, Fluid.of(TC(`molten_diamond`), 100)])
	event.create.filling(`diamond_sword`, [`iron_sword`, Fluid.of(TC(`molten_diamond`), 100)])


	/* 防具のレシピを変更 */
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

	// minecraft
	/* 鋼鉄の変換レシピ */
	event.shapeless(`alloyed:steel_ingot`, `#forge:ingots/steel`)
	event.shapeless(IE(`ingot_steel`), `#forge:ingots/steel`)
	event.shapeless(`thermal:steel_ingot`, `#forge:ingots/steel`)

	// oldguns
	/* 銃器用鋼鉄のレシピを変更 */
	event.remove({ output: `oldguns:steel_ingot` })
	var inter = `kubejs:unprocessed_steel_ingot`
	event.recipes.create.sequencedAssembly(`oldguns:steel_ingot`, `#forge:ingots/steel`, [
		event.recipes.create.filling(inter, [inter, Fluid.of(`lava`, 500)]),
		event.recipes.create.pressing(inter, inter),
		event.recipes.create.pressing(inter, inter),
		event.recipes.create.filling(inter, [inter, Fluid.of(`water`, 500)]),
	]).transitionalItem(inter).loops(1)

	// tconstruct
	/* 一部のキャストレシピを削除 */
	MetalMaterials.forEach(material => {
		event.remove({ type: TC(`casting_table`), output: `#forge:plates/${material}` })
		event.remove({ type: TC(`casting_table`), output: `#forge:wire/${material}` })
		event.remove({ type: TC(`casting_table`), output: `#forge:gears/${material}` })
	})

	/* グラウトのレシピを変更 */
	event.remove({ id: `tconstruct:smeltery/seared/grout_multiple` })
	event.remove({ id: `tconstruct:smeltery/seared/grout` })
	event.recipes.create.mixing(
		[`2x tconstruct:grout`, Item.of(`tconstruct:grout`).withChance(0.5)],
		[`clay_ball`, `#sand`, `gravel`]
	)

	// create
	/* 合金をつくった時の出力を液体に変更 */
	event.replaceOutput({ id: `alloyed:mixing/bronze_ingot` }, `alloyed:bronze_ingot`, Fluid.of(TC(`molten_bronze`), 90))
	event.replaceOutput({ id: `alloyed:mixing/bronze_ingot_x3` }, `alloyed:bronze_ingot`, Fluid.of(TC(`molten_bronze`), 270))
	event.replaceOutput({ id: `alloyed:mixing/steel_ingot` }, `alloyed:steel_ingot`, Fluid.of(TC(`molten_steel`), 270))
	event.replaceOutput({ id: `create:mixing/brass_ingot` }, `create:brass_ingot`, Fluid.of(TC(`molten_brass`), 180))

	/* 一部の歯車のレシピを削除 */
	event.remove({ id: `extendedgears:smelting/half_shaft_steel_cogwheel_from_iron` })
	event.remove({ id: `extendedgears:blasting/half_shaft_steel_cogwheel_from_iron` })
	event.remove({ id: `extendedgears:smelting/large_half_shaft_steel_cogwheel_from_iron` })
	event.remove({ id: `extendedgears:blasting/large_half_shaft_steel_cogwheel_from_iron` })
	event.remove({ id: `extendedgears:smelting/shaftless_steel_cogwheel_from_iron` })
	event.remove({ id: `extendedgears:blasting/shaftless_steel_cogwheel_from_iron` })
	event.remove({ id: `extendedgears:smelting/large_shaftless_steel_cogwheel_from_iron` })
	event.remove({ id: `extendedgears:blasting/large_shaftless_steel_cogwheel_from_iron` })
	event.remove({ id: `extendedgears:smelting/steel_cogwheel_from_iron` })
	event.remove({ id: `extendedgears:blasting/steel_cogwheel_from_iron` })
	event.remove({ id: `extendedgears:smelting/large_steel_cogwheel_from_iron` })
	event.remove({ id: `extendedgears:blasting/large_steel_cogwheel_from_iron` })

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
	/* hammer */
	event.replaceInput({ id: `immersiveengineering:crafting/hammer` }, `#forge:ingots/iron`, `#forge:ingots/steel`)

	/* component_iron */
	event.remove({ id: `immersiveengineering:crafting/component_iron` })
	var inter = `kubejs:incomplete_component_iron`
	event.recipes.create.sequencedAssembly(IE(`component_iron`), `#forge:rods/iron`, [
		event.recipes.create.deploying(inter, [inter, IE(`wirecoil_copper`)]),
		event.recipes.create.deploying(inter, [inter, `#forge:plates/iron`]),
		event.recipes.create.deploying(inter, [inter, `#forge:plates/iron`]),
		event.recipes.create.deploying(inter, [inter, `#forge:plates/iron`])
	]).transitionalItem(inter).loops(1)

	/* component_steel */
	event.remove({ id: `immersiveengineering:crafting/component_steel` })
	var inter = `kubejs:incomplete_component_steel`
	event.recipes.create.sequencedAssembly(IE(`component_steel`), `#forge:rods/iron`, [
		event.recipes.create.deploying(inter, [inter, IE(`wirecoil_copper`)]),
		event.recipes.create.deploying(inter, [inter, `#forge:plates/steel`]),
		event.recipes.create.deploying(inter, [inter, `#forge:plates/steel`]),
		event.recipes.create.deploying(inter, [inter, `#forge:plates/steel`])
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
		Item.of(`delightful:bronze_knife`),
		[
			` H`,
			`S `
		], {
		H: Item.of(`tconstruct:small_blade`, `{Material:"tconstruct:bronze"}`),
		S: `#forge:rods/wooden`
	})
	event.recipes.create.filling(Item.of(`farmersdelight:damond_knife`), [`#farmersdelight:tools/knives`, Fluid.of(TC(`molten_diamond`), 100)])
})

onEvent(`item.tags`, event => {
	// eureka
	event.add(`vs_eureka:balloons`, `vs_eureka:bolloon`)
	colors.forEach(color => {
		event.add(`vs_eureka:balloons`, `vs_eureka:${color}_bolloon`)
	})
	woods.forEach(wood => {
		event.add(`vs_eureka:ship_helms`, `vs_eureka:${wood}_ship_helm`)
	})
})

onEvent("lootjs", (event) => {
	event.addLootTableModifier(`minecraft:blocks/grass`)
		.removeLoot(`wheat_seeds`);
	event.addLootTableModifier(`minecraft:blocks/tall_grass`)
		.removeLoot(`wheat_seeds`);
});
