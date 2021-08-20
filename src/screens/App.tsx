import './App.scss'
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import Home from './Home'
import Cars from './Cars'
import Brands from './Brands'
import Brand from './Brand'
import Car from './Car'
import {BRANDS, CARS, CARS_EDIT} from '../infra/RouteHelpers'
import Header from "../components/Header";
import CarEditor from "./CarEditor";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Route path="/" component={Header} />
				<main>
					<Switch>
						<Route path={`${BRANDS}/:id`} component={Brand} />
						<Route path={BRANDS} component={Brands} />
						<Route path={`${CARS_EDIT}/:id?`} component={CarEditor} />
						<Route path={`${CARS}/:id`} component={Car} />
						<Route path={CARS} component={Cars} />
						<Route exact path="/" component={Home} />
					</Switch>
				</main>
			</BrowserRouter>
		</div>
	)
}

export default App
