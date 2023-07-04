// priority: 1

/* func */
let TC = (id) => `tconstruct:${id}`

/* const */
const MetalMaterials = [
    `aluminum`,
    `amethyst_bronze`,
    `brass`,
    `bronze`,
    `cobalt`,
    `constantan`,
    `copper`,
    `electrum`,
    `emerald`,
    `enderium`,
    `gold`,
    `hepatizon`,
    `inlet`,
    `iron`,
    `knightslime`,
    `lead`,
    `lumium`,
    `manyullyn`,
    `molten_debris`,
    `netherite`,
    `nickel`,
    `osmium`,
    `pewter`,
    `pig_iron`,
    `platinum`,
    `queens_slime`,
    `refined_glowstone`,
    `refined_obsidian`,
    `rose_gold`,
    `signalum`,
    `silver`,
    `slimesteel`,
    `soulsteel`,
    `steel`,
    `tin`,
    `tungsten`,
    `uranium`,
    `zinc`
]

/* var */
let inter = `inter`

onEvent(`recipes`, event => {
    // create
    /* steam_engine */
    inter = `kubejs:incomplete_steam_engine`
    event.recipes.create.sequencedAssembly(`kubejs:steam_engine`, `#forge:plates/copper`, [
        event.recipes.create.deploying(inter, [inter, `create:propeller`]),
        event.recipes.create.deploying(inter, [inter, `create:cogwheel`]),
        event.recipes.create.deploying(inter, [inter, `#forge:nuggets/copper`])
    ]).transitionalItem(inter).loops(3)

    /* electric_engine */
    inter = `kubejs:incomplete_electric_engine`
    event.recipes.create.sequencedAssembly(`kubejs:electric_engine`, `#forge:plates/brass`, [
        event.recipes.create.deploying(inter, [inter, `#forge:nuggets/steel`]),
        event.recipes.create.deploying(inter, [inter, `createaddition:copper_spool`]),
        event.recipes.create.deploying(inter, [inter, `create:shaft`]),
        event.recipes.create.deploying(inter, [inter, `#forge:nuggets/brass`])
    ]).transitionalItem(inter).loops(3)

    /* electric_motor */
    event.remove({ id: `createaddition:mechanical_crafting/electric_motor` })
    event.recipes.create.mechanicalCrafting(`createaddition:electric_motor`, [
        `  A  `,
        ` BEB `,
        `BSRSB`,
        ` BCB `
    ], {
        A: `create:andesite_alloy`,
        B: `#forge:plates/brass`,
        E: `kubejs:electric_engine`,
        S: `createaddition:copper_spool`,
        R: `#forge:rods/iron`,
        C: `createaddition:capacitor`
    })

    /* alternator */
    event.remove({ id: `createaddition:mechanical_crafting/alternator` })
    event.recipes.create.mechanicalCrafting(`createaddition:alternator`, [
        `  A  `,
        ` IEI `,
        `ISRSI`,
        ` ICI `
    ], {
        A: `create:andesite_alloy`,
        I: `#forge:plates/iron`,
        E: `kubejs:electric_engine`,
        S: `createaddition:copper_spool`,
        R: `#forge:rods/iron`,
        C: `createaddition:capacitor`
    })

    /* 合金をつくった時の出力を液体に変更 */
    event.replaceOutput({ id: `alloyed:mixing/bronze_ingot` }, `alloyed:bronze_ingot`, Fluid.of(TC(`molten_bronze`), 90))
    event.replaceOutput({ id: `alloyed:mixing/bronze_ingot_x3` }, `alloyed:bronze_ingot`, Fluid.of(TC(`molten_bronze`), 270))
    event.replaceOutput({ id: `alloyed:mixing/steel_ingot` }, `alloyed:steel_ingot`, Fluid.of(TC(`molten_steel`), 270))
    event.replaceOutput({ id: `create:mixing/brass_ingot` }, `create:brass_ingot`, Fluid.of(TC(`molten_brass`), 180))

    /* 一部の歯車のレシピを削除 */
    event.remove({ id: `extendedgears:smelting/half_shaft_steel_cogwheel_from_iron` })
    event.remove({ id: `extendedgears:blasting/half_shaft_steel_cogwheel_from_iron` })
    event.remove({ id: `extendedgears:smelting/large_half_shaft_steel_cogwheel_from_iron` })
    event.remove({ id: `extendedgears:blasting/large_half_shaft_steel_cogwheel_from_iron` })
    event.remove({ id: `extendedgears:smelting/shaftless_steel_cogwheel_from_iron` })
    event.remove({ id: `extendedgears:blasting/shaftless_steel_cogwheel_from_iron` })
    event.remove({ id: `extendedgears:smelting/large_shaftless_steel_cogwheel_from_iron` })
    event.remove({ id: `extendedgears:blasting/large_shaftless_steel_cogwheel_from_iron` })
    event.remove({ id: `extendedgears:smelting/steel_cogwheel_from_iron` })
    event.remove({ id: `extendedgears:blasting/steel_cogwheel_from_iron` })
    event.remove({ id: `extendedgears:smelting/large_steel_cogwheel_from_iron` })
    event.remove({ id: `extendedgears:blasting/large_steel_cogwheel_from_iron` })

    /* 液体⇄インゴット */
    let melt = (output, item, gem) => {
        if (gem) {
            event.recipes.create.compacting(`${output}`, Fluid.of(TC(`molten_${item}`), 100))
            event.recipes.create.mixing(Fluid.of(TC(`molten_${item}`), 100), `#forge:gems/${item}`).superheated()
        } else {
            event.recipes.create.compacting(`${output}`, Fluid.of(TC(`molten_${item}`), 90))
            event.recipes.create.mixing(Fluid.of(TC(`molten_${item}`), 90), `#forge:ingots/${item}`).heated()
        }
    }
    melt(`iron_ingot`, `iron`, false)
    melt(`gold_ingot`, `gold`, false)
    melt(`create:brass_ingot`, `brass`, false)
    melt(`alloyed:bronze_ingot`, `bronze`, false)
    melt(`alloyed:steel_ingot`, `steel`, false)
    melt(`diamond`, `diamond`, true)

    /* 雑多なレシピを追加 */
    event.recipes.create.emptying([`obsidian`, Fluid.of(`lava`, 250)], `magma_block`)
    event.recipes.create.haunting(`netherrack`, `clay`)
})