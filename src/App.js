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
import { earth, medkit, book } from "ionicons/icons";
import { Route, Redirect } from "react-router";
import IndiaCase from "./pages/IndiaCase";
import Precautions from "./pages/Precautions";
import StateWiseData from "./pages/StateWiseData";
import Blogs from "./pages/Blogs";
import Resources from "./pages/Resources";
import AuthRoute from "./Components/AuthRoute";
import Auth from "./pages/Auth";
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
						<Route path='/state/:stateName' component={StateHospital} exact />
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
						<IonTabButton tab='tab4' href='/blogs'>
							<IonIcon icon={book} />
						</IonTabButton>
					</IonTabBar>
				</IonTabs>
			</IonReactRouter>
		</IonApp>
	);
}
