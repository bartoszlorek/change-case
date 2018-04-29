function createMenu(items, callback, defaults) {
    if (items == null) {
        return
    }
    items.forEach(item => {
        let params

        if (item === null) {
            params = {
                type: 'separator'
            }
        } else {
            params = callback(item)
        }
        if (defaults) {
            params = Object.assign({},
                defaults,
                params
            )
        }
        chrome.contextMenus.create(params)
    })
}

export default createMenu
