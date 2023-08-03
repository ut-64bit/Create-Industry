// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

// func
const TC = (id) => `tconstruct:${id}`
const IE = (id) => `immersiveengineering:${id}`

/**
 * @type {Special.Item[]}
 */
const deleteItems = [
	'oldguns:iron_with_coal',
	'toms_storage:ts.adv_wireless_terminal',
	'toms_storage:ts.wireless_terminal',
	'toms_storage:ts.inventory_hopper_basic',
	IE('blastbrick'),
	IE('alloybrick'),
	TC('earth_slime_sling'),
	TC('ender_slime_sling'),
	TC('ichor_slime_sling'),
	TC('sky_slime_sling'),
	TC('plate_cast'),
	TC('plate_sand_cast'),
	TC('plate_red_sand_cast'),
	TC('wire_cast'),
	TC('wire_sand_cast'),
	TC('wire_red_sand_cast'),
	/createdeco:.*_slab_vert/,
]
const MetalMaterials = ['aluminum', 'amethyst_bronze', 'brass', 'bronze', 'cobalt', 'constantan', 'copper', 'electrum', 'emerald', 'enderium', 'gold', 'hepatizon', 'inlet', 'iron', 'knightslime', 'lead', 'lumium', 'manyullyn', 'molten_debris', 'netherite', 'nickel', 'osmium', 'pewter', 'pig_iron', 'platinum', 'queens_slime', 'refined_glowstone', 'refined_obsidian', 'rose_gold', 'signalum', 'silver', 'slimesteel', 'soulsteel', 'steel', 'tin', 'tungsten', 'uranium', 'zinc']
const colors = ['black', 'blue', 'brown', 'cyan', 'gray', 'green', 'light_blue', 'light_gray', 'lime', 'magenta', 'orange', 'pink', 'purple', 'red', 'white', 'yellow']
const woods = ['oak', 'dark_oak', 'spruce', 'birch', 'jungle', 'acacia', 'crimson', 'warped']

const toms_storage = Item.exists('toms_storage:ts.storage_terminal');
const vs_eureka = Item.exists('vs_eureka:balloon');
const armor_trims = Item.exists('armor_trims:netherite_upgrade_smithing_template');

