// priority: 1

onEvent('player.logged_in', event => {
    if (!event.player.stages.has('starting_items')) {
        event.player.stages.add('starting_items')
        // Give some items to player
        event.player.give(`farmersdelight:flint_knife`)
    }
})