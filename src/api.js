import axios from "axios"

const request = axios.create({
	baseURL: "https://youtube.googleapis.com/youtube/v3/",
	params: {
		key: "AIzaSyAluD2TtI526pch_afNK8aZLdb_8SqCEfw",
	},
})
export default request
