// priority: 0

onEvent('jei.remove.categories', event => {
	// JEIからカテゴリを削除
	const hideCategory = [
		'immersiveengineering:alloysmelter',
	]

	hideCategory.forEach(categories => {
		event.remove(categories)
	})
})

onEvent('jei.hide.items', event => {
	// JEIからアイテムを削除
	{
		/**
		 * @type {Special.Item[]}
		 */
		let hideItem = [
			global.deleteItems,
			'create:dough',
			'createaddition:digital_adapter',
			'supplementaries:rope',
			'@valkyrienskies',
		]
		console.log(hideItem)

		hideItem.forEach(item => {
			event.hide(item)
		})
	}

	// ツール
	let hideTool = (material) => {
		event.hide(`${material}_pickaxe`)
		event.hide(`${material}_axe`)
		event.hide(`${material}_shovel`)
		event.hide(`${material}_hoe`)
		event.hide(`${material}_sword`)
	}
	hideTool('wooden')
	hideTool('stone')
})

onEvent('jei.add.items', event => {
	event.add('kubejs:blaze_core')
	//event.add('kubejs:steam_engine')
	event.add('kubejs:electric_engine')
})

onEvent('item.tooltip', tooltip => {
	const mags = ['oldguns:mp40_mag', 'oldguns:aks-74u_mag', 'oldguns:colt1911_mag', 'oldguns:galil_mag', 'oldguns:sten_mag', 'oldguns:scorpion_mag', 'oldguns:thompson_mag']
	mags.forEach(mag => {
		tooltip.addAdvanced(mag, (item, advanced, text) => {
			let bullets = item.nbt?.bullets
			if (bullets) {
				text.add(`Bullets: ${bullets}`)
			} else {
				text.add('Bullets: ?')
			}
		})
	})
})