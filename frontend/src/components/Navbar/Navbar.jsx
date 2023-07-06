
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import "./Navbar.css";
import { useSelector } from 'react-redux';
import { signout } from '../../api/internal';
import { resetUser } from '../../store/userSlice';
import { useDispatch } from 'react-redux';

const activeStyle ={
  color:'#242582',
  fontSize:'18px',
  fontWeight: 'bold',
  textDecoration:'none',
  marginLeft:'10px',
  display:'flex',
  alignItems:'center'
  }
  
  const inActiveStyle = {
  textDecoration:'none',
  marginLeft:'10px',
  color:'gray',
  display:'flex',
  alignItems:'center',
  fontSize:'16px',
  } 
function NavScroll() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state)=>{return state.user.auth});

  const handleSignout = async ()=>{
    await signout();
    dispatch(resetUser());
  }

  return (<>
    <Navbar bg="light" expand="sm">
      <Container fluid>
        <Navbar.Brand to="/" className="me-lg-auto" style={{fontSize:'25px',}}>
          <span style={{color:'orangered',fontWeight:'600'}}>Coin</span><span style={{color:'purple',fontWeight:'600'}}>Bounce</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll> 
          
            <NavLink to="/" style={({isActive})=> isActive?activeStyle:inActiveStyle}>Home</NavLink>
            <NavLink to="crypto" style={({isActive})=> isActive?activeStyle:inActiveStyle}>Crypto-currencies</NavLink>
            <NavLink to="blogs" style={({isActive})=> isActive?activeStyle:inActiveStyle}>Blogs</NavLink>
            { isAuthenticated?<><button className='btn btn-danger ms-2' onClick={handleSignout}>Sign out</button></>:
            <> 
            <NavLink className='btn btn-primary marginleft-5px' to='sign-up'>Sign Up</NavLink>
            <NavLink className='btn btn-primary marginleft-5px' to='log-in'>Log in</NavLink>
            </>}
            <NavLink className='btn btn-dark marginleft-5px' to='submit' > Submit a Blog</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="seperator"></div>
    </>
  );
}
export default NavScroll;
