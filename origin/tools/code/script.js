function main() {
    loadComment()
}
let editorEl = document.querySelector('#editor1')
let resultEl = document.querySelector('#resultEl')

function removeLeadingSpaces(list) {
    let minSpaces = Number.MAX_SAFE_INTEGER;
    for (let item of list) {
        const spaces = item.match(/^\s*/)[0].length;
        if (spaces < minSpaces) {
            minSpaces = spaces;
        }
    }
    for (let i = 0; i < list.length; i++) {
        list[i] = list[i].substring(minSpaces);
    }

    return list;
}

function editor() {
    resultEl.value = removeLeadingSpaces(editorEl.value.replace(
        /^\n/gmi, ' \n')
        .split('\n'))
        .map((e) => {
        if (e == '') {
            return ''
        }
        return '<span>' + HTMLEncode(e) + '</span>'
    })
        .join('\n');

}