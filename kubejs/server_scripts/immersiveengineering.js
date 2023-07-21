// priority: 1

// func
let IE = (id) => `immersiveengineering:${id}`

// var
let inter

// const
const ie_deleteItems = [
	IE(`blastbrick`),
	IE(`alloybrick`)
]

onEvent(`recipes`, event => {
	ie_deleteItems.forEach(item => {
		event.remove([{ output: `${item}` }, { input: `${item}` }])
	})

    // immersiveengineering
    // #region tools
    event.replaceInput({ output: IE(`hammer`) }, `#forge:ingots/iron`, `#forge:ingots/steel`)
    event.replaceInput({ output: IE(`wirecutter`) }, `#forge:ingots/iron`, `#forge:ingots/steel`)
    event.replaceInput({ output: IE(`screwdriver`) }, `#forge:rods/iron`, `#forge:rods/steel`)
    // #endregion

    /* component_iron */
    event.remove({ id: `immersiveengineering:crafting/component_iron` })
    inter = `kubejs:incomplete_component_iron`
    event.recipes.create.sequencedAssembly(IE(`component_iron`), `kubejs:copper_coil`, [
        event.recipes.create.deploying(inter, [inter, `#forge:plates/iron`]),
        event.recipes.create.deploying(inter, [inter, `#forge:plates/iron`]),
        event.recipes.create.deploying(inter, [inter, `#forge:plates/iron`])
    ])
    .transitionalItem(inter)
    .loops(1);

    /* component_steel */
    event.remove({ id: `immersiveengineering:crafting/component_steel` })
    inter = `kubejs:incomplete_component_steel`
    event.recipes.create.sequencedAssembly(IE(`component_steel`), `kubejs:copper_coil`, [
        event.recipes.create.deploying(inter, [inter, `#forge:plates/steel`]),
        event.recipes.create.deploying(inter, [inter, `#forge:plates/steel`]),
        event.recipes.create.deploying(inter, [inter, `#forge:plates/steel`])
    ])
    .transitionalItem(inter)
    .loops(1);

    /* copper_coil */
    event.recipes.create.deploying(`kubejs:copper_coil`, [`#forge:rods/iron`, IE(`wirecoil_copper`)])

    /* dynamo */
    event.remove({ id: `immersiveengineering:crafting/dynamo` })
    event.shaped(IE(`dynamo`), [
        `ses`,
        `rlr`,
        `sss`
    ], {
        s: `#forge:ingots/steel`,
        e: `kubejs:electric_engine`,
        r: `#forge:dusts/redstone`,
        l: IE(`coil_lv`),
    })

    /* blastbrick_reinforced */
    event.recipes.create.mechanicalCrafting(Item.of(IE(`blastbrick_reinforced`), 3), [
        ` ppp `,
        `pcscp`,
        `psbsp`,
        `pcscp`,
        ` ppp `
    ], {
        p: `#forge:ingots/steel`,
        c: `#forge:ingots/nether_brick`,
        s: `#forge:ingots/brick`,
        b: `blaze_powder`
    })
})

onEvent("lootjs", event => {
	ie_deleteItems.forEach(item => {
		event.addLootTypeModifier(LootType.CHEST)
			.removeLoot(`${item}`)
	})
})