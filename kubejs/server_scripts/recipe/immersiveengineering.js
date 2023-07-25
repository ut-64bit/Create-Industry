// priority: 1

// func
let IE = (id) => `immersiveengineering:${id}`

// var
let inter

// const

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

    // #region tools
    event.replaceInput({ output: IE(`hammer`) }, `#forge:ingots/iron`, `#forge:ingots/steel`)
    event.replaceInput({ output: IE(`wirecutter`) }, `#forge:ingots/iron`, `#forge:ingots/steel`)
    event.replaceInput({ output: IE(`screwdriver`) }, `#forge:rods/iron`, `#forge:rods/steel`)
    // #endregion

    // electron_tube
    event.remove({ id: `immersiveengineering:blueprint/electron_tube` })
    inter = `kubejs:incomplete_electron_tube`
    sequencedAssembly(`immersiveengineering:electron_tube`, `#forge:plates/nickel`, [
        deploying(inter, [inter, `#forge:wires/copper`]),
        deploying(inter, [inter, `#forge:wires/copper`]),
        deploying(inter, [inter, `redstone`]),
        filling(inter, [inter, Fluid.of(`tconstruct:molten_glass`, 250)])
    ]).transitionalItem(inter).loops(1)

    // copper_coil
    deploying(`kubejs:copper_coil`, [`#forge:rods/iron`, IE(`wirecoil_copper`)])
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
    mechanicalCrafting(Item.of(IE(`blastbrick_reinforced`), 3), [
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