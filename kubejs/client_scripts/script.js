// priority: 0

onEvent(`jei.remove.categories`, event => {
	// const
	const hideCategory = [
		`immersiveengineering:alloysmelter`
	]

	hideCategory.forEach(categories => {
		event.remove(categories)
	})
})

onEvent(`jei.hide.items`, event => {
	// const
	const hideItem = [
		`create:dough`,
		`createaddition:digital_adapter`,
		`oldguns:iron_with_coal`,
		`immersiveengineering:blastbrick`,
		`immersiveengineering:alloybrick`,
		`tconstruct:earth_slime_sling`,
		`tconstruct:ender_slime_sling`,
		`tconstruct:ichor_slime_sling`,
		`tconstruct:sky_slime_sling`,
		`tom_storage:ts.adv_wireless_terminal`,
		`tom_storage:ts.wireless_terminal`,
		`tom_storage:ts.inventory_hopper_basic`,
		`supplementaries:rope`,
		`@valkyrienskies`,
		/createdeco:.*_slab_vert/
	]

	hideItem.forEach(item => {
		event.hide(item)
	})

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
	//hideTool(`immersiveengineering:steel`)

	// tconstruct
	const hideCastTypes = [`plate`, `wire`]
	hideCastTypes.forEach(type => {
		event.hide(`tconstruct:${type}_red_sand_cast`)
		event.hide(`tconstruct:${type}_sand_cast`)
		event.hide(`tconstruct:${type}_cast`)
	})
})

onEvent(`jei.add.items`, event => {
	event.add(`kubejs:blaze_core`)
	//event.add(`kubejs:steam_engine`)
	event.add(`kubejs:electric_engine`)
})

let mags = [`oldguns:mp40_mag`, `oldguns:aks-74u_mag`, `oldguns:colt1911_mag`, `oldguns:galil_mag`, `oldguns:sten_mag`, `oldguns:scorpion_mag`, `oldguns:thompson_mag`]
onEvent(`item.tooltip`, tooltip => {
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