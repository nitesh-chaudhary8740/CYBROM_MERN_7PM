import React from 'react';
import { Link } from 'react-router-dom';
import "./SeachResults.css"
export function SearchResults({ searchResults }) {
    if (!searchResults || searchResults.length === 0) {
        return (
            <>    
                <div className="search-results-container">
                    <div className="no-results">No users found matching your search.</div>
                </div>
            </>
        );
    }
    
    return (
        <>
          
            <div className="search-results-container">
                {
                    searchResults.map((user, index) =>
                        <Link 
                            to={`/display/${user._id}`} // Example target route with user ID
                            className="result-link-box"
                            key={index}
                        >
                            <div className="result-line-one">
                                <span className="result-username">{user.userName}</span>
                                <span className="result-course">({user.courseName})</span>
                            </div>
                            <div className="result-line-two">
                                <span className="result-fullname">{user.fullName}</span>
                            </div>
                        </Link>
                    )
                }
            </div>
        </>
    );
}

export default SearchResults;
