import React from "react"
import "./_sidebar.scss"
import {
	MdSubscriptions,
	MdExitToApp,
	MdThumbUp,
	MdHistory,
	MdLibraryBooks,
	MdHome,
} from "react-icons/md"
import { auth } from "../../firebase"
import { signOut } from "firebase/auth"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { sidebarValue, toggleSidebar } from "../../redux/styleReducer"
import { LogOut } from "../../redux/authReducer"

const Sidebar = () => {
	const sidebar = useSelector(sidebarValue)
	const dispatch = useDispatch()
	const logout = async () => {
		await signOut(auth)
		dispatch(LogOut())
		sessionStorage.removeItem("ytc-access-token")
		sessionStorage.removeItem("ytc-profile")
	}
	const handleLogOut = (e) => {
		e.preventDefault()
		logout()
	}
	return (
		<nav
			onClick={() => dispatch(toggleSidebar(false))}
			className={sidebar ? "sidebar open" : "sidebar"}
		>
			<Link to="/">
				<li>
					<MdHome size={23} />
					<span>Home</span>
				</li>
			</Link>
			<Link to="/feed/subscriptions">
				<li>
					<MdSubscriptions size={23} />
					<span>Subscriptions</span>
				</li>
			</Link>
			<hr />
			<li>
				<MdLibraryBooks size={23} />
				<span>Library</span>
			</li>
			<li>
				<MdHistory size={23} />
				<span>History</span>
			</li>
			<Link to="/feed/liked">
				<li>
					<MdThumbUp size={23} />
					<span>Liked Video</span>
				</li>
			</Link>

			<hr />
			<li onClick={handleLogOut}>
				<MdExitToApp size={23} />
				<span>Log Out</span>
			</li>
			<hr />
		</nav>
	)
}

export default Sidebar