onEvent('recipes', event => {
	// func
	const { create, immersiveengineering } = event.recipes;

	/**
	 * @param {Special.Item} output
	 * @param {Special.Item} inputBlock
	 * @param {Special.Item} inputItem
	 */
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

	// let
	/**
	 * @type {Special.Item} inter
	 */
	let inter

	// アイテムを擬似的に削除
	deleteItems.forEach(item => event.remove([{ output: `${item}` }, { input: `${item}` }]))

	// 一部のキャストレシピを削除
	MetalMaterials.forEach(material => {
		event.remove({ type: TC('casting_table'), output: `#forge:plates/${material}` })
		event.remove({ type: TC('casting_table'), output: `#forge:wire/${material}` })
	})

	// バニラ型のツールのレシピを変更
	{
		const removeTool = (material, removeInput) => {
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
		removeTool('wooden', true)
		removeTool('stone', true)
		removeTool('iron', false)
		removeTool('diamond', false)

		// 鉄ツール
		event.smithing('iron_pickaxe', 'golden_pickaxe', 'iron_ingot')
		event.smithing('iron_axe', 'golden_axe', 'iron_ingot')
		event.smithing('iron_shovel', 'golden_shovel', 'iron_ingot')
		event.smithing('iron_hoe', 'golden_hoe', 'iron_ingot')
		event.smithing('iron_sword', 'golden_sword', 'iron_ingot')

		// ダイヤツール
		event.smithing('diamond_pickaxe', 'iron_pickaxe', 'diamond')
		event.smithing('diamond_axe', 'iron_axe', 'diamond')
		event.smithing('diamond_shovel', 'iron_shovel', 'diamond')
		event.smithing('diamond_hoe', 'iron_hoe', 'diamond')
		event.smithing('diamond_sword', 'iron_sword', 'diamond')

		create.filling('diamond_pickaxe', ['iron_pickaxe', Fluid.of(TC('molten_diamond'), 100)])
		create.filling('diamond_axe', ['iron_axe', Fluid.of(TC('molten_diamond'), 100)])
		create.filling('diamond_shovel', ['iron_shovel', Fluid.of(TC('molten_diamond'), 100)])
		create.filling('diamond_hoe', ['iron_hoe', Fluid.of(TC('molten_diamond'), 100)])
		create.filling('diamond_sword', ['iron_sword', Fluid.of(TC('molten_diamond'), 100)])
	}

	// 防具のレシピを変更
	{
		const removeArmor = (material, removeInput) => {
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
		const addPlateArmor = (material, plate) => {
			event.shaped(`${material}_helmet`,
				[
					'PPP',
					'P P'
				], {
				P: `#forge:plates/${plate}`
			})
			event.shaped(`${material}_chestplate`,
				[
					'P P',
					'PPP',
					'PPP'
				], {
				P: `#forge:plates/${plate}`
			})
			event.shaped(`${material}_leggings`,
				[
					'PPP',
					'P P',
					'P P'
				], {
				P: `#forge:plates/${plate}`
			})
			event.shaped(`${material}_boots`,
				[
					'P P',
					'P P'
				], {
				P: `#forge:plates/${plate}`
			})
		}

		// 鉄防具
		removeArmor('iron', false)
		addPlateArmor('iron', 'iron')

		// 金防具
		removeArmor('golden', false)
		addPlateArmor('golden', 'gold')

		// #region ieの鋼鉄防具
		event.remove({ id: 'immersiveengineering:crafting/armor_steel_head' })
		event.remove({ id: 'immersiveengineering:crafting/armor_steel_chest' })
		event.remove({ id: 'immersiveengineering:crafting/armor_steel_legs' })
		event.remove({ id: 'immersiveengineering:crafting/armor_steel_feet' })

		event.shaped('immersiveengineering:armor_steel_head',
			[
				'PPP',
				'P P'
			], {
			P: '#forge:plates/steel'
		})
		event.shaped('immersiveengineering:armor_steel_chest',
			[
				'P P',
				'PPP',
				'PPP'
			], {
			P: '#forge:plates/steel'
		})
		event.shaped('immersiveengineering:armor_steel_legs',
			[
				'PPP',
				'P P',
				'P P'
			], {
			P: '#forge:plates/steel'
		})
		event.shaped('immersiveengineering:armor_steel_feet',
			[
				'P P',
				'P P'
			], {
			P: '#forge:plates/steel'
		})
		// #endregion

		// #region ダイヤ防具
		removeArmor('diamond', false)

		create.filling('diamond_helmet', ['iron_helmet', Fluid.of(TC('molten_diamond'), 500)])
		create.filling('diamond_chestplate', ['iron_chestplate', Fluid.of(TC('molten_diamond'), 800)])
		create.filling('diamond_leggings', ['iron_leggings', Fluid.of(TC('molten_diamond'), 700)])
		create.filling('diamond_boots', ['iron_boots', Fluid.of(TC('molten_diamond'), 400)])
		// #endregion
	}

	// oldguns
	// 銃器用鋼鉄のレシピを変更
	event.remove({ output: 'oldguns:steel_ingot' })
	inter = 'kjs.oldguns:unprocessed_steel_ingot'
	create.sequencedAssembly('oldguns:steel_ingot', '#forge:ingots/steel', [
		create.filling(inter, [inter, Fluid.of('lava', 200)]),
		create.pressing(inter, inter),
		create.pressing(inter, inter),
	]).transitionalItem(inter).loops(1).id('kubejs:sequenced_assembly/steel_ingot')

	// 重複
	event.remove({ id: 'minecraft:glass_bottle' })

	// ロープを置き換え
	event.replaceInput({ input: 'supplementaries:rope' }, 'supplementaries:rope', '#supplementaries:ropes')
	event.replaceInput({ input: 'farmersdelight:rope' }, 'farmersdelight:rope', '#supplementaries:ropes')
	event.replaceOutput({ output: 'supplementaries:rope' }, 'supplementaries:rope', 'farmersdelight:rope')
	event.remove({ id: 'farmersdelight:rope' })
	event.shaped('farmersdelight:rope',
		[
			'a',
			'a'
		], { 'a': 'farmersdelight:straw' }
	).id('farmersdelight:rope')

	// ランタンに使う金をプレートに変更
	event.replaceInput({ id: 'supplementaries:crimson_lantern' }, 'gold_ingot', '#forge:plates/gold')

	// #region Create
	// ダイヤの粉
	event.remove({ id: 'createaddition:crushing/diamond' })
	immersiveengineering.crusher('createaddition:diamond_grit', 'diamond')
		.id('kubejs:crusher/diamond_dust')

	// heavy_plateを削除
	event.remove({ id: 'createindustry:sequenced_assembly/heavy_plate' })

	// steam_engine
	inter = 'kjs.create:incomplete_steam_engine'
	create.sequencedAssembly('kjs.create:steam_engine', '#forge:plates/copper', [
		create.deploying(inter, [inter, 'create:propeller']),
		create.deploying(inter, [inter, 'create:cogwheel']),
		create.deploying(inter, [inter, '#forge:nuggets/copper'])
	]).transitionalItem(inter).loops(3).id('kubejs:sequenced_assembly/steam_engine')

	// electric_engine
	inter = 'kjs.create:incomplete_electric_engine'
	create.sequencedAssembly('kjs.create:electric_engine', '#forge:plates/brass', [
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
		"A": 'create:andesite_alloy',
		"B": '#forge:plates/brass',
		"E": 'kjs.create:electric_engine',
		"S": 'createaddition:copper_spool',
		"R": '#forge:rods/iron',
		"C": 'createaddition:capacitor'
	}).id('kubejs:mechanical_crafting/electric_motor')

	// alternator
	event.remove({ id: 'createaddition:mechanical_crafting/alternator' })
	create.mechanicalCrafting('createaddition:alternator', [
		'  A  ',
		' IEI ',
		'ISRSI',
		' ICI '
	], {
		"A": 'create:andesite_alloy',
		"I": '#forge:plates/iron',
		"E": 'kjs.create:electric_engine',
		"S": 'createaddition:copper_spool',
		"R": '#forge:rods/iron',
		"C": 'createaddition:capacitor'
	}).id('kubejs:mechanical_crafting/alternator')

	// 一部の歯車のレシピを削除
	if (Item.exists("extendedgears:large_steel_cogwheel")) {
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
	}

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
		' # ',
		'i#i',
		'iii'
	], {
		"#": 'create:andesite_alloy',
		"i": '#forge:rods/iron'
	}).id('create:crafting/kinetics/whisk')
	// #endregion

	// #region TC

	// crafting_station
	item_application('tconstruct:crafting_station', 'minecraft:crafting_table', 'tconstruct:pattern')

	// 燃え盛る血液のレシピを追加
	create.mixing(Fluid.of('tconstruct:blazing_blood', 200), 'kubejs:blaze_core')
		.superheated()
		.id('kubejs:tconstruct/mixing/blazing_blood_from_blaze_core')

	// グラウトのレシピを変更
	event.remove({ id: 'tconstruct:smeltery/seared/grout_multiple' })
	event.remove({ id: 'tconstruct:smeltery/seared/grout' })
	create.mixing(
		['2x tconstruct:grout', Item.of('tconstruct:grout').withChance(0.5)],
		['clay_ball', '#sand', 'gravel']
	).id('kubejs:tconstruct/mixing/grout')

	// ネザーグラウトのレシピを変更
	event.remove({ id: 'tconstruct:smeltery/scorched/nether_grout' })
	create.mixing(
		['2x tconstruct:nether_grout', Item.of('tconstruct:nether_grout').withChance(0.5)],
		['magma_cream', '#minecraft:soul_fire_base_blocks', 'gravel']
	).heated().id('kubejs:tconstruct/mixing/nether_grout')

	// smeltery_controller
	event.remove({ id: 'tconstruct:smeltery/casting/seared/smeltery_controller' })
	create.mechanicalCrafting('tconstruct:smeltery_controller',
		[
			'bsb',
			'sBs',
			'bcb'
		], {
		b: 'tconstruct:seared_brick',
		s: '#forge:plates/steel',
		B: 'kubejs:blaze_core',
		c: '#forge:ingots/copper'
	}).id('kubejs:tconstruct/mechanical_crafting/smeltery_controller')

	// compatを削除
	event.remove({ id: /tconstruct:compat\/.+/ })

	// #endregion

	// #region IE
	// #region tools
	event.replaceInput({ output: IE('hammer') }, '#forge:ingots/iron', '#forge:ingots/steel')
	event.replaceInput({ output: IE('wirecutter') }, '#forge:ingots/iron', '#forge:ingots/steel')
	event.replaceInput({ output: IE('screwdriver') }, '#forge:rods/iron', '#forge:rods/steel')
	// #endregion

	// electron_tube
	event.remove({ id: 'immersiveengineering:blueprint/electron_tube' })
	inter = 'kjs.immersiveengineering:incomplete_electron_tube'
	create.sequencedAssembly('immersiveengineering:electron_tube', '#forge:plates/nickel', [
		create.deploying(inter, [inter, '#forge:wires/copper']),
		create.deploying(inter, [inter, '#forge:wires/copper']),
		create.deploying(inter, [inter, 'redstone']),
		create.filling(inter, [inter, Fluid.of('tconstruct:molten_glass', 250)])
	]).transitionalItem(inter).loops(1).id('kubejs:sequenced_assembly/electron_tube')

	// dynamo
	event.remove({ id: 'immersiveengineering:crafting/dynamo' })
	event.shaped(IE('dynamo'), [
		'ses',
		'rlr',
		'sss'
	], {
		s: '#forge:ingots/steel',
		e: 'kjs.create:electric_engine',
		r: '#forge:dusts/redstone',
		l: IE('coil_lv'),
	}).id('kubejs:crafting/dynamo')

	// blastbrick_reinforced
	create.mechanicalCrafting(Item.of(IE('blastbrick_reinforced'), 3), [
		' ppp ',
		'pcscp',
		'psbsp',
		'pcscp',
		' ppp '
	], {
		p: '#forge:plates/steel',
		c: '#forge:ingots/nether_brick',
		s: '#forge:ingots/brick',
		b: 'blaze_powder'
	}).id('kubejs:mechanical_crafting/blastbrick_reinforced')

	// #region wire_coil
	event.remove({ id: /immersiveengineering:crafting\/wirecoil_.*/, input: '#balm:wooden_rods' })
	event.shaped('immersiveengineering:wirecoil_copper', [
		' w ',
		'wsw',
		' w '
	], {
		w: '#forge:wires/copper',
		s: 'createaddition:spool'
	}).id('kubejs:crafting/wirecoil_copper')
	event.shaped('immersiveengineering:wirecoil_electrum', [
		' w ',
		'wsw',
		' w '
	], {
		w: '#forge:wires/electrum',
		s: 'createaddition:spool'
	}).id('kubejs:crafting/wirecoil_electrum')
	event.shaped('immersiveengineering:wirecoil_steel', [
		' s ',
		'aSa',
		' s '
	], {
		s: '#forge:wires/steel',
		a: '#forge:wires/aluminum',
		S: 'createaddition:spool'
	}).id('kubejs:crafting/wirecoil_steel'),
		event.shaped('immersiveengineering:wirecoil_structure_rope', [
			' w ',
			'wsw',
			' w '
		], {
			w: 'farmersdelight:rope',
			s: 'createaddition:spool'
		}).id('kubejs:crafting/wirecoil_structure_rope')
	event.shaped('immersiveengineering:wirecoil_structure_steel', [
		' w ',
		'wsw',
		' w '
	], {
		w: '#forge:wires/steel',
		s: 'createaddition:spool'
	}).id('kubejs:crafting/wirecoil_structure_steel')
	event.shaped('immersiveengineering:wirecoil_redstone', [
		' a ',
		'rsr',
		' a '
	], {
		a: '#forge:wires/aluminum',
		r: 'redstone',
		s: 'createaddition:spool'
	}).id('kubejs:crafting/wirecoil_redstone')
	// #endregion
	// #endregion

	// #region Delight
	// 一部を除いたナイフのレシピを削除
	event.remove({ id: "delightful:knives/silver_knife" })
	event.remove({ id: "delightful:knives/copper_knife" })
	event.remove({ id: "farmersdelight:golden_knife" })
	event.remove({ id: "farmersdelight:diamond_knife" })
	event.remove({ id: "farmersdelight:iron_knife" })
	event.remove({ id: "farmersdelight:flint_knife" })

	// #region ナイフのレシピを変更
	event.shaped(
		Item.of("farmersdelight:iron_knife"),
		[
			" H",
			"S "
		], {
		H: Item.of("tconstruct:small_blade", "{Material:\"tconstruct:iron\"}"),
		S: "#forge:rods/wooden"
	}).id("kubejs:crafting/iron_knife")
	event.shaped(
		Item.of("farmersdelight:golden_knife"),
		[
			" H",
			"S "
		], {
		H: "gold_ingot",
		S: "#forge:rods/wooden"
	}).id("kubejs:crafting/golden_knife")
	event.shaped(
		Item.of("farmersdelight:flint_knife"),
		[
			" H",
			"S "
		], {
		H: Item.of("tconstruct:small_blade", "{Material:\"tconstruct:flint\"}"),
		S: "#forge:rods/wooden"
	}).id("kubejs:crafting/flint_knife")
	event.shaped(
		Item.of("delightful:silver_knife"),
		[
			" H",
			"S "
		], {
		H: Item.of("tconstruct:small_blade", "{Material:\"tconstruct:silver\"}"),
		S: "#forge:rods/wooden"
	}).id("kubejs:crafting/silver_knife")
	event.shaped(
		Item.of("delightful:copper_knife"),
		[
			" H",
			"S "
		], {
		H: Item.of("tconstruct:small_blade", "{Material:\"tconstruct:copper\"}"),
		S: "#forge:rods/wooden"
	}).id("kubejs:crafting/copper_knife")
	create.filling(Item.of("farmersdelight:diamond_knife"), ["#farmersdelight:tools/knives", Fluid.of(TC("molten_diamond"), 100)])
		.id("kubejs:filling/diamond_knife")
	// #endregion

	// #region パン生地のレシピを追加
	event.remove({ id: "create:smelting/bread" })
	event.remove({ id: "create:crafting/appliances/dough" })
	event.remove({ id: "farmersdelight:wheat_dough_from_water" })
	event.remove({ id: "farmersdelight:wheat_dough_from_eggs" })
	event.shapeless("2x farmersdelight:wheat_dough", ["milk_bucket", "wheat", "wheat", "wheat"])
		.id("kubejs:crafting/wheat_dough_from_milk_wheat")
	event.shapeless("2x farmersdelight:wheat_dough", ["water_bucket", "wheat", "wheat", "wheat"])
		.id("kubejs:crafting/wheat_dough_from_water_wheat")
	event.shapeless("2x farmersdelight:wheat_dough", ["#forge:milk/milk_bottle", "create:wheat_flour", "create:wheat_flour"])
		.id("kubejs:crafting/wheat_dough_from_water_flour")
	event.shapeless("2x farmersdelight:wheat_dough", ["#balm:eggs", "create:wheat_flour", "create:wheat_flour"])
		.id("kubejs:crafting/wheat_dough_from_egg_flour")
	event.replaceInput({ input: "create:dough" }, "create:dough", "#forge:dough/wheat")
	event.replaceInput({ input: "farmersdelight:wheat_dough" }, "farmersdelight:wheat_dough", "#forge:dough/wheat")
	event.replaceOutput({ output: "create:dough" }, "create:dough", "farmersdelight:wheat_dough")
	// #endregion

	// 鍋
	event.remove({ id: "farmersdelight:cooking_pot" })
	event.shaped("farmersdelight:cooking_pot", [
		"bRb",
		"IBI",
		"III"
	], {
		"b": "brick",
		"R": "#forge:rods/wooden",
		"I": "#forge:ingots/iron",
		"B": "bucket"
	}).id("farmersdelight:cooking_pot")
	// #endregion

	// toms_storage
	if (toms_storage) {
		// crafting_terminal
		event.remove({ id: 'toms_storage:crafting_terminal' })
		create.mechanicalCrafting('toms_storage:ts.crafting_terminal',
			[
				' P ',
				'SSS',
				'SSS',
				'SSS',
				'AML'
			], {
			"P": 'toms_storage:ts.storage_terminal',
			"S": 'create:mechanical_crafter',
			"A": 'create:sturdy_sheet',
			"M": 'create:precision_mechanism',
			"L": 'create:linked_controller'
		}).id('kubejs:toms_storage/crafting/crafting_terminal')

		// inventory_cable_connector_filtered
		event.remove({ id: 'toms_storage:inventory_cable_connector_filtered' })
		event.shaped('toms_storage:ts.inventory_cable_connector_filtered',
			[
				'I',
				'S',
				'P'
			], {
			"I": '#forge:plates/brass',
			"S": 'toms_storage:ts.inventory_cable_connector',
			"P": 'create:electron_tube'
		}).id('kubejs:toms_storage/crafting/inventory_cable_connector_filtered')

		// inventory_cable_connector_framed
		event.remove({ id: 'toms_storage:inventory_cable_connector_framed' })
		event.shaped('toms_storage:ts.inventory_cable_connector_framed',
			[
				'SSS',
				'SCS',
				'SSS'
			], {
			"S": '#forge:rods/wooden',
			"C": 'toms_storage:ts.inventory_cable_connector'
		}).id('kubejs:toms_storage/crafting/inventory_cable_connector_framed')

		// inventory_cable_connector
		event.remove({ id: 'toms_storage:inventory_cable_connector' })
		event.shapeless('toms_storage:ts.inventory_cable_connector', ['toms_storage:ts.inventory_cable', 'create:chute'])
			.id('kubejs:toms_storage/crafting/inventory_cable_connector')

		// inventory_cable_framed
		event.remove({ id: 'toms_storage:inventory_cable_framed' })
		event.shaped('toms_storage:ts.inventory_cable_framed',
			[
				'SSS',
				'SCS',
				'SSS'
			], {
			"S": '#forge:rods/wooden',
			"C": 'toms_storage:ts.inventory_cable'
		}).id('kubejs:toms_storage/crafting/inventory_cable_framed')

		// inventory_cable
		event.remove({ id: 'toms_storage:inventory_cable' })
		event.shapeless('toms_storage:ts.inventory_cable', ['#forge:plates/brass', 'dried_kelp'])
			.id('kubejs:toms_storage/crafting/inventory_cable')

		// inventory_connector
		event.remove({ id: 'toms_storage:inventory_connector' })
		event.shapeless('toms_storage:ts.inventory_connector', ['create:brass_casing', 'create:chute'])
			.id('kubejs:toms_storage/crafting/inventory_connector')

		// inventory_proxy
		event.remove({ id: 'toms_storage:inventory_proxy' })
		event.shapeless('toms_storage:ts.inventory_proxy', ['toms_storage:ts.inventory_connector', 'create:smart_chute'])
			.id('kubejs:toms_storage/crafting/inventory_proxy')

		// level_emitter
		event.remove({ id: 'toms_storage:level_emitter' })
		event.shapeless('toms_storage:ts.level_emitter', ['create:content_observer', 'toms_storage:ts.inventory_cable'])
			.id('kubejs:toms_storage/crafting/level_emitter')

		// open_crate
		event.remove({ id: 'toms_storage:open_crate' })
		event.shaped('toms_storage:ts.open_crate',
			[
				'PSP',
				'PCP',
				'PTP'
			], {
			"P": '#minecraft:planks',
			"S": '#forge:rods/wooden',
			"C": '#forge:chests/wooden',
			"T": '#minecraft:trapdoors'
		}).id('kubejs:toms_storage/crafting/open_crate')

		// paint_kit
		event.remove({ id: 'toms_storage:paint_kit' })
		event.shaped('toms_storage:ts.paint_kit',
			[
				'RGB',
				'iaW',
				'bS '
			], {
			"R": '#forge:dyes/red',
			"G": '#forge:dyes/green',
			"B": '#forge:dyes/blue',
			"i": '#forge:dyes/black',
			"a": 'bucket',
			"W": '#minecraft:wool',
			"b": 'water_bucket',
			"S": '#forge:rods/wooden'
		}).id('kubejs:toms_storage/crafting/paint_kit')

		// storage_terminal
		event.remove({ id: 'toms_storage:storage_terminal' })
		event.shaped('toms_storage:ts.storage_terminal',
			[
				' C ',
				'cGg',
				'PPP'
			], {
			"C": 'create:precision_mechanism',
			"c": 'create:content_observer',
			"G": 'create:display_link',
			"g": 'create:display_board',
			"P": '#minecraft:buttons'
		}).id('kubejs:toms_storage/crafting/storage_terminal')

		// trim_clean
		event.remove({ id: 'toms_storage:trim_clean' })
		event.shapeless('toms_storage:ts.trim', ['toms_storage:ts.painted_trim', 'water_bucket'])
			.id('kubejs:toms_storage/crafting/trim_clean')

		// trim
		event.remove({ id: 'toms_storage:trim' })
		event.shaped('toms_storage:ts.trim',
			[
				'SSS',
				'SXS',
				'SSS'
			], {
			"S": '#forge:rods/wooden',
			"X": 'create:brass_tunnel'
		}).id('kubejs:toms_storage/crafting/trim')
	}

	// vs_eureka
	if (vs_eureka) {
		// balloonのレシピを変更
		event.remove({ id: 'vs_eureka:balloon_leather' })
		event.remove({ id: 'vs_eureka:balloon_membrane' })
		event.remove({ id: 'vs_eureka:balloon_paper' })
		event.remove({ id: 'vs_eureka:balloon_string' })
		event.remove({ id: 'vs_eureka:balloon_wool' })

		event.remove({ id: 'vs_eureka:black_balloon' })
		event.shaped('vs_eureka:black_balloon',
			[
				'KKK',
				'KSK',
				'KKK'
			], {
			"K": 'dried_kelp',
			"S": '#forge:string'
		}).id('kubejs:crafting/black_balloon')
		event.shaped('vs_eureka:balloon',
			[
				' s ',
				's s',
				' s '
			], {
			"s": 'create:white_sail'
		}).id('kubejs:crafting/balloon')

		// anchorのレシピを変更
		event.remove({ id: 'vs_eureka:anchor' })
		event.shaped('vs_eureka:anchor',
			[
				's#s',
				' # ',
				'###'
			], {
			"#": '#forge:ingots/steel',
			"s": '#forge:nuggets/steel'
		}).id('kubejs:crafting/anchor')

		// ballastのレシピを変更
		event.remove({ id: 'vs_eureka:ballast' })
		event.shapeless('vs_eureka:ballast', ['create:fluid_tank', '#forge:dusts/redstone']).id('kubejs:crafting/ballast')

		// engineのレシピを変更
		event.remove({ id: 'vs_eureka:engine' })
		event.shaped('vs_eureka:engine',
			[
				'P',
				'B',
				'R'
			], {
			"P": 'create:precision_mechanism',
			"B": 'blast_furnace',
			"R": 'create:railway_casing'
		}).id('kubejs:crafting/engine')

		// floater
		event.remove({ id: 'vs_eureka:floater' })
		event.shapeless('vs_eureka:floater', ['create:linear_chassis', '#forge:dusts/redstone']).id('kubejs:crafting/floater')

		// ship_helms
		woods.forEach(wood => {
			event.remove({ id: `vs_eureka:${wood}_ship_helm` })
			event.shaped(`vs_eureka:${wood}_ship_helm`,
				[
					' B ',
					'RCP',
					' I '
				], {
				"B": 'create:cogwheel',
				"R": 'create:rope_pulley',
				"C": 'create:railway_casing',
				"P": `${wood}_planks`,
				"I": 'create:precision_mechanism'
			}).id(`kubejs:crafting/${wood}_ship_helm`)
		})

		colors.forEach(color => {
			item_application(`vs_eureka:${color}_balloon`, '#vs_eureka:balloons', `${color}_dye`)
		})
	}

	// armor_trims
	if (armor_trims) {
		// func
		const trim = (base, trim) => {
			inter = `kjs.armor_trims:incomplete_${trim}_armor_trim_smithing_template`
			create.sequencedAssembly(`armor_trims:${trim}_armor_trim_smithing_template`, `${base}`, [
				create.deploying(inter, [inter, `armor_trims:${trim}_armor_trim_smithing_template`]).keepHeldItem(),
				create.pressing(inter, inter),
				create.filling(inter, [inter, Fluid.of('tconstruct:molten_diamond', 100)]),
				create.filling(inter, [inter, Fluid.of('tconstruct:molten_diamond', 100)]),
				create.pressing(inter, inter)
			]).transitionalItem(`${inter}`).loops(1)
		}

		// netherite_upgrade
		let trans = 'kjs.armor_trims:incomplete_netherite_upgrade_smithing_template'
		create.sequencedAssembly('armor_trims:netherite_upgrade_smithing_template', 'netherrack', [
			create.deploying(trans, [trans, 'armor_trims:netherite_upgrade_smithing_template']).keepHeldItem(),
			create.pressing(trans, trans),
			create.filling(trans, [trans, Fluid.of('tconstruct:molten_diamond', 100)]),
			create.filling(trans, [trans, Fluid.of('tconstruct:molten_diamond', 100)]),
			create.pressing(trans, trans)
		]).transitionalItem(trans).loops(1)

		// #region trims
		trim('#forge:cobblestone/normal', 'coast')
		trim('#forge:sandstone', 'dune')
		trim('#forge:endstone', 'eye')
		trim('terracotta', 'host')
		trim('terracotta', 'raiser')
		trim('netherrack', 'rib')
		trim('#forge:cobblestone/normal', 'sentry')
		trim('terracotta', 'shaper')
		trim('#forge:cobblestone/deepslate', 'silence')
		trim('blackstone', 'snout')
		trim('purpur_block', 'spire')
		trim('prismarine', 'tide')
		trim('#forge:cobblestone/normal', 'vex')
		trim('#forge:cobblestone/deepslate', 'ward')
		trim('terracotta', 'wayfinder')
		trim('#forge:cobblestone/mossy', 'wild')
		// #endregion
	}
})

