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

onEvent(`recipes`, event => {
	const MetalMaterials = [`aluminum`, `amethyst_bronze`, `brass`, `bronze`, `cobalt`, `constantan`, `copper`, `electrum`, `emerald`, `enderium`, `gold`, `hepatizon`, `invar`, `iron`, `knightslime`, `lead`, `lumium`, `manyullyn`, `molten_debris`, `netherite`, `nickel`, `osmium`, `pewter`, `pig_iron`, `platinum`, `queens_slime`, `refined_glowstone`, `refined_obsidian`, `rose_gold`, `signalum`, `silver`, `slimesteel`, `soulsteel`, `steel`, `tin`, `tungsten`, `uranium`, `zinc`]

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
	let inter = `kubejs:unprocessed_steel_ingot`
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
	event.replaceInput({ id: `immersiveengineering:crafting/hammer` }, `#forge:ingots/iron`, `#forge:ingots/steel`)

	/* component_iron */
	event.remove({ id: `immersiveengineering:crafting/component_iron` })
	let inter = `kubejs:incomplete_component_iron`
	event.recipes.create.sequencedAssembly(IE(`component_iron`), `#forge:rods/iron`, [
		event.recipes.create.deploying(inter, [inter, IE(`wirecoil_copper`)]),
		event.recipes.create.deploying(inter, [inter, `#forge:plates/iron`]),
		event.recipes.create.deploying(inter, [inter, `#forge:plates/iron`]),
		event.recipes.create.deploying(inter, [inter, `#forge:plates/iron`])
	]).transitionalItem(inter).loops(1)

	/* component_steel */
	event.remove({ id: `immersiveengineering:crafting/component_steel` })
	let inter = `kubejs:incomplete_component_steel`
	event.recipes.create.sequencedAssembly(IE(`component_steel`), `#forge:rods/iron`, [
		event.recipes.create.deploying(inter, [inter, IE(`wirecoil_copper`)]),
		event.recipes.create.deploying(inter, [inter, `#forge:plates/steel`]),
		event.recipes.create.deploying(inter, [inter, `#forge:plates/steel`]),
		event.recipes.create.deploying(inter, [inter, `#forge:plates/steel`])
	]).transitionalItem(inter).loops(1)

	// armor_trims
	/* 強化と装飾 */
	let inter = `kubejs:incomplete_netherite_upgrade_smithing_template`
	event.recipes.create.sequencedAssembly(`armor_trims:netherite_upgrade_smithing_template`, `netherrack`, [
		event.recipes.create.deploying(inter, [inter, `armor_trims:netherite_upgrade_smithing_template`]).keepHeldItem(),
		event.recipes.create.pressing(inter, inter),
		event.recipes.create.filling(inter, [inter, Fluid.of(TC(`molten_diamond`), 300)]),
		event.recipes.create.pressing(inter, inter)
	]).transitionalItem(inter).loops(1)
	let inter = `kubejs:incomplete_coast_armor_trim_smithing_template`
	event.recipes.create.sequencedAssembly(`armor_trims:coast_armor_trim_smithing_template`, `#forge:cobblestone/normal`, [
		event.recipes.create.deploying(inter, [inter, `armor_trims:coast_armor_trim_smithing_template`]).keepHeldItem(),
		event.recipes.create.pressing(inter, inter),
		event.recipes.create.filling(inter, [inter, Fluid.of(TC(`molten_diamond`), 300)]),
		event.recipes.create.pressing(inter, inter)
	]).transitionalItem(inter).loops(1)
	let inter = `kubejs:incomplete_dune_armor_trim_smithing_template`
	event.recipes.create.sequencedAssembly(`armor_trims:dune_armor_trim_smithing_template`, `forge:sandstone`, [
		event.recipes.create.deploying(inter, [inter, `armor_trims:dune_armor_trim_smithing_template`]).keepHeldItem(),
		event.recipes.create.pressing(inter, inter),
		event.recipes.create.filling(inter, [inter, Fluid.of(TC(`molten_diamond`), 300)]),
		event.recipes.create.pressing(inter, inter)
	]).transitionalItem(inter).loops(1)
	let inter = `kubejs:incomplete_eye_armor_trim_smithing_template`
	event.recipes.create.sequencedAssembly(`armor_trims:eye_armor_trim_smithing_template`, `forge:end_stones`, [
		event.recipes.create.deploying(inter, [inter, `armor_trims:eye_armor_trim_smithing_template`]).keepHeldItem(),
		event.recipes.create.pressing(inter, inter),
		event.recipes.create.filling(inter, [inter, Fluid.of(TC(`molten_diamond`), 300)]),
		event.recipes.create.pressing(inter, inter)
	]).transitionalItem(inter).loops(1)
	let inter = `kubejs:incomplete_host_armor_trim_smithing_template`
	event.recipes.create.sequencedAssembly(`armor_trims:host_armor_trim_smithing_template`, `terracotta`, [
		event.recipes.create.deploying(inter, [inter, `armor_trims:host_armor_trim_smithing_template`]).keepHeldItem(),
		event.recipes.create.pressing(inter, inter),
		event.recipes.create.filling(inter, [inter, Fluid.of(TC(`molten_diamond`), 300)]),
		event.recipes.create.pressing(inter, inter)
	]).transitionalItem(inter).loops(1)
	let inter = `kubejs:incomplete_raiser_armor_trim_smithing_template`
	event.recipes.create.sequencedAssembly(`armor_trims:raiser_armor_trim_smithing_template`, `terracotta`, [
		event.recipes.create.deploying(inter, [inter, `armor_trims:raiser_armor_trim_smithing_template`]).keepHeldItem(),
		event.recipes.create.pressing(inter, inter),
		event.recipes.create.filling(inter, [inter, Fluid.of(TC(`molten_diamond`), 300)]),
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

	// ValkyrienSkies
	/* balloon */
	event.remove({ id: `vs_eureka:balloon_leather` })
	event.remove({ id: `vs_eureka:balloon_membrane` })
	event.remove({ id: `vs_eureka:balloon_paper` })
	event.remove({ id: `vs_eureka:balloon_string` })
	event.remove({ id: `vs_eureka:balloon_wool` })
	colors.forEach(color => {
		event.shaped(`vs_eureka:${color}_balloon`,
			[
				` s `,
				`s s`,
				` s `
			], {
			s: `create:${color}_sail`
		})
	})
	/* anchor */
	let recipe = `vs_eureka:anchor`
	event.remove({ id: `${recipe}` })
	event.shaped(`${recipe}`,
		[
			`sSs`,
			` S `,
			`SSS`
		], {
		s: `#forge:ingots/steel`,
		S: `#forge:nuggets/steel`
	}).id(`${recipe}`)
	/* ballast */
	let recipe = `vs_eureka:ballast`
	event.remove({ id: `${recipe}` })
	event.shapeless(`${recipe}`, [`create:fluid_tank`, `#forge:dusts/redstone`]).id(`${recipe}`)
	/* engine */
	let recipe = `vs_eureka:engine`
	event.shaped(`${recipe}`,
		[
			`P`,
			`B`,
			`R`
		], {
		P: `create:precision_mechanism`,
		B: `blast_furnace`,
		R: `create:railway_casing`
	}).id(`${recipe}`)
	/* floater */
	let recipe = `vs_eureka:floater`
	event.remove({ id: `${recipe}` })
	event.shapeless(`${recipe}`, [`create:linear_chassis`, `#forge:dusts/redstone`]).id(`${recipe}`)
	/* ship_helms */
	woods.forEach(wood => {
		let recipe = `vs_eureka:${wood}_ship_helm`
		event.shaped(`${recipe}`,
			[
				` B `,
				`RCP`,
				` I `
			], {
			B: `extendedgears:${wood}_cogwheel`,
			R: `create:rope_pulley`,
			C: `create:railway_casing`,
			P: `${wood}_planks`,
			I: `create:precision_mechanism`
		}).id(`${recipe}`)
	})

	// toms_storage
	let recipe = `toms_storage:crafting_terminal`
	event.remove({ id: `${recipe}` })
	event.create.mechanicalCrafting(`toms_storage:ts.crafting_terminal`,
		[
			` P `,
			`SSS`,
			`SSS`,
			`SSS`,
			`AML`
		], {
		P: `toms_storage:ts.storage_terminal`,
		S: `create:mechanical_crafter`,
		A: `create:sturdy_sheet`,
		M: `create:precision_mechanism`,
		L: `create:linked_controller`
	}).id(`${recipe}`)
	let recipe = `toms_storage:inventory_cable_connector_filtered`
	event.remove({ id: `${recipe}` })
	event.shaped(`toms_storage:ts.inventory_cable_connector_filtered`,
		[
			`I`,
			`S`,
			`P`
		], {
		I: `#forge:plates/brass`,
		S: `toms_storage:ts.inventory_cable_connector`,
		P: `create:electron_tube`
	}).id(`${recipe}`)
	let recipe = `toms_storage:inventory_cable_connector_framed`
	event.remove({ id: `${recipe}` })
	event.shaped(`toms_storage:ts.inventory_cable_connector_framed`,
		[
			`SSS`,
			`SCS`,
			`SSS`
		], {
		S: `#forge:rods/wooden`,
		C: `toms_storage:ts.inventory_cable_connector`
	}).id(`${recipe}`)
	let recipe = `toms_storage:inventory_cable_connector`
	event.remove({ id: `${recipe}` })
	event.shapeless(`toms_storage:ts.inventory_cable_connector`, [`toms_storage:ts.inventory_cable`, `create:chute`]).id(`${recipe}`)
	let recipe = `toms_storage:inventory_cable_framed`
	event.remove({ id: `${recipe}` })
	event.shaped(`toms_storage:ts.inventory_cable_framed`,
		[
			`SSS`,
			`SCS`,
			`SSS`
		], {
		S: `#forge:rods/wooden`,
		C: `toms_storage:ts.inventory_cable`
	}).id(`${recipe}`)
	let recipe = `toms_storage:inventory_cable`
	event.remove({ id: `${recipe}` })
	event.shapeless(`toms_storage:ts.inventory_cable`, [`#forge:plates/brass`, `dried_kelp`]).id(`${recipe}`)
	let recipe = `toms_storage:inventory_connector`
	event.remove({ id: `${recipe}` })
	event.shapeless(`toms_storage:ts.inventory_connector`, [`create:brass_casing`, `create:chute`]).id(`${recipe}`)
	let recipe = `toms_storage:inventory_proxy`
	event.remove({ id: `${recipe}` })
	event.shapeless(`toms_storage:ts.inventory_proxy`, [`toms_storage:ts.inventory_connector`, `create:smart_chute`]).id(`${recipe}`)
	let recipe = `toms_storage:level_emitter`
	event.remove({ id: `${recipe}` })
	event.shapeless(`toms_storage:ts.level_emitter`, [`create:content_observer`, `toms_storage:ts.inventory_cable`]).id(`${recipe}`)
	let recipe = `toms_storage:open_crate`
	event.remove({ id: `${recipe}` })
	event.shaped(`toms_storage:ts.open_crate`,
		[
			`PSP`,
			`PCP`,
			`PTP`
		], {
		P: `#minecraft:planks`,
		S: `#forge:rods/wooden`,
		C: `#forge:chests/wooden`,
		T: `#minecraft:trapdoors`
	}).id(`${recipe}`)
	let recipe = `toms_storage:paint_kit`
	event.remove({ id: `${recipe}` })
	event.shaped(`toms_storage:ts.paint_kit`,
		[
			`RGB`,
			`iaW`,
			`bS `
		], {
		R: `#forge:dyes/red`,
		G: `#forge:dyes/green`,
		B: `#forge:dyes/blue`,
		i: `#forge:dyes/black`,
		a: `bucket`,
		W: `#minecraft:wool`,
		b: `water_bucket`,
		S: `#forge:rods/wooden`
	}).id(`${recipe}`)
	let recipe = `toms_storage:storage_terminal`
	event.remove({ id: `${recipe}` })
	event.shaped(`toms_storage:ts.storage_terminal`,
		[
			` C `,
			`cGg`,
			`PPP`
		], {
		C: `create:precision_mechanism`,
		c: `create:content_observer`,
		G: `create:display_link`,
		g: `create:display_board`,
		P: `#minecraft:buttons`
	}).id(`${recipe}`)
	let recipe = `toms_storage:trim_clean`
	event.remove({ id: `${recipe}` })
	event.shapeless(`toms_storage:ts.trim`, [`toms_storage:ts.painted_trim`, `water_bucket`]).id(`${recipe}`)
	let recipe = `toms_storage:trim`
	event.remove({ id: `${recipe}` })
	event.shaped(`toms_storage:ts.trim`,
		[
			`SSS`,
			`SXS`,
			`SSS`
		], {
		S: `#forge:rods/wooden`,
		X: `create:brass_tunnel`
	}).id(`${recipe}`)
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