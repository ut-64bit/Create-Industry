// priority: 0

onEvent('item.registry', event => {
	// misc
	event.create('oldguns:unprocessed_steel_ingot', 'create:sequenced_assembly').texture("kubejs:item/unprocessed_steel_ingot")
	event.create('blaze_core').texture("kubejs:item/blaze_core")

	// create
	event.create('create_kubejs:steam_engine').texture("kubejs:item/steam_engine")
	event.create('create_kubejs:electric_engine').texture("kubejs:item/electric_engine")
	event.create('create_kubejs:incomplete_steam_engine', 'create:sequenced_assembly').texture("kubejs:item/incomplete_steam_engine")
	event.create('create_kubejs:incomplete_electric_engine', 'create:sequenced_assembly').texture("kubejs:item/incomplete_electric_engine")

	// immersiveengineering
	event.create('immersiveengineering:incomplete_electron_tube', 'create:sequenced_assembly').texture("kubejs:item/incomplete_electron_tube")

	// armor trim
	if (Item.exists('armor_trims:netherite_upgrade_smithing_template')) {
		event.create('armor_trims:incomplete_netherite_upgrade_smithing_template', 'create:sequenced_assembly').texture("kubejs:item/incomplete_netherite_upgrade_smithing_template")
		event.create('armor_trims:incomplete_coast_armor_trim_smithing_template', 'create:sequenced_assembly').texture("kubejs:item/incomplete_coast_armor_trim_smithing_template")
		event.create('armor_trims:incomplete_dune_armor_trim_smithing_template', 'create:sequenced_assembly').texture("kubejs:item/incomplete_dune_armor_trim_smithing_template")
		event.create('armor_trims:incomplete_eye_armor_trim_smithing_template', 'create:sequenced_assembly').texture("kubejs:item/incomplete_eye_armor_trim_smithing_template")
		event.create('armor_trims:incomplete_host_armor_trim_smithing_template', 'create:sequenced_assembly').texture("kubejs:item/incomplete_host_armor_trim_smithing_template")
		event.create('armor_trims:incomplete_raiser_armor_trim_smithing_template', 'create:sequenced_assembly').texture("kubejs:item/incomplete_raiser_armor_trim_smithing_template")
		event.create('armor_trims:incomplete_rib_armor_trim_smithing_template', 'create:sequenced_assembly').texture("kubejs:item/incomplete_rib_armor_trim_smithing_template")
		event.create('armor_trims:incomplete_sentry_armor_trim_smithing_template', 'create:sequenced_assembly').texture("kubejs:item/incomplete_sentry_armor_trim_smithing_template")
		event.create('armor_trims:incomplete_shaper_armor_trim_smithing_template', 'create:sequenced_assembly').texture("kubejs:item/incomplete_shaper_armor_trim_smithing_template")
		event.create('armor_trims:incomplete_silence_armor_trim_smithing_template', 'create:sequenced_assembly').texture("kubejs:item/incomplete_silence_armor_trim_smithing_template")
		event.create('armor_trims:incomplete_snout_armor_trim_smithing_template', 'create:sequenced_assembly').texture("kubejs:item/incomplete_snout_armor_trim_smithing_template")
		event.create('armor_trims:incomplete_spire_armor_trim_smithing_template', 'create:sequenced_assembly').texture("kubejs:item/incomplete_spire_armor_trim_smithing_template")
		event.create('armor_trims:incomplete_tide_armor_trim_smithing_template', 'create:sequenced_assembly').texture("kubejs:item/incomplete_tide_armor_trim_smithing_template")
		event.create('armor_trims:incomplete_vex_armor_trim_smithing_template', 'create:sequenced_assembly').texture("kubejs:item/incomplete_vex_armor_trim_smithing_template")
		event.create('armor_trims:incomplete_ward_armor_trim_smithing_template', 'create:sequenced_assembly').texture("kubejs:item/incomplete_ward_armor_trim_smithing_template")
		event.create('armor_trims:incomplete_wayfinder_armor_trim_smithing_template', 'create:sequenced_assembly').texture("kubejs:item/incomplete_wayfinder_armor_trim_smithing_template")
		event.create('armor_trims:incomplete_wild_armor_trim_smithing_template', 'create:sequenced_assembly').texture("kubejs:item/incomplete_wild_armor_trim_smithing_template")
	}
})

onEvent("item.modification", event => {
	/**
	 * @type {Special.Item[]}
	 */
	const stack = [
		"egg",
		"snowball",
	]
	stack.forEach(stack_item => {
		event.modify(stack_item, item => {
			item.maxStackSize = 64
		})
	})
})