// priority: 1

/** func */
let TC = (id) => `tconstruct:${id}`

/** const */

/** let */
let inter

onEvent(`recipes`, event => {
	// #region function
	let item_application = (output, inputItem, inputBlock) => {
		event.custom({
			type: 'create:item_application',
			ingredients: [
				Ingredient.of(inputBlock).toJson(),
				Ingredient.of(inputItem).toJson()
			],
			results: [
				Item.of(output).toResultJson(),
			]
		})
	}
	// #endregion

	// #region recipe
	/** steam_engine */
	inter = `kubejs:incomplete_steam_engine`
	event.recipes.create.sequencedAssembly(`kubejs:steam_engine`, `#forge:plates/copper`, [
		event.recipes.create.deploying(inter, [inter, `create:propeller`]),
		event.recipes.create.deploying(inter, [inter, `create:cogwheel`]),
		event.recipes.create.deploying(inter, [inter, `#forge:nuggets/copper`])
	]).transitionalItem(inter).loops(3)

	/** electric_engine */
	inter = `kubejs:incomplete_electric_engine`
	event.recipes.create.sequencedAssembly(`kubejs:electric_engine`, `#forge:plates/brass`, [
		event.recipes.create.deploying(inter, [inter, `#forge:nuggets/steel`]),
		event.recipes.create.deploying(inter, [inter, `createaddition:copper_spool`]),
		event.recipes.create.deploying(inter, [inter, `create:shaft`]),
		event.recipes.create.deploying(inter, [inter, `#forge:nuggets/brass`])
	]).transitionalItem(inter).loops(3)

	/** electric_motor */
	event.remove({ id: `createaddition:mechanical_crafting/electric_motor` })
	event.recipes.create.mechanicalCrafting(`createaddition:electric_motor`, [
		`  A  `,
		` BEB `,
		`BSRSB`,
		` BCB `
	], {
		A: `create:andesite_alloy`,
		B: `#forge:plates/brass`,
		E: `kubejs:electric_engine`,
		S: `createaddition:copper_spool`,
		R: `#forge:rods/iron`,
		C: `createaddition:capacitor`
	})

	/** alternator */
	event.remove({ id: `createaddition:mechanical_crafting/alternator` })
	event.recipes.create.mechanicalCrafting(`createaddition:alternator`, [
		`  A  `,
		` IEI `,
		`ISRSI`,
		` ICI `
	], {
		A: `create:andesite_alloy`,
		I: `#forge:plates/iron`,
		E: `kubejs:electric_engine`,
		S: `createaddition:copper_spool`,
		R: `#forge:rods/iron`,
		C: `createaddition:capacitor`
	})

	/** 一部の歯車のレシピを削除 */
	// #region remove_extendedgears
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
	// #endregion

	/** 液体⇄インゴット */
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
	/** Create:Alloyedが0.5.1cに対応するまで封印
	 * melt(`alloyed:bronze_ingot`, `bronze`, false)
	 * melt(`alloyed:steel_ingot`, `steel`, false)
	 */
	melt(`createindustry:steel_ingot`, `steel`, false)
	melt(`diamond`, `diamond`, true)

	/** 雑多なレシピを追加 */
	event.recipes.create.emptying([`obsidian`, Fluid.of(`lava`, 250)], `magma_block`)
	event.recipes.create.haunting(`netherrack`, `clay`)
	event.replaceInput({ id: `create:crafting/kinetics/whisk` }, `#forge:plates/iron`, `#forge:rods/iron`)
	item_application('tconstruct:crafting_station','tconstruct:pattern','minecraft:crafting_table')
	/**	Create:Alloyedが0.5.1cに対応するまで封印
	 * event.replaceOutput({ id: `createindustry:mixing/steel_ingot` }, `createindustry:steel_ingot`, Item.of(`alloyed:steel_ingot`, 3))
	 * event.replaceOutput({ id: `alloyed:mixing/steel_ingot` }, `createindustry:steel_ingot`, Item.of(`alloyed:steel_ingot`, 1))
	 */
})

onEvent(`item.tags`, event => {

})