onEvent('item.tags', event => {
	event.add('forge:storage_blocks/steel', 'createindustry:steel_block')
	event.add('forge:storage_blocks/cast_iron', 'createindustry:cast_iron_block')
	if (vs_eureka) {
		event.add('vs_eureka:balloons', 'vs_eureka:balloon')
		colors.forEach(color => event.add('vs_eureka:balloons', `vs_eureka:${color}_balloon`))
		woods.forEach(wood => event.add('vs_eureka:ship_helms', `vs_eureka:${wood}_ship_helm`))
	}
})

onEvent("item.entity_interact", event => {
	if (event.target.type != "minecraft:cow" || event.item.id != "minecraft:glass_bottle") return
	event.item.count--
	event.player.giveInHand("farmersdelight:milk_bottle")
	event.target.playSound("entity.cow.milk")
})

onEvent('item.modification', event => {
	/**
	 * @type {Special.Item[]}
	 */
	const stack = [
		"egg",
	]
	stack.forEach(stack_item => {
		event.modify(stack_item, item => {
			item.maxStackSize = 64
		})
	})
})

onEvent('lootjs', event => {
	// 削除するアイテムのLootTableを削除
	deleteItems.forEach(item => {
		event.addLootTypeModifier(LootType.CHEST)
			.removeLoot(`${item}`)
	})

	// 草wから小麦が出ないように
	event.addLootTableModifier('minecraft:blocks/grass')
		.removeLoot('wheat_seeds')
	event.addLootTableModifier('minecraft:blocks/tall_grass')
		.removeLoot('wheat_seeds')

	// 鉱石を統合
	event.addBlockLootModifier('#forge:ores').modifyLoot('#forge:raw_materials', item => {
		const replacement = AlmostUnified.getReplacementForItem(item);
		if (replacement.isEmpty()) {
			return item;
		}
		replacement.setCount(item.getCount());
		return replacement;
	});
})

