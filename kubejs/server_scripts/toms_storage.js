// priority: 1

if (Item.exists(`toms_storage:ts.storage_terminal`)) {
	// #region let
	let recipe
	// #endregion

	onEvent(`recipes`, event => {
		// #region const
		const deleteItem = [
			`toms_storage:ts.adv_wireless_terminal`,
			`toms_storage:ts.wireless_terminal`,
			`toms_storage:ts.inventory_hopper_basic`
		]
		// #endregion

		// delete item
		deleteItem.forEach(item => {
			event.remove([{ output: `${item}` }, { input: `${item}` }])
		})

		// #region crafting_terminal
		recipe = `toms_storage:crafting_terminal`
		event.remove({ id: `${recipe}` })
		event.recipes.create.mechanicalCrafting(`toms_storage:ts.crafting_terminal`,
			[
				` P `,
				`SSS`,
				`SSS`,
				`SSS`,
				`AML`
			], {
			P: `toms_storage:ts.storage_terminal`,
			S: `create:mechanical_crafter`,
			A: `create:sturdy_sheet`,
			M: `create:precision_mechanism`,
			L: `create:linked_controller`
		}).id(`${recipe}`)
		// #endregion

		// #region inventory_cable_connector_filtered
		recipe = `toms_storage:inventory_cable_connector_filtered`
		event.remove({ id: `${recipe}` })
		event.shaped(`toms_storage:ts.inventory_cable_connector_filtered`,
			[
				`I`,
				`S`,
				`P`
			], {
			I: `#forge:plates/brass`,
			S: `toms_storage:ts.inventory_cable_connector`,
			P: `create:electron_tube`
		}).id(`${recipe}`)
		// #endregion

		// #region inventory_cable_connector_framed
		recipe = `toms_storage:inventory_cable_connector_framed`
		event.remove({ id: `${recipe}` })
		event.shaped(`toms_storage:ts.inventory_cable_connector_framed`,
			[
				`SSS`,
				`SCS`,
				`SSS`
			], {
			S: `#forge:rods/wooden`,
			C: `toms_storage:ts.inventory_cable_connector`
		}).id(`${recipe}`)
		// #endregion

		// #region inventory_cable_connector
		recipe = `toms_storage:inventory_cable_connector`
		event.remove({ id: `${recipe}` })
		event.shapeless(`toms_storage:ts.inventory_cable_connector`, [`toms_storage:ts.inventory_cable`, `create:chute`]).id(`${recipe}`)
		// #endregion

		// #region inventory_cable_framed
		recipe = `toms_storage:inventory_cable_framed`
		event.remove({ id: `${recipe}` })
		event.shaped(`toms_storage:ts.inventory_cable_framed`,
			[
				`SSS`,
				`SCS`,
				`SSS`
			], {
			S: `#forge:rods/wooden`,
			C: `toms_storage:ts.inventory_cable`
		}).id(`${recipe}`)
		// #endregion

		// #region inventory_cable
		recipe = `toms_storage:inventory_cable`
		event.remove({ id: `${recipe}` })
		event.shapeless(`toms_storage:ts.inventory_cable`, [`#forge:plates/brass`, `dried_kelp`]).id(`${recipe}`)
		// #endregion

		// #region inventory_connector
		recipe = `toms_storage:inventory_connector`
		event.remove({ id: `${recipe}` })
		event.shapeless(`toms_storage:ts.inventory_connector`, [`create:brass_casing`, `create:chute`]).id(`${recipe}`)
		// #endregion

		// #region inventory_proxy
		recipe = `toms_storage:inventory_proxy`
		event.remove({ id: `${recipe}` })
		event.shapeless(`toms_storage:ts.inventory_proxy`, [`toms_storage:ts.inventory_connector`, `create:smart_chute`]).id(`${recipe}`)
		// #endregion

		// #region level_emitter
		recipe = `toms_storage:level_emitter`
		event.remove({ id: `${recipe}` })
		event.shapeless(`toms_storage:ts.level_emitter`, [`create:content_observer`, `toms_storage:ts.inventory_cable`]).id(`${recipe}`)
		// #endregion

		// #region open_crate
		recipe = `toms_storage:open_crate`
		event.remove({ id: `${recipe}` })
		event.shaped(`toms_storage:ts.open_crate`,
			[
				`PSP`,
				`PCP`,
				`PTP`
			], {
			P: `#minecraft:planks`,
			S: `#forge:rods/wooden`,
			C: `#forge:chests/wooden`,
			T: `#minecraft:trapdoors`
		}).id(`${recipe}`)
		// #endregion

		// #region paint_kit
		recipe = `toms_storage:paint_kit`
		event.remove({ id: `${recipe}` })
		event.shaped(`toms_storage:ts.paint_kit`,
			[
				`RGB`,
				`iaW`,
				`bS `
			], {
			R: `#forge:dyes/red`,
			G: `#forge:dyes/green`,
			B: `#forge:dyes/blue`,
			i: `#forge:dyes/black`,
			a: `bucket`,
			W: `#minecraft:wool`,
			b: `water_bucket`,
			S: `#forge:rods/wooden`
		}).id(`${recipe}`)
		// #endregion

		// #region storage_terminal
		recipe = `toms_storage:storage_terminal`
		event.remove({ id: `${recipe}` })
		event.shaped(`toms_storage:ts.storage_terminal`,
			[
				` C `,
				`cGg`,
				`PPP`
			], {
			C: `create:precision_mechanism`,
			c: `create:content_observer`,
			G: `create:display_link`,
			g: `create:display_board`,
			P: `#minecraft:buttons`
		}).id(`${recipe}`)
		recipe = `toms_storage:trim_clean`
		event.remove({ id: `${recipe}` })
		event.shapeless(`toms_storage:ts.trim`, [`toms_storage:ts.painted_trim`, `water_bucket`]).id(`${recipe}`)
		// #endregion

		// #region trim
		recipe = `toms_storage:trim`
		event.remove({ id: `${recipe}` })
		event.shaped(`toms_storage:ts.trim`,
			[
				`SSS`,
				`SXS`,
				`SSS`
			], {
			S: `#forge:rods/wooden`,
			X: `create:brass_tunnel`
		}).id(`${recipe}`)
		// #endregion
	})
}