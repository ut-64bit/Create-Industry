// priority: 0

onEvent(`jei.hide.items`, event => {
	// minecraft
	let hideTool = (material) => {
		event.hide(`${material}_pickaxe`)
		event.hide(`${material}_axe`)
		event.hide(`${material}_shovel`)
		event.hide(`${material}_hoe`)
		event.hide(`${material}_sword`)
	}
	hideTool(`wooden`)
	hideTool(`stone`)
	hideTool(`immersiveengineering:steel`)

	// create

	// oldguns
	event.hide(`oldguns:iron_with_coal`)

	// immersiveengineering
	event.hide(`immersiveengineering:blastbrick`)
	event.hide(`immersiveengineering:alloybrick`)

	// tconstruct
	event.hide(`tconstruct:earth_slime_sling`)
	event.hide(`tconstruct:ender_slime_sling`)
	event.hide(`tconstruct:ichor_slime_sling`)
	event.hide(`tconstruct:sky_slime_sling`)
	const hideCastTypes = [`plate`, `wire`]
	hideCastTypes.forEach(type => {
		event.hide(`tconstruct:${type}_red_sand_cast`)
		event.hide(`tconstruct:${type}_sand_cast`)
		event.hide(`tconstruct:${type}_cast`)
	})

	// tom_storage
	event.hide(`tom_storage:ts.adv_wireless_terminal`)
	event.hide(`tom_storage:ts.wireless_terminal`)
	event.hide(`tom_storage:ts.inventory_hopper_basic`)
})

onEvent(`jei.add.items`, event => {
	event.add(`kubejs:blaze_core`)
	event.add(`kubejs:steam_engine`)
	event.add(`kubejs:electric_engine`)
})

onEvent(`item.tooltip`, tooltip => {
	const mags = [`oldguns:mp40_mag`, `oldguns:aks-74u_mag`, `oldguns:colt1911_mag`, `oldguns:galil_mag`, `oldguns:sten_mag`, `oldguns:scorpion_mag`, `oldguns:thompson_mag`]
	mags.forEach(mag => {
		tooltip.addAdvanced(mag, (item, advanced, text) => {
			let bullets = item.nbt?.bullets
			if (bullets) {
				text.add(`Bullets: ${bullets}`)
			} else {
				text.add(`Bullets: ?`)
			}
		})
	})

})