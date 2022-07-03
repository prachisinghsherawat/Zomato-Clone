import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import {Collections} from './Collection';
import "./Home.css"
import { LandingPage } from './Landing';
import {Navbar} from "../Navbar/Navbar"
import { Footer } from '../Footer/Footer';
import { SignUp } from '../Authentication/Signup';

const Search = styled('div')(({ theme }) => ({

    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '80ch',
      },
    },
}));


export const Home = () => {

    return(

        <>

        <Navbar />


        <div className="zomatoDiv">
            <div className="zomatoLogo">
                <img src="https://b.zmtcdn.com/web_assets/8313a97515fcb0447d2d77c276532a511583262271.png" alt="" height="100%" width="100%"/>
            </div>

            <p>Discover the best Food and Drinks in Delhi NCR</p>

            <div className="searchBox">
            <Search id='search'>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for restaurant , cuisine or a dish "
              inputProps={{ 'aria-label': 'search' }}
            />
            </Search>

            <LandingPage />

            <Collections />

            <div id="footerDiv">
              <Footer />
            </div>
            
          </div>

          
            
        </div>

        

        </>
    )
}