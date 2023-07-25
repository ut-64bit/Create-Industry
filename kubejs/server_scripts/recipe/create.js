// priority: 1

// func
let TC = (id) => `tconstruct:${id}`

// var
const alloyed = Item.exists(`extendedgears:steel_cogwheel`)

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

	// 縦ハーフしねえええええ！！！
	event.remove({ output: /createdeco:.*_slab_vert/ })

	// ダイヤの粉
	event.remove({ id: `createaddition:crushing/diamond` })
	event.recipes.immersiveengineering.crusher('createaddition:diamond_grit', `diamond`)
		.id(`kubejs:create/crusher/diamond_dust`)

	// heavy_plate
	event.replaceInput({ id: `createindustry:sequenced_assembly/heavy_plate` }, `#forge:ingots/steel`, `#forge:plates/steel`)

	// steam_engine
	inter = `kubejs:incomplete_steam_engine`
	sequencedAssembly(`kubejs:steam_engine`, `#forge:plates/copper`, [
		deploying(inter, [inter, `create:propeller`]),
		deploying(inter, [inter, `create:cogwheel`]),
		deploying(inter, [inter, `#forge:nuggets/copper`])
	]).transitionalItem(inter).loops(3).id(`kubejs:create/sequenced_assembly/steam_engine`)

	// electric_engine
	inter = `kubejs:incomplete_electric_engine`
	sequencedAssembly(`kubejs:electric_engine`, `#forge:plates/brass`, [
		deploying(inter, [inter, `#forge:nuggets/steel`]),
		deploying(inter, [inter, `createaddition:copper_spool`]),
		deploying(inter, [inter, `create:shaft`]),
		deploying(inter, [inter, `#forge:nuggets/brass`])
	]).transitionalItem(inter).loops(3).id(`kubejs:create/sequenced_assembly/electric_engine`)

	// electric_motor
	event.remove({ id: `createaddition:mechanical_crafting/electric_motor` })
	mechanicalCrafting(`createaddition:electric_motor`, [
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
	}).id(`kubejs:create/mechanical_crafting/electric_motor`)

	// alternator
	event.remove({ id: `createaddition:mechanical_crafting/alternator` })
	mechanicalCrafting(`createaddition:alternator`, [
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
	}).id(`kubejs:create/mechanical_crafting/alternator`)

	// 一部の歯車のレシピを削除
	if (alloyed) {
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
	}

	// 液体⇄インゴット
	let melt = (output, item, gem) => {
		if (gem) {
			compacting(`${output}`, Fluid.of(TC(`molten_${item}`), 100))
				.id(`kubejs:create/compacting/${output}_from_molten_${item}`)
			mixing(Fluid.of(TC(`molten_${item}`), 100), `#forge:gems/${item}`)
				.superheated()
				.id(`kubejs:create/mixing/molten_${item}`)
		} else {
			compacting(`${output}`, Fluid.of(TC(`molten_${item}`), 90))
				.id(`kubejs:create/compacting/${output}_from_molten_${item}`)
			mixing(Fluid.of(TC(`molten_${item}`), 90), `#forge:ingots/${item}`)
				.heated()
				.id(`kubejs:create/mixing/molten_${item}`)
		}
	}
	melt(`iron_ingot`, `iron`, false)
	melt(`gold_ingot`, `gold`, false)
	melt(`create:brass_ingot`, `brass`, false)
	melt(`diamond`, `diamond`, true)
	melt(`createindustry:steel_ingot`, `steel`, false)
	if (alloyed) {
		melt(`alloyed:bronze_ingot`, `bronze`, false)
		melt(`alloyed:steel_ingot`, `steel`, false)
	}

	// 雑多なレシピを追加
	emptying([`obsidian`, Fluid.of(`lava`, 250)], `magma_block`)
		.id(`kubejs:create/emptying/magma_block`)
	haunting(`netherrack`, `clay`)
		.id(`kubejs:create/haunting/netherrack`)
	event.replaceInput({ id: `create:crafting/kinetics/whisk` }, `#forge:plates/iron`, `#forge:rods/iron`)
	event.replaceInput({ id: `create:crafting/kinetics/whisk` }, `#railways:internal/plates/iron_plates`, `#forge:rods/iron`)
})

onEvent(`item.tags`, event => {
})