import BackgroundImages from '../assets/img/bg/background images.png';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import './Authform.css';
import { useHistory } from 'react-router-dom';
import axios from '../axios';
import { useStateValue } from '../StateProvider';
import moment from 'moment';

import logoss from '../assets/img/officebazaar.png';
function AuthForm({}) {
  const history = useHistory();
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [userdata, setuserdata] = useState([]);
  const [userinfo, setuserinfo] = useState({});
  const [open, setopen] = useState(false);
  const [user, dispatch] = useStateValue();
  const [open1, setopen1] = useState(false);
  const [customerlogin, setcustomerlogin] = useState(true);
  const [companycollections, setcompanycollections] = useState([]);
  const [companyid, setcompanyid] = useState('');
  const [date, setdate] = useState('');

  useEffect(() => {
    let fromdate = localStorage.getItem('contractfromdate1');
    console.log(fromdate, 'fryys');
    // Getallcompany()
  }, []);

  const login = async e => {
    if (customerlogin) {
      e.preventDefault();
      console.log(password, 'pass');
      if (username.length != 0 && password.length != 0) {
        const logidata = await axios.instance
          .post('/login', {
            User_Code: `${username}`,
            Password: `${password}`,
          })
          .then(async res => {
            console.log(res.data, 'login.data');
            if (Object.keys(res.data).length === 2) {
              localStorage.setItem('user', JSON.stringify(res.data));

              setuserdata(res.data.eventlist);
              localStorage.setItem('authtoken', 'Bearer ' + res.data.token);
              for (const data2 of res.data.getlogin) {
                console.log(data2.Customer_Log, 'customerlog');
                localStorage.setItem('Usercode', data2.UserCode);
                localStorage.setItem('Username', data2.UserName);
                localStorage.setItem('Userid', data2.UserId);
                localStorage.setItem('Special_User', data2.Special_User);
                localStorage.setItem('Customer_Log', data2.Customer_Log);
                localStorage.setItem('CustomerName', data2.SUppliername);
                localStorage.setItem('Branch_Log', data2.Branch_Log);
                localStorage.setItem('BranchName', data2.BranchName);
                localStorage.setItem('AdminUser', data2.AdminUser);

                localStorage.setItem('approvereq', data2.ApprovalReq);

                localStorage.setItem('Approval2', data2.Approval2);
                localStorage.setItem('Approval3', data2.Approval3);
                localStorage.setItem('Department', data2.Department);
                localStorage.setItem('Designation', data2.Designation);
                localStorage.setItem('customer_HO', data2.Customer_HeadOffice);
                localStorage.setItem('customer_HOID', data2.Customer_HoId);
                localStorage.setItem('CustomerHo_Name', data2.CustomerHo_Name);
                localStorage.setItem('Branch_Name', data2.Branch_Name);
                localStorage.setItem('Hoflagmail', data2.CustomerHO);

                const logidata2 = await axios.instance
                  .get(`/Available2/${data2.Customer_Log}`)
                  .then(res => {
                    for (const data of res.data) {
                      localStorage.setItem(
                        'contractfromdate1',
                        moment(data.Contract_from_date).format('YYYYMMDD'),
                      );
                      localStorage.setItem(
                        'contracttodate1',
                        moment(data.Contract_To_date).format('YYYYMMDD'),
                      );
                    }
                    console.log(
                      localStorage.getItem('contracttodate1'),
                      'date',
                    );
                  });

                const logidata = await axios.instance
                  .get(
                    `/Availableblance/${
                      data2.Customer_Log
                    }/${localStorage.getItem(
                      'contractfromdate1',
                    )}/${localStorage.getItem('contracttodate1')}`,
                  )
                  .then(res => {
                    console.log(res.data, 'balance');

                    //  console.log(moment(new Date()).format("yyyy-MM-DD"),'date')
                    if (res.data.length) {
                      for (const Data2 of res.data) {
                        console.log('contract_ID', Data2.contract_ID);
                        localStorage.setItem('contract_ID', Data2.contract_ID);
                        localStorage.setItem(
                          'Contract_Detail_No',
                          Data2.Contract_Detail_No,
                        );
                        localStorage.setItem('balance', Data2.PO_Value);

                        localStorage.setItem(
                          'Avalableblance',
                          Data2.Contract_Value,
                        );
                        localStorage.setItem(
                          'Suppliername',
                          Data2.customer_name,
                        );
                        localStorage.setItem(
                          'contractfromdate',
                          moment(Data2.Contract_from_date).format('YYYYMMDD'),
                        );
                        localStorage.setItem(
                          'contracttodate',
                          moment(Data2.Contract_To_date).format('YYYYMMDD'),
                        );
                      }
                    } else {
                      for (const Data2 of res.data) {
                        console.log('contract_ID', Data2.contract_ID);
                        localStorage.setItem('contract_ID', 0);
                        localStorage.setItem('Contract_Detail_No', 0);
                        localStorage.setItem('balance', 0);
                        localStorage.setItem('Avalableblance', 0);
                        localStorage.setItem('Suppliername', '');
                      }
                    }
                  });
              }
            }

            dispatch({
              type: 'SET_USER',
              user: res.data,
            });

            if (Object.keys(res.data).length === 2) {
              history.push('/Dashboard');
            } else {
              setopen(true);
            }
            setTimeout(() => {
              setopen(false);
            }, 2000);
          });
      } else {
        setopen(true);
        setTimeout(() => {
          setopen(false);
        }, 2000);
      }
    } else {
      e.preventDefault();
      if (username.length != 0 && password.length != 0) {
        const logidata = await axios.instance
          .post('/userlogin', {
            User_Code: `${username}`,
            New_Password: `${password}`,
          })
          .then(async res => {
            if (Object.keys(res.data).length === 2) {
              localStorage.setItem('user', JSON.stringify(res.data));
              console.log(res.data, 'user');
              setuserdata(res.data.eventlist);
              localStorage.setItem('authtoken', 'Bearer ' + res.data.token);
              for (const data2 of res.data.getlogin) {
                localStorage.setItem('Usercode', data2.User_Code);
                localStorage.setItem('Username', data2.User_Name);
                localStorage.setItem('Userid', data2.User_Id);
                localStorage.setItem('Special_User1', data2.Special_User);
                //  localStorage.setItem('Customer_Log', data2.Customer_Log)
                localStorage.setItem('username', data2.User_Name);
                localStorage.setItem('SalesMan', data2.SalesMan);
                //localStorage.setItem('Branch_Log', data2.Branch_Log)
                localStorage.setItem('AdminUser1', data2.AdminUser);
              }
            }

            dispatch({
              type: 'SET_USER',
              user: res.data,
            });

            if (Object.keys(res.data).length === 2) {
              history.push('/PoAccept');
            } else {
              setopen(true);
            }
            setTimeout(() => {
              setopen(false);
            }, 2000);
          });
      } else {
        setopen(true);
        setTimeout(() => {
          setopen(false);
        }, 2000);
      }
    }
  };

  const Getallcompany = async name => {
    const tokent = localStorage.getItem('authtoken');
    const ordeheader = await axios.instance
      .post(
        `/getcompnaybranch`,
        {
          User_Code: name,
        },
        { Authorization: tokent, 'Content-Type': 'application/json' },
      )
      .then(res => {
        console.log(res.data, 'company');
        if (res.data.length != 0) {
          setcompanycollections(res.data);
          let Companycollection = [];
          Companycollection.push(res.data[0]);
          for (const Data of Companycollection) {
            console.log(Data.Branch_Name, 'yyyyyy');
            setcompanyid(Data.Company_Id);

            localStorage.setItem('Companyid', Data.Company_Id);
            localStorage.setItem('companyName', Data.Company_Name);

            localStorage.setItem('CStateCode', Data.StateCode);
            localStorage.setItem('CStateId', Data.StateId);

            localStorage.setItem('Branch_Log', Data.companybranch);
            localStorage.setItem('BranchName', Data.Branch_Name);
          }
        } else {
          setcompanycollections([]);
        }
      });
  };

  useEffect(() => {
    //localStorage.setItem('cateid', 0)
    const date = moment(new Date()).format('YYYYMMDD');
    console.log(date, 'date');
    setdate(date);
    // Getallcompany()
  }, []);

  const companyidvalue = async value => {
    setcompanyid(value);
    localStorage.setItem('Companyid', value);
    const tokent = localStorage.getItem('authtoken');
    const compbranch = localStorage.getItem('Companyid');
    const ordeheader = await axios.instance
      .get(`/Getcompnybranchone/${compbranch}`, {
        Authorization: tokent,
        'Content-Type': 'application/json',
      })
      .then(res => {
        console.log(res.data, 'test');
        for (const data of res.data) {
          console.log(data, 'companys');
          localStorage.setItem('Branch_Log', data.companybranch);
        }
      });
  };
  const changepss = () => {
    history.push('/changepassowrd');
  };
  const handlechnge = () => {
    console.log(customerlogin);
    setcustomerlogin(!customerlogin);
  };
  return (
    <div>
      <div className="">
        {/* <img src={logoss}  style={{marginLeft:'10px'}}   /> */}
        <p
          style={{
            color: '#58A7AA',
            fontSize: 25,
            fontWeight: '800',
            textAlign: 'center',
          }}
        >
          Login
        </p>
      </div>
      <p style={{ color: '#7b3772', textAlign: 'center' }}>
        <b>Order online for your office needs</b>
      </p>

      <div className="authpage">
        <div className="cardlogin">
          <Form onSubmit={login}>
            {/* <div className="text-center pb-4">
<p>Login</p>
          </div> */}

            <FormGroup>
              <Label>User code</Label>
              <Input
                value={username}
                placeholder="User code"
                onChange={e => {
                  Getallcompany(e.target.value);

                  setusername(e.target.value);
                }}
              />
              {open ? <p className="errors">invalid usercode</p> : ''}
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                placeholder="password"
                onChange={e => setpassword(e.target.value)}
              />
              {open ? <p className="errors">invalid password </p> : ''}
            </FormGroup>
            {!customerlogin && (
              <FormGroup>
                <Label>Company</Label>
                <Input
                  value={companyid}
                  onChange={e => companyidvalue(e.target.value)}
                  type="select"
                >
                  <option>Select Company </option>
                  {companycollections.map((data, index) => (
                    <option key={index} value={data.Company_Id}>
                      {data.Company_Name}{' '}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            )}
            <FormGroup>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div>
                  <input
                    type="Checkbox"
                    style={{ cursor: 'pointer' }}
                    defaultChecked={customerlogin}
                    value={customerlogin}
                    onChange={handlechnge}
                  ></input>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: '14px',
                      marginLeft: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Customer login
                  </p>
                </div>
              </div>
              <p
                style={{
                  color: 'red',
                  marginLeft: 220,
                  alignSelf: 'flex-end',
                  justifyContent: 'flex-end',
                  cursor: 'pointer',
                  marginTop: '-38px',
                }}
                onClick={changepss}
              >
                Change Password ?
              </p>
            </FormGroup>

            {/* <Button
          size="lg"
          className="bg-warning border-0"
          block
          style={{marginTop:"-10px",color:'white'}}
          
         >
       Login
        </Button> */}
            <div className="text-center">
              <button
                className="btn"
                style={{
                  width: '400px',
                  backgroundColor: '#58A7AA',
                  color: 'white',
                }}
              >
                Login
              </button>
            </div>

            {/* {userdata.length !=0 ?  userdata.map((data2) => (
           localStorage.setItem('Usercode', data2.UserCode ),
           localStorage.setItem('Username', data2.UserName),
           localStorage.setItem('Userid', data2.UserId),
            localStorage.setItem('Special_User', data2.Special_User),
            localStorage.setItem('Customer_Log', data2.Customer_Log),
            localStorage.setItem('CustomerName', data2.CustomerName),
            localStorage.setItem('Branch_Log', data2.Branch_Log),
            localStorage.setItem('BranchName', data2.BranchName),
            localStorage.setItem('AdminUser',data2.AdminUser)
             
  )): ''} */}
          </Form>
        </div>
      </div>
    </div>
  );
}
export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Email',
  usernameInputProps: {
    type: 'email',
    placeholder: 'your@email.com',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
  },
  onLogoClick: () => {},
};
export default AuthForm;
