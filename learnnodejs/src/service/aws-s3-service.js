import AWS from 'aws-sdk'
import fs from 'fs'
import { env } from '../config/index.js'

const config = {
	region: env.AWS_REGION,
	accessKeyId: env.AWS_ACCESS_KEY_ID,
	secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
}

// const config = {
// 	region: 'us-west-2',
// 	endpoint: 'http://10.0.3.14:4566/',
// 	accessKeyId: 'test',
// 	secretAccessKey: 'test',
// 	s3ForcePathStyle: true,
// }

const s3 = new AWS.S3(config)

AWS.config.update(config)

export const uploadFile = async (file) => {
	const fileStream = fs.readFileSync(file.path)

	const uploadParams = {
		Bucket: env.AWS_S3_BUCKETS_NAME,
		Body: fileStream,
		Key: `vhalo-${Date.now()}-${file.originalname}`,
	}

	const { mimetype } = file
	if (
		mimetype === 'image/jpeg' ||
		mimetype === 'image/png' ||
		mimetype === 'image/gif' ||
		mimetype === 'video/mp3' ||
		mimetype === 'video/mp4'
	)
		uploadParams.ContentType = mimetype

	try {
		const { Location } = await s3.upload(uploadParams).promise()
		return Location
	} catch (err) {
		console.log('err: ', err)
	}
}
