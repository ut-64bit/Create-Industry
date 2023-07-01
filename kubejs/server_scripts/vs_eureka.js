// priority: 1

let vs_eureka = false;

if (vs_eureka) {
	const colors = [
		`black`,
		`blue`,
		`brown`,
		`cyan`,
		`gray`,
		`green`,
		`light_blue`,
		`light_gray`,
		`lime`,
		`magenta`,
		`orange`,
		`pink`,
		`purple`,
		`red`,
		`white`,
		`yellow`
	]

	const woods = [
		`oak`,
		`dark_oak`,
		`spruce`,
		`birch`,
		`jungle`,
		`acacia`,
		`crimson`,
		`warped`
	]

	let recipe = `recipe id`;
	onEvent(`recipes`, event => {
		// ValkyrienSkies
		/* balloon */
		event.remove({ id: `vs_eureka:balloon_leather` })
		event.remove({ id: `vs_eureka:balloon_membrane` })
		event.remove({ id: `vs_eureka:balloon_paper` })
		event.remove({ id: `vs_eureka:balloon_string` })
		event.remove({ id: `vs_eureka:balloon_wool` })
		recipe = `vs_eureka:black_balloon`
		event.remove({ id: `${recipe}` })
		event.shaped(`${recipe}`,
			[
				`KKK`,
				`KSK`,
				`KKK`
			], {
			K: `dried_kelp`,
			S: `#forge:string`
		})
		colors.forEach(color => {
			event.shaped(`vs_eureka:${color}_balloon`,
				[
					` s `,
					`s s`,
					` s `
				], {
				s: `create:${color}_sail`
			})
		})

		/* anchor */
		recipe = `vs_eureka:anchor`
		event.remove({ id: `${recipe}` })
		event.shaped(`${recipe}`,
			[
				`sSs`,
				` S `,
				`SSS`
			], {
			s: `#forge:ingots/steel`,
			S: `#forge:nuggets/steel`
		}).id(`${recipe}`)

		/* ballast */
		recipe = `vs_eureka:ballast`
		event.remove({ id: `${recipe}` })
		event.shapeless(`${recipe}`, [`create:fluid_tank`, `#forge:dusts/redstone`]).id(`${recipe}`)

		/* engine */
		recipe = `vs_eureka:engine`
		event.shaped(`${recipe}`,
			[
				`P`,
				`B`,
				`R`
			], {
			P: `create:precision_mechanism`,
			B: `blast_furnace`,
			R: `create:railway_casing`
		}).id(`${recipe}`)

		/* floater */
		recipe = `vs_eureka:floater`
		event.remove({ id: `${recipe}` })
		event.shapeless(`${recipe}`, [`create:linear_chassis`, `#forge:dusts/redstone`]).id(`${recipe}`)

		/* ship_helms */
		woods.forEach(wood => {
			recipe = `vs_eureka:${wood}_ship_helm`
			event.shaped(`${recipe}`,
				[
					` B `,
					`RCP`,
					` I `
				], {
				B: `extendedgears:${wood}_cogwheel`,
				R: `create:rope_pulley`,
				C: `create:railway_casing`,
				P: `${wood}_planks`,
				I: `create:precision_mechanism`
			}).id(`${recipe}`)
		})
	})

	onEvent(`item.tags`, event => {
		// eureka
		event.add(`vs_eureka:balloons`, `vs_eureka:bolloon`)
		colors.forEach(color => {
			event.add(`vs_eureka:balloons`, `vs_eureka:${color}_bolloon`)
		})
		woods.forEach(wood => {
			event.add(`vs_eureka:ship_helms`, `vs_eureka:${wood}_ship_helm`)
		})
	})
}