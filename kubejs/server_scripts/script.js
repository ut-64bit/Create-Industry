// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

onEvent(`recipes`, event => {
	// minecraft
	event.blasting(`minecraft:blaze_powder`, `minecraft:gunpowder`)

	// oldguns
	event.remove({ output: `oldguns:steel_ingot` })
	event.remove({ output: `oldguns:iron_with_coal` })

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
	MetalMaterials.forEach(material => {
		event.remove({ type: `tconstruct:casting_table`, output: `#forge:plates/${material}` })
		event.remove({ type: `tconstruct:casting_table`, output: `#forge:wires/${material}` })
	})
	event.remove([{ output: `tconstruct:earth_slime_sling` }, { input: `tconstruct:earth_slime_sling` }])
	event.remove([{ output: `tconstruct:ender_slime_sling` }, { input: `tconstruct:ender_slime_sling` }])
	event.remove([{ output: `tconstruct:ichor_slime_sling` }, { input: `tconstruct:ichor_slime_sling` }])
	event.remove([{ output: `tconstruct:sky_slime_sling` }, { input: `tconstruct:sky_slime_sling` }])
	event.remove({ id: `tconstruct:smeltery/seared/grout` })
	event.remove({ id: `tconstruct:smeltery/seared/grout_multiple` })

	// create
	event.remove({ id: `davebuildingmod:rec_steel_block` })

	event.recipes.create.crushing([`create:copper_nugget`, `minecraft:red_sand`], `minecraft:terracotta`).processingTime(150)
	event.recipes.create.filling(`minecraft:magma_block`, [`minecraft:netherrack`, Fluid.of(`minecraft:lava`, 500)])
	event.recipes.create.emptying([`minecraft:obsidian`, Fluid.of(`minecraft:lava`, 250)], `minecraft:magma_block`)
	// event.recipes.create.blasting(`minecraft:magma_block`, `minecraft:netherrack`)
	event.recipes.create.haunting(`minecraft:netherrack`, `minecraft:clay`)

	event.recipes.create.mixing(
		[`2x tconstruct:grout`, Item.of(`tconstruct:grout`).withChance(0.5)],
		[`minecraft:clay_ball`, `#minecraft:sand`, `minecraft:gravel`]
	)

	let inter = `kubejs:unprocessed_steel_ingot`
	event.recipes.create.sequencedAssembly(`oldguns:steel_ingot`, `#forge:ingots/steel`,
		[
			event.recipes.create.filling(inter, [inter, Fluid.of(`minecraft:lava`, 250)]),
			event.recipes.create.pressing(inter, inter),
			event.recipes.create.pressing(inter, inter)
		]).transitionalItem(inter).loops(1)

	// immersiveengineering

})

onEvent(`item.tags`, event => {
	// item tag
})

/*
onEvent("lootjs", (event) => {
	event.addLootTableModifier(`minecraft:blocks/grass`)
		.removeLoot(`minecraft:wheat_seeds`);

	event.addLootTableModifier(`minecraft:blocks/tall_grass`)
		.removeLoot(`minecraft:wheat_seeds`);
});
*/