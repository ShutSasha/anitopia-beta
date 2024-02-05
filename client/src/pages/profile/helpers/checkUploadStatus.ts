import $api from "../../../app/http";

export const checkUploadStatus = async (
	username: string,
	intervalId: any,
	isLoading: boolean
) => {
	try {
		const response = await $api.get(`/profile/uploadStatus/${username}`);
		const status = response.data.status;
		console.log(status);
		if (status === false) {
			console.log("Image upload completed");
			clearInterval(intervalId);
			window.addEventListener("unload", function () {
				isLoading = false;
			});
			window.location.reload();
		} else if (!status) {
			console.error("Image upload failed");
			clearInterval(intervalId);
			isLoading = false;
		}
	} catch (error) {
		console.error("Error checking upload status", error);
		throw error;
	}
};