onEvent('entity.loot_tables', event => {
	// ブレイズのドロップにブレイズコアを追加
	event.modifyEntity('minecraft:blaze', table => {
		table.addPool(pool => {
			pool.addItem('kubejs:blaze_core').randomChance(0.1)
		})
	})
})

onEvent('server.datapack.first', event => {
	if (toms_storage) {
		event.addJson('create:advancements/crafting_terminal', {
			"parent": "create:storage_terminal",
			"display": {
				"icon": {
					"item": "toms_storage:ts.crafting_terminal"
				},
				"title": {
					"translate": "HUGE SUCCESS."
				},
				"description": {
					"color": "#DBA213",
					"translate": "Place a crafting terminal"
				},
				"frame": "task",
				"show_toast": true,
				"announce_to_chat": true,
				"hidden": false
			},
			"criteria": {
				"0": {
					"trigger": "minecraft:placed_block",
					"conditions": {
						"block": "toms_storage:ts.crafting_terminal",
						"item": {
							"item": "toms_storage:ts.crafting_terminal"
						}
					}
				}
			},
			"requirements": [
				[
					"0"
				]
			]
		})
		event.addJson('create:advancements/storage_terminal', {
			"parent": "create:clockwork_bearing",
			"display": {
				"icon": {
					"item": "toms_storage:ts.storage_terminal"
				},
				"title": {
					"translate": "Still Alive"
				},
				"description": {
					"color": "#DBA213",
					"translate": "Place a storage terminal"
				},
				"frame": "task",
				"show_toast": true,
				"announce_to_chat": true,
				"hidden": false
			},
			"criteria": {
				"0": {
					"trigger": "minecraft:placed_block",
					"conditions": {
						"block": "toms_storage:ts.storage_terminal",
						"item": {
							"item": "toms_storage:ts.storage_terminal"
						}
					}
				}
			},
			"requirements": [
				[
					"0"
				]
			]
		})
	}
})