// priority: 0

onEvent(`item.registry`, event => {
	event.create(`unprocessed_steel_ingot`, `create:sequenced_assembly`)
	event.create(`incomplete_netherite_upgrade_smithing_template`, `create:sequenced_assembly`)

	event.create(`blaze_core`)
})

onEvent(`block.registry`, event => {
	// Register new blocks here
})