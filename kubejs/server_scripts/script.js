// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

onEvent(`recipes`, event => {
	//common
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
	removeArmor(`iron`, true)
	removeArmor(`golden`, true)
	removeArmor(`diamond`, true)

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

	}

	// minecraft
	event.shapeless(`alloyed:steel_ingot`, `#forge:ingots/steel`)
	event.shapeless(`immersiveengineering:ingot_steel`, `#forge:ingots/steel`)
	event.shapeless(`thermal:steel_ingot`, `#forge:ingots/steel`)
	event.blasting(`minecraft:blaze_powder`, `minecraft:gunpowder`)

	// oldguns
	event.remove({ output: `oldguns:steel_ingot` })
	event.remove({ output: `oldguns:iron_with_coal` })

	let inter = `kubejs:unprocessed_steel_ingot`
	event.recipes.create.sequencedAssembly(`oldguns:steel_ingot`, `#forge:ingots/steel`,
		[
			event.recipes.create.filling(inter, [inter, Fluid.of(`minecraft:lava`, 250)]),
			event.recipes.create.pressing(inter, inter),
			event.recipes.create.pressing(inter, inter)
		]).transitionalItem(inter).loops(1)

	// tconstruct
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
	const removeCastTypes = [
		`plate`,
		`wire`,
		`gear`
	]
	removeCastTypes.forEach(type => {
		event.remove({ output: `tconstruct:${type}_red_sand_cast` })
		event.remove({ output: `tconstruct:${type}_sand_cast` })
		event.remove({ output: `tconstruct:${type}_cast` })

		MetalMaterials.forEach(material => {
			event.remove({ type: `tconstruct:casting_table`, output: `#forge:${type}s/${material}` })
		})
	})
	/*
	event.remove({ type: `tconstruct:casting_table`, output: `#forge:plates` })
	event.remove({ type: `tconstruct:casting_table`, output: `#forge:wires` })
	event.remove({ type: `tconstruct:casting_table`, output: `#forge:gears` })
	*/
	event.remove([{ output: `tconstruct:earth_slime_sling` }, { input: `tconstruct:earth_slime_sling` }])
	event.remove([{ output: `tconstruct:ender_slime_sling` }, { input: `tconstruct:ender_slime_sling` }])
	event.remove([{ output: `tconstruct:ichor_slime_sling` }, { input: `tconstruct:ichor_slime_sling` }])
	event.remove([{ output: `tconstruct:sky_slime_sling` }, { input: `tconstruct:sky_slime_sling` }])
	event.remove({ id: `tconstruct:smeltery/seared/grout` })
	event.remove({ id: `tconstruct:smeltery/seared/grout_multiple` })

	event.recipes.create.mixing(
		[`2x tconstruct:grout`, Item.of(`tconstruct:grout`).withChance(0.5)],
		[`minecraft:clay_ball`, `#minecraft:sand`, `minecraft:gravel`]
	)

	// create
	event.remove({ id: `davebuildingmod:rec_steel_block` })

	event.recipes.create.crushing([`create:copper_nugget`, `minecraft:red_sand`], `minecraft:terracotta`).processingTime(150)
	event.recipes.create.filling(`minecraft:magma_block`, [`minecraft:netherrack`, Fluid.of(`minecraft:lava`, 500)])
	event.recipes.create.emptying([`minecraft:obsidian`, Fluid.of(`minecraft:lava`, 250)], `minecraft:magma_block`)
	// event.recipes.create.blasting(`minecraft:magma_block`, `minecraft:netherrack`)
	event.recipes.create.haunting(`minecraft:netherrack`, `minecraft:clay`)
	let inter = `kubejs:incomplete_netherite_upgrade_smithing_template`
	event.recipes.create.sequencedAssembly(`armor_trims:netherite_upgrade_smithing_template`, `minecraft:netherrack`,
		[
			event.recipes.create.deploying(inter, [inter, `armor_trims:netherite_upgrade_smithing_template`]).keepHeldItem(),
			event.recipes.create.pressing(inter, inter),
			event.recipes.create.filling(inter, [inter, Fluid.of(`tconstruct:molten_diamond`, 300)]),
			event.recipes.create.pressing(inter, inter)
		]).transitionalItem(inter).loops(1)

	// delight
	event.remove({ output: `#farmersdelight:tools/knives`, not: [{ output: `allyed:steel_knife` }, { output: `delightful:experience_knife` }, { output: `delightful:gilded_quartz_knife` }, { output: `farmersdelight:netherite_knife` }] })

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
		Item.of(`delightful:constantan_knife`),
		[
			` H`,
			`S `
		], {
		H: Item.of(`tconstruct:small_blade`, `{Material:"tconstruct:constantan"}`),
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
		Item.of(`delightful:invar_knife`),
		[
			` H`,
			`S `
		], {
		H: Item.of(`tconstruct:small_blade`, `{Material:"tconstruct:invar"}`),
		S: `#forge:rods/wooden`
	})
	event.shaped(
		Item.of(`delightful:lead_knife`),
		[
			` H`,
			`S `
		], {
		H: Item.of(`tconstruct:small_blade`, `{Material:"tconstruct:lead"}`),
		S: `#forge:rods/wooden`
	})
	event.shaped(
		Item.of(`delightful:electrum_knife`),
		[
			` H`,
			`S `
		], {
		H: Item.of(`tconstruct:small_blade`, `{Material:"tconstruct:electrum"}`),
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
	event.recipes.create.filling(Item.of(`delightful:zinc_knife`), [`#farmersdelight:tools/knives`, Fluid.of(`tconstruct:molten_zinc`, 90)])
	event.recipes.create.filling(Item.of(`delightful:brass_knife`), [`#farmersdelight:tools/knives`, Fluid.of(`tconstruct:molten_brass`, 90)])
	event.recipes.create.filling(Item.of(`delightful:bronze_knife`), [`#farmersdelight:tools/knives`, Fluid.of(`tconstruct:molten_bronze`, 90)])
	event.recipes.create.filling(Item.of(`delightful:tin_knife`), [`#farmersdelight:tools/knives`, Fluid.of(`tconstruct:molten_tin`, 90)])
	event.recipes.create.filling(Item.of(`delightful:nickel_knife`), [`#farmersdelight:tools/knives`, Fluid.of(`tconstruct:molten_nickel`, 90)])

})

onEvent(`item.tags`, event => {
	// item tag
})

onEvent("lootjs", (event) => {
	event.addLootTableModifier(`minecraft:blocks/grass`)
		.removeLoot(`minecraft:wheat_seeds`);

	event.addLootTableModifier(`minecraft:blocks/tall_grass`)
		.removeLoot(`minecraft:wheat_seeds`);
});