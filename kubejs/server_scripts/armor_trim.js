// priority: 1

onEvent(`recipes`, event => {
    let trim = (base, trim) => {
        var inter = `kubejs:incomplete_${trim}_armor_trim_smithing_template`
        event.recipes.create.sequencedAssembly(`armor_trims:${trim}_armor_trim_smithing_template`, `${base}`, [
            event.recipes.create.deploying(inter, [inter, `armor_trims:${trim}_armor_trim_smithing_template`]).keepHeldItem(),
            event.recipes.create.pressing(inter, inter),
            event.recipes.create.filling(inter, [inter, Fluid.of(`tconstruct:molten_diamond`, 100)]),
            event.recipes.create.filling(inter, [inter, Fluid.of(`tconstruct:molten_diamond`, 100)]),
            event.recipes.create.pressing(inter, inter)
        ]).transitionalItem(inter).loops(1)
    }
    // armor_trims
    /* 強化と装飾 */
    var inter = `kubejs:incomplete_netherite_upgrade_smithing_template`
    event.recipes.create.sequencedAssembly(`armor_trims:netherite_upgrade_smithing_template`, `netherrack`, [
        event.recipes.create.deploying(inter, [inter, `armor_trims:netherite_upgrade_smithing_template`]).keepHeldItem(),
        event.recipes.create.pressing(inter, inter),
        event.recipes.create.filling(inter, [inter, Fluid.of(`tconstruct:molten_diamond`, 100)]),
        event.recipes.create.filling(inter, [inter, Fluid.of(`tconstruct:molten_diamond`, 100)]),
        event.recipes.create.pressing(inter, inter)
    ]).transitionalItem(inter).loops(1)

    trim(`#forge:cobblestone/normal`, `coast`)
    trim(`#forge:sandstone`, `dune`)
    trim(`endstone`, `eye`)
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
})