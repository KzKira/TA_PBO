function getFlashProducts(products) {
    return products.filter(item => item.sale === true).slice(0, 8);
}

function getFeaturedProducts(products) {
    return products.filter(item => item.sale === true).slice(0, 12);
}

function totalPrice(items) {
    return items.reduce((itemAcc, item) => {
        return itemAcc += (item.price * item.qty);
    }, 0);
}

function isWishListed(productId, wishList) {
    return wishList.findIndex(product => product.id === productId) !== -1;
}

function getCompareList(items) {
    return items.slice(0, 4);
}

function searchFilter(row, search) {
    return row.title.toLowerCase().includes(search.toLowerCase()) || !search;
}

// Image helpers
function isValidImageSrc(src) {
    if (!src || typeof src !== 'string') return false;
    const s = src.trim();
    return s.startsWith('/') || s.startsWith('http://') || s.startsWith('https://');
}

function safeImageSrc(src, fallback) {
    return isValidImageSrc(src) ? src : fallback;
}

// more robust sanitizer that accepts data URIs and converts Google Drive share links
function sanitizeSrc(src) {
    if (!src || typeof src !== 'string') return ''
    const s = src.trim()
    // allow data URIs directly
    if (s.startsWith('data:')) return s
    // protocol-relative
    if (s.startsWith('//')) return 'https:' + s
    // direct http/https ok
    if (s.startsWith('http://') || s.startsWith('https://')) {
        // handle common Google Drive sharing URLs and convert to direct image access
        try {
            const url = new URL(s)
                    if (url.hostname === 'drive.google.com') {
                        // patterns: /file/d/ID/view, /open, /uc
                        const path = url.pathname || ''
                        // /file/d/<id>/view
                        const fileMatch = path.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
                        if (fileMatch && fileMatch[1]) return `/api/image-proxy?driveId=${fileMatch[1]}`
                        // ?id=<id>
                        const id = url.searchParams.get('id')
                        if (id) return `/api/image-proxy?driveId=${id}`
                        // if already uc with export/view, try to extract id from query
                        if (path.startsWith('/uc')) {
                            const idFromUc = url.searchParams.get('id')
                            if (idFromUc) return `/api/image-proxy?driveId=${idFromUc}`
                        }
                    }
        } catch (e) {
            // ignore URL parse errors
        }
        return s
    }
    // allow root-relative
    if (s.startsWith('/')) return s
    return ''
}

// Rating helpers
function getStarsFromCourse(course) {
    if (!course) return 0;
    // prefer explicit numeric `stars` column
    if (typeof course.stars === 'number') return Number(course.stars);
    if (course.stars && !isNaN(Number(course.stars))) return Number(course.stars);
    // fallback: compute average from reviews array
    if (Array.isArray(course.reviews) && course.reviews.length > 0) {
        const sum = course.reviews.reduce((s, r) => s + (Number(r.rating) || 0), 0);
        return Math.round((sum / course.reviews.length) * 10) / 10;
    }
    // legacy field `ratting`
    if (typeof course.ratting === 'number') return Number(course.ratting);
    if (course.ratting && !isNaN(Number(course.ratting))) return Number(course.ratting);
    return 0;
}

function formatStarsValue(v) {
    const n = Number(v) || 0;
    // show one decimal if fractional, otherwise show integer
    if (Math.abs(n - Math.round(n)) < 0.0001) return String(Math.round(n));
    return String(n.toFixed(1));
}

// short helper function
function checkLengNull(data) {
    if (data !== null) {
        return data.length > 0;
    }
    return false;
}

function isEquals(a, b) {
    if (a !== null && b !== null) {
        return a.toLowerCase() === b.toLowerCase();
    }
    return a === b
}

function minValueOne(qty) {
    if (qty < 1) {
        return 1;
    }
    return qty;
}

// filter function
function filterProductByCategory(product, selected_category) {
    if (checkLengNull(selected_category)) {
        return product.category.toLowerCase() === selected_category.toLowerCase();
    }
    return true
}

function filterProductByPrice(product, price) {
    if (checkLengNull(price)) {
        return product.price >= price[0] && product.price <= price[1];
    }
    return true
}

function filterProductByColor(product, color) {
    if (checkLengNull(color)) {
        for (var i = 0; i < product.colors.length; i++) {
            if (product.colors[i].toLowerCase() === color.toLowerCase()) {
                return true
            }
        }
        return false;
    }
    return true
}

function filterProductBySize(product, size) {
    if (checkLengNull(size)) {
        for (var i = 0; i < product.size.length; i++) {
            if (product.size[i].toLowerCase() === size.toLowerCase()) {
                return true
            }
        }
        return false;
    }
    return true
}

export {
    getFlashProducts,
    getFeaturedProducts,
    totalPrice,
    isWishListed,
    filterProductByCategory,
    filterProductByPrice,
    filterProductByColor,
    filterProductBySize,
    isEquals,
    minValueOne,
    getCompareList,
    searchFilter
    , isValidImageSrc
    , safeImageSrc
    , sanitizeSrc
    , getStarsFromCourse
    , formatStarsValue
};