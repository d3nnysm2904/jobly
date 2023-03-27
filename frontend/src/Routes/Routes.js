import React, { useContext } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import HomePage from "../Home/Home";
import LoginForm from "../Auth/LoginForm";
import SignUpForm from "../Auth/SignUpForm";
import UserProfile from "../Auth/UserProfile";
import UserContext from "../UseContext";
import CompaniesList from "../Companies/CompaniesList";
import CompanyDetail from "../Companies/CompanyDetails";
import JobsList from "../Jobs/JobList";


function RoutesComponent ( { login, signup } )
{
    const { currUser } = useContext( UserContext );

    const SecureRoute = ( path, component ) =>
    {
        if ( currUser )
        {
            return <Route exact path={ path } element={ component }></Route>;
        } else
        {
            return (
                <Route path="*" element={ <Navigate exact="true" to="/login" /> }></Route>
            );
        }
    };

    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route exact path="/" element={ <HomePage /> }></Route>
                <Route
                    exact
                    path="/login"
                    element={ <LoginForm login={ login } /> }
                ></Route>
                <Route
                    exact
                    path="/signup"
                    element={ <SignUpForm signup={ signup } /> }
                ></Route>

                {/* Ensuring that the user is login to access this routes */ }
                { SecureRoute( "/profile", <UserProfile /> ) }
                { SecureRoute( "/companies", <CompaniesList /> ) }
                { SecureRoute( "/companies/:handle", <CompanyDetail /> ) }
                { SecureRoute( "/jobs", <JobsList /> ) }

                <Route path="*" element={ <Navigate exact="true" to="/" /> }></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesComponent;
