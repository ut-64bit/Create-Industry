// priority: 1

// func

onEvent('recipes', event => {
	// #region func
	const { create, immersiveengineering } = event.recipes;
	let item_application = (output, inputBlock, inputItem) => {
		event.custom({
			type: 'create:item_application',
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

	// ダイヤの粉
	event.remove({ id: 'createaddition:crushing/diamond' })
	immersiveengineering.crusher('createaddition:diamond_grit', 'diamond')
		.id('kubejs:crusher/diamond_dust')

	// heavy_plate
	event.replaceInput({ id: 'createindustry:sequenced_assembly/heavy_plate' }, '#forge:ingots/steel', '#forge:plates/steel')

	// steam_engine
	inter = 'create:incomplete_steam_engine'
	create.sequencedAssembly('create:steam_engine', '#forge:plates/copper', [
		create.deploying(inter, [inter, 'create:propeller']),
		create.deploying(inter, [inter, 'create:cogwheel']),
		create.deploying(inter, [inter, '#forge:nuggets/copper'])
	]).transitionalItem(inter).loops(3).id('kubejs:sequenced_assembly/steam_engine')

	// electric_engine
	inter = 'create:incomplete_electric_engine'
	create.sequencedAssembly('create:electric_engine', '#forge:plates/brass', [
		create.deploying(inter, [inter, '#forge:nuggets/steel']),
		create.deploying(inter, [inter, 'createaddition:copper_spool']),
		create.deploying(inter, [inter, 'create:shaft']),
		create.deploying(inter, [inter, '#forge:nuggets/brass'])
	]).transitionalItem(inter).loops(3).id('kubejs:sequenced_assembly/electric_engine')

	// electric_motor
	event.remove({ id: 'createaddition:mechanical_crafting/electric_motor' })
	create.mechanicalCrafting('createaddition:electric_motor', [
		'  A  ',
		' BEB ',
		'BSRSB',
		' BCB '
	], {
		A: 'create:andesite_alloy',
		B: '#forge:plates/brass',
		E: 'create:electric_engine',
		S: 'createaddition:copper_spool',
		R: '#forge:rods/iron',
		C: 'createaddition:capacitor'
	}).id('kubejs:mechanical_crafting/electric_motor')

	// alternator
	event.remove({ id: 'createaddition:mechanical_crafting/alternator' })
	create.mechanicalCrafting('createaddition:alternator', [
		'  A  ',
		' IEI ',
		'ISRSI',
		' ICI '
	], {
		A: 'create:andesite_alloy',
		I: '#forge:plates/iron',
		E: 'create:electric_engine',
		S: 'createaddition:copper_spool',
		R: '#forge:rods/iron',
		C: 'createaddition:capacitor'
	}).id('kubejs:mechanical_crafting/alternator')

	// 一部の歯車のレシピを削除
	event.remove({ id: 'extendedgears:smelting/half_shaft_steel_cogwheel_from_iron' })
	event.remove({ id: 'extendedgears:blasting/half_shaft_steel_cogwheel_from_iron' })
	event.remove({ id: 'extendedgears:smelting/large_half_shaft_steel_cogwheel_from_iron' })
	event.remove({ id: 'extendedgears:blasting/large_half_shaft_steel_cogwheel_from_iron' })
	event.remove({ id: 'extendedgears:smelting/shaftless_steel_cogwheel_from_iron' })
	event.remove({ id: 'extendedgears:blasting/shaftless_steel_cogwheel_from_iron' })
	event.remove({ id: 'extendedgears:smelting/large_shaftless_steel_cogwheel_from_iron' })
	event.remove({ id: 'extendedgears:blasting/large_shaftless_steel_cogwheel_from_iron' })
	event.remove({ id: 'extendedgears:smelting/steel_cogwheel_from_iron' })
	event.remove({ id: 'extendedgears:blasting/steel_cogwheel_from_iron' })
	event.remove({ id: 'extendedgears:smelting/large_steel_cogwheel_from_iron' })
	event.remove({ id: 'extendedgears:blasting/large_steel_cogwheel_from_iron' })

	// 液体⇄インゴット
	{
		let melt = (output, item, gem) => {
			if (gem) {
				create.compacting(`${output}`, Fluid.of(TC(`molten_${item}`), 100))
					.id(`kubejs:compacting/${output}_from_molten_${item}`)
				create.mixing(Fluid.of(TC(`molten_${item}`), 100), `#forge:gems/${item}`)
					.superheated()
					.id(`kubejs:mixing/molten_${item}`)
			} else {
				create.compacting(`${output}`, Fluid.of(TC(`molten_${item}`), 90))
					.id(`kubejs:compacting/${output}_from_molten_${item}`)
				create.mixing(Fluid.of(TC(`molten_${item}`), 90), `#forge:ingots/${item}`)
					.heated()
					.id(`kubejs:mixing/molten_${item}`)
			}
		}
		melt('iron_ingot', 'iron', false)
		melt('gold_ingot', 'gold', false)
		melt('diamond', 'diamond', true)
		//melt('create:brass_ingot', 'brass', false)
		//melt('createindustry:steel_ingot', 'steel', false)
		//melt('alloyed:bronze_ingot', 'bronze', false)
		//melt('alloyed:steel_ingot', 'steel', false)
	}

	// 雑多なレシピを追加
	create.emptying(['obsidian', Fluid.of('lava', 250)], 'magma_block')
		.id('kubejs:emptying/magma_block')
	create.haunting('netherrack', 'clay')
		.id('kubejs:haunting/netherrack')

	// 置き換え
	event.remove({ output: 'create:whisk' })
	event.shaped('create:whisk', [
		' a ',
		'pap',
		'ppp'
	], {
		a: 'create:andesite_alloy',
		p: '#forge:rods/iron'
	}).id('create:crafting/kinetics/whisk')
})

onEvent('item.tags', event => {
})