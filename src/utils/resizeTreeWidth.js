const resize = {
    resize() {
        const treeNode = document.querySelector('.leftSide')
        const moveLine = document.querySelector('.moveLine')
        treeNode.style.width = 250 + 'px'
        moveLine.onmousedown = function() {
            document.onmousemove = function(e) {
                if (e.pageX >= 250 && e.pageX <= 500) {
                    treeNode.style.width = e.pageX + 'px'
                }
            }
            document.onmouseup = function() {
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    }
}

export default resize
