import React, { useContext, useEffect, useState } from 'react'
import _ from 'lodash'
import { RecipeContext } from '../../contexts/Recipe'
import ImageCardList from '../ImageCardList'
import Nav from '../Nav'

const RecipeSearchResult = ({ location }) => {
    const q = new URLSearchParams(location.search).get('q')

    const { searchRecipes } = useContext(RecipeContext)

    const [recipes, setRecipes] = useState([])
    const [totalResults, setTotalResults] = useState([])
    const [page, setPage] = useState(0)

    useEffect(() => {
        searchRecipes(q, 9, page)
            .then(({ results, totalResults, offset }) => {
                setRecipes(results)
                setTotalResults(totalResults)
                setPage(offset+1)
            })
    }, [])

    return (
        <section id="search-result" className="mb-8">
            <Nav />
            <ImageCardList list={recipes} />

            {/* PAGINATION */}
            <div class="bg-white px-4 py-3 flex items-center justify-center border-t border-gray-200 sm:px-6">
                {/* <div class="flex-1 flex justify-between sm:hidden">
                    <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:text-gray-500">
                        Previous
    </a>
                    <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:text-gray-500">
                        Next
    </a>
                </div> */}
                <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-xl border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span class="sr-only">Previous</span>
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                </a>
                {/* <div className=""> */}
                <p class="text-sm text-gray-700 block place-self-center mx-5">
                    Page {page} of {Math.ceil(totalResults / recipes.length)}
                </p>
                {/* </div> */}
                {/* {Array(Math.ceil(totalResults / recipes.length) || 1).fill().map((items, index) => {
                                return <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    {(offset * recipes.length) + index + 1}
                                </a>
                            })
                            } */}
                <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-xl border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span class="sr-only">Next</span>
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </a>
            </div>
        </section>
    )
}

export default RecipeSearchResult
