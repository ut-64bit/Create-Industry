// priority: 0

onEvent(`item.registry`, event => {
	event.create(`unprocessed_steel_ingot`, `create:sequenced_assembly`)

	// immersiveengineering
	event.create(`incomplete_component_iron`, `create:sequenced_assembly`)
	event.create(`incomplete_component_steel`, `create:sequenced_assembly`)

	// armor trim
	event.create(`incomplete_netherite_upgrade_smithing_template`, `create:sequenced_assembly`)
	event.create(`incomplete_coast_armor_trim_smithing_template`, `create:sequenced_assembly`)
	event.create(`incomplete_dune_armor_trim_smithing_template`, `create:sequenced_assembly`)
	event.create(`incomplete_eye_armor_trim_smithing_template`, `create:sequenced_assembly`)
	event.create(`incomplete_host_armor_trim_smithing_template`, `create:sequenced_assembly`)
	event.create(`incomplete_raiser_armor_trim_smithing_template`, `create:sequenced_assembly`)
	event.create(`incomplete_rib_armor_trim_smithing_template`, `create:sequenced_assembly`)
	event.create(`incomplete_sentry_armor_trim_smithing_template`, `create:sequenced_assembly`)
	event.create(`incomplete_shaper_armor_trim_smithing_template`, `create:sequenced_assembly`)
	event.create(`incomplete_silence_armor_trim_smithing_template`, `create:sequenced_assembly`)
	event.create(`incomplete_snout_armor_trim_smithing_template`, `create:sequenced_assembly`)
	event.create(`incomplete_spire_armor_trim_smithing_template`, `create:sequenced_assembly`)
	event.create(`incomplete_tide_armor_trim_smithing_template`, `create:sequenced_assembly`)
	event.create(`incomplete_vex_armor_trim_smithing_template`, `create:sequenced_assembly`)
	event.create(`incomplete_ward_armor_trim_smithing_template`, `create:sequenced_assembly`)
	event.create(`incomplete_wayfinder_armor_trim_smithing_template`, `create:sequenced_assembly`)
	event.create(`incomplete_wild_armor_trim_smithing_template`, `create:sequenced_assembly`)

	event.create(`blaze_core`)
})

onEvent(`block.registry`, event => {
	// Register new blocks here
})