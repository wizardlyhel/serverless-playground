let s3 = null
const s3DefaultParams = {
    Bucket: 'obeliskglobal-resource'
}

const initS3 = () => {
    // S3 object must be created after credential refresh so that it is initiated with the correct credentials
    if (!s3) {
        s3 = new window.AWS.S3({
            region: 'ap-southeast-1'
        })
    }
}

const s3GetObject = (params, resolve, reject) => {
    window.AWS.config.credentials.refresh(() => {
        initS3()

        s3.getObject(params, (err, data) => {
            if (err) {
                reject()
            } else {
                resolve({
                    url: params.Key,
                    data: data.Body.toString('utf-8')
                })
            }
        })
    })
}

export const fetchS3Resource = (s3FilePath) => {
    return new Promise((resolve, reject) => {
        const params = {
            ...s3DefaultParams,
            Key: s3FilePath
        }
        s3GetObject(params, resolve, reject)
    })
}

const getPreSignedLink = (s3FilePath) => {
    return new Promise((resolve, reject) => {
        window.AWS.config.credentials.refresh(() => {
            initS3()
            s3.getSignedUrl(
                'getObject',
                {
                    ...s3DefaultParams,
                    Key: s3FilePath
                }, 
                (err, url) => {
                    if (err)  {
                        resolve('')
                    } else {
                        resolve(url)
                    }
                }
            )
        })
    })
}

let mappedResource = {}

const convertS3Resource = (attr, el) => {
    let url = el.attr(attr)

    if (typeof mappedResource[url] === 'string') {
        el.attr(attr.replace('x-', ''), mappedResource[url])
        return 1
    } else if (url) {
        if (!mappedResource[url]) {
            mappedResource[url] = []
            mappedResource[url].push(el)

            return getPreSignedLink(url).then((s3Url) => {
                for (el of mappedResource[url]) {
                    el.attr(attr.replace('x-', ''), s3Url)
                }
                mappedResource[url] = s3Url
            })
        } else {
            mappedResource[url].push(el)
            return 1
        }
    } else {
        return 1
    }
}

export const convertS3ResourcesInHTML = (url, html) => {
    return new Promise((resolve, reject) => {
        let $html = window.$(html)
        let promises = []

        $html.find('img, a[href*="pdf"]').each((idx, el) => {
            let $el = window.$(el)
            promises.push(convertS3Resource('href', $el))
            promises.push(convertS3Resource('x-src', $el))
        })

        Promise.all(promises).then(() => {
            resolve({
                url,
                data: $html.html()
            })
        })
    })
}
