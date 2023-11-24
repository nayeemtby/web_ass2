const setSpinner = (show) => {
    const item = document.getElementById("loading")
    if (item) {
        item.style.display = show ? "flex" : "none"
    }
}

const setSortButton = (show) => {
    const item = document.getElementById("sort-btn")
    if (item) {
        item.style.display = show ? "inline-block" : "none"
    }
}

const setMain = (show) => {
    const item = document.getElementById("main")
    if (item) {
        item.style.display = show ? "block" : "none"
    }
}

const setItems = (content) => {
    const item = document.getElementById("items")
    if (item) {
        item.innerHTML = content
    }
}

const setBtns = (content) => {
    const item = document.getElementById("cat-btns")
    if (item) {
        item.innerHTML = content
    }
}

const createCategoryButton = (title, id, isSelected) => {
    return `
    <div class="btn ${isSelected ? 'btn-danger' : 'btn-secondary'} " ${isSelected ? '' : `onclick="showCat(${id})"`}>
        ${title}
    </div>
`
}

const createVideoCard = (title, channel, views, postedAt, isVerified, thumbnail, channelIcon) => {
    return `
    <div class="col-12 col-md-4 col-lg-3">
    <div class="video-thumbnail w-100">
    ${postedAt ? `<p class="posted-at">${postedAt}</p>` : ''}
        
        <img src="${thumbnail}" alt="empty">
    </div>
    <div class="d-flex gap-3">
        <img class="channel-icon" src="${channelIcon}" alt="empty">
        <div>
            <p class="video-title">
                ${title}
            </p>
            <div class="d-flex gap-2">
                <p class="channel-title">
                    ${channel}
                </p>
                ${isVerified ? '<i class="fa-solid fa-circle-check text-primary"></i>' : ''}
                
            </div>
            <p class="view-count">${views}</p>
        </div>
    </div>
</div>
    `
}