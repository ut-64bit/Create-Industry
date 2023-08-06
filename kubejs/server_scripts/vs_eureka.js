// priority: 1

onEvent("recipes", event => {
    if (vs_eureka) return

    // balloonのレシピを変更
    event.remove({ id: "vs_eureka:balloon_leather" })
    event.remove({ id: "vs_eureka:balloon_membrane" })
    event.remove({ id: "vs_eureka:balloon_paper" })
    event.remove({ id: "vs_eureka:balloon_string" })
    event.remove({ id: "vs_eureka:balloon_wool" })

    event.remove({ id: "vs_eureka:black_balloon" })
    event.shaped("vs_eureka:black_balloon",
        [
            "KKK",
            "KSK",
            "KKK"
        ], {
        "K": "dried_kelp",
        "S": "#forge:string"
    }).id("kubejs:crafting/black_balloon")
    event.shaped("vs_eureka:balloon",
        [
            " s ",
            "s s",
            " s "
        ], {
        "s": "create:white_sail"
    }).id("kubejs:crafting/balloon")

    // anchorのレシピを変更
    event.remove({ id: "vs_eureka:anchor" })
    event.shaped("vs_eureka:anchor",
        [
            "s#s",
            " # ",
            "###"
        ], {
        "#": "#forge:ingots/steel",
        "s": "#forge:nuggets/steel"
    }).id("kubejs:crafting/anchor")

    // ballastのレシピを変更
    event.remove({ id: "vs_eureka:ballast" })
    event.shapeless("vs_eureka:ballast", ["create:fluid_tank", "#forge:dusts/redstone"]).id("kubejs:crafting/ballast")

    // engineのレシピを変更
    event.remove({ id: "vs_eureka:engine" })
    event.shaped("vs_eureka:engine",
        [
            "P",
            "B",
            "R"
        ], {
        "P": "create:precision_mechanism",
        "B": "blast_furnace",
        "R": "create:railway_casing"
    }).id("kubejs:crafting/engine")

    // floater
    event.remove({ id: "vs_eureka:floater" })
    event.shapeless("vs_eureka:floater", ["create:linear_chassis", "#forge:dusts/redstone"]).id("kubejs:crafting/floater")

    // ship_helms
    woods.forEach(wood => {
        event.remove({ id: `vs_eureka:${wood}_ship_helm` })
        event.shaped(`vs_eureka:${wood}_ship_helm`,
            [
                " B ",
                "RCP",
                " I "
            ], {
            "B": "create:cogwheel",
            "R": "create:rope_pulley",
            "C": "create:railway_casing",
            "P": `${wood}_planks`,
            "I": "create:precision_mechanism"
        }).id(`kubejs:crafting/${wood}_ship_helm`)
    })

    colors.forEach(color => {
        item_application(`vs_eureka:${color}_balloon`, "#vs_eureka:balloons", `${color}_dye`)
    })
})