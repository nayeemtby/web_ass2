const state = {
    cats: null,
    selectedCat: null,
    posts: null,
    isLoading: true,
}

const tunePost = (post) => {
    const author = post.authors[0];
    let views = ''
    if (post.others.views) {
        views = post.others.views + ' views'
    }
    let postedAt = null
    const posted_date = post.others.posted_date;
    if (posted_date && posted_date.length > 0) {
        const date = new Date(parseInt(posted_date) * 1000)
        postedAt = `${date.getHours()}hrs ${date.getMinutes()} min ago`
    }
    return {
        title: post.title,
        channel: author.profile_name,
        views: views,
        postedAt: postedAt,
        isVerified: author.verified == true,
        thumbnail: post.thumbnail,
        channelIcon: author.profile_picture,

    };
}

const getCategories = async () => {
    const resp = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await resp.json();

    if (data['status'] == true) {
        return data['data'];
    }
}

const getPosts = async (catId) => {
    const resp = await fetch(`https://openapi.programming-hero.com/api/videos/category/${catId}`);
    const data = await resp.json();
    if (data['status'] == true) {
        return data['data'].map(tunePost);
    }
}



const render = () => {
    if (state.isLoading) {
        setSpinner(true);
        setSortButton(false);
        setMain(false);
    } else {
        setSpinner(false);
        setSortButton(state.posts && state.posts.length > 0);
        setEmpty(state.posts && state.posts.length == 0);
        setMain(true);
        const btns = state.cats.map((v) => createCategoryButton(v.category, v.category_id, v.category_id == state.selectedCat));
        setBtns(btns.join(''))
        const posts = state.posts.map((v) => createVideoCard(v.title, v.channel, v.views, v.postedAt, v.isVerified, v.thumbnail, v.channelIcon));
        setItems(posts.join(''))
    }
}

const showCat = async (catId) => {
    state.isLoading = true
    state.posts = null
    state.selectedCat = catId
    render()

    const posts = await getPosts(catId);

    state.posts = posts ?? []
    state.isLoading = false;
    render()
}

const orderPosts = () => {
    state.posts.sort((a, b) => parseFloat(b.views.replace('K views', '')) - parseFloat(a.views.replace('K views', '')));
    render();
}

const init = async () => {
    render()
    const cats = await getCategories();
    if (!cats || cats.length == 0) {
        console.error("Failed to fetch categories")
        return
    }
    state.cats = cats;
    showCat(cats[0].category_id)
}

init()
