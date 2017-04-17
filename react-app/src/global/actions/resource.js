import { S3 } from "aws-sdk"

const s3DefaultParams = {
    bucket: 'obeliskglobal-resource'
}

export const fetchS3Resource = (s3FilePath) => {
    return new Promise((resolve, reject) => {
        const params = {
            ...s3DefaultParams,
            key: s3FilePath
        }
        S3.getObject(params, (err, data) => {
            debugger
        })
    })
}