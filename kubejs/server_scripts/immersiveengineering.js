// priority: 1

onEvent(`recipes`, event => {
    // immersiveengineering
    /* tools */
    event.replaceInput({ output: IE(`hammer`) }, `#forge:ingots/iron`, `#forge:ingots/steel`)
    event.replaceInput({ output: IE(`wirecutter`) }, `#forge:ingots/iron`, `#forge:ingots/steel`)
    event.replaceInput({ output: IE(`screwdriver`) }, `#forge:rods/iron`, `#forge:rods/steel`)

    /* component_iron */
    event.remove({ id: `immersiveengineering:crafting/component_iron` })
    inter = `kubejs:incomplete_component_iron`
    event.recipes.create.sequencedAssembly(IE(`component_iron`), `#forge:rods/iron`, [
        event.recipes.create.deploying(inter, [inter, IE(`wirecoil_copper`)]),
        event.recipes.create.deploying(inter, [inter, `#forge:plates/iron`]),
        event.recipes.create.deploying(inter, [inter, `#forge:plates/iron`]),
        event.recipes.create.deploying(inter, [inter, `#forge:plates/iron`])
    ]).transitionalItem(inter).loops(1)

    /* component_steel */
    event.remove({ id: `immersiveengineering:crafting/component_steel` })
    inter = `kubejs:incomplete_component_steel`
    event.recipes.create.sequencedAssembly(IE(`component_steel`), `#forge:rods/iron`, [
        event.recipes.create.deploying(inter, [inter, IE(`wirecoil_copper`)]),
        event.recipes.create.deploying(inter, [inter, `#forge:plates/steel`]),
        event.recipes.create.deploying(inter, [inter, `#forge:plates/steel`]),
        event.recipes.create.deploying(inter, [inter, `#forge:plates/steel`])
    ]).transitionalItem(inter).loops(1)

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