// priority: 1

// const

// var

if (Item.exists('toms_storage:ts.storage_terminal')) {
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
			P: 'toms_storage:ts.storage_terminal',
			S: 'create:mechanical_crafter',
			A: 'create:sturdy_sheet',
			M: 'create:precision_mechanism',
			L: 'create:linked_controller'
		}).id('kubejs:toms_storage/crafting/crafting_terminal')

		// inventory_cable_connector_filtered
		event.remove({ id: 'toms_storage:inventory_cable_connector_filtered' })
		event.shaped('toms_storage:ts.inventory_cable_connector_filtered',
			[
				'I',
				'S',
				'P'
			], {
			I: '#forge:plates/brass',
			S: 'toms_storage:ts.inventory_cable_connector',
			P: 'create:electron_tube'
		}).id('kubejs:toms_storage/crafting/inventory_cable_connector_filtered')

		// inventory_cable_connector_framed
		event.remove({ id: 'toms_storage:inventory_cable_connector_framed' })
		event.shaped('toms_storage:ts.inventory_cable_connector_framed',
			[
				'SSS',
				'SCS',
				'SSS'
			], {
			S: '#forge:rods/wooden',
			C: 'toms_storage:ts.inventory_cable_connector'
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
			S: '#forge:rods/wooden',
			C: 'toms_storage:ts.inventory_cable'
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
			P: '#minecraft:planks',
			S: '#forge:rods/wooden',
			C: '#forge:chests/wooden',
			T: '#minecraft:trapdoors'
		}).id('kubejs:toms_storage/crafting/open_crate')

		// paint_kit
		event.remove({ id: 'toms_storage:paint_kit' })
		event.shaped('toms_storage:ts.paint_kit',
			[
				'RGB',
				'iaW',
				'bS '
			], {
			R: '#forge:dyes/red',
			G: '#forge:dyes/green',
			B: '#forge:dyes/blue',
			i: '#forge:dyes/black',
			a: 'bucket',
			W: '#minecraft:wool',
			b: 'water_bucket',
			S: '#forge:rods/wooden'
		}).id('kubejs:toms_storage/crafting/paint_kit')

		// storage_terminal
		event.remove({ id: 'toms_storage:storage_terminal' })
		event.shaped('toms_storage:ts.storage_terminal',
			[
				' C ',
				'cGg',
				'PPP'
			], {
			C: 'create:precision_mechanism',
			c: 'create:content_observer',
			G: 'create:display_link',
			g: 'create:display_board',
			P: '#minecraft:buttons'
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
			S: '#forge:rods/wooden',
			X: 'create:brass_tunnel'
		}).id('kubejs:toms_storage/crafting/trim')
	})

	onEvent("lootjs", event => {
	})

	onEvent('server.datapack.first', event => {
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
	})
}