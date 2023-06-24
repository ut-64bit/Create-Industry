// priority: 0

onEvent(`jei.hide.items`, event => {
	// minecraft
	let hideTool =(material) => {
		event.hide(`${material}_pickaxe`)
		event.hide(`${material}_axe`)
		event.hide(`${material}_shovel`)
		event.hide(`${material}_hoe`)
		event.hide(`${material}_sword`)
	}
	hideTool(`wooden`)
	hideTool(`stone`)
	hideTool(`iron`)
	hideTool(`golden`)
	hideTool(`diamond`)
	hideTool(`netherite`)
	hideTool(`immersiveengineering:steel`)
	hideTool(`create_sa:copper`)
	hideTool(`create_sa:brass`)
	hideTool(`create_sa:zinc`)

	let hideArmor =(material) => {
		event.hide(`${material}_helmet`)
		event.hide(`${material}_chestplate`)
		event.hide(`${material}_leggings`)
		event.hide(`${material}_boots`)
	}
	hideArmor(`create_sa:zinc`)

	// create
	event.hide(`davebuildingmod:steel_block`)
	event.hide(`davebuildingmod:steel_ingot`)

	// oldguns
	event.hide(`oldguns:iron_with_coal`)

	// tconstruct
	event.hide(`tconstruct:earth_slime_sling`)
	event.hide(`tconstruct:ender_slime_sling`)
	event.hide(`tconstruct:ichor_slime_sling`)
	event.hide(`tconstruct:sky_slime_sling`)
	const hideCastTypes = [`plate`, `wire`, `gear`]
	hideCastTypes.forEach(type => {
		event.hide(`tconstruct:${type}_red_sand_cast`)
		event.hide(`tconstruct:${type}_sand_cast`)
		event.hide(`tconstruct:${type}_cast`)
	})
})

onEvent(`item.tooltip`, tooltip => {
	const mags = [`oldguns:mags/asval_mag`, `oldguns:mags/aks-74u_mag`, `oldguns:mags/sten_mag`, `oldguns:mags/mp40_mag`, `oldguns:mags/luger_mag`, `oldguns:mags/thompson_drum_mag`, `oldguns:mags/thompson_mag`, `oldguns:mags/colt_mag`]
	mags.forEach(mag => {
		tooltip.addAdvanced(mag, (item, advanced, text) => {
			let bullets = item.nbt?.bullets
			if (bullets) {
				text.add(`Bullet: ${bullets}`)
			} else {
				text.add(`Bullet: 0`)
			}
		})
	})

})