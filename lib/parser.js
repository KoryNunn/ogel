var selfClosing = [
    'area',
    'base',
    'basefont',
    'br',
    'col',
    'hr',
    'input',
    'img',
    'link',
    'meta'
];

function toTags(html){
    return html.match(/<.*?>/g);
}

function parse(html){
    var tags = toTags(html),
        ast = [];

    while(tags.length){

    }
}

module.exports = parse;