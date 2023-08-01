// priority: 1

onEvent("recipes", event => {
	const { create, immersiveengineering } = event.recipes;

	// 一部を除いたナイフのレシピを削除
	event.remove({ id: "delightful:knives/silver_knife" })
	event.remove({ id: "delightful:knives/copper_knife" })
	event.remove({ id: "farmersdelight:golden_knife" })
	event.remove({ id: "farmersdelight:diamond_knife" })
	event.remove({ id: "farmersdelight:iron_knife" })
	event.remove({ id: "farmersdelight:flint_knife" })

	// #region ナイフのレシピを変更
	event.shaped(
		Item.of("farmersdelight:iron_knife"),
		[
			" H",
			"S "
		], {
		H: Item.of("tconstruct:small_blade", "{Material:\"tconstruct:iron\"}"),
		S: "#forge:rods/wooden"
	}).id("kubejs:crafting/iron_knife")
	event.shaped(
		Item.of("farmersdelight:golden_knife"),
		[
			" H",
			"S "
		], {
		H: "gold_ingot",
		S: "#forge:rods/wooden"
	}).id("kubejs:crafting/golden_knife")
	event.shaped(
		Item.of("farmersdelight:flint_knife"),
		[
			" H",
			"S "
		], {
		H: Item.of("tconstruct:small_blade", "{Material:\"tconstruct:flint\"}"),
		S: "#forge:rods/wooden"
	}).id("kubejs:crafting/flint_knife")
	event.shaped(
		Item.of("delightful:silver_knife"),
		[
			" H",
			"S "
		], {
		H: Item.of("tconstruct:small_blade", "{Material:\"tconstruct:silver\"}"),
		S: "#forge:rods/wooden"
	}).id("kubejs:crafting/silver_knife")
	event.shaped(
		Item.of("delightful:copper_knife"),
		[
			" H",
			"S "
		], {
		H: Item.of("tconstruct:small_blade", "{Material:\"tconstruct:copper\"}"),
		S: "#forge:rods/wooden"
	}).id("kubejs:crafting/copper_knife")
	create.filling(Item.of("farmersdelight:diamond_knife"), ["#farmersdelight:tools/knives", Fluid.of(TC("molten_diamond"), 100)])
		.id("kubejs:filling/diamond_knife")
	// #endregion

	// #region パン生地のレシピを追加
	event.remove({ id: "create:smelting/bread" })
	event.remove({ id: "create:crafting/appliances/dough" })
	event.remove({ id: "farmersdelight:wheat_dough_from_water" })
	event.remove({ id: "farmersdelight:wheat_dough_from_eggs" })
	event.shapeless("2x farmersdelight:wheat_dough", ["milk_bucket", "wheat", "wheat", "wheat"])
		.id("kubejs:crafting/wheat_dough_from_milk_wheat")
	event.shapeless("2x farmersdelight:wheat_dough", ["water_bucket", "wheat", "wheat", "wheat"])
		.id("kubejs:crafting/wheat_dough_from_water_wheat")
	event.shapeless("2x farmersdelight:wheat_dough", ["#forge:milk/milk_bottle", "create:wheat_flour", "create:wheat_flour"])
		.id("kubejs:crafting/wheat_dough_from_water_flour")
	event.shapeless("2x farmersdelight:wheat_dough", ["#balm:eggs", "create:wheat_flour", "create:wheat_flour"])
		.id("kubejs:crafting/wheat_dough_from_egg_flour")
	event.replaceInput({ input: "create:dough" }, "create:dough", "#forge:dough/wheat")
	event.replaceInput({ input: "farmersdelight:wheat_dough" }, "farmersdelight:wheat_dough", "#forge:dough/wheat")
	event.replaceOutput({ output: "create:dough" }, "create:dough", "farmersdelight:wheat_dough")
	// #endregion

	// 鍋
	event.remove({ id: "farmersdelight:cooking_pot" })
	event.shaped("farmersdelight:cooking_pot",[
		"bRb",
		"IBI",
		"III"
	],{
		"b":"brick",
		"R":"#forge:rods/wooden",
		"I":"#forge:ingots/iron",
		"B":"bucket"
	}).id("farmersdelight:cooking_pot")
})

onEvent("item.entity_interact", event => {
	if (event.target.type != "minecraft:cow" || event.item.id != "minecraft:glass_bottle") return
	event.item.count--
	event.player.giveInHand("farmersdelight:milk_bottle")
	event.target.playSound("entity.cow.milk")
})