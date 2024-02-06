function main() {
    loadItems('.listlines')
    setTimeout(() => {
        virgule(document.querySelector('#numOfWorks'), `共收录${document.querySelectorAll('.listprogram').length}个作品项目。`)
    }, 400)
}