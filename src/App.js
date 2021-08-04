import {
	IonApp,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
	IonIcon,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import React from "react";
import { earth, medkit, book, informationCircle } from "ionicons/icons";
import { Route, Redirect } from "react-router";
import IndiaCase from "./pages/IndiaCase";
import Precautions from "./pages/Precautions";
import StateWiseData from "./pages/StateWiseData";
import Blogs from "./pages/Blogs";
import Resources from "./pages/Resources";
import AuthRoute from "./Components/AuthRoute";
import Blog from "./pages/Blog";
import Auth from "./pages/Auth";
import AboutUs from "./pages/AboutUs";
import O2 from "./pages/O2";
import "./theme/variables.css";
import StateHospital from "./pages/SelectedStateHopitalData";
export default function App() {
	return (
		<IonApp>
			<IonReactRouter>
				<IonTabs>
					<IonRouterOutlet>
						<Route path='/cases' component={IndiaCase} exact />
						<Route path='/states' component={StateWiseData} exact />
						<Route path='/resources' component={Resources} exact />
						<Route path='/precautions' component={Precautions} exact />
						<Route path='/blogs' component={Blogs} exact />
						<Route path='/about' component={AboutUs} exact />
						<Route path='/o2' component={O2} />
						<Route path='/state/:stateName' component={StateHospital} exact />
						<Route path='/blog/:id' component={Blog} exact />
						<Route exact path='/' render={() => <Redirect to='/cases' />} />
						<AuthRoute exact path='/auth' component={Auth} />
					</IonRouterOutlet>
					<IonTabBar slot='bottom'>
						<IonTabButton tab='tab1' href='/cases'>
							<IonIcon icon={earth} />
						</IonTabButton>
						<IonTabButton tab='tab2' href='/states'>
							<i
								className='fas fa-virus'
								style={{
									fontSize: 25,
								}}></i>
						</IonTabButton>
						<IonTabButton tab='tab3' href='/resources'>
							<IonIcon icon={medkit} />
						</IonTabButton>
						<IonTabButton tab='tab4' href='/o2'>
							<i
								className='fas fa-lungs'
								style={{
									fontSize: 25,
								}}></i>
						</IonTabButton>
						<IonTabButton tab='tab5' href='/blogs'>
							<IonIcon icon={book} />
						</IonTabButton>
						<IonTabButton tab='tab6' href='/about'>
							<IonIcon icon={informationCircle} />
						</IonTabButton>
					</IonTabBar>
				</IonTabs>
			</IonReactRouter>
		</IonApp>
	);
}
