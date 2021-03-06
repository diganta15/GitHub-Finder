import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import axios from "axios";
import GithubState from "./context/github/GithubState";
import "./App.css";

const App = () => {

	const [alert, setAlert] = useState(null);
	const [repos, setRepos] = useState([]);


	

	
	const getUserRepo = async (username) => {
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		setRepos(res.data);
	};

	

	const setalert = (message, type) => {
		setAlert({ message, type });
		setTimeout(() => {
			setAlert(null);
		}, 2000);
	};

	return (
		<GithubState>
			<Router>
				<div className='app'>
					<Navbar icon='fab fa-github' title='Github Finder' />
					<div className='container'>
						<Alert alert={alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={(props) => (
									<Fragment>
										<Search setAlert={setalert}
										/>
										<Users />
									</Fragment>
								)}></Route>
							<Route exact path='/about' component={About}></Route>
							<Route
								exact
								path={"/user/:login"}
								render={(props) => (
									<User
										{...props}
										
										getUserRepo={getUserRepo}
										repos={repos}
									
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	);
};

export default App;
