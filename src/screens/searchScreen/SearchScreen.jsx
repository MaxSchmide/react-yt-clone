/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect } from "react"
import { Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { searchByKeyword } from "../../utils"
import FilterBar from "../../components/filterBar/FilterBar"
import SearchedVideo from "../../components/searchedVideo/SearchedVideo"

const SearchScreen = () => {
	const { query } = useParams()
	const dispatch = useDispatch()
	const { results, loading } = useSelector((state) => state.search)

	useEffect(() => {
		dispatch(searchByKeyword(query))
	}, [query, dispatch])
	return (
		<>
			<Container>
				<FilterBar />

				{!loading &&
					results.map((item, i) => (
						<SearchedVideo result={item} key={item.id} />
					))}
			</Container>
		</>
	)
}

export default SearchScreen
