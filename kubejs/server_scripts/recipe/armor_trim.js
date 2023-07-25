// priority: 1

if (Item.exists(`armor_trims:netherite_upgrade_smithing_template`)) {
	onEvent(`recipes`, event => {
		// #region func
		const { sequencedAssembly, deploying, filling, mechanicalCrafting, compacting, mixing, emptying, haunting, pressing } = event.recipes.create;
		let item_application = (output, inputBlock, inputItem) => {
			event.custom({
				type: `create:item_application`,
				ingredients: [
					Ingredient.of(inputBlock).toJson(),
					Ingredient.of(inputItem).toJson()
				],
				results: [
					Item.of(output).toResultJson()
				]
			})
		}
		// #endregion

		// func
		let trim = (base, trim) => {
			let inter = `kubejs:incomplete_${trim}_armor_trim_smithing_template`
			sequencedAssembly(`armor_trims:${trim}_armor_trim_smithing_template`, `${base}`, [
				deploying(inter, [inter, `armor_trims:${trim}_armor_trim_smithing_template`]).keepHeldItem(),
				pressing(inter, inter),
				filling(inter, [inter, Fluid.of(`tconstruct:molten_diamond`, 100)]),
				filling(inter, [inter, Fluid.of(`tconstruct:molten_diamond`, 100)]),
				pressing(inter, inter)
			]).transitionalItem(`${inter}`).loops(1)
		}

		// netherite_upgrade
		let trans = `kubejs:incomplete_netherite_upgrade_smithing_template`
		sequencedAssembly(`armor_trims:netherite_upgrade_smithing_template`, `netherrack`, [
			deploying(trans, [trans, `armor_trims:netherite_upgrade_smithing_template`]).keepHeldItem(),
			pressing(trans, trans),
			filling(trans, [trans, Fluid.of(`tconstruct:molten_diamond`, 100)]),
			filling(trans, [trans, Fluid.of(`tconstruct:molten_diamond`, 100)]),
			pressing(trans, trans)
		]).transitionalItem(trans).loops(1)

		// #region trims
		trim(`#forge:cobblestone/normal`, `coast`)
		trim(`#forge:sandstone`, `dune`)
		trim(`#forge:endstone`, `eye`)
		trim(`terracotta`, `host`)
		trim(`terracotta`, `raiser`)
		trim(`netherrack`, `rib`)
		trim(`#forge:cobblestone/normal`, `sentry`)
		trim(`terracotta`, `shaper`)
		trim(`#forge:cobblestone/deepslate`, `silence`)
		trim(`blackstone`, `snout`)
		trim(`purpur_block`, `spire`)
		trim(`prismarine`, `tide`)
		trim(`#forge:cobblestone/normal`, `vex`)
		trim(`#forge:cobblestone/deepslate`, `ward`)
		trim(`terracotta`, `wayfinder`)
		trim(`#forge:cobblestone/mossy`, `wild`)
		// #endregion
	})
}