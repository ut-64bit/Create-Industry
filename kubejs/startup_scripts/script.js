// priority: 0

onEvent(`item.registry`, event => {
	event.create(`oldguns:unprocessed_steel_ingot`, `create:sequenced_assembly`)
	event.create(`create:steam_engine`)
	event.create(`create:incomplete_steam_engine`, `create:sequenced_assembly`)
	event.create(`create:electric_engine`)
	event.create(`create:incomplete_electric_engine`, `create:sequenced_assembly`)

	// immersiveengineering
	event.create(`immersiveengineering:incomplete_electron_tube`, `create:sequenced_assembly`)

	// armor trim
	if (Item.exists(`armor_trims:netherite_upgrade_smithing_template`)) {
		event.create(`armor_trims:incomplete_netherite_upgrade_smithing_template`, `create:sequenced_assembly`)
		event.create(`armor_trims:incomplete_coast_armor_trim_smithing_template`, `create:sequenced_assembly`)
		event.create(`armor_trims:incomplete_dune_armor_trim_smithing_template`, `create:sequenced_assembly`)
		event.create(`armor_trims:incomplete_eye_armor_trim_smithing_template`, `create:sequenced_assembly`)
		event.create(`armor_trims:incomplete_host_armor_trim_smithing_template`, `create:sequenced_assembly`)
		event.create(`armor_trims:incomplete_raiser_armor_trim_smithing_template`, `create:sequenced_assembly`)
		event.create(`armor_trims:incomplete_rib_armor_trim_smithing_template`, `create:sequenced_assembly`)
		event.create(`armor_trims:incomplete_sentry_armor_trim_smithing_template`, `create:sequenced_assembly`)
		event.create(`armor_trims:incomplete_shaper_armor_trim_smithing_template`, `create:sequenced_assembly`)
		event.create(`armor_trims:incomplete_silence_armor_trim_smithing_template`, `create:sequenced_assembly`)
		event.create(`armor_trims:incomplete_snout_armor_trim_smithing_template`, `create:sequenced_assembly`)
		event.create(`armor_trims:incomplete_spire_armor_trim_smithing_template`, `create:sequenced_assembly`)
		event.create(`armor_trims:incomplete_tide_armor_trim_smithing_template`, `create:sequenced_assembly`)
		event.create(`armor_trims:incomplete_vex_armor_trim_smithing_template`, `create:sequenced_assembly`)
		event.create(`armor_trims:incomplete_ward_armor_trim_smithing_template`, `create:sequenced_assembly`)
		event.create(`armor_trims:incomplete_wayfinder_armor_trim_smithing_template`, `create:sequenced_assembly`)
		event.create(`armor_trims:incomplete_wild_armor_trim_smithing_template`, `create:sequenced_assembly`)
	}

	event.create(`blaze_core`)
})

onEvent(`item.modification`, event => {
	const mags = [`oldguns:mp40_mag`, `oldguns:aks-74u_mag`, `oldguns:colt1911_mag`, `oldguns:galil_mag`, `oldguns:sten_mag`, `oldguns:scorpion_mag`, `oldguns:thompson_mag`]
	mags.forEach(mag => {
		event.modify(mag, item => item.maxStackSize = 1)
	})
})