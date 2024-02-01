const ImageKit = require("imagekit");

var imagekit = new ImageKit({
	publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
	privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
	urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
});

class ImageService {
	async deleteImage(link) {
		const fileId = await this.extractFileIdFromUrl(link);

		await imagekit.deleteFile(fileId, function (error, result) {
			if (error) {
				console.log(error);
			}
		});
	}

	async extractFileIdFromUrl(url) {
		let parts = url.split("/");
		let filename = parts[parts.length - 1];

		try {
			const result = await imagekit.listFiles({
				folder: "user_icons",
				name: filename,
			});

			if (result && result.length > 0) {
				return result[0].fileId;
			} else {
				throw new Error("No file found with the given name");
			}
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new ImageService();
