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

/**
 * @type {Special.Item[]}
 */
let hideItem = [
	global.deleteItems,
	'create:dough',
	'createaddition:digital_adapter',
	"farmersdelight:rope",
	'@valkyrienskies',
]
onEvent('jei.hide.items', event => {
	// JEIからアイテムを削除
	hideItem.forEach(item => {
		event.hide(item)
	})
})

onEvent('jei.add.items', event => {
	event.add('kubejs:blaze_core')
	//event.add('kubejs:steam_engine')
	event.add('kubejs:electric_engine')
})

onEvent('item.tooltip', tooltip => {
	// 削除したいアイテムにツールチップを表示
	tooltip.add(hideItem, Text.red("DELETED").underlined().italic())

	/**
	 * @type {Special.Item[]}
	 */
	let mags = ['oldguns:mp40_mag', 'oldguns:aks-74u_mag', 'oldguns:colt1911_mag', 'oldguns:galil_mag', 'oldguns:sten_mag', 'oldguns:scorpion_mag', 'oldguns:thompson_mag']
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