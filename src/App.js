import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Route, Navigate, Routes, useNavigate } from "react-router-dom"
import { loading, accessToken } from "./redux/authReducer"
import Layout from "./routes/Layout"
import WatchLayout from "./routes/WatchLayout"
import HomeScreen from "./screens/homeScreen/HomeScreen"
import LikedScreen from "./screens/likedScreen/LikedScreen"
import LoginScreen from "./screens/loginScreen/LoginScreen"
import SearchScreen from "./screens/searchScreen/SearchScreen"
import SubscriptionsScreen from "./screens/subscriptionsScreen/SubscriptionsScreen"
import WatchScreen from "./screens/watchScreen/WatchScreen"
import ChannelScreen from "./screens/сhannelScreen/ChannelScreen"

function App() {
	const navigate = useNavigate()
	const isLoading = useSelector(loading)
	const token = useSelector(accessToken)
	useEffect(() => {
		!isLoading && !token && navigate("/auth")
	}, [isLoading, token, navigate])
	return (
		<>
			<Routes>
				<Route
					path="/"
					exact
					element={
						<Layout>
							<HomeScreen />
						</Layout>
					}
				/>

				<Route
					path="/channel/:channelId"
					element={
						<Layout>
							<ChannelScreen />
						</Layout>
					}
				/>
				<Route
					path="/watch/:id"
					element={
						<WatchLayout>
							<WatchScreen />
						</WatchLayout>
					}
				/>
				<Route
					path="/search/:query"
					element={
						<Layout>
							<SearchScreen />
						</Layout>
					}
				/>
				<Route
					path="/feed/subscriptions"
					element={
						<Layout>
							<SubscriptionsScreen />
						</Layout>
					}
				/>
				<Route
					path="/feed/liked"
					element={
						<Layout>
							<LikedScreen />
						</Layout>
					}
				/>
				<Route path="/auth" element={<LoginScreen />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</>
	)
}

export default App
