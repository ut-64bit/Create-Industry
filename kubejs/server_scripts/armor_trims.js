// priority: 1

onEvent("recipes", event => {
    if (armor_trims) return

    let inter

    // func
    let trim = (base, trim) => {
        inter = `armor_trims:incomplete_${trim}_armor_trim_smithing_template`
        create.sequencedAssembly(`armor_trims:${trim}_armor_trim_smithing_template`, `${base}`, [
            create.deploying(inter, [inter, `armor_trims:${trim}_armor_trim_smithing_template`]).keepHeldItem(),
            create.pressing(inter, inter),
            create.filling(inter, [inter, Fluid.of("tconstruct:molten_diamond", 100)]),
            create.filling(inter, [inter, Fluid.of("tconstruct:molten_diamond", 100)]),
            create.pressing(inter, inter)
        ]).transitionalItem(`${inter}`).loops(1)
    }

    // netherite_upgrade
    let trans = "armor_trims:incomplete_netherite_upgrade_smithing_template"
    create.sequencedAssembly("armor_trims:netherite_upgrade_smithing_template", "netherrack", [
        create.deploying(trans, [trans, "armor_trims:netherite_upgrade_smithing_template"]).keepHeldItem(),
        create.pressing(trans, trans),
        create.filling(trans, [trans, Fluid.of("tconstruct:molten_diamond", 100)]),
        create.filling(trans, [trans, Fluid.of("tconstruct:molten_diamond", 100)]),
        create.pressing(trans, trans)
    ]).transitionalItem(trans).loops(1)

    // #region trims
    trim("#forge:cobblestone/normal", "coast")
    trim("#forge:sandstone", "dune")
    trim("#forge:endstone", "eye")
    trim("terracotta", "host")
    trim("terracotta", "raiser")
    trim("netherrack", "rib")
    trim("#forge:cobblestone/normal", "sentry")
    trim("terracotta", "shaper")
    trim("#forge:cobblestone/deepslate", "silence")
    trim("blackstone", "snout")
    trim("purpur_block", "spire")
    trim("prismarine", "tide")
    trim("#forge:cobblestone/normal", "vex")
    trim("#forge:cobblestone/deepslate", "ward")
    trim("terracotta", "wayfinder")
    trim("#forge:cobblestone/mossy", "wild")
    // #endregion
})