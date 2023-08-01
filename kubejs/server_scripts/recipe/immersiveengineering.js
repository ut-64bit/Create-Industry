// priority: 1

// func

// var
let inter

// const

onEvent('recipes', event => {
    // #region func
    const { sequencedAssembly, deploying, filling, mechanicalCrafting, compacting, mixing, emptying, haunting, pressing } = event.recipes.create;
    let item_application = (output, inputBlock, inputItem) => {
        event.custom({
            type: 'create:item_application',
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
    event.replaceInput({ output: IE('hammer') }, '#forge:ingots/iron', '#forge:ingots/steel')
    event.replaceInput({ output: IE('wirecutter') }, '#forge:ingots/iron', '#forge:ingots/steel')
    event.replaceInput({ output: IE('screwdriver') }, '#forge:rods/iron', '#forge:rods/steel')
    // #endregion

    // electron_tube
    event.remove({ id: 'immersiveengineering:blueprint/electron_tube' })
    inter = 'immersiveengineering:incomplete_electron_tube'
    sequencedAssembly('immersiveengineering:electron_tube', '#forge:plates/nickel', [
        deploying(inter, [inter, '#forge:wires/copper']),
        deploying(inter, [inter, '#forge:wires/copper']),
        deploying(inter, [inter, 'redstone']),
        filling(inter, [inter, Fluid.of('tconstruct:molten_glass', 250)])
    ]).transitionalItem(inter).loops(1)

    // dynamo
    event.remove({ id: 'immersiveengineering:crafting/dynamo' })
    event.shaped(IE('dynamo'), [
        'ses',
        'rlr',
        'sss'
    ], {
        s: '#forge:ingots/steel',
        e: 'create:electric_engine',
        r: '#forge:dusts/redstone',
        l: IE('coil_lv'),
    }).id('kubejs:crafting/dynamo')

    // blastbrick_reinforced
    mechanicalCrafting(Item.of(IE('blastbrick_reinforced'), 3), [
        ' ppp ',
        'pcscp',
        'psbsp',
        'pcscp',
        ' ppp '
    ], {
        p: '#forge:plates/steel',
        c: '#forge:ingots/nether_brick',
        s: '#forge:ingots/brick',
        b: 'blaze_powder'
    }).id('kubejs:mechanical_crafting/blastbrick_reinforced')

    // #region wire_coil
    event.remove({ id: /immersiveengineering:crafting\/wirecoil_.*/, input: '#balm:wooden_rods' })
    event.shaped('immersiveengineering:wirecoil_copper', [
        ' w ',
        'wsw',
        ' w '
    ], {
        w: '#forge:wires/copper',
        s: 'createaddition:spool'
    }).id('kubejs:crafting/wirecoil_copper')
    event.shaped('immersiveengineering:wirecoil_electrum', [
        ' w ',
        'wsw',
        ' w '
    ], {
        w: '#forge:wires/electrum',
        s: 'createaddition:spool'
    }).id('kubejs:crafting/wirecoil_electrum')
    event.shaped('immersiveengineering:wirecoil_steel', [
        ' s ',
        'aSa',
        ' s '
    ], {
        s: '#forge:wires/steel',
        a: '#forge:wires/aluminum',
        S: 'createaddition:spool'
    }).id('kubejs:crafting/wirecoil_steel'),
    event.shaped('immersiveengineering:wirecoil_structure_rope', [
        ' w ',
        'wsw',
        ' w '
    ], {
        w: 'farmersdelight:rope',
        s: 'createaddition:spool'
    }).id('kubejs:crafting/wirecoil_structure_rope')
    event.shaped('immersiveengineering:wirecoil_structure_steel', [
        ' w ',
        'wsw',
        ' w '
    ], {
        w: '#forge:wires/steel',
        s: 'createaddition:spool'
    }).id('kubejs:crafting/wirecoil_structure_steel')
    event.shaped('immersiveengineering:wirecoil_redstone', [
        ' a ',
        'rsr',
        ' a '
    ], {
        a: '#forge:wires/aluminum',
        r: 'redstone',
        s: 'createaddition:spool'
    }).id('kubejs:crafting/wirecoil_redstone')
    // #endregion
})

onEvent("lootjs", event => {

})