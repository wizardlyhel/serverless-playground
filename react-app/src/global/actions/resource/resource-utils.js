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

const getPreSignedLink = (s3FilePath) => {
    return new Promise((resolve, reject) => {
        window.AWS.config.credentials.refresh(() => {
            initS3()
            s3.getSignedUrl(
                'getObject',
                {
                    Bucket: 'ap-southeast-1',
                    Key:'media/pusheen.pdf'
                }, 
                (err, url) => {
                    if (err)  {
                        resolve('')
                    } else {
                        console.log(url)
                        resolve(url)
                    }
                }
            )
        })
    })
}

const convertS3Resource = (attr, el) => {
    let value = el.attr(attr)
    if (value) {
        getPreSignedLink(value).then((url) => {
            el.attr(attr, url)
        })
    }
}

export const convertS3ResourcesInHTML = (html) => {
    let $html = window.$(html)
    $html.find('img, a[href*="pdf"]').each((idx, el) => {
        let $el = window.$(el)
        convertS3Resource('href', $el)
        convertS3Resource('src', $el)
    })
    return $html.html()
}