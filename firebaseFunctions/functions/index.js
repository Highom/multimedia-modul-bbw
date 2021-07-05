/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const mkdirp = require('mkdirp');
const path = require('path');
const sharp = require('sharp');
const os = require('os');
const fs = require('fs');

admin.initializeApp();

// File extension for the created JPEG files.
const JPEG_EXTENSION = '.jpg';

/**
 * When an image is uploaded in the Storage bucket it is converted to JPEG automatically using
 * ImageMagick.
 */
exports.convertImageAfterUpload = functions.region('europe-west1').storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const baseFileName = path.basename(filePath, path.extname(filePath));
  const fileDir = path.dirname(filePath);
  const JPEGFilePath = path.normalize(path.format({dir: fileDir, name: "edit_"+ baseFileName, ext: JPEG_EXTENSION}));
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const tempLocalJPEGFile = path.join(os.tmpdir(), JPEGFilePath);

  // Exit if this is triggered on a file that is not an image.
  if (!object.contentType.startsWith('image/')) {
    functions.logger.log('This is not an image.');
    return null;
  }

    // Exit if the image is already a thumbnail.
    if (baseFileName.startsWith('edit_')) {
      functions.logger.log('Already edited.');
      return null;
    }  

  const bucket = admin.storage().bucket(object.bucket);
  // Create the temp directory where the storage file will be downloaded.
  await mkdirp(tempLocalDir);
  // Download file from bucket.
  await bucket.file(filePath).download({destination: tempLocalFile});
  functions.logger.log('The file has been downloaded to', tempLocalFile);
  const buffer = await sharp(tempLocalFile)
  .resize(858,480)
  .jpeg()
  .toBuffer().catch(err =>{
    functions.logger.error('Conversion failed.',err);
  });
  await sharp(buffer).toFile(tempLocalJPEGFile).catch(err =>{
    functions.logger.error('Saving new File failed. Error:',err);
  });
  functions.logger.log('JPEG image created at', tempLocalJPEGFile);
  // Uploading the JPEG image.
  await bucket.upload(tempLocalJPEGFile, {destination: JPEGFilePath});
  functions.logger.log('JPEG image uploaded to Storage at', JPEGFilePath);
  //Delete Old Image
  await bucket.file(filePath).delete();
  functions.logger.log('The file was deleted at', filePath);
  // Once the image has been converted delete the local files to free up disk space.
  fs.unlinkSync(tempLocalJPEGFile);
  fs.unlinkSync(tempLocalFile);
  return null;
});
