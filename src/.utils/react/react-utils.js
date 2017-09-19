export {
    bind
}

function bind(context, methods) {
    methods.forEach(item => {
        context[item] = context[item].bind(context);
    });
}