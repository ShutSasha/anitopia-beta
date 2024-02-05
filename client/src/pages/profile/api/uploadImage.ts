import $api from "../../../app/http";

export const uploadImage = async (
	img: File,
	username: string,
	checkUploadStatus: () => void
) => {
	try {
		const formData = new FormData();
		formData.append("img", img);
		formData.append("username", username);

		await $api.post("/profile/uploadAvatar", formData);
		return setInterval(checkUploadStatus, 1000);
	} catch (error) {
		console.error("Error uploading image", error);
		throw error;
	}
};
