// priority: 0

onEvent('item.registry', event => {
	event.create('unprocessed_steel_ingot', 'create:sequenced_assembly').displayName('Unprocessed Steel Ingot')
	// event.create('blaze_core').displayName('Blaze Core')
})

onEvent('block.registry', event => {
	// Register new blocks here
	// event.create('example_block').material('wood').hardness(1.0).displayName('Example Block')
})