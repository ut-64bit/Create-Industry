// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

// func
let TC = (id) => `tconstruct:${id}`
let TS = (id) => `toms_storage:${id}`
let IE = (id) => `immersiveengineering:${id}`

// #region const
const deleteItems = [
	`oldguns:iron_with_coal`,
	`toms_storage:ts.adv_wireless_terminal`,
	`toms_storage:ts.wireless_terminal`,
	`toms_storage:ts.inventory_hopper_basic`,
	IE(`blastbrick`),
	IE(`alloybrick`),
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
	// #region func
	const { sequencedAssembly, deploying, filling, mechanicalCrafting, compacting, mixing, emptying, haunting, pressing } = event.recipes.create;
	let item_application = (output, inputBlock, inputItem) => {
		event.custom({
			type: `create:item_application`,
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
	filling(`diamond_pickaxe`, [`iron_pickaxe`, Fluid.of(TC(`molten_diamond`), 100)])
	filling(`diamond_axe`, [`iron_axe`, Fluid.of(TC(`molten_diamond`), 100)])
	filling(`diamond_shovel`, [`iron_shovel`, Fluid.of(TC(`molten_diamond`), 100)])
	filling(`diamond_hoe`, [`iron_hoe`, Fluid.of(TC(`molten_diamond`), 100)])
	filling(`diamond_sword`, [`iron_sword`, Fluid.of(TC(`molten_diamond`), 100)])
	// #endregion

	// #region 防具のレシピを変更
	// func
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

	// 鉄防具
	removeArmor(`iron`, false)
	addPlateArmor(`iron`, `iron`)

	// 金防具
	removeArmor(`golden`, false)
	addPlateArmor(`golden`, `gold`)

	// #region ieの鋼鉄防具
	event.remove({ id: `immersiveengineering:crafting/armor_steel_head` })
	event.remove({ id: `immersiveengineering:crafting/armor_steel_chest` })
	event.remove({ id: `immersiveengineering:crafting/armor_steel_legs` })
	event.remove({ id: `immersiveengineering:crafting/armor_steel_feet` })

	event.shaped(`immersiveengineering:armor_steel_head`,
		[
			`PPP`,
			`PLP`
		], {
		P: `#forge:plates/steel`,
		L: `leather_helmet`
	})
	event.shaped(`immersiveengineering:armor_steel_chest`,
		[
			`PLP`,
			`PPP`,
			`PPP`
		], {
		P: `#forge:plates/steel`,
		L: `leather_chestplate`
	})
	event.shaped(`immersiveengineering:armor_steel_legs`,
		[
			`PPP`,
			`PLP`,
			`P P`
		], {
		P: `#forge:plates/steel`,
		L: `leather_leggings`
	})
	event.shaped(`immersiveengineering:armor_steel_feet`,
		[
			`P P`,
			`PLP`
		], {
		P: `#forge:plates/steel`,
		L: `leather_boots`
	})
	// #endregion

	// #region ダイヤ防具
	removeArmor(`diamond`, false)

	filling(`diamond_helmet`, [`iron_helmet`, Fluid.of(TC(`molten_diamond`), 500)])
	filling(`diamond_chestplate`, [`iron_chestplate`, Fluid.of(TC(`molten_diamond`), 800)])
	filling(`diamond_leggings`, [`iron_leggings`, Fluid.of(TC(`molten_diamond`), 700)])
	filling(`diamond_boots`, [`iron_boots`, Fluid.of(TC(`molten_diamond`), 400)])
	// #endregion
	// #endregion

	// oldguns
	// #region 銃器用鋼鉄のレシピを変更
	event.remove({ output: `oldguns:steel_ingot` })
	let inter = `kubejs:unprocessed_steel_ingot`
	sequencedAssembly(`oldguns:steel_ingot`, `#forge:ingots/steel`, [
		filling(inter, [inter, Fluid.of(`lava`, 500)]),
		pressing(inter, inter),
		pressing(inter, inter),
		filling(inter, [inter, Fluid.of(`water`, 500)]),
	]).transitionalItem(inter).loops(1).id(`kubejs:oldguns/sequenced_assembly/steel_ingot`)
	// #endregion

	// misc
	event.replaceInput({ input: 'supplementaries:rope' }, 'supplementaries:rope', `#supplementaries:ropes`)
	event.replaceInput({ input: 'farmersdelight:rope' }, 'farmersdelight:rope', `#supplementaries:ropes`)
	event.replaceOutput({ output: 'supplementaries:rope' }, 'supplementaries:rope', `farmersdelight:rope`)
	event.remove({ id: `farmersdelight:rope` })
	event.shaped(`farmersdelight:rope`,
		[
			`a`,
			`a`
		], { a: 'farmersdelight:straw' }
	).id(`farmersdelight:rope`)
})

onEvent(`item.tags`, event => {
})

onEvent("lootjs", event => {
	event.addLootTableModifier(`minecraft:blocks/grass`)
		.removeLoot(`wheat_seeds`)
	event.addLootTableModifier(`minecraft:blocks/tall_grass`)
		.removeLoot(`wheat_seeds`)

	event.addBlockLootModifier('#forge:ores').modifyLoot('#forge:raw_materials', item => {
		const replacement = AlmostUnified.getReplacementForItem(item);
		if (replacement.isEmpty()) {
			return item;
		}
		replacement.setCount(item.getCount());
		return replacement;
	});


	deleteItems.forEach(item => {
		event.addLootTypeModifier(LootType.CHEST)
			.removeLoot(`${item}`)
	})
})

onEvent(`entity.loot_tables`, event => {
	event.modifyEntity(`minecraft:blaze`, table => {
		table.addPool(pool => {
			pool.addItem(`kubejs:blaze_core`).randomChance(0.1)
		})
	})
})