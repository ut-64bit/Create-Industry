// priority: 1

// func
let IE = (id) => `immersiveengineering:${id}`

// var
let inter

// const

onEvent(`recipes`, event => {
    // #region tools
    event.replaceInput({ output: IE(`hammer`) }, `#forge:ingots/iron`, `#forge:ingots/steel`)
    event.replaceInput({ output: IE(`wirecutter`) }, `#forge:ingots/iron`, `#forge:ingots/steel`)
    event.replaceInput({ output: IE(`screwdriver`) }, `#forge:rods/iron`, `#forge:rods/steel`)
    // #endregion

    // electron_tube
    event.remove({ id: `immersiveengineering:blueprint/electron_tube` })
    inter = `kubejs:incomplete_electron_tube`
    event.recipes.create.sequencedAssembly(`immersiveengineering:electron_tube`, `#forge:plates/nickel`, [
        event.recipes.create.deploying(inter, [inter, `#forge:wires/copper`]),
        event.recipes.create.deploying(inter, [inter, `#forge:wires/copper`]),
        event.recipes.create.deploying(inter, [inter, `redstone`]),
        event.recipes.create.filling(inter, [inter, Fluid.of(`tconstruct:molten_glass`, 250)])
    ]).transitionalItem(inter).loops(1)

    // copper_coil
    event.recipes.create.deploying(`kubejs:copper_coil`, [`#forge:rods/iron`, IE(`wirecoil_copper`)])
        .id(`kubejs:immersiveengineering/deploying/copper_coil`)

    // dynamo
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
    }).id(`kubejs:immersiveengineering/crafting/dynamo`)

    // blastbrick_reinforced
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
    }).id(`kubejs:immersiveengineering/mechanical_crafting/blastbrick_reinforced`)
})

onEvent("lootjs", event => {

})