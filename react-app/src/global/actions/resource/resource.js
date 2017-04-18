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
