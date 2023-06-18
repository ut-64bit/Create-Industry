// priority: 0

onEvent(`jei.hide.items`, event => {
	// minecraft

	// oldguns
	event.hide(`oldguns:iron_with_coal`)

	// tconstruct
	event.hide(`tconstruct:earth_slime_sling`)
	event.hide(`tconstruct:ender_slime_sling`)
	event.hide(`tconstruct:ichor_slime_sling`)
	event.hide(`tconstruct:sky_slime_sling`)
})

onEvent('item.tooltip', tooltip => {
	tooltip.addAdvanced('oldguns:mags/aks-74u_mag', (item, advanced, text) => {
		let bullets = item.nbt?.bullets
		if (bullets) {
			text.add(`Bullet:${bullets}`)
		}
	})
})