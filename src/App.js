import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import jwt from 'jsonwebtoken'
import CustomerUserRegistrartion from './pages/CustomerUserRegistrartion';




const CardPage = React.lazy(() => import('pages/CardPage'));
const ChartPage = React.lazy(() => import('pages/ChartPage'));
const Userpage = React.lazy(() => import('pages/User'));
const WidgetPage = React.lazy(() => import('pages/WidgetPage'));
const InspectionPage = React.lazy(() => import('pages/Inspection'))
const InspectionEdit = React.lazy(() => import('pages/InspectionEdit') )
const Dashboard = React.lazy(() => import('pages/Dashboard') )
const Factorordersheet = React.lazy(() => import('pages/Factorordersheet') )
const InspectionReport = React.lazy(() => import('pages/InspectionReport') )
const InspectionReportsummary = React.lazy(() => import('pages/InspectionReportSummary') )
const Defactdescription = React.lazy(() => import('pages/Defactdescription'))
const Viewdocs = React.lazy(() => import('pages/Viewdocs'))
const logout = React.lazy(() => import('pages/Logout'))
const Home = React.lazy(() => import('pages/Home'))
const Approvalview = React.lazy(()=> import('pages/Approvalview'))
const acceptview =  React.lazy(()=> import('pages/Poacceptview'))
const Changepassword = React.lazy(()=> import('pages/Changepassword'))
const poaccept = React.lazy(()=> import('pages/Poaccept'))
const salesorder = React.lazy(()=> import('pages/Salesorder'))
const createsalesorder = React.lazy(()=> import('pages/Crearesalesorder')) 
const EditSalesOrder = React.lazy(()=> import('pages/EditSalesOrder')) 

const mothwiseorderstatus = React.lazy(()=>import('pages/Misreport'))
const Contract=React.lazy(()=>import('pages/ContractDtl'))
const CustomerUserReg=React.lazy(()=>import('pages/CustomerUserRegistrartion'))
const potracking=React.lazy(()=>import('pages/PoTracking'))
const MaterialReceipt=React.lazy(()=>import('pages/MaterialReceipt'))
const ViewMaterialReceipt=React.lazy(()=>import('pages/ViewMaterialReceipt'))
const MATERIAL_RECEIPT_REPORT=React.lazy(()=>import('pages/MATERIAL_RECEIPT_REPORT'))
// const mothwiseorderstatus1 = React.lazy(()=>import('pages/Misreport2'))
// const mothwiseorderstatus2 = React.lazy(()=>import('pages/Misreport3'))
const mismaterialissue =React.lazy(()=>import('pages/MaterialIssueEntryReport'))
 const mismatterialreceipt = React.lazy(()=>import('pages/MaterialReceiptReport'))
 const department = React.lazy(()=>import('./pages/Departmentmaster'))
 const Materailissueentryview=React.lazy(()=>import('pages/MaterialissueEntry'))
const createMaterialIssueEntry=React.lazy(()=>import('pages/CreateMaterialIssueEntry'))
const stockreport = React.lazy(()=>import('pages/StockReport'))
const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};




class App extends React.Component {
  render() {
    
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />

            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                {/* <Route exact path="/" component={DashboardPage} /> */}
                <Route   exact path="/login" component={AuthPage} />
                <Route extends path="/Dashboard" component={Dashboard} />
                <Route exact path="/Approval" component={CardPage} />
                <Route exact path="/viewpo" component={WidgetPage} />
                
             <Route exact path="/user" component={Userpage}  /> 
             <Route exact path="/Factoryordersheet" component={Factorordersheet}  /> 
             <Route exact path="/logout" component={logout}  /> 
             <Route exact path="/Home" component={Home}  /> 
             <Route exact path="/changepassword" component={Changepassword}  /> 

                <Route exact path="/inspection" component={InspectionPage}  />
                <Route exact path="/Purchaseorder" component={ChartPage} />
                <Route exact path="/Purchaseorder/:id" component={ChartPage} />

                <Route exact path="/outstanding" component={InspectionEdit} />
                <Route exact path="/inspection/:id" component={InspectionPage}  />
                <Route exact path="/inspectionsummary" component={InspectionReport}  />
                <Route exact path="/inspectionReport" component={InspectionReportsummary}  />
                <Route exact path="/viewdocs" component={Viewdocs} />
                <Route exact path="/approvalview/:id" component={Approvalview} />
                <Route exact path="/changepassowrd" component={Changepassword} />
                <Route exact path="/PoAccept" component={poaccept}/>
                <Route exact path="/PoAcceptview/:id" component={acceptview}/>
                <Route exact path="/salesorder" component={salesorder} />
                <Route exact path="/createsalesorder" component={createsalesorder}/>
                <Route exact path="/createsalesorder/:id/:id1/:id2" component={createsalesorder}/>
                <Route exact path="/EditSalesOrder/:id" component={EditSalesOrder}/>
                <Route exact path="/Monthwiseorder" component={mothwiseorderstatus} />
                <Route exact path="/ContractDtl" component={Contract} />
                <Route exact path="/CustomerUserReg" component={CustomerUserReg} />
                <Route exact path="/potracking" component={potracking} />
                <Route exact path="/materialreceipt" component={MaterialReceipt} />
                <Route exact path="/materialreceipt/:id" component={MaterialReceipt} />
                <Route exact path="/ViewMaterialReceipt" component={ViewMaterialReceipt} />
                <Route exact path="/MaterialReceiptReport1" component={MATERIAL_RECEIPT_REPORT} />
                <Route exact path="/MaterialIssue" component={mismaterialissue} />
                <Route exact path="/MaterialReceiptReport" component={mismatterialreceipt} />
                <Route exact path="/Department" component={department} />
                <Route exact path="/MaterialIssueEntry" component={Materailissueentryview} /> 
               <Route exact path="/CreateMaterialIssueEntry" component={createMaterialIssueEntry} /> 
               <Route exact path="/CreateMaterialIssueEntry/:id" component={createMaterialIssueEntry} /> 
               <Route exact path="/Stock" component={stockreport} />
                {/* <Route exact path="/Monthwiseorder1" component={mothwiseorderstatus1} />
                <Route exact path="/Monthwiseorder2" component={mothwiseorderstatus2} /> */}
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
