function main() {
    loadItems('.listlines')
    updatePageModel()
    resetTagList()
    virgule(document.querySelector('#index-info'), `共索引${document.querySelectorAll('.listlines .listprogram').length}篇文章，最近更新于${getTime('DD', document.querySelector('.listprogram .articles-info time').innerHTML)}天前。`)
}